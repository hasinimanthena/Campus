import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, 'database.json');

export const NO_DUES_CATEGORIES = [
  { id: 'cat-1', category: 'library', label: 'Central Library', isMandatory: true, departmentInCharge: 'Library Directorate', description: 'Book return & penalty fee settlement' },
  { id: 'cat-2', category: 'laboratory', label: 'Department Laboratories', isMandatory: true, departmentInCharge: 'Central Lab Cell', description: 'Hardware kits, apparatus & computing equipment return' },
  { id: 'cat-3', category: 'department', label: 'Academic Department', isMandatory: true, departmentInCharge: 'Respective Academic Dept', description: 'HOD clearance, final thesis & marksheet submission' },
  { id: 'cat-4', category: 'placement', label: 'Placement Cell', isMandatory: true, departmentInCharge: 'Training & Placement Office', description: 'Offer letter copy & placement consent verification' },
  { id: 'cat-5', category: 'accounts', label: 'Accounts & Finance', isMandatory: true, departmentInCharge: 'Bursar & Finance Office', description: 'Tuition, examination fee & hostel fine reconciliation' },
  { id: 'cat-6', category: 'hostel', label: 'Hostel & Residence', isMandatory: false, departmentInCharge: 'Chief Warden Office', description: 'Room vacation, furniture & mess dues clearance' },
];

// Initial 10 CSE Students for Worked Example 1
const CSE_STUDENTS = [
  { id: 'stud-1', rollNumber: '2021CS0101', name: 'Aarav Sharma', email: 'aarav.sharma@student.campuspath.edu', phone: '+91 98765 43210', department: 'Computer Science & Engineering', cgpa: 9.42, backlogs: 0, batchYear: 2025, gender: 'Male', skills: ['React', 'Node.js', 'Go', 'PostgreSQL'], resumeUrl: 'https://campuspath.edu/resumes/2021CS0101.pdf', status: 'Active', avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&auto=format&fit=crop&q=80' },
  { id: 'stud-2', rollNumber: '2021CS0102', name: 'Diya Patel', email: 'diya.patel@student.campuspath.edu', phone: '+91 98765 43211', department: 'Computer Science & Engineering', cgpa: 8.91, backlogs: 0, batchYear: 2025, gender: 'Female', skills: ['Python', 'Machine Learning', 'TensorFlow'], resumeUrl: 'https://campuspath.edu/resumes/2021CS0102.pdf', status: 'Active', avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80' },
  { id: 'stud-3', rollNumber: '2021CS0103', name: 'Kabir Mehta', email: 'kabir.mehta@student.campuspath.edu', phone: '+91 98765 43212', department: 'Computer Science & Engineering', cgpa: 7.85, backlogs: 0, batchYear: 2025, gender: 'Male', skills: ['Java', 'Spring Boot', 'Kafka', 'Docker'], resumeUrl: 'https://campuspath.edu/resumes/2021CS0103.pdf', status: 'Active', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80' },
  { id: 'stud-4', rollNumber: '2021CS0104', name: 'Ananya Deshmukh', email: 'ananya.deshmukh@student.campuspath.edu', phone: '+91 98765 43213', department: 'Computer Science & Engineering', cgpa: 9.15, backlogs: 0, batchYear: 2025, gender: 'Female', skills: ['C++', 'Algorithms', 'Cloud Systems'], resumeUrl: 'https://campuspath.edu/resumes/2021CS0104.pdf', status: 'Active', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80' },
  { id: 'stud-5', rollNumber: '2021CS0105', name: 'Rohan Iyer', email: 'rohan.iyer@student.campuspath.edu', phone: '+91 98765 43214', department: 'Computer Science & Engineering', cgpa: 8.64, backlogs: 0, batchYear: 2025, gender: 'Male', skills: ['TypeScript', 'Next.js', 'GraphQL'], resumeUrl: 'https://campuspath.edu/resumes/2021CS0105.pdf', status: 'Active', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80' },
  { id: 'stud-6', rollNumber: '2021CS0106', name: 'Neha Gupta', email: 'neha.gupta@student.campuspath.edu', phone: '+91 98765 43215', department: 'Computer Science & Engineering', cgpa: 8.32, backlogs: 0, batchYear: 2025, gender: 'Female', skills: ['Data Engineering', 'Spark', 'SQL'], resumeUrl: 'https://campuspath.edu/resumes/2021CS0106.pdf', status: 'Active', avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&auto=format&fit=crop&q=80' },
  // Students 7-10 are unplaced in CSE
  { id: 'stud-7', rollNumber: '2021CS0107', name: 'Arjun Varma', email: 'arjun.varma@student.campuspath.edu', phone: '+91 98765 43216', department: 'Computer Science & Engineering', cgpa: 8.70, backlogs: 0, batchYear: 2025, gender: 'Male', skills: ['Embedded C', 'RTOS', 'Rust'], resumeUrl: 'https://campuspath.edu/resumes/2021CS0107.pdf', status: 'Active', avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80' },
  { id: 'stud-8', rollNumber: '2021CS0108', name: 'Sneha Kulkarni', email: 'sneha.kulkarni@student.campuspath.edu', phone: '+91 98765 43217', department: 'Computer Science & Engineering', cgpa: 7.45, backlogs: 0, batchYear: 2025, gender: 'Female', skills: ['Java', 'SQL', 'Testing'], resumeUrl: 'https://campuspath.edu/resumes/2021CS0108.pdf', status: 'Active', avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80' },
  { id: 'stud-9', rollNumber: '2021CS0109', name: 'Vikram Joshi', email: 'vikram.joshi@student.campuspath.edu', phone: '+91 98765 43218', department: 'Computer Science & Engineering', cgpa: 7.10, backlogs: 0, batchYear: 2025, gender: 'Male', skills: ['Python', 'Django', 'PostgreSQL'], resumeUrl: 'https://campuspath.edu/resumes/2021CS0109.pdf', status: 'Active', avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80' },
  { id: 'stud-10', rollNumber: '2021CS0110', name: 'Meera Nambiar', email: 'meera.nambiar@student.campuspath.edu', phone: '+91 98765 43219', department: 'Computer Science & Engineering', cgpa: 6.95, backlogs: 0, batchYear: 2025, gender: 'Female', skills: ['HTML', 'CSS', 'JavaScript'], resumeUrl: 'https://campuspath.edu/resumes/2021CS0110.pdf', status: 'Active', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80' },
];

// Additional ECE & IT students for full college directory (22 more = 32 total)
const OTHER_STUDENTS = [
  { id: 'stud-11', rollNumber: '2021EC0201', name: 'Pooja Hegde', email: 'pooja.hegde@student.campuspath.edu', phone: '+91 98765 43220', department: 'Electronics & Communication Engineering', cgpa: 8.85, backlogs: 0, batchYear: 2025, gender: 'Female', skills: ['VLSI', 'Verilog', 'MATLAB'], resumeUrl: 'https://campuspath.edu/resumes/2021EC0201.pdf', status: 'Active', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80' },
  { id: 'stud-12', rollNumber: '2021EC0202', name: 'Aditya Rao', email: 'aditya.rao@student.campuspath.edu', phone: '+91 98765 43221', department: 'Electronics & Communication Engineering', cgpa: 8.40, backlogs: 0, batchYear: 2025, gender: 'Male', skills: ['Embedded C', 'IoT', 'Arduino'], resumeUrl: 'https://campuspath.edu/resumes/2021EC0202.pdf', status: 'Active', avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80' },
  { id: 'stud-13', rollNumber: '2021EC0203', name: 'Tanvi Shah', email: 'tanvi.shah@student.campuspath.edu', phone: '+91 98765 43222', department: 'Electronics & Communication Engineering', cgpa: 7.90, backlogs: 0, batchYear: 2025, gender: 'Female', skills: ['DSP', 'Signal Processing'], resumeUrl: 'https://campuspath.edu/resumes/2021EC0203.pdf', status: 'Active', avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80' },
  { id: 'stud-14', rollNumber: '2021EC0204', name: 'Varun Nair', email: 'varun.nair@student.campuspath.edu', phone: '+91 98765 43223', department: 'Electronics & Communication Engineering', cgpa: 7.60, backlogs: 1, batchYear: 2025, gender: 'Male', skills: ['PCB Design', 'MATLAB'], resumeUrl: 'https://campuspath.edu/resumes/2021EC0204.pdf', status: 'Active', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80' },
  { id: 'stud-15', rollNumber: '2021EC0205', name: 'Isha Reddy', email: 'isha.reddy@student.campuspath.edu', phone: '+91 98765 43224', department: 'Electronics & Communication Engineering', cgpa: 9.02, backlogs: 0, batchYear: 2025, gender: 'Female', skills: ['Verilog', 'FPGA', 'Python'], resumeUrl: 'https://campuspath.edu/resumes/2021EC0205.pdf', status: 'Active', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80' },
  { id: 'stud-16', rollNumber: '2021IT0301', name: 'Nikhil Roy', email: 'nikhil.roy@student.campuspath.edu', phone: '+91 98765 43225', department: 'Information Technology', cgpa: 8.75, backlogs: 0, batchYear: 2025, gender: 'Male', skills: ['Cloud', 'DevOps', 'Terraform'], resumeUrl: 'https://campuspath.edu/resumes/2021IT0301.pdf', status: 'Active', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80' },
  { id: 'stud-17', rollNumber: '2021IT0302', name: 'Priya Sen', email: 'priya.sen@student.campuspath.edu', phone: '+91 98765 43226', department: 'Information Technology', cgpa: 8.50, backlogs: 0, batchYear: 2025, gender: 'Female', skills: ['Cybersecurity', 'Ethical Hacking'], resumeUrl: 'https://campuspath.edu/resumes/2021IT0302.pdf', status: 'Active', avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80' },
  { id: 'stud-18', rollNumber: '2021IT0303', name: 'Siddharth Bose', email: 'siddharth.bose@student.campuspath.edu', phone: '+91 98765 43227', department: 'Information Technology', cgpa: 7.95, backlogs: 0, batchYear: 2025, gender: 'Male', skills: ['Full Stack', 'MERN'], resumeUrl: 'https://campuspath.edu/resumes/2021IT0303.pdf', status: 'Active', avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80' },
  { id: 'stud-19', rollNumber: '2021IT0304', name: 'Kavya Menon', email: 'kavya.menon@student.campuspath.edu', phone: '+91 98765 43228', department: 'Information Technology', cgpa: 8.20, backlogs: 0, batchYear: 2025, gender: 'Female', skills: ['Python', 'Data Analytics'], resumeUrl: 'https://campuspath.edu/resumes/2021IT0304.pdf', status: 'Active', avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&auto=format&fit=crop&q=80' },
  { id: 'stud-20', rollNumber: '2021IT0305', name: 'Deepak Verma', email: 'deepak.verma@student.campuspath.edu', phone: '+91 98765 43229', department: 'Information Technology', cgpa: 7.30, backlogs: 0, batchYear: 2025, gender: 'Male', skills: ['Java', 'SQL'], resumeUrl: 'https://campuspath.edu/resumes/2021IT0305.pdf', status: 'Active', avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80' },
  { id: 'stud-21', rollNumber: '2021EC0206', name: 'Anik Dutta', email: 'anik.dutta@student.campuspath.edu', phone: '+91 98765 43230', department: 'Electronics & Communication Engineering', cgpa: 8.10, backlogs: 0, batchYear: 2025, gender: 'Male', skills: ['VLSI', 'SystemVerilog'], resumeUrl: 'https://campuspath.edu/resumes/2021EC0206.pdf', status: 'Active', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80' },
  { id: 'stud-22', rollNumber: '2021EC0207', name: 'Simran Kaur', email: 'simran.kaur@student.campuspath.edu', phone: '+91 98765 43231', department: 'Electronics & Communication Engineering', cgpa: 8.65, backlogs: 0, batchYear: 2025, gender: 'Female', skills: ['Embedded Linux', 'C++'], resumeUrl: 'https://campuspath.edu/resumes/2021EC0207.pdf', status: 'Active', avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80' },
  { id: 'stud-23', rollNumber: '2021EC0208', name: 'Manish Tiwari', email: 'manish.tiwari@student.campuspath.edu', phone: '+91 98765 43232', department: 'Electronics & Communication Engineering', cgpa: 7.70, backlogs: 0, batchYear: 2025, gender: 'Male', skills: ['ARM', 'Microcontrollers'], resumeUrl: 'https://campuspath.edu/resumes/2021EC0208.pdf', status: 'Active', avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80' },
  { id: 'stud-24', rollNumber: '2021EC0209', name: 'Swati Rathi', email: 'swati.rathi@student.campuspath.edu', phone: '+91 98765 43233', department: 'Electronics & Communication Engineering', cgpa: 8.45, backlogs: 0, batchYear: 2025, gender: 'Female', skills: ['RF Design', 'MATLAB'], resumeUrl: 'https://campuspath.edu/resumes/2021EC0209.pdf', status: 'Active', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80' },
  { id: 'stud-25', rollNumber: '2021EC0210', name: 'Gaurav Gill', email: 'gaurav.gill@student.campuspath.edu', phone: '+91 98765 43234', department: 'Electronics & Communication Engineering', cgpa: 7.20, backlogs: 0, batchYear: 2025, gender: 'Male', skills: ['Telecom', '5G Networks'], resumeUrl: 'https://campuspath.edu/resumes/2021EC0210.pdf', status: 'Active', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80' },
  { id: 'stud-26', rollNumber: '2021IT0306', name: 'Ritu Agarwal', email: 'ritu.agarwal@student.campuspath.edu', phone: '+91 98765 43235', department: 'Information Technology', cgpa: 8.90, backlogs: 0, batchYear: 2025, gender: 'Female', skills: ['React', 'AWS', 'Node.js'], resumeUrl: 'https://campuspath.edu/resumes/2021IT0306.pdf', status: 'Active', avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80' },
  { id: 'stud-27', rollNumber: '2021IT0307', name: 'Sameer Pandey', email: 'sameer.pandey@student.campuspath.edu', phone: '+91 98765 43236', department: 'Information Technology', cgpa: 8.15, backlogs: 0, batchYear: 2025, gender: 'Male', skills: ['Kubernetes', 'Docker', 'Go'], resumeUrl: 'https://campuspath.edu/resumes/2021IT0307.pdf', status: 'Active', avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80' },
  { id: 'stud-28', rollNumber: '2021IT0308', name: 'Divya Bhat', email: 'divya.bhat@student.campuspath.edu', phone: '+91 98765 43237', department: 'Information Technology', cgpa: 7.80, backlogs: 0, batchYear: 2025, gender: 'Female', skills: ['UI/UX', 'Figma', 'React'], resumeUrl: 'https://campuspath.edu/resumes/2021IT0308.pdf', status: 'Active', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80' },
  { id: 'stud-29', rollNumber: '2021IT0309', name: 'Farhan Ali', email: 'farhan.ali@student.campuspath.edu', phone: '+91 98765 43238', department: 'Information Technology', cgpa: 8.35, backlogs: 0, batchYear: 2025, gender: 'Male', skills: ['Data Pipelines', 'Snowflake'], resumeUrl: 'https://campuspath.edu/resumes/2021IT0309.pdf', status: 'Active', avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80' },
  { id: 'stud-30', rollNumber: '2021IT0310', name: 'Akanksha Jain', email: 'akanksha.jain@student.campuspath.edu', phone: '+91 98765 43239', department: 'Information Technology', cgpa: 7.55, backlogs: 0, batchYear: 2025, gender: 'Female', skills: ['Software QA', 'Selenium'], resumeUrl: 'https://campuspath.edu/resumes/2021IT0310.pdf', status: 'Active', avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80' },
  { id: 'stud-31', rollNumber: '2021EC0211', name: 'Harsh Vardhan', email: 'harsh.v@student.campuspath.edu', phone: '+91 98765 43240', department: 'Electronics & Communication Engineering', cgpa: 7.95, backlogs: 0, batchYear: 2025, gender: 'Male', skills: ['Robotics', 'ROS', 'Python'], resumeUrl: 'https://campuspath.edu/resumes/2021EC0211.pdf', status: 'Active', avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80' },
  { id: 'stud-32', rollNumber: '2021IT0311', name: 'Shreya Ghosh', email: 'shreya.ghosh@student.campuspath.edu', phone: '+91 98765 43241', department: 'Information Technology', cgpa: 8.60, backlogs: 0, batchYear: 2025, gender: 'Female', skills: ['Big Data', 'Hadoop', 'PySpark'], resumeUrl: 'https://campuspath.edu/resumes/2021IT0311.pdf', status: 'Active', avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&auto=format&fit=crop&q=80' },
];

export const ALL_INITIAL_STUDENTS = [...CSE_STUDENTS, ...OTHER_STUDENTS];

// Recruitment Drives
export const INITIAL_DRIVES = [
  {
    id: 'drive-google',
    companyName: 'Google Cloud India',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
    role: 'Cloud Solutions Engineer',
    tier: 'Super Dream',
    packageCtc: 24.0,
    stipend: '₹1,10,000/mo',
    minCgpa: 8.5,
    maxBacklogs: 0,
    eligibleDepartments: ['Computer Science & Engineering', 'Information Technology'],
    driveDate: '2025-05-15',
    deadline: '2025-05-10',
    location: 'Bangalore / Hyderabad',
    status: 'Active',
    rounds: ['Online Coding', 'Technical Round 1', 'Technical Round 2', 'Googliness & Leadership'],
    description: 'Build enterprise-grade distributed systems and scalable multi-tenant cloud backends.',
    jobType: 'Full-time',
  },
  {
    id: 'drive-msft',
    companyName: 'Microsoft Corporation',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg',
    role: 'Software Engineer (Azure Core)',
    tier: 'Super Dream',
    packageCtc: 22.0,
    stipend: '₹95,000/mo',
    minCgpa: 8.0,
    maxBacklogs: 0,
    eligibleDepartments: ['Computer Science & Engineering', 'Electronics & Communication Engineering', 'Information Technology'],
    driveDate: '2025-05-20',
    deadline: '2025-05-12',
    location: 'Hyderabad / Noida',
    status: 'Active',
    rounds: ['Codility Assessment', 'Data Structures & Algo', 'System Design', 'Behavioral HR'],
    description: 'Work on hyper-scale Azure infrastructure, hypervisors, and storage primitives.',
    jobType: 'Full-time',
  },
  {
    id: 'drive-amazon',
    companyName: 'Amazon Web Services (AWS)',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg',
    role: 'Software Development Engineer - I',
    tier: 'Super Dream',
    packageCtc: 21.0,
    stipend: '₹90,000/mo',
    minCgpa: 7.5,
    maxBacklogs: 0,
    eligibleDepartments: ['Computer Science & Engineering', 'Information Technology'],
    driveDate: '2025-05-22',
    deadline: '2025-05-14',
    location: 'Bangalore / Chennai',
    status: 'Active',
    rounds: ['OA Part 1 & 2', 'Technical Interview 1', 'Bar Raiser', 'Hiring Manager'],
    description: 'Develop highly available customer-facing cloud APIs with ultra-low latency guarantees.',
    jobType: 'Full-time',
  },
  {
    id: 'drive-cisco',
    companyName: 'Cisco Systems',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg',
    role: 'Network Software Engineer',
    tier: 'Dream',
    packageCtc: 17.5,
    stipend: '₹65,000/mo',
    minCgpa: 7.0,
    maxBacklogs: 0,
    eligibleDepartments: ['Computer Science & Engineering', 'Electronics & Communication Engineering', 'Information Technology'],
    driveDate: '2025-05-25',
    deadline: '2025-05-18',
    location: 'Bangalore / Hybrid',
    status: 'Active',
    rounds: ['Aptitude + Tech Quiz', 'Technical Coding', 'Managerial Interview', 'HR Round'],
    description: 'Design next-generation SDN controllers, telemetry tools, and zero-trust routers.',
    jobType: 'Full-time',
  },
  {
    id: 'drive-infosys',
    companyName: 'Infosys Finacle',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg',
    role: 'Specialist Programmer (Finacle)',
    tier: 'Core',
    packageCtc: 9.5,
    stipend: '₹35,000/mo',
    minCgpa: 6.5,
    maxBacklogs: 1,
    eligibleDepartments: ['Computer Science & Engineering', 'Electronics & Communication Engineering', 'Information Technology'],
    driveDate: '2025-05-28',
    deadline: '2025-05-20',
    location: 'Pune / Mysore',
    status: 'Active',
    rounds: ['HackWithInfy Qualifier', 'Technical Round', 'HR Interview'],
    description: 'Develop core enterprise banking platforms and distributed transactional engines.',
    jobType: 'Full-time',
  },
  // Cancelled Drive for Worked Example 3:
  {
    id: 'drive-intel',
    companyName: 'Intel Hardware Systems',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7d/Intel_logo_%282020%29.svg',
    role: 'Silicon Validation Engineer',
    tier: 'Dream',
    packageCtc: 16.0,
    stipend: '₹60,000/mo',
    minCgpa: 8.0,
    maxBacklogs: 0,
    eligibleDepartments: ['Computer Science & Engineering', 'Electronics & Communication Engineering'],
    driveDate: '2025-04-10',
    deadline: '2025-04-05',
    location: 'Bangalore',
    status: 'Cancelled', // CANCELLED DRIVE
    rounds: ['Digital Electronics Test', 'Technical Panel', 'HR'],
    description: 'Pre-silicon architecture modeling and FPGA emulation.',
    jobType: 'Full-time',
  },
];

// Applications satisfying Worked Example 1 & 3:
// CSE has 10 eligible students. 6 unique students placed holding 8 offers:
// stud-1 (2 offers: Google Cloud 24 LPA, Microsoft 22 LPA)
// stud-2 (2 offers: AWS 21 LPA, Cisco 17.5 LPA)
// stud-3 (1 offer: Infosys 9.5 LPA)
// stud-4 (1 offer: Microsoft 22 LPA)
// stud-5 (1 offer: Google Cloud 24 LPA)
// stud-6 (1 offer: Cisco 17.5 LPA)
// stud-7 has 'Selected' in drive-intel (Cancelled) -> counts as UNPLACED
// stud-8, stud-9, stud-10: Registered/Interview/Rejected -> UNPLACED
export const INITIAL_APPLICATIONS = [
  // stud-1 offers:
  { id: 'app-1', studentId: 'stud-1', driveId: 'drive-google', appliedAt: '2025-04-01T10:00:00Z', status: 'Offer Received', currentRound: 'Offer Received', offerCtc: 24.0, notes: 'Super Dream Offer Letter issued', updatedAt: '2025-04-15T14:30:00Z' },
  { id: 'app-2', studentId: 'stud-1', driveId: 'drive-msft', appliedAt: '2025-04-02T10:00:00Z', status: 'Selected', currentRound: 'Selected', offerCtc: 22.0, notes: 'Dual offer cleared', updatedAt: '2025-04-18T16:00:00Z' },

  // stud-2 offers:
  { id: 'app-3', studentId: 'stud-2', driveId: 'drive-amazon', appliedAt: '2025-04-01T11:00:00Z', status: 'Offer Received', currentRound: 'Offer Received', offerCtc: 21.0, notes: 'AWS SDE-I offer extended', updatedAt: '2025-04-16T11:00:00Z' },
  { id: 'app-4', studentId: 'stud-2', driveId: 'drive-cisco', appliedAt: '2025-04-03T09:30:00Z', status: 'Joined', currentRound: 'Joined', offerCtc: 17.5, notes: 'Pre-placement onboarding accepted', updatedAt: '2025-04-20T10:00:00Z' },

  // stud-3 offer:
  { id: 'app-5', studentId: 'stud-3', driveId: 'drive-infosys', appliedAt: '2025-04-05T10:00:00Z', status: 'Offer Received', currentRound: 'Offer Received', offerCtc: 9.5, notes: 'Finacle Specialist Programmer', updatedAt: '2025-04-22T15:00:00Z' },

  // stud-4 offer:
  { id: 'app-6', studentId: 'stud-4', driveId: 'drive-msft', appliedAt: '2025-04-02T12:00:00Z', status: 'Joined', currentRound: 'Joined', offerCtc: 22.0, notes: 'Accepted Redmond / Bangalore position', updatedAt: '2025-04-19T14:00:00Z' },

  // stud-5 offer:
  { id: 'app-7', studentId: 'stud-5', driveId: 'drive-google', appliedAt: '2025-04-01T14:00:00Z', status: 'Selected', currentRound: 'Selected', offerCtc: 24.0, notes: 'Cleared final Google committee review', updatedAt: '2025-04-17T17:00:00Z' },

  // stud-6 offer:
  { id: 'app-8', studentId: 'stud-6', driveId: 'drive-cisco', appliedAt: '2025-04-04T10:00:00Z', status: 'Offer Received', currentRound: 'Offer Received', offerCtc: 17.5, notes: 'Core SDN team placement', updatedAt: '2025-04-21T11:30:00Z' },

  // stud-7 in CANCELLED DRIVE (Worked Example 3: counts as UNPLACED):
  { id: 'app-9', studentId: 'stud-7', driveId: 'drive-intel', appliedAt: '2025-04-05T09:00:00Z', status: 'Selected', currentRound: 'Selected', offerCtc: 16.0, notes: 'Selected but Drive Cancelled by recruiter', updatedAt: '2025-04-11T12:00:00Z' },

  // stud-8 unplaced applications:
  { id: 'app-10', studentId: 'stud-8', driveId: 'drive-infosys', appliedAt: '2025-04-06T10:00:00Z', status: 'Interview', currentRound: 'Technical Round', notes: 'Scheduled for round 2', updatedAt: '2025-04-12T10:00:00Z' },

  // stud-9 unplaced applications:
  { id: 'app-11', studentId: 'stud-9', driveId: 'drive-cisco', appliedAt: '2025-04-06T11:00:00Z', status: 'Rejected', currentRound: 'Online Coding', notes: 'Cutoff not reached', updatedAt: '2025-04-13T10:00:00Z' },

  // stud-10 unplaced applications:
  { id: 'app-12', studentId: 'stud-10', driveId: 'drive-infosys', appliedAt: '2025-04-07T10:00:00Z', status: 'Registered', currentRound: 'Registered', notes: 'Application under review', updatedAt: '2025-04-07T10:00:00Z' },

  // ECE students:
  { id: 'app-13', studentId: 'stud-11', driveId: 'drive-msft', appliedAt: '2025-04-02T15:00:00Z', status: 'Offer Received', currentRound: 'Offer Received', offerCtc: 22.0, notes: 'ECE dual placement', updatedAt: '2025-04-19T11:00:00Z' },
  { id: 'app-14', studentId: 'stud-12', driveId: 'drive-cisco', appliedAt: '2025-04-04T12:00:00Z', status: 'Offer Received', currentRound: 'Offer Received', offerCtc: 17.5, notes: 'Hardware protocols', updatedAt: '2025-04-20T16:00:00Z' },
  { id: 'app-15', studentId: 'stud-15', driveId: 'drive-cisco', appliedAt: '2025-04-04T13:00:00Z', status: 'Joined', currentRound: 'Joined', offerCtc: 17.5, notes: 'Silicon architecture', updatedAt: '2025-04-21T09:00:00Z' },

  // IT students:
  { id: 'app-16', studentId: 'stud-16', driveId: 'drive-google', appliedAt: '2025-04-01T16:00:00Z', status: 'Offer Received', currentRound: 'Offer Received', offerCtc: 24.0, notes: 'SRE Cloud', updatedAt: '2025-04-18T10:00:00Z' },
  { id: 'app-17', studentId: 'stud-17', driveId: 'drive-amazon', appliedAt: '2025-04-02T10:00:00Z', status: 'Joined', currentRound: 'Joined', offerCtc: 21.0, notes: 'Security engineering', updatedAt: '2025-04-20T14:00:00Z' },
];

// Initial Application History Audit Trail
export const INITIAL_APPLICATION_HISTORY = [
  { id: 'aph-1', applicationId: 'app-1', studentId: 'stud-1', driveId: 'drive-google', companyName: 'Google Cloud India', role: 'Cloud Solutions Engineer', oldStatus: 'Interview', newStatus: 'Offer Received', offerCtc: 24.0, changedBy: 'Director, TPO', changedAt: '2025-04-15T14:30:00Z', notes: 'Approved package 24 LPA' },
  { id: 'aph-2', applicationId: 'app-2', studentId: 'stud-1', driveId: 'drive-msft', companyName: 'Microsoft Corporation', role: 'Software Engineer', oldStatus: 'Interview', newStatus: 'Selected', offerCtc: 22.0, changedBy: 'Director, TPO', changedAt: '2025-04-18T16:00:00Z', notes: 'Cleared final selection' },
  { id: 'aph-3', applicationId: 'app-3', studentId: 'stud-2', driveId: 'drive-amazon', companyName: 'Amazon Web Services (AWS)', role: 'SDE - I', oldStatus: 'Assessment', newStatus: 'Offer Received', offerCtc: 21.0, changedBy: 'TPO Placement Cell', changedAt: '2025-04-16T11:00:00Z', notes: 'Offer letter dispatched' },
  { id: 'aph-4', applicationId: 'app-4', studentId: 'stud-2', driveId: 'drive-cisco', companyName: 'Cisco Systems', role: 'Network Software Engineer', oldStatus: 'Offer Received', newStatus: 'Joined', offerCtc: 17.5, changedBy: 'Director, TPO', changedAt: '2025-04-20T10:00:00Z', notes: 'Candidate submitted letter of acceptance' },
  { id: 'aph-5', applicationId: 'app-5', studentId: 'stud-3', driveId: 'drive-infosys', companyName: 'Infosys Finacle', role: 'Specialist Programmer', oldStatus: 'Interview', newStatus: 'Offer Received', offerCtc: 9.5, changedBy: 'TPO Placement Cell', changedAt: '2025-04-22T15:00:00Z', notes: 'Selected via HackWithInfy' },
  { id: 'aph-6', applicationId: 'app-6', studentId: 'stud-4', driveId: 'drive-msft', companyName: 'Microsoft Corporation', role: 'Software Engineer', oldStatus: 'Offer Received', newStatus: 'Joined', offerCtc: 22.0, changedBy: 'Director, TPO', changedAt: '2025-04-19T14:00:00Z', notes: 'Joining formalities completed' },
  { id: 'aph-7', applicationId: 'app-7', studentId: 'stud-5', driveId: 'drive-google', companyName: 'Google Cloud India', role: 'Cloud Solutions Engineer', oldStatus: 'Interview', newStatus: 'Selected', offerCtc: 24.0, changedBy: 'Director, TPO', changedAt: '2025-04-17T17:00:00Z', notes: 'Selected for Cloud team' },
  { id: 'aph-8', applicationId: 'app-8', studentId: 'stud-6', driveId: 'drive-cisco', companyName: 'Cisco Systems', role: 'Network Software Engineer', oldStatus: 'Interview', newStatus: 'Offer Received', offerCtc: 17.5, changedBy: 'TPO Placement Cell', changedAt: '2025-04-21T11:30:00Z', notes: 'Offer confirmed' },
  { id: 'aph-9', applicationId: 'app-9', studentId: 'stud-7', driveId: 'drive-intel', companyName: 'Intel Hardware Systems', role: 'Silicon Validation Engineer', oldStatus: 'Interview', newStatus: 'Selected', offerCtc: 16.0, changedBy: 'Corporate Relations', changedAt: '2025-04-11T12:00:00Z', notes: 'Drive subsequently Cancelled' },
];

// Initial No-Dues Clearances
// Worked Example 2:
// Student stud-2 (Diya Patel) has 5 mandatory categories: 4 Cleared and 1 Pending!
// Status: "Incomplete" with blocking item "Central Library"!
export function generateInitialNoDuesMap(students) {
  const map = {};

  students.forEach((student) => {
    // Default: Cleared across board for fully cleared students
    const isExampleStudent = student.id === 'stud-2'; // Worked Example 2
    const isUnplacedPendingStudent = student.id === 'stud-8'; // Another student with pending dues

    map[student.id] = {
      library: {
        category: 'library',
        categoryLabel: 'Central Library',
        departmentInCharge: 'Library Directorate',
        status: isExampleStudent
          ? 'Pending' // WORKED EXAMPLE 2: Blocking item!
          : isUnplacedPendingStudent
          ? 'Action Required'
          : 'Cleared',
        remarks: isExampleStudent
          ? '1 Library book unreturned: Discrete Mathematics (7th Ed.)'
          : isUnplacedPendingStudent
          ? 'Accrued late book return fine of ₹250'
          : 'All books returned. Zero dues in circulation registry.',
        pendingAmount: isUnplacedPendingStudent ? 250 : 0,
        updatedAt: new Date().toISOString(),
        clearedBy: isExampleStudent ? undefined : 'Dr. A. K. Shastri (Librarian)',
      },
      laboratory: {
        category: 'laboratory',
        categoryLabel: 'Department Laboratories',
        departmentInCharge: 'Central Lab Cell',
        status: 'Cleared',
        remarks: 'Apparatus & high-performance computing credentials returned.',
        pendingAmount: 0,
        updatedAt: new Date().toISOString(),
        clearedBy: 'Prof. S. R. Venkat (Lab In-Charge)',
      },
      department: {
        category: 'department',
        categoryLabel: 'Academic Department',
        departmentInCharge: student.department,
        status: 'Cleared',
        remarks: 'Final project capstone report submitted and approved by HOD.',
        pendingAmount: 0,
        updatedAt: new Date().toISOString(),
        clearedBy: 'Head of Department',
      },
      placement: {
        category: 'placement',
        categoryLabel: 'Placement Cell',
        departmentInCharge: 'Training & Placement Office',
        status: 'Cleared',
        remarks: 'Offer letter duplicate submitted and placement survey completed.',
        pendingAmount: 0,
        updatedAt: new Date().toISOString(),
        clearedBy: 'Director, TPO',
      },
      accounts: {
        category: 'accounts',
        categoryLabel: 'Accounts & Finance',
        departmentInCharge: 'Bursar & Finance Office',
        status: 'Cleared',
        remarks: 'All 8 semesters tuition fee paid in full.',
        pendingAmount: 0,
        updatedAt: new Date().toISOString(),
        clearedBy: 'Chief Accounts Officer',
      },
      hostel: {
        category: 'hostel',
        categoryLabel: 'Hostel & Residence',
        departmentInCharge: 'Chief Warden Office',
        status: 'Not Applicable',
        remarks: 'Day scholar student. Not registered for on-campus hostel.',
        pendingAmount: 0,
        updatedAt: new Date().toISOString(),
        clearedBy: 'Warden Office',
      },
    };
  });

  return map;
}

class RelationalDatabaseStore {
  constructor() {
    this.students = [...ALL_INITIAL_STUDENTS];
    this.drives = [...INITIAL_DRIVES];
    this.applications = [...INITIAL_APPLICATIONS];
    this.applicationHistory = [...INITIAL_APPLICATION_HISTORY];
    this.noDuesCategories = [...NO_DUES_CATEGORIES];
    this.noDues = generateInitialNoDuesMap(this.students);
    this.payments = [];
    this.auditLogs = [];
    this.load();
  }

  load() {
    try {
      if (fs.existsSync(DATA_FILE)) {
        const raw = fs.readFileSync(DATA_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        if (parsed.students && Array.isArray(parsed.students) && parsed.students.length > 0) {
          this.students = parsed.students;
        }
        if (parsed.drives && Array.isArray(parsed.drives)) {
          this.drives = parsed.drives;
        }
        if (parsed.applications && Array.isArray(parsed.applications)) {
          this.applications = parsed.applications;
        }
        if (parsed.applicationHistory && Array.isArray(parsed.applicationHistory)) {
          this.applicationHistory = parsed.applicationHistory;
        }
        if (parsed.noDues && typeof parsed.noDues === 'object') {
          this.noDues = parsed.noDues;
        }
        if (parsed.payments && Array.isArray(parsed.payments)) {
          this.payments = parsed.payments;
        }
        if (parsed.auditLogs && Array.isArray(parsed.auditLogs)) {
          this.auditLogs = parsed.auditLogs;
        }
      } else {
        this.save();
      }
    } catch (err) {
      console.warn('[RelationalStore] Using memory fallback:', err.message);
    }
  }

  save() {
    try {
      const data = {
        students: this.students,
        drives: this.drives,
        applications: this.applications,
        applicationHistory: this.applicationHistory,
        noDuesCategories: this.noDuesCategories,
        noDues: this.noDues,
        payments: this.payments,
        auditLogs: this.auditLogs,
      };
      fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      console.error('[RelationalStore] Save failed:', err.message);
    }
  }

  // -------------------------------------------------------------
  // STUDENTS CRUD & CSV IMPORT
  // -------------------------------------------------------------
  getAllStudents() {
    return this.students;
  }

  getStudentById(id) {
    return this.students.find((s) => s.id === id);
  }

  getStudentByRoll(rollNumber) {
    return this.students.find((s) => s.rollNumber.toLowerCase() === rollNumber.toLowerCase());
  }

  addStudent(studentData) {
    const id = `stud-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    const student = { ...studentData, id };
    this.students.push(student);

    // Initialize no dues record for new student
    this.noDues[id] = {
      library: { category: 'library', categoryLabel: 'Central Library', departmentInCharge: 'Library Directorate', status: 'Pending', remarks: 'New student enrolled', pendingAmount: 0, updatedAt: new Date().toISOString() },
      laboratory: { category: 'laboratory', categoryLabel: 'Department Laboratories', departmentInCharge: 'Central Lab Cell', status: 'Pending', remarks: 'New student enrolled', pendingAmount: 0, updatedAt: new Date().toISOString() },
      department: { category: 'department', categoryLabel: 'Academic Department', departmentInCharge: student.department, status: 'Pending', remarks: 'New student enrolled', pendingAmount: 0, updatedAt: new Date().toISOString() },
      placement: { category: 'placement', categoryLabel: 'Placement Cell', departmentInCharge: 'Training & Placement Office', status: 'Pending', remarks: 'New student enrolled', pendingAmount: 0, updatedAt: new Date().toISOString() },
      accounts: { category: 'accounts', categoryLabel: 'Accounts & Finance', departmentInCharge: 'Bursar & Finance Office', status: 'Pending', remarks: 'New student enrolled', pendingAmount: 0, updatedAt: new Date().toISOString() },
      hostel: { category: 'hostel', categoryLabel: 'Hostel & Residence', departmentInCharge: 'Chief Warden Office', status: 'Not Applicable', remarks: 'Day scholar', pendingAmount: 0, updatedAt: new Date().toISOString() },
    };

    this.addAuditLog('STUDENT_CREATED', `Created student profile ${student.name} (${student.rollNumber})`, 'Placement In-Charge');
    this.save();
    return student;
  }

  updateStudent(id, updates) {
    const idx = this.students.findIndex((s) => s.id === id);
    if (idx !== -1) {
      this.students[idx] = { ...this.students[idx], ...updates };
      this.addAuditLog('STUDENT_UPDATED', `Updated student ${this.students[idx].name} (${this.students[idx].rollNumber})`, 'Placement In-Charge');
      this.save();
      return this.students[idx];
    }
    return null;
  }

  deleteStudent(id) {
    const idx = this.students.findIndex((s) => s.id === id);
    if (idx !== -1) {
      const removed = this.students.splice(idx, 1)[0];
      delete this.noDues[id];
      // Clean applications
      this.applications = this.applications.filter((a) => a.studentId !== id);
      this.addAuditLog('STUDENT_DELETED', `Deleted student ${removed.name} (${removed.rollNumber})`, 'Placement In-Charge');
      this.save();
      return true;
    }
    return false;
  }

  // STEP 1: CSV Import with Validation
  importStudentsCsv(rows) {
    const report = {
      totalProcessed: rows.length,
      imported: 0,
      skipped: 0,
      failed: 0,
      errors: [],
    };

    const validDepartments = [
      'Computer Science & Engineering',
      'Electronics & Communication Engineering',
      'Information Technology',
    ];

    const existingRolls = new Set(this.students.map((s) => s.rollNumber.toUpperCase()));
    const batchRolls = new Set();

    rows.forEach((row, index) => {
      const rowNum = index + 1;
      const rollNumber = (row.rollNumber || row['Roll Number'] || '').trim().toUpperCase();
      const name = (row.name || row['Name'] || '').trim();
      const email = (row.email || row['Email'] || '').trim();
      const department = (row.department || row['Department'] || '').trim();
      const cgpa = parseFloat(row.cgpa || row['CGPA'] || 0);
      const backlogs = parseInt(row.backlogs || row['Backlogs'] || 0, 10);
      const batchYear = parseInt(row.batchYear || row['Batch Year'] || row['Batch'] || 2025, 10);
      const phone = (row.phone || row['Phone'] || '+91 98765 00000').trim();

      // Validation 1: Roll number present & format
      if (!rollNumber) {
        report.failed += 1;
        report.errors.push({ row: rowNum, field: 'rollNumber', reason: 'Roll number cannot be empty.' });
        return;
      }
      if (!/^[0-9]{4}[A-Z]{2}[0-9]{4}$/.test(rollNumber)) {
        report.failed += 1;
        report.errors.push({ row: rowNum, rollNumber, field: 'rollNumber', reason: `Invalid roll number format: ${rollNumber}. Expected pattern: YYYYDDNNNN (e.g. 2021CS0199).` });
        return;
      }

      // Validation 2: Duplicate check in existing DB
      if (existingRolls.has(rollNumber)) {
        report.skipped += 1;
        report.errors.push({ row: rowNum, rollNumber, field: 'rollNumber', reason: `Duplicate roll number already exists in central registry: ${rollNumber}.` });
        return;
      }

      // Validation 3: Duplicate within current batch
      if (batchRolls.has(rollNumber)) {
        report.skipped += 1;
        report.errors.push({ row: rowNum, rollNumber, field: 'rollNumber', reason: `Duplicate roll number repeated inside uploaded file: ${rollNumber}.` });
        return;
      }

      // Validation 4: Name present
      if (!name) {
        report.failed += 1;
        report.errors.push({ row: rowNum, rollNumber, field: 'name', reason: 'Student name is missing or blank.' });
        return;
      }

      // Validation 5: Department check
      if (!validDepartments.includes(department)) {
        report.failed += 1;
        report.errors.push({ row: rowNum, rollNumber, field: 'department', reason: `Invalid department: "${department}". Allowed: CSE, ECE, IT.` });
        return;
      }

      // Validation 6: CGPA check
      if (isNaN(cgpa) || cgpa < 0 || cgpa > 10) {
        report.failed += 1;
        report.errors.push({ row: rowNum, rollNumber, field: 'cgpa', reason: `CGPA ${cgpa} out of range [0.0 - 10.0].` });
        return;
      }

      // Validation 7: Batch Year check
      if (isNaN(batchYear) || batchYear < 2020 || batchYear > 2030) {
        report.failed += 1;
        report.errors.push({ row: rowNum, rollNumber, field: 'batchYear', reason: `Batch year ${batchYear} is invalid for active graduating cohort.` });
        return;
      }

      // Passed all checks!
      batchRolls.add(rollNumber);
      existingRolls.add(rollNumber);

      const newStudent = {
        id: `stud-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        rollNumber,
        name,
        email: email || `${rollNumber.toLowerCase()}@student.campuspath.edu`,
        phone,
        department,
        cgpa,
        backlogs,
        batchYear,
        gender: 'Male',
        skills: ['Software Engineering', 'Algorithms', 'Databases'],
        resumeUrl: `https://campuspath.edu/resumes/${rollNumber}.pdf`,
        status: 'Active',
        avatarUrl: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80`,
      };

      this.students.push(newStudent);

      // Initialize clearance
      this.noDues[newStudent.id] = {
        library: { category: 'library', categoryLabel: 'Central Library', departmentInCharge: 'Library Directorate', status: 'Pending', remarks: 'Fresh import batch audit pending', pendingAmount: 0, updatedAt: new Date().toISOString() },
        laboratory: { category: 'laboratory', categoryLabel: 'Department Laboratories', departmentInCharge: 'Central Lab Cell', status: 'Pending', remarks: 'Fresh import batch audit pending', pendingAmount: 0, updatedAt: new Date().toISOString() },
        department: { category: 'department', categoryLabel: 'Academic Department', departmentInCharge: department, status: 'Pending', remarks: 'Fresh import batch audit pending', pendingAmount: 0, updatedAt: new Date().toISOString() },
        placement: { category: 'placement', categoryLabel: 'Placement Cell', departmentInCharge: 'Training & Placement Office', status: 'Pending', remarks: 'Fresh import batch audit pending', pendingAmount: 0, updatedAt: new Date().toISOString() },
        accounts: { category: 'accounts', categoryLabel: 'Accounts & Finance', departmentInCharge: 'Bursar & Finance Office', status: 'Pending', remarks: 'Fresh import batch audit pending', pendingAmount: 0, updatedAt: new Date().toISOString() },
        hostel: { category: 'hostel', categoryLabel: 'Hostel & Residence', departmentInCharge: 'Chief Warden Office', status: 'Not Applicable', remarks: 'Day scholar', pendingAmount: 0, updatedAt: new Date().toISOString() },
      };

      report.imported += 1;
    });

    this.addAuditLog(
      'CSV_IMPORT_EXECUTED',
      `Imported ${report.imported} students. Skipped ${report.skipped}. Failed ${report.failed}.`,
      'Placement In-Charge'
    );

    this.save();
    return report;
  }

  // -------------------------------------------------------------
  // RECRUITMENT DRIVES CRUD
  // -------------------------------------------------------------
  getAllDrives() {
    return this.drives;
  }

  getDriveById(id) {
    return this.drives.find((d) => d.id === id);
  }

  addDrive(driveData) {
    const id = `drive-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    const drive = {
      ...driveData,
      id,
      status: driveData.status || 'Active',
      rounds: driveData.rounds || ['Online Assessment', 'Technical Interview', 'HR'],
    };
    this.drives.unshift(drive);
    this.addAuditLog('DRIVE_CREATED', `Created recruitment drive for ${drive.companyName} (${drive.role}) at ₹${drive.packageCtc} LPA`, 'Placement In-Charge');
    this.save();
    return drive;
  }

  updateDrive(id, updates) {
    const idx = this.drives.findIndex((d) => d.id === id);
    if (idx !== -1) {
      this.drives[idx] = { ...this.drives[idx], ...updates };
      this.addAuditLog('DRIVE_UPDATED', `Updated recruitment drive ${this.drives[idx].companyName}`, 'Placement In-Charge');
      this.save();
      return this.drives[idx];
    }
    return null;
  }

  cancelDrive(id, reason = 'Recruiter cancelled hiring drive') {
    const idx = this.drives.findIndex((d) => d.id === id);
    if (idx !== -1) {
      this.drives[idx].status = 'Cancelled';
      this.drives[idx].cancellationReason = reason;
      this.addAuditLog('DRIVE_CANCELLED', `Recruitment drive for ${this.drives[idx].companyName} was CANCELLED. All offers disqualified from placement metrics.`, 'Placement In-Charge');
      this.save();
      return this.drives[idx];
    }
    return null;
  }

  deleteDrive(id) {
    const idx = this.drives.findIndex((d) => d.id === id);
    if (idx !== -1) {
      const removed = this.drives.splice(idx, 1)[0];
      this.applications = this.applications.filter((a) => a.driveId !== id);
      this.addAuditLog('DRIVE_DELETED', `Deleted drive ${removed.companyName}`, 'Placement In-Charge');
      this.save();
      return true;
    }
    return false;
  }

  // -------------------------------------------------------------
  // STEP 3: BACKEND ELIGIBILITY & REGISTRATION
  // -------------------------------------------------------------
  registerForDrive(studentId, driveId, actor = 'Student Portal') {
    const student = this.getStudentById(studentId);
    if (!student) {
      throw new Error(`Student record not found for ID: ${studentId}`);
    }

    const drive = this.getDriveById(driveId);
    if (!drive) {
      throw new Error(`Recruitment drive not found for ID: ${driveId}`);
    }

    // 1. Check drive cancelled
    if (drive.status === 'Cancelled') {
      throw new Error(`Registration rejected: This recruitment drive has been cancelled.`);
    }

    // 2. Check deadline
    const today = new Date().toISOString().split('T')[0];
    if (drive.deadline < today) {
      throw new Error(`Registration rejected: The application deadline (${drive.deadline}) has passed.`);
    }

    // 3. Check department eligibility
    if (!drive.eligibleDepartments.includes(student.department)) {
      throw new Error(`Registration rejected: Department ${student.department} is not eligible for ${drive.companyName}.`);
    }

    // 4. Check CGPA
    if (student.cgpa < drive.minCgpa) {
      throw new Error(`Registration rejected: CGPA (${student.cgpa}) is below the required minimum (${drive.minCgpa}).`);
    }

    // 5. Check Backlogs
    if (student.backlogs > drive.maxBacklogs) {
      throw new Error(`Registration rejected: Backlogs (${student.backlogs}) exceed the maximum permitted (${drive.maxBacklogs}).`);
    }

    // 6. Check existing application
    const existing = this.applications.find((a) => a.studentId === studentId && a.driveId === driveId);
    if (existing) {
      return {
        application: existing,
        alreadyRegistered: true,
        message: 'You have already registered for this drive.',
      };
    }

    // Create Application
    const newApp = {
      id: `app-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      studentId,
      driveId,
      appliedAt: new Date().toISOString(),
      status: 'Registered',
      currentRound: 'Registered',
      notes: 'Registered successfully before deadline via portal',
      updatedAt: new Date().toISOString(),
    };

    this.applications.unshift(newApp);

    // Create Application History
    const historyEntry = {
      id: `aph-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      applicationId: newApp.id,
      studentId,
      driveId,
      companyName: drive.companyName,
      role: drive.role,
      oldStatus: 'None',
      newStatus: 'Registered',
      changedBy: actor,
      changedAt: new Date().toISOString(),
      notes: 'Candidate self-registered within deadline',
    };
    this.applicationHistory.unshift(historyEntry);

    this.addAuditLog('APPLICATION_REGISTERED', `${student.name} (${student.rollNumber}) registered for ${drive.companyName}`, actor);
    this.save();
    return { application: newApp, historyEntry, message: 'Registration confirmed!' };
  }

  // -------------------------------------------------------------
  // STEP 4: APPLICATION STAGE TRANSITIONS (SINGLE & BULK)
  // -------------------------------------------------------------
  updateApplicationStage(appId, newStatus, offerCtc = null, changedBy = 'Placement In-Charge', notes = '') {
    const app = this.applications.find((a) => a.id === appId);
    if (!app) {
      throw new Error(`Application record not found for ID: ${appId}`);
    }

    const drive = this.getDriveById(app.driveId);
    const oldStatus = app.status;

    app.status = newStatus;
    app.currentRound = newStatus;
    if (offerCtc !== null && offerCtc !== undefined) {
      app.offerCtc = Number(offerCtc);
    } else if (['Selected', 'Offer Received', 'Joined'].includes(newStatus) && !app.offerCtc) {
      app.offerCtc = drive?.packageCtc || 0;
    }
    if (notes) app.notes = notes;
    app.updatedAt = new Date().toISOString();

    // Audit in application history
    const historyEntry = {
      id: `aph-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      applicationId: app.id,
      studentId: app.studentId,
      driveId: app.driveId,
      companyName: drive?.companyName || 'Company',
      role: drive?.role || 'Role',
      oldStatus,
      newStatus,
      offerCtc: app.offerCtc,
      changedBy,
      changedAt: new Date().toISOString(),
      notes: notes || `Moved stage from ${oldStatus} to ${newStatus}`,
    };
    this.applicationHistory.unshift(historyEntry);

    this.addAuditLog(
      'APPLICATION_STAGE_CHANGED',
      `Application for ${historyEntry.companyName} changed from ${oldStatus} to ${newStatus} by ${changedBy}`,
      changedBy
    );

    this.save();
    return { application: app, historyEntry };
  }

  bulkUpdateApplicationStages(appIds, newStatus, changedBy = 'Placement In-Charge', notes = '') {
    const results = [];
    appIds.forEach((id) => {
      try {
        const res = this.updateApplicationStage(id, newStatus, null, changedBy, notes);
        results.push(res);
      } catch (e) {
        console.warn(`Failed stage update for app ${id}:`, e.message);
      }
    });
    return results;
  }

  getApplicationHistory(studentId = null) {
    if (studentId) {
      return this.applicationHistory.filter((h) => h.studentId === studentId);
    }
    return this.applicationHistory;
  }

  // -------------------------------------------------------------
  // STEP 6: NO-DUES CLEARANCES & COMPUTED OVERALL STATUS
  // -------------------------------------------------------------
  getNoDuesMap() {
    return this.noDues;
  }

  getNoDuesForStudent(studentId) {
    return this.noDues[studentId] || null;
  }

  updateNoDuesClearance(studentId, category, status, remarks = '', pendingAmount = 0, clearedBy = 'Clearance Officer') {
    if (!this.noDues[studentId]) {
      this.noDues[studentId] = {};
    }

    const catConfig = this.noDuesCategories.find((c) => c.category === category);
    this.noDues[studentId][category] = {
      category,
      categoryLabel: catConfig?.label || category,
      departmentInCharge: catConfig?.departmentInCharge || 'Clearance Cell',
      status,
      remarks: remarks || (status === 'Cleared' ? 'Verified and signed off' : 'Pending verification'),
      pendingAmount: Number(pendingAmount) || 0,
      updatedAt: new Date().toISOString(),
      clearedBy: status === 'Cleared' ? clearedBy : undefined,
    };

    const student = this.getStudentById(studentId);
    this.addAuditLog(
      'CLEARANCE_UPDATED',
      `Clearance for ${catConfig?.label || category} updated to "${status}" for ${student?.name || studentId} by ${clearedBy}`,
      clearedBy
    );

    this.save();
    return this.noDues[studentId];
  }

  // Compute student's overall no-dues clearance status:
  // "Cleared" ONLY if ALL mandatory applicable categories are Cleared or Not Applicable;
  // otherwise "Incomplete" and list blocking items.
  computeStudentOverallNoDues(studentId) {
    const studentClearance = this.noDues[studentId];
    if (!studentClearance) {
      return { overallStatus: 'Incomplete', blockingCategories: ['All Categories'], totalPendingFines: 0 };
    }

    const blockingCategories = [];
    let totalPendingFines = 0;

    this.noDuesCategories.forEach((cat) => {
      const item = studentClearance[cat.category];
      if (cat.isMandatory) {
        if (!item || (item.status !== 'Cleared' && item.status !== 'Not Applicable')) {
          blockingCategories.push(cat.label);
        }
      }
      if (item && item.pendingAmount) {
        totalPendingFines += item.pendingAmount;
      }
    });

    const isCleared = blockingCategories.length === 0;
    return {
      overallStatus: isCleared ? 'Cleared' : 'Incomplete',
      blockingCategories,
      totalPendingFines,
    };
  }

  // -------------------------------------------------------------
  // STEP 5 & 7: LIVE SQL VIEW COMPUTATION (DASHBOARD & REPORTS)
  // -------------------------------------------------------------
  getDashboardMetrics() {
    const totalRegistered = this.students.length;
    const eligibleStudents = this.students.filter((s) => s.status === 'Active').length;

    // Active drives map to filter out CANCELLED drives
    const activeDrivesMap = new Map(this.drives.map((d) => [d.id, d]));
    const qualifyingStatuses = ['Selected', 'Offer Received', 'Joined'];

    const studentOffersCount = new Map();
    let totalOffers = 0;
    let highestPackageCtc = 0;
    let totalCtcSum = 0;

    this.applications.forEach((app) => {
      const drive = activeDrivesMap.get(app.driveId);
      // Strictly exclude cancelled drives
      if (!drive || drive.status === 'Cancelled') return;

      // Strictly include only qualifying outcomes
      if (qualifyingStatuses.includes(app.status)) {
        totalOffers += 1;
        const currentCount = studentOffersCount.get(app.studentId) || 0;
        studentOffersCount.set(app.studentId, currentCount + 1);

        const effectiveCtc = app.offerCtc || drive.packageCtc || 0;
        if (effectiveCtc > highestPackageCtc) highestPackageCtc = effectiveCtc;
      }
    });

    const uniquePlacedStudents = studentOffersCount.size;
    const unplacedStudents = Math.max(0, eligibleStudents - uniquePlacedStudents);
    const placementPercentage =
      eligibleStudents > 0 ? Number(((uniquePlacedStudents / eligibleStudents) * 100).toFixed(1)) : 0;

    // Average Package
    studentOffersCount.forEach((count, studentId) => {
      const apps = this.applications.filter(
        (a) =>
          a.studentId === studentId &&
          qualifyingStatuses.includes(a.status) &&
          activeDrivesMap.get(a.driveId)?.status !== 'Cancelled'
      );
      const studentHighest = Math.max(
        ...apps.map((a) => a.offerCtc || activeDrivesMap.get(a.driveId)?.packageCtc || 0),
        0
      );
      totalCtcSum += studentHighest;
    });

    const averagePackageCtc =
      uniquePlacedStudents > 0 ? Number((totalCtcSum / uniquePlacedStudents).toFixed(2)) : 0;

    // No dues statistics
    let noduesClearedCount = 0;
    let noduesPendingCount = 0;
    this.students.forEach((s) => {
      const { overallStatus } = this.computeStudentOverallNoDues(s.id);
      if (overallStatus === 'Cleared') noduesClearedCount += 1;
      else noduesPendingCount += 1;
    });

    return {
      totalStudents: totalRegistered,
      eligibleStudents,
      uniquePlacedStudents,
      totalOffers,
      unplacedStudents,
      placementPercentage,
      averagePackageCtc,
      highestPackageCtc,
      activeDrivesCount: this.drives.filter((d) => d.status === 'Active' || d.status === 'Upcoming').length,
      completedDrivesCount: this.drives.filter((d) => d.status === 'Completed').length,
      totalCompaniesCount: new Set(this.drives.map((d) => d.companyName)).size,
      noDuesClearedCount: noduesClearedCount,
      noDuesPendingCount: noduesPendingCount,
    };
  }

  getDepartmentPlacementReport() {
    const departments = [
      'Computer Science & Engineering',
      'Electronics & Communication Engineering',
      'Information Technology',
    ];

    const activeDrivesMap = new Map(this.drives.map((d) => [d.id, d]));
    const qualifyingStatuses = ['Selected', 'Offer Received', 'Joined'];

    return departments.map((dept) => {
      const deptStudents = this.students.filter((s) => s.department === dept);
      const totalStudents = deptStudents.length;
      const eligibleStudents = deptStudents.filter((s) => s.status === 'Active').length;
      const deptStudentIds = new Set(deptStudents.map((s) => s.id));

      const placedStudentIds = new Set();
      let totalOffers = 0;
      let highestPackageCtc = 0;
      let ctcSum = 0;

      this.applications.forEach((app) => {
        if (!deptStudentIds.has(app.studentId)) return;
        const drive = activeDrivesMap.get(app.driveId);
        if (!drive || drive.status === 'Cancelled') return;

        if (qualifyingStatuses.includes(app.status)) {
          totalOffers += 1;
          placedStudentIds.add(app.studentId);
          const ctc = app.offerCtc || drive.packageCtc || 0;
          if (ctc > highestPackageCtc) highestPackageCtc = ctc;
        }
      });

      const uniquePlacedStudents = placedStudentIds.size;
      const unplacedStudents = Math.max(0, eligibleStudents - uniquePlacedStudents);
      const placementPercentage =
        eligibleStudents > 0 ? Number(((uniquePlacedStudents / eligibleStudents) * 100).toFixed(1)) : 0;

      placedStudentIds.forEach((sId) => {
        const apps = this.applications.filter(
          (a) =>
            a.studentId === sId &&
            qualifyingStatuses.includes(a.status) &&
            activeDrivesMap.get(a.driveId)?.status !== 'Cancelled'
        );
        const maxCtc = Math.max(...apps.map((a) => a.offerCtc || activeDrivesMap.get(a.driveId)?.packageCtc || 0), 0);
        ctcSum += maxCtc;
      });

      const averagePackageCtc =
        uniquePlacedStudents > 0 ? Number((ctcSum / uniquePlacedStudents).toFixed(2)) : 0;

      return {
        department: dept,
        totalStudents,
        eligibleStudents,
        uniquePlacedStudents,
        totalOffers,
        unplacedStudents,
        placementPercentage,
        averagePackageCtc,
        highestPackageCtc,
      };
    });
  }

  getCompanyOutcomesReport() {
    return this.drives.map((drive) => {
      const driveApps = this.applications.filter((a) => a.driveId === drive.id);
      return {
        driveId: drive.id,
        companyName: drive.companyName,
        role: drive.role,
        tier: drive.tier,
        packageCtc: drive.packageCtc,
        registeredCount: driveApps.length,
        shortlistedCount: driveApps.filter((a) => ['Shortlisted', 'Assessment', 'Interview', 'Selected', 'Offer Received', 'Joined'].includes(a.status)).length,
        interviewedCount: driveApps.filter((a) => ['Interview', 'Selected', 'Offer Received', 'Joined'].includes(a.status)).length,
        selectedCount: driveApps.filter((a) => a.status === 'Selected').length,
        offersReceivedCount: driveApps.filter((a) => a.status === 'Offer Received').length,
        joinedCount: driveApps.filter((a) => a.status === 'Joined').length,
        rejectedCount: driveApps.filter((a) => a.status === 'Rejected').length,
        status: drive.status,
      };
    });
  }

  // -------------------------------------------------------------
  // AUDIT & PAYMENTS
  // -------------------------------------------------------------
  addAuditLog(action, details, performedBy = 'System', ip = '127.0.0.1') {
    const entry = {
      id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      action,
      details,
      performedBy: performedBy || 'System',
      timestamp: new Date().toISOString(),
      ip,
    };
    this.auditLogs.unshift(entry);
    if (this.auditLogs.length > 500) this.auditLogs.pop();
    this.save();
    return entry;
  }

  getAuditLogs() {
    return this.auditLogs;
  }

  addPayment(record) {
    this.payments.unshift(record);
    this.save();
    return record;
  }

  getPayment(merchantTransactionId) {
    return this.payments.find((p) => p.merchantTransactionId === merchantTransactionId);
  }

  getPaymentsByStudent(studentId) {
    return this.payments.filter((p) => p.studentId === studentId);
  }

  getAllPayments() {
    return this.payments;
  }

  updatePayment(merchantTransactionId, updates) {
    const idx = this.payments.findIndex((p) => p.merchantTransactionId === merchantTransactionId);
    if (idx !== -1) {
      this.payments[idx] = {
        ...this.payments[idx],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      this.save();
      return this.payments[idx];
    }
    return null;
  }

  getEnrichedStudents() {
    const activeDrivesMap = new Map(this.drives.map((d) => [d.id, d]));
    const qualifyingStatuses = ['Selected', 'Offer Received', 'Joined'];

    return this.students.map((student) => {
      const studentApps = this.applications.filter((a) => a.studentId === student.id);
      const studentClearances = this.noDues[student.id] || {};
      const { overallStatus, blockingCategories } = this.computeStudentOverallNoDues(student.id);

      const validOffers = studentApps.filter((a) => {
        const drive = activeDrivesMap.get(a.driveId);
        return drive && drive.status !== 'Cancelled' && qualifyingStatuses.includes(a.status);
      });

      const totalOffers = validOffers.length;
      const isPlaced = totalOffers > 0;
      const offerLpas = validOffers.map((a) => a.offerCtc || activeDrivesMap.get(a.driveId)?.packageCtc || 0);
      const highestOfferLpa = offerLpas.length > 0 ? Math.max(...offerLpas) : undefined;

      return {
        ...student,
        applications: studentApps,
        noDues: studentClearances,
        overallNoDuesStatus: overallStatus,
        blockingCategories,
        totalOffers,
        isPlaced,
        highestOfferLpa,
      };
    });
  }
}

export const dbStore = new RelationalDatabaseStore();
