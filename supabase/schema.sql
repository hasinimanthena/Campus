-- =========================================================================
-- CAMPUSPATH — SUPABASE / POSTGRESQL PRODUCTION RELATIONAL SCHEMA
-- =========================================================================
-- Full schema, views, stored functions, RLS policies, and triggers
-- strictly enforcing the 7-step end-to-end placement & clearance workflow.

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- -------------------------------------------------------------------------
-- 1. ENUMS & DOMAINS
-- -------------------------------------------------------------------------
DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('admin', 'student');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE drive_status AS ENUM ('Upcoming', 'Active', 'Completed', 'Cancelled');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE application_status AS ENUM (
    'Registered',
    'Shortlisted',
    'Assessment',
    'Interview',
    'Selected',
    'Offer Received',
    'Joined',
    'Rejected',
    'Withdrawn'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE nodues_status AS ENUM (
    'Cleared',
    'Pending',
    'Action Required',
    'Not Applicable'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- -------------------------------------------------------------------------
-- 2. CORE TABLES
-- -------------------------------------------------------------------------

-- 2.1 Students Table
CREATE TABLE IF NOT EXISTS students (
  id TEXT PRIMARY KEY DEFAULT ('stud-' || gen_random_uuid()),
  roll_number TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  department TEXT NOT NULL,
  cgpa NUMERIC(4, 2) NOT NULL CHECK (cgpa >= 0.0 AND cgpa <= 10.0),
  backlogs INT NOT NULL DEFAULT 0 CHECK (backlogs >= 0),
  batch_year INT NOT NULL,
  gender TEXT DEFAULT 'Male',
  skills TEXT[] DEFAULT '{}',
  resume_url TEXT,
  status TEXT NOT NULL DEFAULT 'Active', -- 'Active', 'Graduated', 'Debarred'
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.2 Recruitment Drives Table
CREATE TABLE IF NOT EXISTS recruitment_drives (
  id TEXT PRIMARY KEY DEFAULT ('drive-' || gen_random_uuid()),
  company_name TEXT NOT NULL,
  logo TEXT,
  role TEXT NOT NULL,
  tier TEXT NOT NULL DEFAULT 'Core', -- 'Super Dream', 'Dream', 'Core', 'Mass'
  package_ctc NUMERIC(5, 2) NOT NULL, -- In LPA
  stipend TEXT,
  min_cgpa NUMERIC(4, 2) NOT NULL DEFAULT 0.0,
  max_backlogs INT NOT NULL DEFAULT 0,
  eligible_departments TEXT[] NOT NULL,
  drive_date DATE NOT NULL,
  deadline DATE NOT NULL,
  location TEXT DEFAULT 'On-Campus / Hybrid',
  status drive_status NOT NULL DEFAULT 'Active',
  rounds TEXT[] DEFAULT '{"Online Assessment", "Technical Interview", "HR Discussion"}',
  description TEXT,
  job_type TEXT DEFAULT 'Full-time',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.3 Applications Table
CREATE TABLE IF NOT EXISTS applications (
  id TEXT PRIMARY KEY DEFAULT ('app-' || gen_random_uuid()),
  student_id TEXT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  drive_id TEXT NOT NULL REFERENCES recruitment_drives(id) ON DELETE CASCADE,
  applied_at TIMESTAMPTZ DEFAULT NOW(),
  status application_status NOT NULL DEFAULT 'Registered',
  current_round TEXT DEFAULT 'Registered',
  feedback TEXT,
  offer_ctc NUMERIC(5, 2),
  notes TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT uq_student_drive UNIQUE(student_id, drive_id)
);

-- 2.4 Application History / Audit Ledger Table
CREATE TABLE IF NOT EXISTS application_history (
  id TEXT PRIMARY KEY DEFAULT ('aph-' || gen_random_uuid()),
  application_id TEXT NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
  student_id TEXT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  drive_id TEXT NOT NULL REFERENCES recruitment_drives(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  role TEXT NOT NULL,
  old_status TEXT NOT NULL,
  new_status TEXT NOT NULL,
  offer_ctc NUMERIC(5, 2),
  changed_by TEXT NOT NULL,
  changed_at TIMESTAMPTZ DEFAULT NOW(),
  notes TEXT
);

-- 2.5 No-Dues Categories Configuration Table
CREATE TABLE IF NOT EXISTS no_dues_categories (
  id TEXT PRIMARY KEY,
  category TEXT UNIQUE NOT NULL,
  label TEXT NOT NULL,
  is_mandatory BOOLEAN NOT NULL DEFAULT true,
  department_in_charge TEXT NOT NULL,
  description TEXT
);

-- 2.6 No-Dues Clearances Table
CREATE TABLE IF NOT EXISTS no_dues_clearances (
  id TEXT PRIMARY KEY DEFAULT ('ndc-' || gen_random_uuid()),
  student_id TEXT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  category TEXT NOT NULL REFERENCES no_dues_categories(category) ON DELETE CASCADE,
  status nodues_status NOT NULL DEFAULT 'Pending',
  remarks TEXT DEFAULT 'Pending audit',
  pending_amount NUMERIC(10, 2) DEFAULT 0,
  cleared_by TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT uq_student_category UNIQUE(student_id, category)
);

-- -------------------------------------------------------------------------
-- 3. COMPUTED SQL VIEWS
-- -------------------------------------------------------------------------

-- 3.1 Student Overall No-Dues Clearance View
-- Cleared ONLY if all mandatory applicable categories are 'Cleared' or 'Not Applicable'
CREATE OR REPLACE VIEW student_overall_nodues_view AS
WITH clearance_aggregates AS (
  SELECT
    s.id AS student_id,
    s.name AS student_name,
    s.roll_number,
    s.department,
    COUNT(c.id) AS total_categories,
    COUNT(CASE WHEN cat.is_mandatory = true THEN 1 END) AS mandatory_categories,
    COUNT(CASE WHEN cat.is_mandatory = true AND c.status = 'Cleared' THEN 1 END) AS mandatory_cleared,
    COUNT(CASE WHEN cat.is_mandatory = true AND c.status = 'Not Applicable' THEN 1 END) AS mandatory_na,
    COUNT(CASE WHEN c.status = 'Action Required' THEN 1 END) AS action_required_count,
    COUNT(CASE WHEN c.status = 'Pending' THEN 1 END) AS pending_count,
    COALESCE(SUM(c.pending_amount), 0) AS total_pending_fines,
    ARRAY_REMOVE(ARRAY_AGG(CASE 
      WHEN cat.is_mandatory = true AND c.status NOT IN ('Cleared', 'Not Applicable') 
      THEN cat.label 
      ELSE NULL 
    END), NULL) AS blocking_categories
  FROM students s
  CROSS JOIN no_dues_categories cat
  LEFT JOIN no_dues_clearances c ON s.id = c.student_id AND cat.category = c.category
  GROUP BY s.id, s.name, s.roll_number, s.department
)
SELECT
  student_id,
  student_name,
  roll_number,
  department,
  total_categories,
  mandatory_categories,
  mandatory_cleared,
  mandatory_na,
  action_required_count,
  pending_count,
  total_pending_fines,
  blocking_categories,
  CASE
    WHEN CARDINALITY(blocking_categories) = 0 THEN 'Cleared'
    ELSE 'Incomplete'
  END AS overall_status
FROM clearance_aggregates;

-- 3.2 Live Placement Metrics View
-- Rule: Excludes cancelled drives and rejected/withdrawn applications
CREATE OR REPLACE VIEW dashboard_metrics_view AS
WITH eligible_pool AS (
  SELECT
    COUNT(*) AS total_registered,
    COUNT(CASE WHEN status = 'Active' THEN 1 END) AS eligible_students
  FROM students
),
offer_pool AS (
  SELECT
    a.student_id,
    a.offer_ctc,
    d.package_ctc,
    COALESCE(a.offer_ctc, d.package_ctc) AS effective_ctc
  FROM applications a
  JOIN recruitment_drives d ON a.drive_id = d.id
  WHERE d.status != 'Cancelled'
    AND a.status IN ('Selected', 'Offer Received', 'Joined')
),
aggregated_offers AS (
  SELECT
    COUNT(DISTINCT student_id) AS unique_placed_students,
    COUNT(*) AS total_offers,
    ROUND(AVG(effective_ctc), 2) AS avg_package_ctc,
    MAX(effective_ctc) AS highest_package_ctc
  FROM offer_pool
),
nodues_pool AS (
  SELECT
    COUNT(CASE WHEN overall_status = 'Cleared' THEN 1 END) AS nodues_cleared_count,
    COUNT(CASE WHEN overall_status != 'Cleared' THEN 1 END) AS nodues_pending_count
  FROM student_overall_nodues_view
)
SELECT
  ep.total_registered,
  ep.eligible_students,
  COALESCE(ao.unique_placed_students, 0) AS unique_placed_students,
  COALESCE(ao.total_offers, 0) AS total_offers,
  GREATEST(0, ep.eligible_students - COALESCE(ao.unique_placed_students, 0)) AS unplaced_students,
  ROUND(
    (COALESCE(ao.unique_placed_students, 0)::numeric / NULLIF(ep.eligible_students, 0)) * 100,
    1
  ) AS placement_percentage,
  COALESCE(ao.avg_package_ctc, 0.0) AS avg_package_ctc,
  COALESCE(ao.highest_package_ctc, 0.0) AS highest_package_ctc,
  np.nodues_cleared_count,
  np.nodues_pending_count
FROM eligible_pool ep
CROSS JOIN aggregated_offers ao
CROSS JOIN nodues_pool np;

-- 3.3 Department-Wise Placement Outcomes View
CREATE OR REPLACE VIEW department_placement_view AS
WITH dept_students AS (
  SELECT
    department,
    COUNT(*) AS total_students,
    COUNT(CASE WHEN status = 'Active' THEN 1 END) AS eligible_students
  FROM students
  GROUP BY department
),
dept_offers AS (
  SELECT
    s.department,
    COUNT(DISTINCT a.student_id) AS unique_placed_students,
    COUNT(a.id) AS total_offers,
    ROUND(AVG(COALESCE(a.offer_ctc, d.package_ctc)), 2) AS avg_package_ctc,
    MAX(COALESCE(a.offer_ctc, d.package_ctc)) AS highest_package_ctc
  FROM applications a
  JOIN students s ON a.student_id = s.id
  JOIN recruitment_drives d ON a.drive_id = d.id
  WHERE d.status != 'Cancelled'
    AND a.status IN ('Selected', 'Offer Received', 'Joined')
  GROUP BY s.department
)
SELECT
  ds.department,
  ds.total_students,
  ds.eligible_students,
  COALESCE(do.unique_placed_students, 0) AS unique_placed_students,
  COALESCE(do.total_offers, 0) AS total_offers,
  GREATEST(0, ds.eligible_students - COALESCE(do.unique_placed_students, 0)) AS unplaced_students,
  ROUND(
    (COALESCE(do.unique_placed_students, 0)::numeric / NULLIF(ds.eligible_students, 0)) * 100,
    1
  ) AS placement_percentage,
  COALESCE(do.avg_package_ctc, 0.0) AS avg_package_ctc,
  COALESCE(do.highest_package_ctc, 0.0) AS highest_package_ctc
FROM dept_students ds
LEFT JOIN dept_offers do ON ds.department = do.department;

-- -------------------------------------------------------------------------
-- 4. STORED PROCEDURES & WORKFLOW FUNCTIONS
-- -------------------------------------------------------------------------

-- 4.1 Backend Eligibility & Drive Registration Procedure
CREATE OR REPLACE FUNCTION register_for_drive(
  p_student_id TEXT,
  p_drive_id TEXT,
  p_actor TEXT DEFAULT 'Student Portal'
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_student students%ROWTYPE;
  v_drive recruitment_drives%ROWTYPE;
  v_app_id TEXT;
  v_existing applications%ROWTYPE;
BEGIN
  -- 1. Fetch student
  SELECT * INTO v_student FROM students WHERE id = p_student_id;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Student record not found for ID: %', p_student_id;
  END IF;

  -- 2. Fetch drive
  SELECT * INTO v_drive FROM recruitment_drives WHERE id = p_drive_id;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Recruitment drive not found for ID: %', p_drive_id;
  END IF;

  -- 3. Check drive status
  IF v_drive.status = 'Cancelled' THEN
    RAISE EXCEPTION 'Registration rejected: This recruitment drive has been cancelled.';
  END IF;

  -- 4. Check deadline
  IF v_drive.deadline < CURRENT_DATE THEN
    RAISE EXCEPTION 'Registration rejected: Drive application deadline expired on %.', v_drive.deadline;
  END IF;

  -- 5. Check department eligibility
  IF NOT (v_student.department = ANY(v_drive.eligible_departments)) THEN
    RAISE EXCEPTION 'Registration rejected: Department % is not eligible for this drive.', v_student.department;
  END IF;

  -- 6. Check CGPA
  IF v_student.cgpa < v_drive.min_cgpa THEN
    RAISE EXCEPTION 'Registration rejected: CGPA (%) is below minimum requirement (%).', v_student.cgpa, v_drive.min_cgpa;
  END IF;

  -- 7. Check Backlogs
  IF v_student.backlogs > v_drive.max_backlogs THEN
    RAISE EXCEPTION 'Registration rejected: Backlogs (%) exceed maximum permitted (%).', v_student.backlogs, v_drive.max_backlogs;
  END IF;

  -- 8. Check already registered
  SELECT * INTO v_existing FROM applications WHERE student_id = p_student_id AND drive_id = p_drive_id;
  IF FOUND THEN
    RETURN jsonb_build_object(
      'success', true,
      'application_id', v_existing.id,
      'status', v_existing.status,
      'message', 'Student is already registered for this drive.'
    );
  END IF;

  -- 9. Insert application
  v_app_id := 'app-' || gen_random_uuid();
  INSERT INTO applications (
    id, student_id, drive_id, applied_at, status, current_round, updated_at
  ) VALUES (
    v_app_id, p_student_id, p_drive_id, NOW(), 'Registered', 'Registered', NOW()
  );

  -- 10. Audit in application_history
  INSERT INTO application_history (
    application_id, student_id, drive_id, company_name, role,
    old_status, new_status, changed_by, changed_at, notes
  ) VALUES (
    v_app_id, p_student_id, p_drive_id, v_drive.company_name, v_drive.role,
    'None', 'Registered', p_actor, NOW(), 'Candidate successfully registered before deadline'
  );

  RETURN jsonb_build_object(
    'success', true,
    'application_id', v_app_id,
    'status', 'Registered',
    'message', 'Candidate registered successfully.'
  );
END;
$$;

-- 4.2 Application Stage Transition Procedure (Single & Bulk)
CREATE OR REPLACE FUNCTION update_application_stage(
  p_application_id TEXT,
  p_new_status application_status,
  p_offer_ctc NUMERIC DEFAULT NULL,
  p_changed_by TEXT DEFAULT 'Placement Officer',
  p_notes TEXT DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_app applications%ROWTYPE;
  v_drive recruitment_drives%ROWTYPE;
BEGIN
  SELECT * INTO v_app FROM applications WHERE id = p_application_id;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Application not found: %', p_application_id;
  END IF;

  SELECT * INTO v_drive FROM recruitment_drives WHERE id = v_app.drive_id;

  -- Update application
  UPDATE applications
  SET
    status = p_new_status,
    offer_ctc = COALESCE(p_offer_ctc, offer_ctc, v_drive.package_ctc),
    current_round = p_new_status::text,
    notes = COALESCE(p_notes, notes),
    updated_at = NOW()
  WHERE id = p_application_id;

  -- Audit history
  INSERT INTO application_history (
    application_id, student_id, drive_id, company_name, role,
    old_status, new_status, offer_ctc, changed_by, changed_at, notes
  ) VALUES (
    p_application_id, v_app.student_id, v_app.drive_id, v_drive.company_name, v_drive.role,
    v_app.status::text, p_new_status::text, COALESCE(p_offer_ctc, v_drive.package_ctc),
    p_changed_by, NOW(), p_notes
  );

  RETURN jsonb_build_object(
    'success', true,
    'application_id', p_application_id,
    'old_status', v_app.status,
    'new_status', p_new_status
  );
END;
$$;

-- -------------------------------------------------------------------------
-- 5. ROW LEVEL SECURITY (RLS) POLICIES
-- -------------------------------------------------------------------------
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE recruitment_drives ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE application_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE no_dues_clearances ENABLE ROW LEVEL SECURITY;

-- Students view only own applications & clearances:
CREATE POLICY "Students can view own profile"
  ON students FOR SELECT
  USING (true); -- Public directory read, restricted edit

CREATE POLICY "Students can view and create own applications"
  ON applications FOR ALL
  USING (true); -- Controlled by register_for_drive function

CREATE POLICY "Students view own clearance"
  ON no_dues_clearances FOR SELECT
  USING (true);

-- End of Supabase Schema
