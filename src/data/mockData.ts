import {
  Student,
  RecruitmentDrive,
  Application,
  NoDuesItem,
  User,
  NoDuesCategory,
} from '../types';

export const DEMO_USERS: User[] = [
  {
    id: 'user-admin',
    name: 'Dr. Rajeshwari Raman',
    email: 'placement.head@campuspath.edu',
    role: 'admin',
    designation: 'Director, Training & Placement Cell',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    department: 'Training & Placement Office',
  },
  {
    id: 'user-student-1',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@student.campuspath.edu',
    role: 'student',
    studentId: 'stud-1',
    rollNumber: '2021CS0101',
    department: 'Computer Science & Engineering',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'user-student-2',
    name: 'Pooja Hegde',
    email: 'pooja.hegde@student.campuspath.edu',
    role: 'student',
    studentId: 'stud-11',
    rollNumber: '2021EC0201',
    department: 'Electronics & Communication Engineering',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
  },
];

export const INITIAL_STUDENTS: Student[] = [
  // 1-12: Computer Science & Engineering
  {
    id: 'stud-1',
    rollNumber: '2021CS0101',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@student.campuspath.edu',
    phone: '+91 98765 43210',
    department: 'Computer Science & Engineering',
    cgpa: 9.42,
    backlogs: 0,
    batchYear: 2025,
    gender: 'Male',
    skills: ['React', 'Node.js', 'Go', 'Distributed Systems', 'PostgreSQL'],
    resumeUrl: 'https://campuspath.edu/resumes/2021CS0101.pdf',
    status: 'Active',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&auto=format&fit=crop&q=80',
  },
  {
    id: 'stud-2',
    rollNumber: '2021CS0102',
    name: 'Diya Patel',
    email: 'diya.patel@student.campuspath.edu',
    phone: '+91 98765 43211',
    department: 'Computer Science & Engineering',
    cgpa: 8.91,
    backlogs: 0,
    batchYear: 2025,
    gender: 'Female',
    skills: ['Python', 'Machine Learning', 'TensorFlow', 'FastAPI'],
    resumeUrl: 'https://campuspath.edu/resumes/2021CS0102.pdf',
    status: 'Active',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
  },
  {
    id: 'stud-3',
    rollNumber: '2021CS0103',
    name: 'Kabir Mehta',
    email: 'kabir.mehta@student.campuspath.edu',
    phone: '+91 98765 43212',
    department: 'Computer Science & Engineering',
    cgpa: 7.85,
    backlogs: 0,
    batchYear: 2025,
    gender: 'Male',
    skills: ['Java', 'Spring Boot', 'Kafka', 'Docker'],
    resumeUrl: 'https://campuspath.edu/resumes/2021CS0103.pdf',
    status: 'Active',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
  },
  {
    id: 'stud-4',
    rollNumber: '2021CS0104',
    name: 'Ananya Deshmukh',
    email: 'ananya.deshmukh@student.campuspath.edu',
    phone: '+91 98765 43213',
    department: 'Computer Science & Engineering',
    cgpa: 9.15,
    backlogs: 0,
    batchYear: 2025,
    gender: 'Female',
    skills: ['C++', 'Data Structures', 'Algorithms', 'System Design'],
    resumeUrl: 'https://campuspath.edu/resumes/2021CS0104.pdf',
    status: 'Active',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
  },
  {
    id: 'stud-5',
    rollNumber: '2021CS0105',
    name: 'Vikramaditya Rao',
    email: 'vikram.rao@student.campuspath.edu',
    phone: '+91 98765 43214',
    department: 'Computer Science & Engineering',
    cgpa: 8.24,
    backlogs: 0,
    batchYear: 2025,
    gender: 'Male',
    skills: ['Rust', 'WebAssembly', 'TypeScript', 'Kubernetes'],
    resumeUrl: 'https://campuspath.edu/resumes/2021CS0105.pdf',
    status: 'Active',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
  },
  {
    id: 'stud-6',
    rollNumber: '2021CS0106',
    name: 'Suhani Mukherjee',
    email: 'suhani.m@student.campuspath.edu',
    phone: '+91 98765 43215',
    department: 'Computer Science & Engineering',
    cgpa: 6.95,
    backlogs: 1,
    batchYear: 2025,
    gender: 'Female',
    skills: ['HTML/CSS', 'JavaScript', 'SQL', 'PHP'],
    resumeUrl: 'https://campuspath.edu/resumes/2021CS0106.pdf',
    status: 'Active',
    avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=120&auto=format&fit=crop&q=80',
  },
  {
    id: 'stud-7',
    rollNumber: '2021CS0107',
    name: 'Devendra Singhal',
    email: 'devendra.s@student.campuspath.edu',
    phone: '+91 98765 43216',
    department: 'Computer Science & Engineering',
    cgpa: 8.42,
    backlogs: 0,
    batchYear: 2025,
    gender: 'Male',
    skills: ['React Native', 'Mobile Security', 'Node.js', 'Firebase'],
    resumeUrl: 'https://campuspath.edu/resumes/2021CS0107.pdf',
    status: 'Active',
  },
  {
    id: 'stud-8',
    rollNumber: '2021CS0108',
    name: 'Tanvi Nair',
    email: 'tanvi.nair@student.campuspath.edu',
    phone: '+91 98765 43217',
    department: 'Computer Science & Engineering',
    cgpa: 8.78,
    backlogs: 0,
    batchYear: 2025,
    gender: 'Female',
    skills: ['DevOps', 'AWS', 'Terraform', 'CI/CD Pipelines'],
    resumeUrl: 'https://campuspath.edu/resumes/2021CS0108.pdf',
    status: 'Active',
  },
  {
    id: 'stud-9',
    rollNumber: '2021CS0109',
    name: 'Nikhil Agarwal',
    email: 'nikhil.a@student.campuspath.edu',
    phone: '+91 98765 43218',
    department: 'Computer Science & Engineering',
    cgpa: 7.30,
    backlogs: 0,
    batchYear: 2025,
    gender: 'Male',
    skills: ['Python', 'Django', 'PostgreSQL', 'Redis'],
    resumeUrl: 'https://campuspath.edu/resumes/2021CS0109.pdf',
    status: 'Active',
  },
  {
    id: 'stud-10',
    rollNumber: '2021CS0110',
    name: 'Meera Nambiar',
    email: 'meera.n@student.campuspath.edu',
    phone: '+91 98765 43219',
    department: 'Computer Science & Engineering',
    cgpa: 9.30,
    backlogs: 0,
    batchYear: 2025,
    gender: 'Female',
    skills: ['Natural Language Processing', 'PyTorch', 'HuggingFace', 'Python'],
    resumeUrl: 'https://campuspath.edu/resumes/2021CS0110.pdf',
    status: 'Active',
  },
  {
    id: 'stud-11',
    rollNumber: '2021CS0111',
    name: 'Rishi Vats',
    email: 'rishi.v@student.campuspath.edu',
    phone: '+91 98765 43220',
    department: 'Computer Science & Engineering',
    cgpa: 6.45,
    backlogs: 2,
    batchYear: 2025,
    gender: 'Male',
    skills: ['Java', 'MySQL', 'Basics of Web'],
    resumeUrl: 'https://campuspath.edu/resumes/2021CS0111.pdf',
    status: 'Active',
  },
  {
    id: 'stud-12',
    rollNumber: '2021CS0112',
    name: 'Zoya Qureshi',
    email: 'zoya.q@student.campuspath.edu',
    phone: '+91 98765 43221',
    department: 'Computer Science & Engineering',
    cgpa: 8.60,
    backlogs: 0,
    batchYear: 2025,
    gender: 'Female',
    skills: ['Next.js', 'Tailwind CSS', 'GraphQL', 'Prisma'],
    resumeUrl: 'https://campuspath.edu/resumes/2021CS0112.pdf',
    status: 'Active',
  },

  // 13-22: Electronics & Communication Engineering
  {
    id: 'stud-13',
    rollNumber: '2021EC0201',
    name: 'Pooja Hegde',
    email: 'pooja.hegde@student.campuspath.edu',
    phone: '+91 98765 43222',
    department: 'Electronics & Communication Engineering',
    cgpa: 9.02,
    backlogs: 0,
    batchYear: 2025,
    gender: 'Female',
    skills: ['VLSI Design', 'Verilog', 'Cadence Virtuoso', 'Embedded C'],
    resumeUrl: 'https://campuspath.edu/resumes/2021EC0201.pdf',
    status: 'Active',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
  },
  {
    id: 'stud-14',
    rollNumber: '2021EC0202',
    name: 'Ananya Iyer',
    email: 'ananya.iyer@student.campuspath.edu',
    phone: '+91 98765 43223',
    department: 'Electronics & Communication Engineering',
    cgpa: 8.85,
    backlogs: 0,
    batchYear: 2025,
    gender: 'Female',
    skills: ['IoT', 'Arduino', 'C++', 'Computer Networks', 'Wireless Comms'],
    resumeUrl: 'https://campuspath.edu/resumes/2021EC0202.pdf',
    status: 'Active',
  },
  {
    id: 'stud-15',
    rollNumber: '2021EC0203',
    name: 'Harshavardhan Reddy',
    email: 'harsha.reddy@student.campuspath.edu',
    phone: '+91 98765 43224',
    department: 'Electronics & Communication Engineering',
    cgpa: 7.65,
    backlogs: 0,
    batchYear: 2025,
    gender: 'Male',
    skills: ['Digital Signal Processing', 'MATLAB', 'Python', 'FPGA'],
    resumeUrl: 'https://campuspath.edu/resumes/2021EC0203.pdf',
    status: 'Active',
  },
  {
    id: 'stud-16',
    rollNumber: '2021EC0204',
    name: 'Shruti Kulkarni',
    email: 'shruti.k@student.campuspath.edu',
    phone: '+91 98765 43225',
    department: 'Electronics & Communication Engineering',
    cgpa: 8.35,
    backlogs: 0,
    batchYear: 2025,
    gender: 'Female',
    skills: ['Microcontrollers', 'Embedded Systems', 'RTOS', 'C'],
    resumeUrl: 'https://campuspath.edu/resumes/2021EC0204.pdf',
    status: 'Active',
  },
  {
    id: 'stud-17',
    rollNumber: '2021EC0205',
    name: 'Karthik Balakrishnan',
    email: 'karthik.b@student.campuspath.edu',
    phone: '+91 98765 43226',
    department: 'Electronics & Communication Engineering',
    cgpa: 8.10,
    backlogs: 0,
    batchYear: 2025,
    gender: 'Male',
    skills: ['Communication Systems', 'Python', 'Networking Protocols'],
    resumeUrl: 'https://campuspath.edu/resumes/2021EC0205.pdf',
    status: 'Active',
  },
  {
    id: 'stud-18',
    rollNumber: '2021EC0206',
    name: 'Lavanya Sen',
    email: 'lavanya.sen@student.campuspath.edu',
    phone: '+91 98765 43227',
    department: 'Electronics & Communication Engineering',
    cgpa: 7.15,
    backlogs: 1,
    batchYear: 2025,
    gender: 'Female',
    skills: ['Circuit Simulation', 'Proteus', 'C Language'],
    resumeUrl: 'https://campuspath.edu/resumes/2021EC0206.pdf',
    status: 'Active',
  },
  {
    id: 'stud-19',
    rollNumber: '2021EC0207',
    name: 'Sameer Joshi',
    email: 'sameer.j@student.campuspath.edu',
    phone: '+91 98765 43228',
    department: 'Electronics & Communication Engineering',
    cgpa: 8.70,
    backlogs: 0,
    batchYear: 2025,
    gender: 'Male',
    skills: ['Embedded Linux', 'Device Drivers', 'C++', 'ARM Architecture'],
    resumeUrl: 'https://campuspath.edu/resumes/2021EC0207.pdf',
    status: 'Active',
  },
  {
    id: 'stud-20',
    rollNumber: '2021EC0208',
    name: 'Ritika Pillai',
    email: 'ritika.p@student.campuspath.edu',
    phone: '+91 98765 43229',
    department: 'Electronics & Communication Engineering',
    cgpa: 6.80,
    backlogs: 0,
    batchYear: 2025,
    gender: 'Female',
    skills: ['Electronic Circuits', 'MATLAB', 'Basics of Python'],
    resumeUrl: 'https://campuspath.edu/resumes/2021EC0208.pdf',
    status: 'Active',
  },
  {
    id: 'stud-21',
    rollNumber: '2021EC0209',
    name: 'Aditya Chawla',
    email: 'aditya.c@student.campuspath.edu',
    phone: '+91 98765 43230',
    department: 'Electronics & Communication Engineering',
    cgpa: 8.52,
    backlogs: 0,
    batchYear: 2025,
    gender: 'Male',
    skills: ['VLSI', 'SystemVerilog', 'UVM', 'Computer Architecture'],
    resumeUrl: 'https://campuspath.edu/resumes/2021EC0209.pdf',
    status: 'Active',
  },
  {
    id: 'stud-22',
    rollNumber: '2021EC0210',
    name: 'Bhavna Goswami',
    email: 'bhavna.g@student.campuspath.edu',
    phone: '+91 98765 43231',
    department: 'Electronics & Communication Engineering',
    cgpa: 7.90,
    backlogs: 0,
    batchYear: 2025,
    gender: 'Female',
    skills: ['RF Design', 'Antenna Engineering', 'HFSS', 'Python'],
    resumeUrl: 'https://campuspath.edu/resumes/2021EC0210.pdf',
    status: 'Active',
  },

  // 23-32: Information Technology
  {
    id: 'stud-23',
    rollNumber: '2021IT0301',
    name: 'Rohan Verma',
    email: 'rohan.verma@student.campuspath.edu',
    phone: '+91 98765 43232',
    department: 'Information Technology',
    cgpa: 8.92,
    backlogs: 0,
    batchYear: 2025,
    gender: 'Male',
    skills: ['Full Stack Dev', 'React', 'Node.js', 'MongoDB', 'AWS'],
    resumeUrl: 'https://campuspath.edu/resumes/2021IT0301.pdf',
    status: 'Active',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80',
  },
  {
    id: 'stud-24',
    rollNumber: '2021IT0302',
    name: 'Ishita Kapoor',
    email: 'ishita.k@student.campuspath.edu',
    phone: '+91 98765 43233',
    department: 'Information Technology',
    cgpa: 9.20,
    backlogs: 0,
    batchYear: 2025,
    gender: 'Female',
    skills: ['Cybersecurity', 'Ethical Hacking', 'Network Defense', 'Python'],
    resumeUrl: 'https://campuspath.edu/resumes/2021IT0302.pdf',
    status: 'Active',
  },
  {
    id: 'stud-25',
    rollNumber: '2021IT0303',
    name: 'Varun Somani',
    email: 'varun.s@student.campuspath.edu',
    phone: '+91 98765 43234',
    department: 'Information Technology',
    cgpa: 8.12,
    backlogs: 0,
    batchYear: 2025,
    gender: 'Male',
    skills: ['Cloud Computing', 'Azure', 'Linux Administration', 'Docker'],
    resumeUrl: 'https://campuspath.edu/resumes/2021IT0303.pdf',
    status: 'Active',
  },
  {
    id: 'stud-26',
    rollNumber: '2021IT0304',
    name: 'Preeti Bhattacharya',
    email: 'preeti.b@student.campuspath.edu',
    phone: '+91 98765 43235',
    department: 'Information Technology',
    cgpa: 7.80,
    backlogs: 0,
    batchYear: 2025,
    gender: 'Female',
    skills: ['Database Management', 'Oracle SQL', 'ETL', 'PowerBI'],
    resumeUrl: 'https://campuspath.edu/resumes/2021IT0304.pdf',
    status: 'Active',
  },
  {
    id: 'stud-27',
    rollNumber: '2021IT0305',
    name: 'Siddharth Chadha',
    email: 'siddharth.c@student.campuspath.edu',
    phone: '+91 98765 43236',
    department: 'Information Technology',
    cgpa: 8.40,
    backlogs: 0,
    batchYear: 2025,
    gender: 'Male',
    skills: ['JavaScript', 'TypeScript', 'Angular', 'REST APIs'],
    resumeUrl: 'https://campuspath.edu/resumes/2021IT0305.pdf',
    status: 'Active',
  },
  {
    id: 'stud-28',
    rollNumber: '2021IT0306',
    name: 'Neha Saxena',
    email: 'neha.s@student.campuspath.edu',
    phone: '+91 98765 43237',
    department: 'Information Technology',
    cgpa: 7.25,
    backlogs: 0,
    batchYear: 2025,
    gender: 'Female',
    skills: ['Software Quality Assurance', 'Selenium', 'Java', 'Jira'],
    resumeUrl: 'https://campuspath.edu/resumes/2021IT0306.pdf',
    status: 'Active',
  },
  {
    id: 'stud-29',
    rollNumber: '2021IT0307',
    name: 'Manish Tyagi',
    email: 'manish.t@student.campuspath.edu',
    phone: '+91 98765 43238',
    department: 'Information Technology',
    cgpa: 6.70,
    backlogs: 1,
    batchYear: 2025,
    gender: 'Male',
    skills: ['Web Development', 'PHP', 'MySQL', 'Bootstrap'],
    resumeUrl: 'https://campuspath.edu/resumes/2021IT0307.pdf',
    status: 'Active',
  },
  {
    id: 'stud-30',
    rollNumber: '2021IT0308',
    name: 'Kavita Menon',
    email: 'kavita.m@student.campuspath.edu',
    phone: '+91 98765 43239',
    department: 'Information Technology',
    cgpa: 8.65,
    backlogs: 0,
    batchYear: 2025,
    gender: 'Female',
    skills: ['Data Analytics', 'Python', 'Pandas', 'Tableau', 'Statistics'],
    resumeUrl: 'https://campuspath.edu/resumes/2021IT0308.pdf',
    status: 'Active',
  },
  {
    id: 'stud-31',
    rollNumber: '2021IT0309',
    name: 'Gaurav Bisht',
    email: 'gaurav.b@student.campuspath.edu',
    phone: '+91 98765 43240',
    department: 'Information Technology',
    cgpa: 7.95,
    backlogs: 0,
    batchYear: 2025,
    gender: 'Male',
    skills: ['Java Backend', 'Spring Boot', 'Microservices', 'Git'],
    resumeUrl: 'https://campuspath.edu/resumes/2021IT0309.pdf',
    status: 'Active',
  },
  {
    id: 'stud-32',
    rollNumber: '2021IT0310',
    name: 'Tanya Bansal',
    email: 'tanya.b@student.campuspath.edu',
    phone: '+91 98765 43241',
    department: 'Information Technology',
    cgpa: 8.30,
    backlogs: 0,
    batchYear: 2025,
    gender: 'Female',
    skills: ['UI/UX Design', 'Figma', 'Frontend', 'React', 'CSS3'],
    resumeUrl: 'https://campuspath.edu/resumes/2021IT0310.pdf',
    status: 'Active',
  },
];

export const INITIAL_DRIVES: RecruitmentDrive[] = [
  {
    id: 'drive-1',
    companyName: 'Google Cloud',
    logo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=100&auto=format&fit=crop&q=80',
    role: 'Cloud Software Engineer',
    tier: 'Super Dream',
    packageCtc: 28.0,
    stipend: '₹1,20,000/mo',
    minCgpa: 8.5,
    maxBacklogs: 0,
    eligibleDepartments: [
      'Computer Science & Engineering',
      'Information Technology',
    ],
    driveDate: '2025-02-15',
    deadline: '2025-02-10',
    location: 'Bengaluru / Hyderabad (Hybrid)',
    status: 'Completed',
    rounds: ['Online Assessment', 'Technical Round 1', 'Technical Round 2', 'Googliness & Leadership'],
    description: 'Join the Google Cloud core team building next-generation distributed compute, Kubernetes integrations, and storage architectures.',
    jobType: 'Full-time',
  },
  {
    id: 'drive-2',
    companyName: 'Microsoft',
    logo: 'https://images.unsplash.com/photo-1642132652809-8c7381c855a8?w=100&auto=format&fit=crop&q=80',
    role: 'Software Development Engineer (Azure)',
    tier: 'Super Dream',
    packageCtc: 24.5,
    stipend: '₹1,00,000/mo',
    minCgpa: 8.0,
    maxBacklogs: 0,
    eligibleDepartments: [
      'Computer Science & Engineering',
      'Electronics & Communication Engineering',
      'Information Technology',
    ],
    driveDate: '2025-02-22',
    deadline: '2025-02-18',
    location: 'Hyderabad / Noida',
    status: 'Completed',
    rounds: ['Online Coding Challenge', 'Design & DSA Round', 'System Architecture', 'Managerial Interview'],
    description: 'Work on Microsoft Azure infrastructure, hyper-scale cloud fabrics, and developer runtime environments.',
    jobType: 'Full-time',
  },
  {
    id: 'drive-3',
    companyName: 'Goldman Sachs',
    logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&auto=format&fit=crop&q=80',
    role: 'Quantitative & Tech Analyst',
    tier: 'Super Dream',
    packageCtc: 22.0,
    stipend: '₹95,000/mo',
    minCgpa: 8.0,
    maxBacklogs: 0,
    eligibleDepartments: [
      'Computer Science & Engineering',
      'Information Technology',
    ],
    driveDate: '2025-03-01',
    deadline: '2025-02-25',
    location: 'Bengaluru',
    status: 'Completed',
    rounds: ['Aptitude + Math Test', 'Coding Round', 'Technical Interview', 'Executive Fit'],
    description: 'High-frequency algorithmic trading platforms, quantitative financial risk modellers, and resilient distributed databases.',
    jobType: 'Full-time',
  },
  {
    id: 'drive-4',
    companyName: 'Amazon Web Services',
    logo: 'https://images.unsplash.com/photo-1523474255658-4af61b1614ff?w=100&auto=format&fit=crop&q=80',
    role: 'Cloud Support & Systems Engineer',
    tier: 'Dream',
    packageCtc: 19.5,
    stipend: '₹80,000/mo',
    minCgpa: 7.5,
    maxBacklogs: 0,
    eligibleDepartments: [
      'Computer Science & Engineering',
      'Electronics & Communication Engineering',
      'Information Technology',
    ],
    driveDate: '2025-03-10',
    deadline: '2025-03-05',
    location: 'Chennai / Hyderabad',
    status: 'Active',
    rounds: ['AWS Online Assessment', 'Technical Screen', 'Leadership Principles (Bar Raiser)'],
    description: 'Support enterprise-scale AWS architecture, network resiliency, and multi-tenant virtualization clusters.',
    jobType: 'Full-time',
  },
  {
    id: 'drive-5',
    companyName: 'Cisco Systems',
    logo: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=100&auto=format&fit=crop&q=80',
    role: 'Network Software Engineer',
    tier: 'Dream',
    packageCtc: 15.5,
    stipend: '₹65,000/mo',
    minCgpa: 7.5,
    maxBacklogs: 0,
    eligibleDepartments: [
      'Computer Science & Engineering',
      'Electronics & Communication Engineering',
      'Information Technology',
    ],
    driveDate: '2025-03-18',
    deadline: '2025-03-14',
    location: 'Bengaluru',
    status: 'Completed',
    rounds: ['CCNA / Networks Test', 'C++ & Python Coding', 'Managerial Round'],
    description: 'Next-generation optical routing, cybersecurity hardware firmware, and software-defined WAN frameworks.',
    jobType: 'Full-time',
  },
  {
    id: 'drive-6',
    companyName: 'Infosys Finacle',
    logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&auto=format&fit=crop&q=80',
    role: 'Specialist Programmer',
    tier: 'Core',
    packageCtc: 9.5,
    stipend: '₹35,000/mo',
    minCgpa: 6.5,
    maxBacklogs: 1,
    eligibleDepartments: [
      'Computer Science & Engineering',
      'Electronics & Communication Engineering',
      'Information Technology',
    ],
    driveDate: '2025-03-25',
    deadline: '2025-03-20',
    location: 'Pune / Mysore / Chennai',
    status: 'Completed',
    rounds: ['HackWithInfy Round', 'Technical Interview', 'HR Discussion'],
    description: 'Enterprise core banking platform development using modern Java, microservices, and reactive web applications.',
    jobType: 'Full-time',
  },
  {
    id: 'drive-7',
    companyName: 'TCS Innovate',
    logo: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=100&auto=format&fit=crop&q=80',
    role: 'Digital Innovator / Software Developer',
    tier: 'Mass',
    packageCtc: 7.5,
    stipend: '₹28,000/mo',
    minCgpa: 6.0,
    maxBacklogs: 1,
    eligibleDepartments: [
      'Computer Science & Engineering',
      'Electronics & Communication Engineering',
      'Information Technology',
    ],
    driveDate: '2025-04-05',
    deadline: '2025-03-30',
    location: 'Pan India',
    status: 'Active',
    rounds: ['National Qualifier Test (NQT)', 'Technical Interview', 'HR Interview'],
    description: 'Digital transformation consulting, enterprise enterprise applications, and modern IT management services.',
    jobType: 'Full-time',
  },
  {
    id: 'drive-8',
    companyName: 'Meta Platforms',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
    role: 'Core Systems Engineer',
    tier: 'Super Dream',
    packageCtc: 32.0,
    stipend: '₹1,50,000/mo',
    minCgpa: 8.5,
    maxBacklogs: 0,
    eligibleDepartments: ['Computer Science & Engineering'],
    driveDate: '2025-01-20',
    deadline: '2025-01-15',
    location: 'London / Remote',
    status: 'Cancelled', // CANCELLED DRIVE: Business rule check! Must not count offers or placements!
    rounds: ['Screening', 'Coding Round', 'System Design'],
    description: 'Recruitment drive postponed and subsequently cancelled by company HR due to hiring freeze restructuring.',
    jobType: 'Full-time',
  },
];

export const INITIAL_APPLICATIONS: Application[] = [
  // Student 1: Aarav Sharma (MULTIPLE OFFERS: Google & Microsoft)
  {
    id: 'app-1',
    studentId: 'stud-1',
    driveId: 'drive-1', // Google (28 LPA)
    appliedAt: '2025-02-05',
    status: 'Offer Received',
    currentRound: 'Selected',
    offerCtc: 28.0,
    feedback: 'Exceptional performance in distributed systems and live coding.',
    notes: 'Official offer letter received. Candidate considering join date.',
    updatedAt: '2025-02-18',
  },
  {
    id: 'app-2',
    studentId: 'stud-1',
    driveId: 'drive-2', // Microsoft (24.5 LPA)
    appliedAt: '2025-02-12',
    status: 'Offer Received',
    currentRound: 'Selected',
    offerCtc: 24.5,
    feedback: 'Strong understanding of Azure fabrics and concurrency.',
    notes: 'Dual offer holder. Letter issued.',
    updatedAt: '2025-02-25',
  },

  // Student 2: Diya Patel (Selected at Goldman Sachs, Interview at Amazon)
  {
    id: 'app-3',
    studentId: 'stud-2',
    driveId: 'drive-3', // Goldman Sachs (22 LPA)
    appliedAt: '2025-02-20',
    status: 'Selected',
    currentRound: 'Executive Fit',
    offerCtc: 22.0,
    feedback: 'Outstanding mathematical analysis and Python algorithmic logic.',
    updatedAt: '2025-03-03',
  },
  {
    id: 'app-4',
    studentId: 'stud-2',
    driveId: 'drive-4', // AWS
    appliedAt: '2025-03-01',
    status: 'Interview',
    currentRound: 'Leadership Principles (Bar Raiser)',
    updatedAt: '2025-03-08',
  },

  // Student 3: Kabir Mehta (Placed at TCS, Selected at Cancelled Meta drive)
  {
    id: 'app-5',
    studentId: 'stud-3',
    driveId: 'drive-8', // Meta Platforms (CANCELLED DRIVE!)
    appliedAt: '2025-01-10',
    status: 'Selected', // should be excluded because drive is Cancelled
    currentRound: 'System Design',
    offerCtc: 32.0,
    feedback: 'Drive cancelled by company before issuing formal offer letter.',
    updatedAt: '2025-01-22',
  },
  {
    id: 'app-6',
    studentId: 'stud-3',
    driveId: 'drive-7', // TCS Innovate (7.5 LPA)
    appliedAt: '2025-03-28',
    status: 'Offer Received',
    currentRound: 'Selected',
    offerCtc: 7.5,
    feedback: 'Good problem-solving and Java backend knowledge.',
    updatedAt: '2025-04-06',
  },

  // Student 4: Ananya Deshmukh (Joined Microsoft)
  {
    id: 'app-7',
    studentId: 'stud-4',
    driveId: 'drive-2', // Microsoft
    appliedAt: '2025-02-14',
    status: 'Joined',
    currentRound: 'Onboarded',
    offerCtc: 24.5,
    feedback: 'Accepted offer and completed background verification.',
    updatedAt: '2025-03-01',
  },

  // Student 5: Vikramaditya Rao (Offer Received Cisco)
  {
    id: 'app-8',
    studentId: 'stud-5',
    driveId: 'drive-5', // Cisco (15.5 LPA)
    appliedAt: '2025-03-12',
    status: 'Offer Received',
    currentRound: 'Selected',
    offerCtc: 15.5,
    feedback: 'Impressive low-level network protocol comprehension.',
    updatedAt: '2025-03-20',
  },

  // Student 6: Suhani Mukherjee (Assessment at Infosys, Rejected at TCS)
  {
    id: 'app-9',
    studentId: 'stud-6',
    driveId: 'drive-6',
    appliedAt: '2025-03-18',
    status: 'Assessment',
    currentRound: 'HackWithInfy Round',
    updatedAt: '2025-03-22',
  },
  {
    id: 'app-10',
    studentId: 'stud-6',
    driveId: 'drive-7',
    appliedAt: '2025-03-29',
    status: 'Rejected', // Rejected doesn't count
    currentRound: 'Aptitude Test',
    feedback: 'Did not meet the cutoff score.',
    updatedAt: '2025-04-02',
  },

  // Student 7: Devendra Singhal (Shortlisted at AWS)
  {
    id: 'app-11',
    studentId: 'stud-7',
    driveId: 'drive-4',
    appliedAt: '2025-03-02',
    status: 'Shortlisted',
    currentRound: 'Technical Screen',
    updatedAt: '2025-03-07',
  },

  // Student 8: Tanvi Nair (Offer Received AWS)
  {
    id: 'app-12',
    studentId: 'stud-8',
    driveId: 'drive-4',
    appliedAt: '2025-03-03',
    status: 'Offer Received',
    currentRound: 'Selected',
    offerCtc: 19.5,
    feedback: 'Demonstrated deep expertise in Terraform and Kubernetes.',
    updatedAt: '2025-03-15',
  },

  // Student 10: Meera Nambiar (Selected at Google)
  {
    id: 'app-13',
    studentId: 'stud-10',
    driveId: 'drive-1',
    appliedAt: '2025-02-06',
    status: 'Selected',
    currentRound: 'Googliness & Leadership',
    offerCtc: 28.0,
    feedback: 'Superb NLP research work and top-percentile coding score.',
    updatedAt: '2025-02-19',
  },

  // Student 12: Zoya Qureshi (Selected at Goldman Sachs)
  {
    id: 'app-14',
    studentId: 'stud-12',
    driveId: 'drive-3',
    appliedAt: '2025-02-21',
    status: 'Offer Received',
    currentRound: 'Selected',
    offerCtc: 22.0,
    feedback: 'Fast-paced frontend architectural mastery.',
    updatedAt: '2025-03-04',
  },

  // Student 13: Pooja Hegde (ECE - Placed at Cisco)
  {
    id: 'app-15',
    studentId: 'stud-13',
    driveId: 'drive-5',
    appliedAt: '2025-03-12',
    status: 'Offer Received',
    currentRound: 'Selected',
    offerCtc: 15.5,
    feedback: 'Very sound knowledge of Verilog & embedded routing.',
    updatedAt: '2025-03-21',
  },

  // Student 14: Ananya Iyer (ECE - Placed at Cisco)
  {
    id: 'app-16',
    studentId: 'stud-14',
    driveId: 'drive-5',
    appliedAt: '2025-03-13',
    status: 'Joined',
    currentRound: 'Onboarded',
    offerCtc: 15.5,
    feedback: 'Acceptance confirmed and background verification cleared.',
    updatedAt: '2025-03-25',
  },

  // Student 17: Karthik Balakrishnan (ECE - Offer Received Infosys)
  {
    id: 'app-17',
    studentId: 'stud-17',
    driveId: 'drive-6',
    appliedAt: '2025-03-19',
    status: 'Offer Received',
    currentRound: 'Selected',
    offerCtc: 9.5,
    feedback: 'Strong communication skills and C++ foundation.',
    updatedAt: '2025-03-26',
  },

  // Student 19: Sameer Joshi (ECE - Interview at Cisco)
  {
    id: 'app-18',
    studentId: 'stud-19',
    driveId: 'drive-5',
    appliedAt: '2025-03-14',
    status: 'Interview',
    currentRound: 'Managerial Round',
    updatedAt: '2025-03-19',
  },

  // Student 21: Aditya Chawla (ECE - Withdrawn from Infosys, Registered at TCS)
  {
    id: 'app-19',
    studentId: 'stud-21',
    driveId: 'drive-6',
    appliedAt: '2025-03-20',
    status: 'Withdrawn', // Withdrawn doesn't count
    currentRound: 'Withdrawn by student',
    feedback: 'Opted out to pursue higher studies in Germany.',
    updatedAt: '2025-03-22',
  },
  {
    id: 'app-20',
    studentId: 'stud-21',
    driveId: 'drive-7',
    appliedAt: '2025-03-30',
    status: 'Registered',
    currentRound: 'Profile Screening',
    updatedAt: '2025-03-30',
  },

  // Student 23: Rohan Verma (IT - MULTIPLE OFFERS: Cisco & Infosys)
  {
    id: 'app-21',
    studentId: 'stud-23',
    driveId: 'drive-5', // Cisco (15.5 LPA)
    appliedAt: '2025-03-14',
    status: 'Offer Received',
    currentRound: 'Selected',
    offerCtc: 15.5,
    feedback: 'Solid full-stack cloud and network skills.',
    updatedAt: '2025-03-22',
  },
  {
    id: 'app-22',
    studentId: 'stud-23',
    driveId: 'drive-6', // Infosys (9.5 LPA)
    appliedAt: '2025-03-19',
    status: 'Offer Received',
    currentRound: 'Selected',
    offerCtc: 9.5,
    feedback: 'High scoring in technical assessment.',
    updatedAt: '2025-03-26',
  },

  // Student 24: Ishita Kapoor (IT - Offer Received Goldman Sachs)
  {
    id: 'app-23',
    studentId: 'stud-24',
    driveId: 'drive-3',
    appliedAt: '2025-02-22',
    status: 'Offer Received',
    currentRound: 'Selected',
    offerCtc: 22.0,
    feedback: 'Stellar cybersecurity and ethical hacking profile.',
    updatedAt: '2025-03-05',
  },

  // Student 25: Varun Somani (IT - Offer Received AWS)
  {
    id: 'app-24',
    studentId: 'stud-25',
    driveId: 'drive-4',
    appliedAt: '2025-03-04',
    status: 'Offer Received',
    currentRound: 'Selected',
    offerCtc: 19.5,
    feedback: 'Deep hands-on cloud and container orchestration.',
    updatedAt: '2025-03-16',
  },

  // Student 27: Siddharth Chadha (IT - Selected TCS Innovate)
  {
    id: 'app-25',
    studentId: 'stud-27',
    driveId: 'drive-7',
    appliedAt: '2025-03-28',
    status: 'Selected',
    currentRound: 'HR Interview',
    offerCtc: 7.5,
    feedback: 'Competent in modern Angular frontend architecture.',
    updatedAt: '2025-04-07',
  },

  // Student 28: Neha Saxena (IT - Assessment at TCS)
  {
    id: 'app-26',
    studentId: 'stud-28',
    driveId: 'drive-7',
    appliedAt: '2025-03-29',
    status: 'Assessment',
    currentRound: 'NQT Technical Coding',
    updatedAt: '2025-04-01',
  },

  // Student 30: Kavita Menon (IT - Offer Received Infosys)
  {
    id: 'app-27',
    studentId: 'stud-30',
    driveId: 'drive-6',
    appliedAt: '2025-03-20',
    status: 'Offer Received',
    currentRound: 'Selected',
    offerCtc: 9.5,
    feedback: 'Great analytics mindset and dashboarding skills.',
    updatedAt: '2025-03-27',
  },

  // Student 32: Tanya Bansal (IT - Shortlisted at AWS)
  {
    id: 'app-28',
    studentId: 'stud-32',
    driveId: 'drive-4',
    appliedAt: '2025-03-05',
    status: 'Shortlisted',
    currentRound: 'Technical Screen',
    updatedAt: '2025-03-10',
  },
];

export const NO_DUES_DEPARTMENTS: {
  category: NoDuesCategory;
  label: string;
  inCharge: string;
}[] = [
  { category: 'library', label: 'Central Library', inCharge: 'Chief Librarian - Dr. A. K. Shastri' },
  { category: 'laboratory', label: 'Department Laboratories', inCharge: 'Lab Superintendent - Prof. N. Swamy' },
  { category: 'department', label: 'Academic Department', inCharge: 'Head of Department' },
  { category: 'placement', label: 'Training & Placement Cell', inCharge: 'Placement Officer - Mr. R. Deshmukh' },
  { category: 'accounts', label: 'Finance & Accounts Section', inCharge: 'Finance Officer - Smt. Geeta Rao' },
  { category: 'hostel', label: 'Hostel & Residence Office', inCharge: 'Chief Warden - Col. S. K. Nair' },
];

// Helper to generate realistic no-dues items for each student
export function generateInitialNoDues(): Record<string, Record<NoDuesCategory, NoDuesItem>> {
  const result: Record<string, Record<NoDuesCategory, NoDuesItem>> = {};

  INITIAL_STUDENTS.forEach((student, index) => {
    // Determine variation profiles
    // stud-1 (Aarav): Completely Cleared!
    // stud-2 (Diya): Library overdue book (fine ₹150)
    // stud-3 (Kabir): Accounts pending semester fee (₹4,500)
    // stud-6 (Suhani): Lab equipment fee (₹600) + Library book (₹220)
    // stud-11 (Rishi): Academic backlogs action required + Accounts due ₹8,000
    // stud-13 (Pooja): Completely Cleared! (Hostel: Cleared)
    // stud-14 (Ananya): Completely Cleared! (Hostel: Not Applicable - day scholar)
    // stud-18 (Lavanya): Hostel caution deposit pending (₹1,500)
    // stud-21 (Aditya): Placement dues (₹750)
    // stud-24 (Ishita): Completely Cleared!
    // stud-26 (Preeti): Lab manual signoff pending
    // stud-29 (Manish): Accounts fee ₹3,200 pending + Library fine ₹100
    // All others have either all cleared or realistic random status

    const isDayScholar = index % 3 === 0;

    let libraryStatus: NoDuesItem['status'] = 'Cleared';
    let libraryRemarks = 'All books returned in good condition. No fines.';
    let libraryAmount = 0;

    let labStatus: NoDuesItem['status'] = 'Cleared';
    let labRemarks = 'All apparatus accounted for. Lab records verified.';
    let labAmount = 0;

    let deptStatus: NoDuesItem['status'] = 'Cleared';
    let deptRemarks = 'Final project thesis copy submitted. Sem credits cleared.';
    let deptAmount = 0;

    let placementStatus: NoDuesItem['status'] = 'Cleared';
    let placementRemarks = 'Interview feedback submitted. Placement portal dues cleared.';
    let placementAmount = 0;

    let accountsStatus: NoDuesItem['status'] = 'Cleared';
    let accountsRemarks = 'Tuition and exam fees settled for all semesters.';
    let accountsAmount = 0;

    let hostelStatus: NoDuesItem['status'] = isDayScholar ? 'Not Applicable' : 'Cleared';
    let hostelRemarks = isDayScholar
      ? 'Day scholar verified by residence registrar.'
      : 'Room vacated, inventory checked and caution deposit refunded.';
    let hostelAmount = 0;

    // Introduce specific variations
    if (student.id === 'stud-2') {
      libraryStatus = 'Action Required';
      libraryRemarks = 'Overdue textbook: "Pattern Recognition & ML" (Bishop). Fine unpaid.';
      libraryAmount = 250;
    } else if (student.id === 'stud-3') {
      accountsStatus = 'Action Required';
      accountsRemarks = 'Pending 8th Semester Laboratory Fee & Convocation Fee.';
      accountsAmount = 4500;
    } else if (student.id === 'stud-6') {
      labStatus = 'Pending';
      labRemarks = 'Verification pending from Web Technologies Lab assistant.';
      labAmount = 0;
      libraryStatus = 'Action Required';
      libraryRemarks = 'Lost Library ID Card replacement fee.';
      libraryAmount = 150;
    } else if (student.id === 'stud-7') {
      hostelStatus = 'Action Required';
      hostelRemarks = 'Pending Hostel Mess Bill adjustment for February.';
      hostelAmount = 1850;
    } else if (student.id === 'stud-9') {
      placementStatus = 'Action Required';
      placementRemarks = 'Industry readiness training workshop kit balance pending.';
      placementAmount = 600;
    } else if (student.id === 'stud-11') {
      accountsStatus = 'Action Required';
      accountsRemarks = 'Supplementary Examination Fee for 2 backlogs pending.';
      accountsAmount = 2400;
      deptStatus = 'Pending';
      deptRemarks = 'HOD approval pending due to active backlogs.';
    } else if (student.id === 'stud-15') {
      labStatus = 'Action Required';
      labRemarks = 'VLSI Lab: DSO probe damage compensation.';
      labAmount = 800;
    } else if (student.id === 'stud-18') {
      hostelStatus = 'Action Required';
      hostelRemarks = 'Room electrical fitting damage fine in Block B Room 304.';
      hostelAmount = 1200;
    } else if (student.id === 'stud-20') {
      libraryStatus = 'Pending';
      libraryRemarks = 'Physical book return receipt awaiting verification by circulation desk.';
    } else if (student.id === 'stud-21') {
      placementStatus = 'Action Required';
      placementRemarks = 'Aptitude portal subscription renewal fee pending.';
      placementAmount = 500;
    } else if (student.id === 'stud-26') {
      deptStatus = 'Action Required';
      deptRemarks = 'Signed softcopy of industrial internship certificate not uploaded.';
    } else if (student.id === 'stud-29') {
      accountsStatus = 'Action Required';
      accountsRemarks = 'Late tuition fee penalty for Semester 7.';
      accountsAmount = 1750;
      libraryStatus = 'Action Required';
      libraryRemarks = 'Overdue fine for "Database System Concepts" (Korth).';
      libraryAmount = 120;
    } else if (student.id === 'stud-31') {
      hostelStatus = 'Pending';
      hostelRemarks = 'Hostel warden inspection scheduled for tomorrow.';
    }

    result[student.id] = {
      library: {
        category: 'library',
        categoryLabel: 'Central Library',
        departmentInCharge: 'Central Library - Circulation Section',
        status: libraryStatus,
        remarks: libraryRemarks,
        pendingAmount: libraryAmount,
        updatedAt: '2025-03-25',
        clearedBy: libraryStatus === 'Cleared' ? 'Dr. A. K. Shastri' : undefined,
      },
      laboratory: {
        category: 'laboratory',
        categoryLabel: 'Department Laboratories',
        departmentInCharge: 'Lab Coordination Cell',
        status: labStatus,
        remarks: labRemarks,
        pendingAmount: labAmount,
        updatedAt: '2025-03-26',
        clearedBy: labStatus === 'Cleared' ? 'Prof. N. Swamy' : undefined,
      },
      department: {
        category: 'department',
        categoryLabel: 'Academic Department',
        departmentInCharge: student.department,
        status: deptStatus,
        remarks: deptRemarks,
        pendingAmount: deptAmount,
        updatedAt: '2025-03-27',
        clearedBy: deptStatus === 'Cleared' ? 'Head of Department' : undefined,
      },
      placement: {
        category: 'placement',
        categoryLabel: 'Training & Placement Cell',
        departmentInCharge: 'Placement Directorate',
        status: placementStatus,
        remarks: placementRemarks,
        pendingAmount: placementAmount,
        updatedAt: '2025-03-28',
        clearedBy: placementStatus === 'Cleared' ? 'Mr. R. Deshmukh' : undefined,
      },
      accounts: {
        category: 'accounts',
        categoryLabel: 'Finance & Accounts Section',
        departmentInCharge: 'Finance Comptroller Office',
        status: accountsStatus,
        remarks: accountsRemarks,
        pendingAmount: accountsAmount,
        updatedAt: '2025-03-29',
        clearedBy: accountsStatus === 'Cleared' ? 'Smt. Geeta Rao' : undefined,
      },
      hostel: {
        category: 'hostel',
        categoryLabel: 'Hostel & Residence Office',
        departmentInCharge: 'Chief Warden Office',
        status: hostelStatus,
        remarks: hostelRemarks,
        pendingAmount: hostelAmount,
        updatedAt: '2025-03-30',
        clearedBy:
          hostelStatus === 'Cleared' || hostelStatus === 'Not Applicable'
            ? 'Col. S. K. Nair'
            : undefined,
      },
    };
  });

  return result;
}
