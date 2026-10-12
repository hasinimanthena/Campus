import {
  Student,
  RecruitmentDrive,
  Application,
  ApplicationHistory,
  NoDuesCategoryConfig,
  NoDuesCategory,
  NoDuesItem,
} from '../types';

export const NO_DUES_CATEGORIES: NoDuesCategoryConfig[] = [
  { id: 'cat-1', category: 'library', label: 'Central Library', isMandatory: true, departmentInCharge: 'Library Directorate', description: 'Book return & penalty fee settlement' },
  { id: 'cat-2', category: 'laboratory', label: 'Department Laboratories', isMandatory: true, departmentInCharge: 'Central Lab Cell', description: 'Hardware kits, apparatus & computing equipment return' },
  { id: 'cat-3', category: 'department', label: 'Academic Department', isMandatory: true, departmentInCharge: 'Respective Academic Dept', description: 'HOD clearance, final thesis & marksheet submission' },
  { id: 'cat-4', category: 'placement', label: 'Placement Cell', isMandatory: true, departmentInCharge: 'Training & Placement Office', description: 'Offer letter copy & placement consent verification' },
  { id: 'cat-5', category: 'accounts', label: 'Accounts & Finance', isMandatory: true, departmentInCharge: 'Bursar & Finance Office', description: 'Tuition, examination fee & hostel fine reconciliation' },
  { id: 'cat-6', category: 'hostel', label: 'Hostel & Residence', isMandatory: false, departmentInCharge: 'Chief Warden Office', description: 'Room vacation, furniture & mess dues clearance' },
];

// Initial 10 CSE Students for Worked Example 1
const CSE_STUDENTS: Student[] = [
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
const OTHER_STUDENTS: Student[] = [
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

export const ALL_INITIAL_STUDENTS: Student[] = [...CSE_STUDENTS, ...OTHER_STUDENTS];

// Recruitment Drives
export const INITIAL_DRIVES: RecruitmentDrive[] = [
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
export const INITIAL_APPLICATIONS: Application[] = [
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
export const INITIAL_APPLICATION_HISTORY: ApplicationHistory[] = [
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

export function generateInitialNoDuesMap(students: Student[] = ALL_INITIAL_STUDENTS): Record<string, Record<NoDuesCategory, NoDuesItem>> {
  const map: Record<string, Record<NoDuesCategory, NoDuesItem>> = {};

  students.forEach((student) => {
    const isExampleStudent = student.id === 'stud-2'; // Worked Example 2
    const isUnplacedPendingStudent = student.id === 'stud-8';

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
        remarks: 'Day scholar candidate — residential hostel not assigned.',
        pendingAmount: 0,
        updatedAt: new Date().toISOString(),
        clearedBy: 'Hostel Administration',
      },
    };
  });

  return map;
}
