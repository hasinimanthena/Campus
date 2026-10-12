import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { dbStore, NO_DUES_CATEGORIES } from './data/store.js';
import {
  initiatePhonePePayment,
  verifyPhonePeStatus,
  processPhonePeWebhook,
} from './phonepe.js';
import {
  getGoogleAuthUrl,
  handleGoogleCallback,
  getGithubAuthUrl,
  handleGithubCallback,
} from './oauth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'CampusPath Backend & PostgreSQL Engine',
    timestamp: new Date().toISOString(),
    phonepeMode: process.env.PHONEPE_MERCHANT_ID ? 'PRODUCTION' : 'SANDBOX_UAT',
    googleOAuth: Boolean(process.env.GOOGLE_CLIENT_ID),
    githubOAuth: Boolean(process.env.GITHUB_CLIENT_ID),
  });
});

// -------------------------------------------------------------
// STEP 1: STUDENT RECORDS & CSV IMPORT
// -------------------------------------------------------------
app.get('/api/students', (req, res) => {
  const students = dbStore.getEnrichedStudents();
  res.json({ success: true, count: students.length, students });
});

app.post('/api/students', (req, res) => {
  try {
    const student = dbStore.addStudent(req.body);
    res.status(201).json({ success: true, student });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put('/api/students/:id', (req, res) => {
  const updated = dbStore.updateStudent(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: 'Student not found.' });
  res.json({ success: true, student: updated });
});

app.delete('/api/students/:id', (req, res) => {
  const success = dbStore.deleteStudent(req.params.id);
  if (!success) return res.status(404).json({ error: 'Student not found.' });
  res.json({ success: true, message: 'Student removed from registry.' });
});

// CSV Import with Validation
app.post('/api/students/import-csv', (req, res) => {
  const { rows } = req.body;
  if (!rows || !Array.isArray(rows)) {
    return res.status(400).json({ error: 'Invalid payload: rows must be an array.' });
  }
  const report = dbStore.importStudentsCsv(rows);
  res.json({ success: true, report });
});

// Download sample template with 1 valid row, 1 duplicate row, and 1 invalid row
app.get('/api/template/sample-students-csv', (req, res) => {
  const csvContent = `Roll Number,Name,Email,Phone,Department,CGPA,Backlogs,Batch Year
2021CS0199,Karan Singhania,karan.s@student.campuspath.edu,+91 98765 44001,Computer Science & Engineering,8.75,0,2025
2021CS0101,Aarav Sharma Duplicate,aarav.sharma@student.campuspath.edu,+91 98765 43210,Computer Science & Engineering,9.42,0,2025
INVALID_ROLL_123,Invalid Candidate,invalid@domain.com,+91 00000 00000,Civil Engineering,14.50,5,1999
`;
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="campuspath_student_import_template.csv"');
  res.send(csvContent);
});

// -------------------------------------------------------------
// STEP 2: RECRUITMENT DRIVES
// -------------------------------------------------------------
app.get('/api/drives', (req, res) => {
  const drives = dbStore.getAllDrives();
  res.json({ success: true, count: drives.length, drives });
});

app.post('/api/drives', (req, res) => {
  try {
    const drive = dbStore.addDrive(req.body);
    res.status(201).json({ success: true, drive });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put('/api/drives/:id', (req, res) => {
  const updated = dbStore.updateDrive(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: 'Recruitment drive not found.' });
  res.json({ success: true, drive: updated });
});

// Cancelling a drive immediately excludes it from placement counts
app.post('/api/drives/:id/cancel', (req, res) => {
  const { reason } = req.body;
  const drive = dbStore.cancelDrive(req.params.id, reason);
  if (!drive) return res.status(404).json({ error: 'Drive not found.' });
  res.json({ success: true, drive, message: 'Recruitment drive cancelled. Placed counts updated.' });
});

app.delete('/api/drives/:id', (req, res) => {
  const success = dbStore.deleteDrive(req.params.id);
  if (!success) return res.status(404).json({ error: 'Drive not found.' });
  res.json({ success: true, message: 'Drive deleted.' });
});

// -------------------------------------------------------------
// STEP 3: STUDENT OPPORTUNITIES & BACKEND REGISTRATION
// -------------------------------------------------------------
app.get('/api/applications', (req, res) => {
  const { studentId, driveId } = req.query;
  let apps = dbStore.applications;
  if (studentId) apps = apps.filter((a) => a.studentId === studentId);
  if (driveId) apps = apps.filter((a) => a.driveId === driveId);
  res.json({ success: true, count: apps.length, applications: apps });
});

// Register with strict backend eligibility & deadline validation
app.post('/api/applications/register', (req, res) => {
  try {
    const { studentId, driveId, actor } = req.body;
    if (!studentId || !driveId) {
      return res.status(400).json({ error: 'Missing studentId or driveId.' });
    }
    const result = dbStore.registerForDrive(studentId, driveId, actor || 'Student Portal');
    res.status(201).json({ success: true, ...result });
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
});

// -------------------------------------------------------------
// STEP 4: RECRUITMENT OUTCOMES & STAGE AUDIT
// -------------------------------------------------------------
app.put('/api/applications/stage', (req, res) => {
  try {
    const { applicationId, newStatus, offerCtc, changedBy, notes } = req.body;
    if (!applicationId || !newStatus) {
      return res.status(400).json({ error: 'Missing applicationId or newStatus.' });
    }
    const result = dbStore.updateApplicationStage(applicationId, newStatus, offerCtc, changedBy, notes);
    res.json({ success: true, ...result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/api/applications/bulk-stage', (req, res) => {
  const { applicationIds, newStatus, changedBy, notes } = req.body;
  if (!applicationIds || !Array.isArray(applicationIds) || !newStatus) {
    return res.status(400).json({ error: 'Missing applicationIds array or newStatus.' });
  }
  const results = dbStore.bulkUpdateApplicationStages(applicationIds, newStatus, changedBy, notes);
  res.json({ success: true, count: results.length, results });
});

app.get('/api/application-history', (req, res) => {
  const { studentId } = req.query;
  const history = dbStore.getApplicationHistory(studentId);
  res.json({ success: true, count: history.length, history });
});

// -------------------------------------------------------------
// STEP 5: DASHBOARD AUTO-UPDATES (LIVE SQL VIEWS)
// -------------------------------------------------------------
app.get('/api/dashboard/metrics', (req, res) => {
  const metrics = dbStore.getDashboardMetrics();
  res.json({ success: true, metrics });
});

// -------------------------------------------------------------
// STEP 6: NO-DUES CLEARANCES & COMPUTED OVERALL STATUS
// -------------------------------------------------------------
app.get('/api/nodues/categories', (req, res) => {
  res.json({ success: true, categories: dbStore.noDuesCategories });
});

app.get('/api/nodues', (req, res) => {
  res.json({ success: true, noDuesMap: dbStore.getNoDuesMap() });
});

app.get('/api/nodues/:studentId', (req, res) => {
  const { studentId } = req.params;
  const clearances = dbStore.getNoDuesForStudent(studentId);
  const overall = dbStore.computeStudentOverallNoDues(studentId);
  res.json({ success: true, clearances, overall });
});

app.put('/api/nodues/:studentId/:category', (req, res) => {
  const { studentId, category } = req.params;
  const { status, remarks, pendingAmount, clearedBy } = req.body;

  if (!status) return res.status(400).json({ error: 'Status is required.' });

  const updated = dbStore.updateNoDuesClearance(studentId, category, status, remarks, pendingAmount, clearedBy);
  const overall = dbStore.computeStudentOverallNoDues(studentId);

  res.json({
    success: true,
    clearances: updated,
    overall,
    message: `Clearance for ${category} updated to ${status}. Overall status: ${overall.overallStatus}`,
  });
});

// -------------------------------------------------------------
// STEP 7: FINAL STATUS & COMPREHENSIVE REPORTS
// -------------------------------------------------------------
app.get('/api/reports/department-placement', (req, res) => {
  const report = dbStore.getDepartmentPlacementReport();
  res.json({ success: true, report });
});

app.get('/api/reports/company-outcomes', (req, res) => {
  const report = dbStore.getCompanyOutcomesReport();
  res.json({ success: true, report });
});

// -------------------------------------------------------------
// PHONEPE PAYMENT GATEWAY INTEGRATION
// -------------------------------------------------------------
app.post('/api/payments/phonepe/initiate', async (req, res) => {
  try {
    const { studentId, studentName, rollNumber, category, categoryLabel, amount, redirectUrl } = req.body;

    if (!studentId || !category || !amount) {
      return res.status(400).json({ error: 'Missing mandatory payment initiation parameters.' });
    }

    const order = await initiatePhonePePayment({
      studentId,
      studentName: studentName || 'Student',
      rollNumber: rollNumber || '2021CS0101',
      category,
      categoryLabel: categoryLabel || category,
      amountInRupees: Number(amount),
      redirectUrl,
    });

    res.json(order);
  } catch (err) {
    console.error('PhonePe initiation error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/payments/phonepe/callback', async (req, res) => {
  try {
    const xVerify = req.headers['x-verify'];
    const { response } = req.body;

    if (!response || !xVerify) {
      return res.status(400).json({ error: 'Invalid PhonePe webhook payload or missing X-VERIFY header.' });
    }

    const result = await processPhonePeWebhook(response, xVerify);
    res.json({ success: true, result });
  } catch (err) {
    console.error('PhonePe callback error:', err);
    res.status(400).json({ error: err.message });
  }
});

app.post('/api/payments/phonepe/verify/:merchantTransactionId', async (req, res) => {
  try {
    const { merchantTransactionId } = req.params;
    const result = await verifyPhonePeStatus(merchantTransactionId);
    res.json(result);
  } catch (err) {
    console.error('PhonePe verification error:', err);
    res.status(400).json({ error: err.message });
  }
});

app.get('/api/payments/history/:studentId', (req, res) => {
  const { studentId } = req.params;
  const history = dbStore.getPaymentsByStudent(studentId);
  res.json({ success: true, payments: history });
});

app.get('/api/payments/reconciliation', (req, res) => {
  const allPayments = dbStore.getAllPayments();
  res.json({
    success: true,
    totalCount: allPayments.length,
    payments: allPayments,
  });
});

app.get('/api/admin/audit-logs', (req, res) => {
  const logs = dbStore.getAuditLogs();
  res.json({ success: true, logs });
});

// OAuth URLs & callbacks
app.get('/api/auth/google/url', (req, res) => res.json(getGoogleAuthUrl()));
app.get('/api/auth/google/callback', async (req, res) => {
  const { code, state, error } = req.query;
  if (error) return res.redirect(`${CLIENT_URL}/login?error=${encodeURIComponent(error)}`);
  try {
    const result = await handleGoogleCallback(code, state);
    res.redirect(`${CLIENT_URL}/login?token=${result.token}&role=${result.user.role}`);
  } catch (err) {
    res.redirect(`${CLIENT_URL}/login?error=${encodeURIComponent(err.message)}`);
  }
});

app.get('/api/auth/github/url', (req, res) => res.json(getGithubAuthUrl()));
app.get('/api/auth/github/callback', async (req, res) => {
  const { code, state, error } = req.query;
  if (error) return res.redirect(`${CLIENT_URL}/login?error=${encodeURIComponent(error)}`);
  try {
    const result = await handleGithubCallback(code, state);
    res.redirect(`${CLIENT_URL}/login?token=${result.token}&role=${result.user.role}`);
  } catch (err) {
    res.redirect(`${CLIENT_URL}/login?error=${encodeURIComponent(err.message)}`);
  }
});

app.listen(PORT, () => {
  console.log(`[CampusPath API Server] Running on http://localhost:${PORT}`);
  console.log(`[CampusPath Relational DB] Persistent live schema online`);
});
