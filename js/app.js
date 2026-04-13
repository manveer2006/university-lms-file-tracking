/* ===== IILM UniTrack LMS — Main Application Logic ===== */

// ── STATE ──────────────────────────────────────────────────────────────────
const APP = {
  currentView: 'dashboard',
  currentUser: null,
  activeQuiz: null,
  quizTimer: null,
  quizAnswers: {},
  notifOpen: false,
  calMonth: new Date(2026, 2, 1), // March 2026
  calSelected: null,
  uploadedFiles: {},   // assignmentId → File object
};

// ── USERS ──────────────────────────────────────────────────────────────────
const USERS = {
  student: { name: 'Aryan Sharma', role: 'student', initials: 'AS', urn: '22CSE001', sem: '4', section: 'A', color: '#eef2ff', tc: '#4338ca', email: 'aryan.sharma@iilm.edu', phone: '9876543210' },
  teacher: { name: 'Ms. Ishita Tandon', role: 'teacher', initials: 'IT', dept: 'Data & Infrastructure', color: '#f0fdf4', tc: '#15803d', email: 'ishita.tandon@iilm.edu', phone: '9876540000' },
};

// ── COURSES DATA ────────────────────────────────────────────────────────────
const COURSES = [
  { id:'vcs',   code:'CSE2480', name:'Version Control Systems',         icon:'⎇',  color:'#eef2ff', banner:'#c7d2fe', teacher:'Ms. Ishita Tandon',   credits:3, progress:72, room:'103' },
  { id:'se',    code:'CSE2210', name:'Software Engineering',            icon:'⚙',  color:'#f0fdf4', banner:'#bbf7d0', teacher:'Dr. Tanu Gupta',       credits:4, progress:65, room:'104' },
  { id:'dbms',  code:'CSE2310', name:'Database Management Systems',     icon:'🗄',  color:'#fef2f2', banner:'#fecaca', teacher:'Dr. Pooja Batra',      credits:3, progress:58, room:'94' },
  { id:'os',    code:'CSE2410', name:'Operating Systems',               icon:'💻',  color:'#fff7ed', banner:'#fed7aa', teacher:'Dr. Megha Rana',       credits:4, progress:80, room:'CR5' },
  { id:'ps',    code:'MTH2110', name:'Probability & Statistics',        icon:'📈',  color:'#f0f9ff', banner:'#bae6fd', teacher:'Dr. Jayati Tripathi',  credits:3, progress:45, room:'CR5' },
  { id:'csa',   code:'CSE2510', name:'Computer System Architecture',    icon:'🔧',  color:'#fafaf0', banner:'#d9f99d', teacher:'Dr. Pallavi Pandey',   credits:3, progress:60, room:'CR5' },
  { id:'irp',   code:'GEN2010', name:'Industry Readiness Programme-I',  icon:'🎯',  color:'#fdf4ff', banner:'#e9d5ff', teacher:'Dr. Vaishali',          credits:2, progress:88, room:'CR5' },
];

// ── ASSIGNMENTS ─────────────────────────────────────────────────────────────
let ASSIGNMENTS = [
  {
    id:1, courseId:'vcs', title:'Git Branching & Merging',
    due:'28 Mar 2026', dueTs: new Date('2026-03-28'), posted:'10 Mar 2026',
    marks:20, status:'pending', desc:'Create a repository demonstrating branching, merge conflicts, and resolution. Include a GitHub link and a PDF report. Your repo must have at least 5 meaningful commits on different branches.',
    attachments:[{name:'VCS_Assignment1_Instructions.pdf', size:'340 KB'}],
    submission:null,
  },
  {
    id:2, courseId:'se', title:'Use Case Diagrams — Library System',
    due:'30 Mar 2026', dueTs: new Date('2026-03-30'), posted:'12 Mar 2026',
    marks:15, status:'pending', desc:'Draw Use Case diagrams for a Library Management System covering actors (Librarian, Member, Admin), relationships (include, extend), and system boundary. Use standard UML notation.',
    attachments:[{name:'SE_UML_Reference.pdf', size:'1.2 MB'}],
    submission:null,
  },
  {
    id:3, courseId:'ps', title:'Probability Distributions — Problem Set 3',
    due:'2 Apr 2026', dueTs: new Date('2026-04-02'), posted:'15 Mar 2026',
    marks:10, status:'pending', desc:'Solve 10 problems from Chapter 5 covering Binomial, Poisson, and Normal distributions. Show all working steps and state assumptions clearly.',
    attachments:[{name:'ProbStats_ProblemSet3.pdf', size:'520 KB'}],
    submission:null,
  },
  {
    id:4, courseId:'dbms', title:'ER Diagram — Hospital Management System',
    due:'5 Apr 2026', dueTs: new Date('2026-04-05'), posted:'18 Mar 2026',
    marks:15, status:'pending', desc:'Design a complete ER diagram for a Hospital Management System. Identify entities, relationships, and attributes. Normalize to 3NF and provide SQL DDL statements.',
    attachments:[{name:'DBMS_Assignment2_Instructions.pdf', size:'410 KB'}],
    submission:null,
  },
  {
    id:5, courseId:'os', title:'Process Scheduling — Comparison Study',
    due:'12 Mar 2026', dueTs: new Date('2026-03-12'), posted:'1 Mar 2026',
    marks:20, status:'submitted', desc:'Compare FCFS, SJF, and Round Robin scheduling algorithms. Include Gantt charts, waiting time calculations, and turnaround time analysis.',
    attachments:[{name:'OS_Scheduling_Reference.pdf', size:'780 KB'}],
    submission:{ filename:'OS_Scheduling_Aryan.pdf', submittedOn:'10 Mar 2026', size:'1.8 MB', marks:null },
  },
  {
    id:6, courseId:'vcs', title:'Git Commands Quiz — Written Test',
    due:'15 Mar 2026', dueTs: new Date('2026-03-15'), posted:'8 Mar 2026',
    marks:20, status:'graded', desc:'Written quiz covering basic Git commands, workflow, and concepts.',
    attachments:[], submission:{ filename:'VCS_Quiz1_Aryan.pdf', submittedOn:'15 Mar 2026', size:'890 KB', marks:18, grade:'A' },
  },
  {
    id:7, courseId:'se', title:'Software Design Patterns Assignment',
    due:'20 Mar 2026', dueTs: new Date('2026-03-20'), posted:'5 Mar 2026',
    marks:15, status:'graded', desc:'Explain any 3 software design patterns with real-world examples and code snippets.',
    attachments:[], submission:{ filename:'SE_Patterns_Aryan.pdf', submittedOn:'19 Mar 2026', size:'1.1 MB', marks:12, grade:'B+' },
  },
];

// ── ANNOUNCEMENTS ────────────────────────────────────────────────────────────
const ANNOUNCEMENTS = [
  { id:1, title:'Mid-Semester Exam Schedule Released', course:'Software Engineering', courseId:'se', teacher:'Dr. Tanu Gupta', date:'22 Mar 2026', type:'exam', priority:'high', body:'Mid-semester exams will be held from 5 Apr – 10 Apr 2026. The syllabus covers Units 1–3. Seating arrangements will be posted on the notice board 2 days before. All students must carry their ID cards.' },
  { id:2, title:'VCS Project Submission Deadline Extended to 31 March', course:'Version Control Systems', courseId:'vcs', teacher:'Ms. Ishita Tandon', date:'21 Mar 2026', type:'assignment', priority:'high', body:'Due to multiple requests, the VCS project deadline has been extended to 31 Mar 2026. Please ensure your GitHub repository is public, the README is complete, and the Google Drive sheet is updated with your GitHub links.' },
  { id:3, title:'DBMS Lab — Extra Session on 26 March (Saturday)', course:'DBMS', courseId:'dbms', teacher:'Dr. Pooja Batra', date:'20 Mar 2026', type:'class', priority:'medium', body:'An extra lab session is scheduled for Saturday, 26 March from 10:00 AM – 12:00 PM in Lab 6-A-06. This session is mandatory for Group 2 students who missed the last lab. Group 1 may attend optionally.' },
  { id:4, title:'Guest Lecture — Industry Readiness Programme', course:'Industry Readiness Programme-I', courseId:'irp', teacher:'Dr. Vaishali', date:'18 Mar 2026', type:'event', priority:'medium', body:'A guest lecture by Mr. Rajat Mehta (Senior Software Engineer, Infosys) is scheduled for 28 March 2026 from 2:00 PM – 4:00 PM in the Seminar Hall. Topic: Agile Development & DevOps in Industry. Attendance mandatory.' },
  { id:5, title:'Probability & Statistics — Chapter 5 Test on 29 March', course:'Probability & Statistics', courseId:'ps', teacher:'Dr. Jayati Tripathi', date:'15 Mar 2026', type:'exam', priority:'medium', body:'A chapter test will be held on 29 March during regular class hours (12:20–13:20). Syllabus: Binomial Distribution, Poisson Distribution, Normal Distribution. No books/phones allowed.' },
  { id:6, title:'OS Mid-Semester Submissions Graded', course:'Operating Systems', courseId:'os', teacher:'Dr. Megha Rana', date:'14 Mar 2026', type:'grade', priority:'low', body:'The OS Process Scheduling assignments have been evaluated and marks uploaded. Average score: 16.2/20. Individual feedback has been shared via the portal. Top performers: Aryan Sharma (18/20), Priya Singh (19/20).' },
  { id:7, title:'Library Book Return Reminder — Due 31 March', course:'General', courseId:null, teacher:'Library Administration', date:'12 Mar 2026', type:'general', priority:'low', body:'All books issued before 28 February 2026 are due for return by 31 March 2026. Late returns will incur a fine of ₹5 per day per book. The library will be open on Saturdays till 31 March (10 AM – 3 PM).' },
];

// ── QUIZZES ──────────────────────────────────────────────────────────────────
const QUIZZES = [
  {
    id:1, courseId:'vcs', title:'Git Fundamentals Quiz', duration:15, marks:10, status:'active',
    opens:'23 Mar 2026', closes:'30 Mar 2026', attempts:0, maxAttempts:1, attempted:false,
    questions:[
      { q:'What command initialises a new Git repository?', opts:['git start','git init','git new','git create'], ans:1 },
      { q:'Which command stages all changes for the next commit?', opts:['git commit .','git stage all','git add .','git push'], ans:2 },
      { q:'What does "git clone" do?', opts:['Creates a new branch','Copies a remote repo to local','Deletes a repository','Merges two branches'], ans:1 },
      { q:'Which Git command shows the commit history?', opts:['git history','git show','git log','git status'], ans:2 },
      { q:'What is a "merge conflict"?', opts:['When two branches have the same name','When Git cannot auto-merge conflicting changes','When a commit is deleted','When a push fails'], ans:1 },
      { q:'Which command creates and switches to a new branch simultaneously?', opts:['git branch -new','git checkout -b','git switch --create','git new-branch'], ans:1 },
      { q:'What does "git stash" do?', opts:['Deletes uncommitted changes','Temporarily saves uncommitted changes','Commits without a message','Pushes to remote'], ans:1 },
      { q:'Which file tells Git which files/folders to ignore?', opts:['.gitkeep','.gitconfig','.gitignore','.gittrack'], ans:2 },
      { q:'What is the default branch name in a new GitHub repository?', opts:['master','develop','main','trunk'], ans:2 },
      { q:'What does "git revert" do compared to "git reset"?', opts:['They are identical','Revert creates a new undo-commit; reset moves HEAD back','Reset is safer for shared branches','Revert only works locally'], ans:1 },
    ],
  },
  {
    id:2, courseId:'os', title:'Process Scheduling Concepts', duration:20, marks:15, status:'active',
    opens:'20 Mar 2026', closes:'28 Mar 2026', attempts:0, maxAttempts:1, attempted:false,
    questions:[
      { q:'Which scheduling algorithm has the minimum average waiting time?', opts:['FCFS','Round Robin','SJF (non-preemptive)','Priority Scheduling'], ans:2 },
      { q:'What is a "context switch"?', opts:['Switching between two monitors','Saving and restoring the state of a process','Changing the OS','Allocating new memory'], ans:1 },
      { q:'In Round Robin scheduling, what is the "quantum"?', opts:['Memory size','Fixed CPU time slice per process','Number of processes','Cache size'], ans:1 },
      { q:'Which state does a process enter when it is waiting for I/O?', opts:['Running','Ready','Blocked/Waiting','Terminated'], ans:2 },
      { q:'What does PCB stand for?', opts:['Process Control Block','Program Counter Buffer','Processor Cache Block','Process Context Base'], ans:0 },
    ],
  },
  {
    id:3, courseId:'dbms', title:'SQL & ER Diagram Quiz', duration:25, marks:20, status:'upcoming',
    opens:'1 Apr 2026', closes:'7 Apr 2026', attempts:0, maxAttempts:2, attempted:false,
    questions:[
      { q:'Which SQL clause filters rows after grouping?', opts:['WHERE','GROUP BY','HAVING','ORDER BY'], ans:2 },
      { q:'What does PRIMARY KEY guarantee?', opts:['Unique + Not Null','Only Unique','Only Not Null','Foreign Reference'], ans:0 },
      { q:'Which normal form eliminates transitive dependencies?', opts:['1NF','2NF','3NF','BCNF'], ans:2 },
      { q:'What is a "foreign key"?', opts:['A key from another database','A field that references PRIMARY KEY of another table','A composite key','An encrypted key'], ans:1 },
      { q:'Which JOIN returns all rows from both tables?', opts:['INNER JOIN','LEFT JOIN','RIGHT JOIN','FULL OUTER JOIN'], ans:3 },
    ],
  },
  {
    id:4, courseId:'se', title:'Software Engineering Fundamentals', duration:20, marks:15, status:'completed',
    opens:'5 Mar 2026', closes:'12 Mar 2026', attempts:1, maxAttempts:1, attempted:true, score:13, total:15,
    questions:[],
  },
  {
    id:5, courseId:'ps', title:'Probability Distributions Test', duration:30, marks:20, status:'upcoming',
    opens:'29 Mar 2026', closes:'29 Mar 2026', attempts:0, maxAttempts:1, attempted:false,
    questions:[
      { q:'In a Binomial distribution B(n,p), the mean is:', opts:['np','np(1-p)','n/p','√(np)'], ans:0 },
      { q:'For a Normal distribution, what percentage of data lies within ±1σ?', opts:['50%','68.27%','95.45%','99.73%'], ans:1 },
      { q:'Poisson distribution is used when:', opts:['Events are continuous','Events occur rarely in a fixed interval','Data is normally distributed','Sample is large'], ans:1 },
    ],
  },
];

// ── CALENDAR EVENTS ──────────────────────────────────────────────────────────
const EVENTS = [
  { date:'2026-03-23', type:'class', title:'Timetable effective from today', color:'#4f46e5' },
  { date:'2026-03-26', type:'lab', title:'Extra DBMS Lab Session (10 AM)', color:'#dc2626' },
  { date:'2026-03-28', type:'assignment', title:'VCS Assignment 1 Due', color:'#d97706' },
  { date:'2026-03-28', type:'lecture', title:'Guest Lecture — IRP (2 PM)', color:'#9333ea' },
  { date:'2026-03-29', type:'exam', title:'P&S Chapter 5 Test (12:20 PM)', color:'#dc2626' },
  { date:'2026-03-30', type:'assignment', title:'SE Use Case Diagram Due', color:'#d97706' },
  { date:'2026-03-31', type:'assignment', title:'VCS Project Final Submission', color:'#d97706' },
  { date:'2026-04-01', type:'holiday', title:'April Fools — No Classes', color:'#059669' },
  { date:'2026-04-02', type:'assignment', title:'P&S Problem Set 3 Due', color:'#d97706' },
  { date:'2026-04-05', type:'assignment', title:'DBMS ER Diagram Due', color:'#d97706' },
  { date:'2026-04-05', type:'exam', title:'Mid-Semester Exams Begin', color:'#dc2626' },
  { date:'2026-04-06', type:'exam', title:'Software Engineering Mid-Sem', color:'#dc2626' },
  { date:'2026-04-07', type:'exam', title:'DBMS Mid-Semester Exam', color:'#dc2626' },
  { date:'2026-04-08', type:'exam', title:'VCS Mid-Semester Exam', color:'#dc2626' },
  { date:'2026-04-09', type:'exam', title:'OS Mid-Semester Exam', color:'#dc2626' },
  { date:'2026-04-10', type:'exam', title:'P&S Mid-Semester Exam — Last Day', color:'#dc2626' },
  { date:'2026-04-14', type:'holiday', title:'🕌 Baisakhi — University Holiday', color:'#059669' },
  { date:'2026-04-18', type:'event', title:'Technical Symposium — SoCS', color:'#0284c7' },
  { date:'2026-04-23', type:'event', title:'Project Evaluation Day', color:'#9333ea' },
  { date:'2026-05-01', type:'holiday', title:'🌹 Labour Day — University Holiday', color:'#059669' },
];

// ── RESOURCES ────────────────────────────────────────────────────────────────
const RESOURCES = [
  { id:1, courseId:'vcs', name:'VCS Lecture Notes — Week 1.pdf', type:'PDF', size:'2.4 MB', date:'10 Jan 2026', teacher:'Ms. Ishita Tandon', icon:'📄', desc:'Introduction to Git, history of VCS, centralized vs distributed systems.' },
  { id:2, courseId:'vcs', name:'Git Commands Cheatsheet.pdf', type:'PDF', size:'580 KB', date:'20 Jan 2026', teacher:'Ms. Ishita Tandon', icon:'📄', desc:'Complete reference for all essential Git commands with examples.' },
  { id:3, courseId:'vcs', name:'Assignment 1 — Instructions.pdf', type:'PDF', size:'340 KB', date:'10 Mar 2026', teacher:'Ms. Ishita Tandon', icon:'📄', desc:'Detailed instructions and rubric for the branching assignment.' },
  { id:4, courseId:'se', name:'SE Unit 2 — UML Slides.pptx', type:'PPTX', size:'4.1 MB', date:'15 Feb 2026', teacher:'Dr. Tanu Gupta', icon:'📊', desc:'Complete UML notation guide with use case, class, and sequence diagrams.' },
  { id:5, courseId:'se', name:'Design Patterns Reference.pdf', type:'PDF', size:'3.2 MB', date:'1 Mar 2026', teacher:'Dr. Tanu Gupta', icon:'📄', desc:'Gang of Four design patterns with examples in Java.' },
  { id:6, courseId:'dbms', name:'DBMS Lab Manual 2026.pdf', type:'PDF', size:'5.6 MB', date:'5 Jan 2026', teacher:'Dr. Pooja Batra', icon:'📄', desc:'Complete lab manual for all 12 DBMS lab experiments.' },
  { id:7, courseId:'dbms', name:'SQL Query Practice Set.pdf', type:'PDF', size:'1.1 MB', date:'14 Feb 2026', teacher:'Dr. Pooja Batra', icon:'📄', desc:'50 SQL practice problems from basic to advanced.' },
  { id:8, courseId:'os', name:'Process Scheduling Notes.pdf', type:'PDF', size:'1.8 MB', date:'20 Feb 2026', teacher:'Dr. Megha Rana', icon:'📄', desc:'FCFS, SJF, Round Robin, Priority scheduling with solved examples.' },
  { id:9, courseId:'ps', name:'Probability Distributions — Ch 5.pdf', type:'PDF', size:'2.0 MB', date:'10 Mar 2026', teacher:'Dr. Jayati Tripathi', icon:'📄', desc:'Binomial, Poisson, and Normal distributions with derivations.' },
  { id:10, courseId:'csa', name:'Computer Architecture Slides.pptx', type:'PPTX', size:'6.2 MB', date:'8 Feb 2026', teacher:'Dr. Pallavi Pandey', icon:'📊', desc:'Pipeline architecture, memory hierarchy, instruction sets.' },
];

// ── GRADES ───────────────────────────────────────────────────────────────────
const GRADES = [
  { courseId:'vcs', score:82, letter:'A-', trend:'+4%' },
  { courseId:'se',  score:78, letter:'B+', trend:'+2%' },
  { courseId:'dbms',score:65, letter:'B',  trend:'-1%' },
  { courseId:'os',  score:80, letter:'A-', trend:'+6%' },
  { courseId:'ps',  score:55, letter:'C+', trend:'-3%' },
  { courseId:'csa', score:72, letter:'B+', trend:'+1%' },
];

// ── NOTIFICATIONS ────────────────────────────────────────────────────────────
const NOTIFICATIONS = [
  { icon:'📝', color:'#eef2ff', title:'Assignment graded: Git Commands Quiz — 18/20 (A)', time:'2 hours ago' },
  { icon:'📢', color:'#fef2f2', title:'New announcement: Mid-semester exam schedule released', time:'4 hours ago' },
  { icon:'⏰', color:'#fff7ed', title:'Reminder: VCS Assignment 1 due in 5 days', time:'1 day ago' },
  { icon:'🎯', color:'#fdf4ff', title:'Guest lecture tomorrow — IRP (Seminar Hall, 2 PM)', time:'1 day ago' },
  { icon:'📊', color:'#f0fdf4', title:'OS Assignment graded: 16/20 — feedback available', time:'3 days ago' },
  { icon:'📚', color:'#f0f9ff', title:'New resource uploaded: P&S Distributions Chapter 5', time:'4 days ago' },
];

// ─────────────────────────────────────────────────────────────────────────────
// ── INITIALIZATION ───────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  APP.currentUser = USERS.student;
  renderUserUI();
  navigate('dashboard');
  buildNotifications();
});

function renderUserUI() {
  const u = APP.currentUser;
  // Sidebar user
  const sav = document.getElementById('sidebar-av');
  if (sav) { sav.style.background = u.color; sav.style.color = u.tc; sav.textContent = u.initials; }
  const sname = document.getElementById('sidebar-uname');
  if (sname) sname.textContent = u.name;
  const srole = document.getElementById('sidebar-urole');
  if (srole) {
    srole.textContent = u.role === 'teacher' ? 'Teacher' : 'Student';
    srole.style.background = u.role === 'teacher' ? '#d1fae5' : '#eef2ff';
    srole.style.color = u.role === 'teacher' ? '#065f46' : '#3730a3';
  }
  // Topbar role toggle
  const rtav = document.getElementById('role-toggle-av');
  if (rtav) { rtav.style.background = u.color; rtav.style.color = u.tc; rtav.textContent = u.initials; }
  const rtname = document.getElementById('role-toggle-name');
  if (rtname) rtname.textContent = u.name;
}

function toggleRole() {
  if (APP.currentUser.role === 'student') {
    APP.currentUser = USERS.teacher;
  } else {
    APP.currentUser = USERS.student;
  }
  renderUserUI();
  navigate(APP.currentView);
  showToast(`Switched to ${APP.currentUser.name} (${APP.currentUser.role})`, 'success');
}

// ── NAVIGATION ────────────────────────────────────────────────────────────────
function navigate(view) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const el = document.getElementById('view-' + view);
  if (el) el.classList.add('active');
  const navEl = document.querySelector(`[data-view="${view}"]`);
  if (navEl) navEl.classList.add('active');
  APP.currentView = view;
  // Update topbar title
  const titles = { dashboard:'Dashboard', courses:'My Courses', assignments:'Assignments', announcements:'Announcements', quizzes:'Quizzes', timetable:'Timetable', calendar:'Calendar', grades:'Grades', resources:'Resources', profile:'My Profile' };
  const tb = document.getElementById('topbar-title');
  if (tb) tb.textContent = titles[view] || view;
  // Render view
  const renders = { dashboard: renderDashboard, courses: renderCourses, assignments: renderAssignments, announcements: renderAnnouncements, quizzes: renderQuizzes, timetable: renderTimetable, calendar: renderCalendar, grades: renderGrades, resources: renderResources, profile: renderProfile };
  if (renders[view]) renders[view]();
  // Close notifications panel if open
  closeNotifications();
}

// ── DASHBOARD ────────────────────────────────────────────────────────────────
function renderDashboard() {
  const isTeacher = APP.currentUser.role === 'teacher';
  // Stats
  const pending = ASSIGNMENTS.filter(a => a.status === 'pending').length;
  const graded = ASSIGNMENTS.filter(a => a.status === 'graded').length;
  const activeQ = QUIZZES.filter(q => q.status === 'active' && !q.attempted).length;
  const avgGrade = Math.round(GRADES.reduce((s, g) => s + g.score, 0) / GRADES.length);

  setHTML('dash-stats', `
    <div class="stat-card"><div class="stat-icon" style="background:#eef2ff">📚</div><div class="stat-body"><div class="stat-num" style="color:#4f46e5">${COURSES.length}</div><div class="stat-label">Active Courses</div></div></div>
    <div class="stat-card"><div class="stat-icon" style="background:#fef2f2">📝</div><div class="stat-body"><div class="stat-num" style="color:#dc2626">${pending}</div><div class="stat-label">Pending Tasks</div></div></div>
    <div class="stat-card"><div class="stat-icon" style="background:#fff7ed">🧩</div><div class="stat-body"><div class="stat-num" style="color:#d97706">${activeQ}</div><div class="stat-label">Active Quizzes</div></div></div>
    <div class="stat-card"><div class="stat-icon" style="background:#f0fdf4">📊</div><div class="stat-body"><div class="stat-num" style="color:#059669">${avgGrade}%</div><div class="stat-label">Avg Grade</div></div></div>
  `);

  // Today classes (Monday = IILM SEM 4A)
  const todayClasses = [
    { time:'8:50–9:50',   subj:'DBMS Lab (Grp 1)', room:'Lab 6-A-06', teacher:'Dr. Pooja Batra', color:'#fef2f2' },
    { time:'11:10–12:10', subj:'Version Control Systems', room:'Room 103', teacher:'Ms. Ishita Tandon', color:'#eef2ff' },
    { time:'12:20–13:20', subj:'Software Engineering', room:'Room 94', teacher:'Dr. Tanu Gupta', color:'#f0fdf4' },
    { time:'14:00–15:00', subj:'Industry Readiness Prog-I', room:'CR5', teacher:'Dr. Pooja Gupta', color:'#fdf4ff' },
  ];
  setHTML('dash-today', todayClasses.map(c => `
    <div class="flex items-center gap-3 mb-2" style="padding:10px;background:${c.color};border-radius:8px;border:1px solid var(--border)">
      <div style="flex-shrink:0;text-align:center;min-width:72px"><div style="font-size:10px;font-weight:600;color:var(--text3)">${c.time}</div></div>
      <div style="flex:1;min-width:0"><div style="font-size:13px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${c.subj}</div><div style="font-size:11px;color:var(--text3)">${c.room} · ${c.teacher}</div></div>
    </div>
  `).join(''));

  // Upcoming assignments
  const upcoming = ASSIGNMENTS.filter(a => a.status === 'pending').slice(0, 3);
  setHTML('dash-assignments', upcoming.map(a => {
    const course = COURSES.find(c => c.id === a.courseId);
    const daysLeft = Math.ceil((a.dueTs - new Date()) / (1000 * 60 * 60 * 24));
    const urgency = daysLeft <= 3 ? 'danger' : daysLeft <= 7 ? 'warning' : 'info';
    return `
      <div class="flex items-center gap-3 mb-2" style="padding:10px;background:var(--surface2);border-radius:8px;border:1px solid var(--border)">
        <div style="width:36px;height:36px;border-radius:8px;background:${course?.color||'#f1f5f9'};display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0">${course?.icon||'📄'}</div>
        <div style="flex:1;min-width:0">
          <div style="font-size:13px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${a.title}</div>
          <div style="font-size:11px;color:var(--text3)">${course?.name} · Due ${a.due}</div>
        </div>
        <span class="badge badge-${urgency}">${daysLeft}d left</span>
      </div>
    `;
  }).join('') || '<div class="text-muted text-sm">No pending assignments 🎉</div>');

  // Recent announcements
  const recentAnns = ANNOUNCEMENTS.slice(0, 3);
  setHTML('dash-announcements', recentAnns.map(a => {
    const icons = { exam:'📋', assignment:'📝', class:'📚', event:'🎯', grade:'📊', general:'📢' };
    return `
      <div class="ann-card" style="margin-bottom:8px" onclick="navigate('announcements')">
        <div class="ann-accent" style="background:${a.priority==='high'?'var(--danger)':a.priority==='medium'?'var(--warning)':'var(--info)'}"></div>
        <div class="ann-body" style="padding:12px">
          <div style="font-size:13px;font-weight:600;margin-bottom:3px">${icons[a.type]||'📢'} ${a.title}</div>
          <div style="font-size:11px;color:var(--text3)">${a.teacher} · ${a.course} · ${a.date}</div>
        </div>
      </div>
    `;
  }).join(''));
}

// ── COURSES ───────────────────────────────────────────────────────────────────
function renderCourses() {
  const isTeacher = APP.currentUser.role === 'teacher';
  let html = '';
  if (isTeacher) {
    html += `<div class="flex items-center justify-between mb-3"><span style="font-size:13px;color:var(--text2)">Manage all course content, post assignments and resources.</span><button class="btn btn-primary btn-sm" onclick="openModal('modal-post-assignment')">+ Post Assignment</button></div>`;
  }
  html += '<div class="grid-auto">';
  COURSES.forEach(c => {
    const grade = GRADES.find(g => g.courseId === c.id);
    html += `
      <div class="course-card" onclick="showToast('Opening ${c.name}...', 'info')">
        <div class="course-banner" style="background:${c.banner}">${c.icon}</div>
        <div class="course-body">
          <div class="course-code">${c.code}</div>
          <div class="course-name">${c.name}</div>
          <div class="course-teacher">👤 ${c.teacher}</div>
          <div class="course-progress">
            <div class="flex justify-between text-xs text-muted"><span>Progress</span><span>${c.progress}%</span></div>
            <div class="prog-bar"><div class="prog-fill" style="width:${c.progress}%;background:${c.banner}"></div></div>
          </div>
        </div>
        <div class="course-footer">
          <span>⚡ ${c.credits} credits</span>
          ${grade ? `<span style="font-weight:600;color:var(--success)">${grade.letter} · ${grade.score}%</span>` : ''}
          <span>🏠 ${c.room}</span>
        </div>
      </div>
    `;
  });
  html += '</div>';
  setHTML('view-courses', html);
}

// ── ASSIGNMENTS ───────────────────────────────────────────────────────────────
function renderAssignments(filterCourse = 'all', filterStatus = 'all') {
  const isTeacher = APP.currentUser.role === 'teacher';
  let list = [...ASSIGNMENTS];
  if (filterCourse !== 'all') list = list.filter(a => a.courseId === filterCourse);
  if (filterStatus !== 'all') list = list.filter(a => a.status === filterStatus);
  // Sort: pending first, then by due date
  list.sort((a, b) => {
    const order = { pending: 0, submitted: 1, graded: 2 };
    if (order[a.status] !== order[b.status]) return order[a.status] - order[b.status];
    return a.dueTs - b.dueTs;
  });

  const courseOptions = COURSES.map(c => `<option value="${c.id}">${c.code} — ${c.name}</option>`).join('');
  let html = `
    <div class="page-header">
      <h1>Assignments</h1>
      <p>Track all your assignments, deadlines, and submission status</p>
    </div>
    ${isTeacher ? `<div class="mb-3"><button class="btn btn-primary" onclick="openModal('modal-post-assignment')">+ Create New Assignment</button></div>` : ''}
    <div class="flex items-center gap-3 mb-4 flex-wrap">
      <div class="search-wrap" style="flex:1;min-width:200px"><span class="search-icon">🔍</span><input class="form-control" style="padding-left:34px" placeholder="Search assignments..." oninput="filterAssignmentsSearch(this.value)"></div>
      <select class="form-control" style="width:auto" onchange="renderAssignments(this.value, document.getElementById('status-filter-sel').value)">
        <option value="all">All Courses</option>${courseOptions}
      </select>
      <select class="form-control" id="status-filter-sel" style="width:auto" onchange="renderAssignments(document.querySelector('[onchange*=renderAssignments]').value, this.value)">
        <option value="all">All Status</option>
        <option value="pending">Pending</option>
        <option value="submitted">Submitted</option>
        <option value="graded">Graded</option>
      </select>
    </div>
    <div id="assignments-list">
  `;

  if (!list.length) {
    html += `<div class="empty-state"><div class="empty-icon">📭</div><div class="empty-title">No assignments found</div><div class="empty-sub">Try changing your filters</div></div>`;
  } else {
    list.forEach(a => {
      const course = COURSES.find(c => c.id === a.courseId);
      const daysLeft = Math.ceil((a.dueTs - new Date()) / (1000 * 60 * 60 * 24));
      const statusClass = a.status === 'pending' && daysLeft <= 3 ? 'urgent' : a.status;
      const badgeType = { pending: daysLeft <= 3 ? 'danger' : daysLeft <= 7 ? 'warning' : 'info', submitted: 'warning', graded: 'success' };
      const statusLabel = { pending: 'Pending', submitted: 'Submitted', graded: 'Graded' };
      html += `
        <div class="assignment-card ${statusClass} mb-3">
          <div class="assignment-title">
            <span style="margin-right:6px">${course?.icon||'📄'}</span>${a.title}
          </div>
          <div class="assignment-meta">
            <span class="badge badge-primary">${course?.code||a.courseId}</span>
            <span class="meta-item">📅 Due: <strong>${a.due}</strong></span>
            <span class="meta-item">⭐ ${a.marks} marks</span>
            <span class="meta-item">👤 ${course?.teacher||''}</span>
            <span class="meta-item">📌 Posted: ${a.posted}</span>
            <span class="badge badge-${badgeType[a.status]}">${statusLabel[a.status]}</span>
            ${a.status === 'pending' && daysLeft > 0 ? `<span class="badge badge-${daysLeft <= 3 ? 'danger' : 'warning'}">${daysLeft}d left</span>` : ''}
            ${a.status === 'graded' ? `<span class="badge badge-success">${a.submission.marks}/${a.marks} · ${a.submission.grade}</span>` : ''}
          </div>
          <div class="assignment-desc">${a.desc}</div>
          ${a.attachments.length ? `
            <div class="flex gap-2 flex-wrap mb-3">
              ${a.attachments.map(att => `<div class="pdf-viewer-hint" style="cursor:pointer" onclick="downloadFile('${att.name}')">📄 ${att.name} <span style="font-size:10px;opacity:.7">${att.size}</span> <span style="font-size:11px;font-weight:600">⬇ Download</span></div>`).join('')}
            </div>
          ` : ''}
          ${a.submission ? `
            <div class="file-preview">
              <span style="font-size:20px">📄</span>
              <div style="flex:1"><div style="font-size:13px;font-weight:600">${a.submission.filename}</div><div style="font-size:11px;color:var(--success)">✅ Submitted on ${a.submission.submittedOn} · ${a.submission.size}</div></div>
              ${a.submission.marks != null ? `<span class="badge badge-success">${a.submission.marks}/${a.marks}</span>` : '<span class="badge badge-warning">Awaiting Grade</span>'}
            </div>
          ` : ''}
          <div class="assignment-footer">
            <div class="flex gap-2 flex-wrap">
              ${!isTeacher && a.status === 'pending' ? `<button class="btn btn-primary btn-sm" onclick="openSubmitModal(${a.id})">📤 Submit Assignment</button>` : ''}
              ${!isTeacher && a.status === 'submitted' ? `<button class="btn btn-sm" onclick="openSubmitModal(${a.id})">🔄 Resubmit</button><button class="btn btn-danger btn-sm" onclick="retractSubmission(${a.id})">✕ Retract</button>` : ''}
              ${isTeacher ? `<button class="btn btn-sm" onclick="showToast('Viewing submissions for: ${a.title}')">👁 View Submissions (${Math.floor(Math.random()*20+10)})</button><button class="btn btn-sm" onclick="showToast('Edit assignment opened')">✏ Edit</button>` : ''}
              ${a.status === 'graded' && a.submission ? `<button class="btn btn-sm" onclick="showToast('Downloading feedback PDF...')">💬 Download Feedback</button>` : ''}
            </div>
          </div>
        </div>
      `;
    });
  }
  html += '</div>';
  setHTML('view-assignments', html);
}

function filterAssignmentsSearch(q) {
  document.querySelectorAll('.assignment-card').forEach(c => {
    const title = c.querySelector('.assignment-title')?.textContent?.toLowerCase() || '';
    c.style.display = title.includes(q.toLowerCase()) ? '' : 'none';
  });
}

function openSubmitModal(assignId) {
  const a = ASSIGNMENTS.find(x => x.id === assignId);
  const course = COURSES.find(c => c.id === a.courseId);
  setHTML('submit-modal-info', `
    <div style="background:var(--surface2);border-radius:8px;padding:12px;margin-bottom:14px">
      <div style="font-size:14px;font-weight:600;margin-bottom:4px">${a.title}</div>
      <div style="font-size:12px;color:var(--text2)">${course?.name} · Due: ${a.due} · ${a.marks} marks</div>
    </div>
  `);
  document.getElementById('modal-submit').dataset.assignId = assignId;
  clearSubmitFile();
  openModal('modal-submit');
}

function submitAssignment() {
  const modal = document.getElementById('modal-submit');
  const assignId = parseInt(modal.dataset.assignId);
  const fileInput = document.getElementById('submit-file-input');
  if (!fileInput.files.length && !APP.uploadedFiles[assignId]) {
    showToast('Please select a PDF file to submit', 'warning'); return;
  }
  const file = fileInput.files[0] || APP.uploadedFiles[assignId];
  const a = ASSIGNMENTS.find(x => x.id === assignId);
  if (a) {
    a.status = 'submitted';
    a.submission = {
      filename: file.name,
      submittedOn: new Date().toLocaleDateString('en-GB', {day:'numeric',month:'short',year:'numeric'}),
      size: file.size > 1024*1024 ? (file.size/1024/1024).toFixed(1)+' MB' : Math.round(file.size/1024)+' KB',
      marks: null,
    };
  }
  closeModal('modal-submit');
  showToast(`✅ "${file.name}" submitted successfully!`, 'success');
  renderAssignments();
}

function retractSubmission(assignId) {
  if (!confirm('Retract your submission? You can re-submit before the deadline.')) return;
  const a = ASSIGNMENTS.find(x => x.id === assignId);
  if (a) { a.status = 'pending'; a.submission = null; }
  showToast('Submission retracted. You may re-submit.', 'warning');
  renderAssignments();
}

function handleFileSelect(event) {
  const file = event.target.files[0];
  if (!file) return;
  const allowed = ['.pdf','.docx','.zip','.pptx','.txt','.py','.java'];
  const ext = '.' + file.name.split('.').pop().toLowerCase();
  if (!allowed.includes(ext)) { showToast('File type not allowed. Use PDF, DOCX, ZIP, PPTX.', 'danger'); return; }
  if (file.size > 50 * 1024 * 1024) { showToast('File too large. Maximum size is 50MB.', 'danger'); return; }
  const modal = document.getElementById('modal-submit');
  const assignId = parseInt(modal.dataset.assignId);
  APP.uploadedFiles[assignId] = file;
  const size = file.size > 1024*1024 ? (file.size/1024/1024).toFixed(1)+' MB' : Math.round(file.size/1024)+' KB';
  setHTML('file-selected-preview', `
    <div class="file-preview">
      <span style="font-size:22px">📄</span>
      <div style="flex:1"><div style="font-size:13px;font-weight:600">${file.name}</div><div style="font-size:11px;color:var(--success)">Ready to submit · ${size}</div></div>
      <button class="btn btn-xs btn-danger" onclick="clearSubmitFile()">Remove</button>
    </div>
  `);
  document.getElementById('upload-zone-submit').style.display = 'none';
}

function clearSubmitFile() {
  document.getElementById('submit-file-input').value = '';
  setHTML('file-selected-preview', '');
  const uz = document.getElementById('upload-zone-submit');
  if (uz) uz.style.display = '';
}

function handleDragOver(e) { e.preventDefault(); document.getElementById('upload-zone-submit').classList.add('drag-over'); }
function handleDragLeave() { document.getElementById('upload-zone-submit').classList.remove('drag-over'); }
function handleDrop(e) {
  e.preventDefault();
  document.getElementById('upload-zone-submit').classList.remove('drag-over');
  const dt = e.dataTransfer;
  if (dt.files.length) { document.getElementById('submit-file-input').files = dt.files; handleFileSelect({ target: document.getElementById('submit-file-input') }); }
}

// ── ANNOUNCEMENTS ─────────────────────────────────────────────────────────────
function renderAnnouncements() {
  const icons = { exam:'📋', assignment:'📝', class:'🏫', event:'🎯', grade:'📊', general:'📢' };
  const colors = { exam:'#dc2626', assignment:'#d97706', class:'#4f46e5', event:'#9333ea', grade:'#059669', general:'#0284c7' };
  const typeFilters = ['all','exam','assignment','class','event','grade','general'];

  let html = `
    <div class="page-header"><h1>Announcements</h1><p>All notices from your teachers and administration</p></div>
    <div class="flex items-center gap-3 mb-4 flex-wrap">
      <div id="ann-type-filters" class="flex gap-2 flex-wrap">
        ${typeFilters.map(t => `<button class="btn btn-sm ${t==='all'?'btn-primary':''}" onclick="filterAnnouncements('${t}', this)">${t==='all'?'All':icons[t]+' '+t.charAt(0).toUpperCase()+t.slice(1)}</button>`).join('')}
      </div>
      ${APP.currentUser.role === 'teacher' ? `<button class="btn btn-primary btn-sm" style="margin-left:auto" onclick="openModal('modal-post-announcement')">+ Post Announcement</button>` : ''}
    </div>
    <div id="ann-list">
  `;

  ANNOUNCEMENTS.forEach(a => {
    html += `
      <div class="ann-card ann-type-${a.type}">
        <div class="ann-accent" style="background:${colors[a.type]||'#4f46e5'}"></div>
        <div class="ann-body">
          <div class="ann-header">
            <div><div class="ann-title">${icons[a.type]||'📢'} ${a.title}</div></div>
            <span class="badge badge-${a.priority==='high'?'danger':a.priority==='medium'?'warning':'gray'}">${a.priority}</span>
          </div>
          <div class="ann-text">${a.body}</div>
          <div class="ann-footer">
            <span>👤 ${a.teacher}</span>
            ${a.course!=='General' ? `<span class="badge badge-primary">${a.course}</span>` : ''}
            <span>📅 ${a.date}</span>
          </div>
        </div>
      </div>
    `;
  });
  html += '</div>';
  setHTML('view-announcements', html);
}

function filterAnnouncements(type, btn) {
  document.querySelectorAll('#ann-type-filters .btn').forEach(b => b.classList.remove('btn-primary'));
  btn.classList.add('btn-primary');
  document.querySelectorAll('.ann-card').forEach(c => {
    c.style.display = type === 'all' || c.classList.contains('ann-type-' + type) ? '' : 'none';
  });
}

// ── QUIZZES ────────────────────────────────────────────────────────────────────
function renderQuizzes() {
  const icons = { active:'🟢', upcoming:'🕐', completed:'✅', expired:'🔴' };
  let html = `
    <div class="page-header"><h1>Quizzes</h1><p>Online assessments — attempt before the deadline</p></div>
    ${APP.currentUser.role === 'teacher' ? `<div class="mb-3"><button class="btn btn-primary btn-sm">+ Create Quiz</button></div>` : ''}
    <div class="mb-4 flex gap-3 flex-wrap">
      ${['all','active','upcoming','completed'].map(s => `<button class="btn btn-sm ${s==='all'?'btn-primary':''}" onclick="filterQuizzes('${s}', this)">${s.charAt(0).toUpperCase()+s.slice(1)}</button>`).join('')}
    </div>
    <div class="grid-auto" id="quizzes-grid">
  `;

  QUIZZES.forEach(q => {
    const course = COURSES.find(c => c.id === q.courseId);
    const statusBadge = { active:'badge-success', upcoming:'badge-info', completed:'badge-gray', expired:'badge-danger' };
    html += `
      <div class="quiz-card ${q.status === 'active' && !q.attempted ? 'active-quiz' : ''} ${q.status === 'expired' || q.attempted ? 'expired' : ''} quiz-type-${q.status}" onclick="${q.status === 'active' && !q.attempted ? `startQuiz(${q.id})` : ''}">
        <div class="flex justify-between items-center mb-2">
          <span class="badge badge-primary">${course?.code}</span>
          <span class="badge ${statusBadge[q.status]}">${icons[q.status]} ${q.status.charAt(0).toUpperCase()+q.status.slice(1)}</span>
        </div>
        <div class="quiz-title">${q.title}</div>
        <div class="quiz-meta">
          <span>⏱ ${q.duration} min</span>
          <span>⭐ ${q.marks} marks</span>
          <span>❓ ${q.questions.length || 5} questions</span>
          <span>🔄 ${q.maxAttempts} attempt${q.maxAttempts>1?'s':''}</span>
        </div>
        <div class="text-xs text-muted mb-2">📅 Opens: ${q.opens} → Closes: ${q.closes}</div>
        ${q.attempted && q.score != null ? `
          <div style="background:var(--success-bg);border-radius:6px;padding:8px;margin-bottom:8px">
            <div style="font-size:13px;font-weight:600;color:var(--success)">Score: ${q.score}/${q.total}</div>
            <div class="quiz-progress"><div class="quiz-progress-fill" style="width:${Math.round(q.score/q.total*100)}%"></div></div>
          </div>
        ` : ''}
        <div class="flex justify-between items-center">
          ${q.status === 'active' && !q.attempted ? `<button class="btn btn-success btn-sm w-full">🚀 Start Quiz</button>` : ''}
          ${q.attempted ? `<button class="btn btn-sm w-full" onclick="showToast('Review not yet available for this quiz')">📋 Review Answers</button>` : ''}
          ${q.status === 'upcoming' ? `<button class="btn btn-sm w-full" disabled style="opacity:.6">Not yet available</button>` : ''}
          ${q.status === 'expired' && !q.attempted ? `<span class="badge badge-danger w-full text-center">Deadline Passed</span>` : ''}
        </div>
      </div>
    `;
  });
  html += '</div>';
  setHTML('view-quizzes', html);
}

function filterQuizzes(status, btn) {
  document.querySelectorAll('#view-quizzes .btn[onclick*="filterQuizzes"]').forEach(b => b.classList.remove('btn-primary'));
  btn.classList.add('btn-primary');
  document.querySelectorAll('.quiz-card').forEach(c => {
    c.style.display = status === 'all' || c.classList.contains('quiz-type-' + status) ? '' : 'none';
  });
}

// ── QUIZ ATTEMPT ──────────────────────────────────────────────────────────────
function startQuiz(quizId) {
  const quiz = QUIZZES.find(q => q.id === quizId);
  if (!quiz || quiz.questions.length === 0) { showToast('Quiz questions not available', 'danger'); return; }
  APP.activeQuiz = quizId;
  APP.quizAnswers = {};
  let timeLeft = quiz.duration * 60;
  let html = `
    <div id="quiz-attempt-wrap">
      <div class="flex justify-between items-center mb-4">
        <div><h2 style="font-size:18px;font-weight:700">${quiz.title}</h2><p style="font-size:12px;color:var(--text3)">${COURSES.find(c=>c.id===quiz.courseId)?.name} · ${quiz.questions.length} questions · ${quiz.marks} marks</p></div>
        <div style="text-align:center;background:var(--surface);border:2px solid var(--danger);border-radius:10px;padding:8px 14px">
          <div style="font-size:11px;font-weight:600;color:var(--text3);text-transform:uppercase">Time Left</div>
          <div id="quiz-timer" style="font-size:20px;font-weight:700;color:var(--danger)" data-left="${timeLeft}">
            ${formatTime(timeLeft)}
          </div>
        </div>
      </div>
      <div id="quiz-questions">
  `;
  quiz.questions.forEach((q, qi) => {
    html += `
      <div class="quiz-question">
        <div class="question-num">Question ${qi+1} of ${quiz.questions.length}</div>
        <div class="question-text">${q.q}</div>
        <div class="option-list">
          ${q.opts.map((opt, oi) => `
            <div class="option-item" id="opt-${qi}-${oi}" onclick="selectOption(${qi}, ${oi}, ${quizId})">
              <div class="option-radio"></div>
              <span>${opt}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  });
  html += `</div>
    <div class="flex justify-between items-center mt-4">
      <button class="btn btn-danger btn-sm" onclick="confirmCancelQuiz()">✕ Cancel Quiz</button>
      <button class="btn btn-success" onclick="submitQuiz(${quizId})">✅ Submit Quiz</button>
    </div>
  </div>`;

  setHTML('view-quizzes', html);
  // Start timer
  APP.quizTimer = setInterval(() => {
    const timerEl = document.getElementById('quiz-timer');
    if (!timerEl) { clearInterval(APP.quizTimer); return; }
    timeLeft--;
    timerEl.dataset.left = timeLeft;
    timerEl.textContent = formatTime(timeLeft);
    if (timeLeft <= 60) timerEl.style.color = 'var(--danger)';
    if (timeLeft <= 0) { clearInterval(APP.quizTimer); submitQuiz(quizId); }
  }, 1000);
}

function selectOption(qi, oi, quizId) {
  APP.quizAnswers[qi] = oi;
  const quiz = QUIZZES.find(q => q.id === quizId);
  for (let i = 0; i < quiz.questions[qi].opts.length; i++) {
    const el = document.getElementById(`opt-${qi}-${i}`);
    if (el) el.classList.remove('selected');
  }
  const sel = document.getElementById(`opt-${qi}-${oi}`);
  if (sel) sel.classList.add('selected');
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60), s = seconds % 60;
  return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}

function confirmCancelQuiz() {
  if (confirm('Cancel the quiz? Your answers will NOT be saved.')) {
    clearInterval(APP.quizTimer);
    APP.activeQuiz = null;
    renderQuizzes();
  }
}

function submitQuiz(quizId) {
  clearInterval(APP.quizTimer);
  const quiz = QUIZZES.find(q => q.id === quizId);
  let score = 0;
  quiz.questions.forEach((q, qi) => {
    if (APP.quizAnswers[qi] === q.ans) score++;
  });
  const marks = Math.round((score / quiz.questions.length) * quiz.marks);

  // Reveal answers
  quiz.questions.forEach((q, qi) => {
    for (let i = 0; i < q.opts.length; i++) {
      const el = document.getElementById(`opt-${qi}-${i}`);
      if (!el) continue;
      el.style.pointerEvents = 'none';
      if (i === q.ans) el.classList.add('correct');
      else if (APP.quizAnswers[qi] === i) el.classList.add('wrong');
    }
  });

  quiz.attempted = true;
  quiz.score = marks;
  quiz.total = quiz.marks;

  const timerEl = document.getElementById('quiz-timer');
  if (timerEl) { timerEl.textContent = '00:00'; timerEl.style.color = 'var(--text3)'; }

  // Show result banner
  const wrap = document.getElementById('quiz-attempt-wrap');
  if (wrap) {
    const banner = document.createElement('div');
    banner.style.cssText = `background:var(--success-bg);border:1px solid rgba(5,150,105,.3);border-radius:12px;padding:20px;text-align:center;margin-bottom:16px`;
    banner.innerHTML = `
      <div style="font-size:32px;margin-bottom:8px">🎉</div>
      <div style="font-size:20px;font-weight:700;color:var(--success)">Quiz Submitted!</div>
      <div style="font-size:28px;font-weight:700;margin:8px 0">${marks} / ${quiz.marks}</div>
      <div style="font-size:14px;color:var(--text2)">${score} out of ${quiz.questions.length} correct · ${Math.round(score/quiz.questions.length*100)}%</div>
      <button class="btn btn-primary mt-3" onclick="renderQuizzes()">Back to Quizzes</button>
    `;
    wrap.insertBefore(banner, wrap.firstChild);
    document.querySelectorAll('.quiz-question .question-num').forEach((el,i) => {
      el.style.color = APP.quizAnswers[i] === quiz.questions[i]?.ans ? 'var(--success)' : 'var(--danger)';
    });
  }
  showToast(`Quiz submitted! Score: ${marks}/${quiz.marks}`, 'success');
}

// ── TIMETABLE ──────────────────────────────────────────────────────────────────
function renderTimetable() {
  const html = `
    <div class="page-header"><h1>Class Timetable</h1><p>B.Tech SEM 4 A — IILM University, Gurugram · w.e.f. 23-03-2026</p></div>
    <div class="card mb-4" style="padding:0;overflow:hidden">
      <div style="overflow-x:auto">
        <table class="tt-table" style="min-width:800px">
          <thead>
            <tr>
              <th style="width:50px"></th>
              <th>Period 1<br><span style="font-weight:400;font-size:10px;opacity:.8">8:50–9:50</span></th>
              <th>Period 2<br><span style="font-weight:400;font-size:10px;opacity:.8">10:00–11:00</span></th>
              <th>Period 3<br><span style="font-weight:400;font-size:10px;opacity:.8">11:10–12:10</span></th>
              <th>Period 4<br><span style="font-weight:400;font-size:10px;opacity:.8">12:20–13:20</span></th>
              <th style="background:#475569;width:60px">LUNCH<br><span style="font-weight:400;font-size:10px;opacity:.8">13:20–14:00</span></th>
              <th>Period 5<br><span style="font-weight:400;font-size:10px;opacity:.8">14:00–15:00</span></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="day-col">Mo</td>
              <td class="cell-lab"><div class="tt-cell">
                <div class="subject">DBMS Lab</div><div class="room">Lab 6-A-06</div><div class="teacher">Dr. Pooja Batra</div>
                <div class="group-note">Grp 1 · SE Lab Grp 2 — Dr. Tanu Gupta (Lab 3-A-03)</div>
              </div></td>
              <td class="cell-vcs"><div class="tt-cell"><div class="subject">Version Control Systems</div><div class="room">Room 103</div><div class="teacher">Ms. Ishita Tandon</div></div></td>
              <td class="cell-se"><div class="tt-cell"><div class="subject">Software Engineering</div><div class="room">Room 94</div><div class="teacher">Dr. Tanu Gupta</div></div></td>
              <td></td>
              <td class="tt-lunch" rowspan="5">LUNCH BREAK</td>
              <td class="cell-irp"><div class="tt-cell"><div class="subject">Industry Readiness Prog-I</div><div class="room">CR5</div><div class="teacher">Dr. Pooja Gupta</div></div></td>
            </tr>
            <tr>
              <td class="day-col">Tu</td>
              <td class="cell-irp"><div class="tt-cell"><div class="subject">Industry Readiness Prog-I</div><div class="room">CR5</div><div class="teacher">Dr. Vaishali</div></div></td>
              <td class="cell-lab"><div class="tt-cell">
                <div class="subject">SE Lab (Grp 1)</div><div class="room">Lab 3-A-03</div><div class="teacher">Dr. Tanu Gupta</div>
                <div class="group-note">DBMS Lab Grp 2 — Dr. Pooja Batra (Lab 6-A-06)</div>
              </div></td>
              <td class="cell-os"><div class="tt-cell"><div class="subject">Operating Systems</div><div class="room">CR5</div><div class="teacher">Dr. Megha Rana</div></div></td>
              <td></td>
              <td class="cell-csa"><div class="tt-cell"><div class="subject">Computer System Architecture</div><div class="room">CR5</div><div class="teacher">Dr. Pallavi Pandey</div></div></td>
            </tr>
            <tr>
              <td class="day-col">We</td>
              <td class="cell-csa"><div class="tt-cell"><div class="subject">Computer System Architecture</div><div class="room">CR5</div><div class="teacher">Dr. Pallavi Pandey</div></div></td>
              <td class="cell-irp"><div class="tt-cell"><div class="subject">Industry Readiness Prog-I</div><div class="room">CR5</div><div class="teacher">Dr. Samridhi Singhal</div></div></td>
              <td class="cell-os"><div class="tt-cell"><div class="subject">Operating Systems</div><div class="room">CR5</div><div class="teacher">Dr. Megha Rana</div></div></td>
              <td class="cell-ps"><div class="tt-cell"><div class="subject">Probability & Statistics</div><div class="room">CR5</div><div class="teacher">Dr. Jayati Tripathi</div></div></td>
              <td class="cell-dbms"><div class="tt-cell"><div class="subject">Database Management Systems</div><div class="room">Room 94</div><div class="teacher">Dr. Pooja Batra</div></div></td>
            </tr>
            <tr>
              <td class="day-col">Th</td>
              <td class="cell-se"><div class="tt-cell"><div class="subject">Software Engineering</div><div class="room">Room 104</div><div class="teacher">Dr. Tanu Gupta</div></div></td>
              <td class="cell-ps"><div class="tt-cell"><div class="subject">Probability & Statistics</div><div class="room">CR5</div><div class="teacher">Dr. Jayati Tripathi</div></div></td>
              <td class="cell-vcs"><div class="tt-cell"><div class="subject">Version Control Systems</div><div class="room">Room 103</div><div class="teacher">Ms. Ishita Tandon</div></div></td>
              <td class="cell-os"><div class="tt-cell"><div class="subject">Operating Systems</div><div class="room">CR5</div><div class="teacher">Dr. Megha Rana</div></div></td>
              <td class="cell-dbms"><div class="tt-cell"><div class="subject">Database Management Systems</div><div class="room">Room 94</div><div class="teacher">Dr. Pooja Batra</div></div></td>
            </tr>
            <tr>
              <td class="day-col">Fr</td>
              <td class="cell-se"><div class="tt-cell"><div class="subject">Software Engineering</div><div class="room">CR5</div><div class="teacher">Dr. Tanu Gupta</div></div></td>
              <td class="cell-irp"><div class="tt-cell"><div class="subject">Industry Readiness Prog-I</div><div class="room">Room 104</div><div class="teacher">Dr. Mansi Verma</div></div></td>
              <td class="cell-csa"><div class="tt-cell"><div class="subject">Computer System Architecture</div><div class="room">CR5</div><div class="teacher">Dr. Pallavi Pandey</div></div></td>
              <td class="cell-dbms"><div class="tt-cell"><div class="subject">Database Management Systems</div><div class="room">Room 94</div><div class="teacher">Dr. Pooja Batra</div></div></td>
              <td class="cell-ps"><div class="tt-cell"><div class="subject">Probability & Statistics</div><div class="room">CR5</div><div class="teacher">Dr. Jayati Tripathi</div></div></td>
            </tr>
            <tr>
              <td class="day-col" style="opacity:.4">Sa</td>
              <td colspan="6" style="background:var(--surface2);text-align:center;padding:20px;font-size:13px;color:var(--text3);opacity:.7">No regular classes on Saturday (Extra sessions scheduled separately)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="grid-4" style="margin-bottom:12px">
      <div style="display:flex;align-items:center;gap:6px;font-size:12px"><div style="width:14px;height:14px;border-radius:3px;background:#eef2ff;border:1px solid var(--border)"></div>VCS</div>
      <div style="display:flex;align-items:center;gap:6px;font-size:12px"><div style="width:14px;height:14px;border-radius:3px;background:#f0fdf4;border:1px solid var(--border)"></div>Software Engg.</div>
      <div style="display:flex;align-items:center;gap:6px;font-size:12px"><div style="width:14px;height:14px;border-radius:3px;background:#fef2f2;border:1px solid var(--border)"></div>DBMS</div>
      <div style="display:flex;align-items:center;gap:6px;font-size:12px"><div style="width:14px;height:14px;border-radius:3px;background:#fff7ed;border:1px solid var(--border)"></div>Operating Systems</div>
      <div style="display:flex;align-items:center;gap:6px;font-size:12px"><div style="width:14px;height:14px;border-radius:3px;background:#f0f9ff;border:1px solid var(--border)"></div>Prob & Stats</div>
      <div style="display:flex;align-items:center;gap:6px;font-size:12px"><div style="width:14px;height:14px;border-radius:3px;background:#fafaf0;border:1px solid var(--border)"></div>Comp. Arch.</div>
      <div style="display:flex;align-items:center;gap:6px;font-size:12px"><div style="width:14px;height:14px;border-radius:3px;background:#fdf4ff;border:1px solid var(--border)"></div>IRP</div>
      <div style="display:flex;align-items:center;gap:6px;font-size:12px"><div style="width:14px;height:14px;border-radius:3px;background:#f8f4ff;border:1px solid var(--border)"></div>Lab Sessions</div>
    </div>
    <p style="font-size:11px;color:var(--text3);text-align:right">Timetable generated: 24-03-2026</p>
  `;
  setHTML('view-timetable', html);
}

// ── CALENDAR ────────────────────────────────────────────────────────────────────
function renderCalendar() {
  const now = APP.calMonth;
  const year = now.getFullYear(), month = now.getMonth();
  const today = new Date();
  const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrev = new Date(year, month, 0).getDate();

  // Build event map
  const eventMap = {};
  EVENTS.forEach(e => {
    const d = e.date;
    if (!eventMap[d]) eventMap[d] = [];
    eventMap[d].push(e);
  });

  let calHTML = `
    <div class="page-header"><h1>Academic Calendar</h1><p>Important dates, holidays, exams, and events for B.Tech SEM 4 A</p></div>
    <div class="grid-2" style="gap:20px;align-items:start">
      <div class="card">
        <div class="card-header">
          <div class="flex items-center gap-3">
            <button class="btn btn-icon btn-sm" onclick="changeCalMonth(-1)">‹</button>
            <div class="card-title" style="margin-bottom:0">${monthNames[month]} ${year}</div>
            <button class="btn btn-icon btn-sm" onclick="changeCalMonth(1)">›</button>
          </div>
          <button class="btn btn-sm" onclick="APP.calMonth=new Date(2026,2,1);renderCalendar()">Today</button>
        </div>
        <div class="calendar-grid">
          ${dayNames.map(d => `<div class="cal-header">${d}</div>`).join('')}
  `;

  let dayNum = 1;
  for (let i = 0; i < 42; i++) {
    if (i < firstDay) {
      const d = daysInPrev - firstDay + i + 1;
      calHTML += `<div class="cal-day other-month"><span>${d}</span></div>`;
    } else if (dayNum > daysInMonth) {
      const d = dayNum - daysInMonth;
      dayNum++;
      calHTML += `<div class="cal-day other-month"><span>${d}</span></div>`;
    } else {
      const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(dayNum).padStart(2,'0')}`;
      const evts = eventMap[dateStr] || [];
      const isToday = today.getFullYear()===year && today.getMonth()===month && today.getDate()===dayNum;
      const isHoliday = evts.some(e => e.type === 'holiday');
      const isExam = evts.some(e => e.type === 'exam');
      const isEvent = evts.some(e => e.type === 'event' || e.type === 'lecture');
      const isSelected = APP.calSelected === dateStr;
      let cls = 'cal-day';
      if (isToday) cls += ' today';
      else if (isHoliday) cls += ' holiday';
      else if (isExam) cls += ' event-day';
      if (evts.length > 0 && !isHoliday) cls += ' has-event';
      if (isSelected) cls += ' selected';
      calHTML += `<div class="${cls}" onclick="selectCalDay('${dateStr}')"><span>${dayNum}</span></div>`;
      dayNum++;
    }
  }

  calHTML += `</div>
        <div class="mt-3 flex gap-3 flex-wrap" style="font-size:11px">
          <span style="display:flex;align-items:center;gap:4px"><span style="width:10px;height:10px;border-radius:2px;background:#dc2626;display:inline-block"></span>Holiday</span>
          <span style="display:flex;align-items:center;gap:4px"><span style="width:10px;height:10px;border-radius:2px;background:#0284c7;display:inline-block"></span>Exam</span>
          <span style="display:flex;align-items:center;gap:4px"><span style="width:10px;height:10px;border-radius:4px;background:var(--accent);display:inline-block"></span>Event/Due</span>
        </div>
      </div>
      <div>
        <div class="card mb-3">
          <div class="card-title mb-3">📌 Events for ${APP.calSelected ? new Date(APP.calSelected).toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'}) : monthNames[month]+' '+year}</div>
          <div id="cal-events-list">
  `;

  // Show events for selected day or all for month
  const shownEvents = APP.calSelected
    ? (eventMap[APP.calSelected] || [])
    : EVENTS.filter(e => e.date.startsWith(`${year}-${String(month+1).padStart(2,'0')}`));

  if (!shownEvents.length) {
    calHTML += `<div class="text-muted text-sm" style="padding:12px 0">No events ${APP.calSelected ? 'on this day' : 'this month'}</div>`;
  } else {
    shownEvents.forEach(e => {
      const d = new Date(e.date);
      const typeColors = { holiday:'var(--danger)', exam:'var(--info)', assignment:'var(--warning)', event:'var(--primary)', lecture:'#9333ea', lab:'#7c3aed', class:'var(--success)' };
      calHTML += `
        <div class="event-item" style="border-left-color:${typeColors[e.type]||'var(--primary)'}">
          <div class="event-date-badge"><div class="e-day">${d.getDate()}</div><div class="e-month">${monthNames[d.getMonth()].slice(0,3)}</div></div>
          <div style="flex:1"><div style="font-size:13px;font-weight:500">${e.title}</div><div style="font-size:11px;color:var(--text3);text-transform:capitalize;margin-top:2px">${e.type}</div></div>
          <span class="badge" style="background:${typeColors[e.type]||'var(--primary)'}22;color:${typeColors[e.type]||'var(--primary)'};flex-shrink:0">${e.type}</span>
        </div>
      `;
    });
  }

  calHTML += `</div></div>
        <div class="card">
          <div class="card-title mb-3">🎓 Upcoming Important Dates</div>
          ${EVENTS.filter(e => new Date(e.date) >= new Date()).slice(0,6).map(e => {
            const d = new Date(e.date);
            const tc = { holiday:'var(--danger)', exam:'var(--info)', assignment:'var(--warning)', event:'var(--primary)', lecture:'#9333ea' };
            return `<div class="event-item" style="border-left-color:${tc[e.type]||'var(--primary)'}"><div class="event-date-badge"><div class="e-day" style="color:${tc[e.type]||'var(--primary)'}">${d.getDate()}</div><div class="e-month">${monthNames[d.getMonth()].slice(0,3)}</div></div><div><div style="font-size:13px;font-weight:500">${e.title}</div></div></div>`;
          }).join('')}
        </div>
      </div>
    </div>
  `;
  setHTML('view-calendar', calHTML);
}

function changeCalMonth(dir) { APP.calMonth = new Date(APP.calMonth.getFullYear(), APP.calMonth.getMonth() + dir, 1); APP.calSelected = null; renderCalendar(); }
function selectCalDay(dateStr) { APP.calSelected = APP.calSelected === dateStr ? null : dateStr; renderCalendar(); }

// ── GRADES ──────────────────────────────────────────────────────────────────────
function renderGrades() {
  const avg = Math.round(GRADES.reduce((s,g) => s+g.score, 0) / GRADES.length);
  const graded = ASSIGNMENTS.filter(a => a.status === 'graded');

  let html = `
    <div class="page-header"><h1>Grades & Performance</h1><p>Your academic performance across all courses</p></div>
    <div class="grid-3 mb-4">
      <div class="stat-card"><div class="stat-icon" style="background:#f0fdf4">📊</div><div class="stat-body"><div class="stat-num" style="color:var(--success)">${avg}%</div><div class="stat-label">Overall Average</div></div></div>
      <div class="stat-card"><div class="stat-icon" style="background:#eef2ff">🎓</div><div class="stat-body"><div class="stat-num" style="color:var(--primary)">${avg >= 90?'A':avg>=80?'A-':avg>=70?'B+':avg>=60?'B':'C'}</div><div class="stat-label">Current Grade</div></div></div>
      <div class="stat-card"><div class="stat-icon" style="background:#fff7ed">📝</div><div class="stat-body"><div class="stat-num" style="color:var(--warning)">${graded.length}</div><div class="stat-label">Graded Assignments</div></div></div>
    </div>
    <div class="card mb-4">
      <div class="card-header"><div class="card-title">📚 Course Performance</div></div>
  `;

  GRADES.forEach(g => {
    const course = COURSES.find(c => c.id === g.courseId);
    const barColor = g.score >= 80 ? 'var(--success)' : g.score >= 60 ? 'var(--primary)' : 'var(--warning)';
    html += `
      <div style="margin-bottom:16px">
        <div class="flex justify-between items-center mb-1">
          <div style="font-size:13px;font-weight:500">${course?.icon} ${course?.name}</div>
          <div class="flex items-center gap-2">
            <span class="badge badge-${g.score>=80?'success':g.score>=60?'primary':'warning'}">${g.letter}</span>
            <span style="font-size:14px;font-weight:700;color:${barColor}">${g.score}%</span>
            <span style="font-size:11px;color:${g.trend.startsWith('+')?'var(--success)':'var(--danger)'}">${g.trend}</span>
          </div>
        </div>
        <div class="grade-bar-wrap"><div class="grade-bar-fill" style="width:${g.score}%;background:${barColor}"></div></div>
        <div class="flex justify-between text-xs text-muted mt-1"><span>${course?.teacher}</span><span>${course?.credits} credits</span></div>
      </div>
    `;
  });
  html += `</div>
    <div class="card">
      <div class="card-header"><div class="card-title">📋 Recent Graded Assignments</div></div>
      <div class="table-wrap">
        <table class="data-table">
          <thead><tr><th>Assignment</th><th>Course</th><th>Submitted</th><th>Marks</th><th>Grade</th><th>Feedback</th></tr></thead>
          <tbody>
  `;
  graded.forEach(a => {
    const course = COURSES.find(c => c.id === a.courseId);
    html += `
      <tr>
        <td style="font-weight:500">${a.title}</td>
        <td><span class="badge badge-primary">${course?.code}</span></td>
        <td style="color:var(--text2)">${a.submission?.submittedOn||'—'}</td>
        <td style="font-weight:700;color:var(--success)">${a.submission?.marks||'—'} / ${a.marks}</td>
        <td><span class="badge badge-success">${a.submission?.grade||'—'}</span></td>
        <td><button class="btn btn-xs" onclick="showToast('Downloading feedback...')">⬇ Get Feedback</button></td>
      </tr>
    `;
  });
  html += `</tbody></table></div></div>`;
  setHTML('view-grades', html);
}

// ── RESOURCES ────────────────────────────────────────────────────────────────────
function renderResources() {
  const filter = document.getElementById('res-course-filter')?.value || 'all';
  const search = document.getElementById('res-search-input')?.value?.toLowerCase() || '';
  let list = filter === 'all' ? RESOURCES : RESOURCES.filter(r => r.courseId === filter);
  if (search) list = list.filter(r => r.name.toLowerCase().includes(search));

  const courseOptions = COURSES.map(c => `<option value="${c.id}">${c.code} — ${c.name}</option>`).join('');
  let html = `
    <div class="page-header"><h1>Course Resources</h1><p>Lecture notes, lab manuals, reference PDFs and slides</p></div>
    <div class="flex items-center gap-3 mb-4 flex-wrap">
      <div class="search-wrap" style="flex:1;min-width:200px"><span class="search-icon">🔍</span><input class="form-control" id="res-search-input" style="padding-left:34px" placeholder="Search resources..." oninput="renderResources()"></div>
      <select class="form-control" id="res-course-filter" style="width:auto" onchange="renderResources()">
        <option value="all">All Courses</option>${courseOptions}
      </select>
      ${APP.currentUser.role === 'teacher' ? `<button class="btn btn-primary" onclick="showToast('Upload resource dialog opened')">+ Upload Resource</button>` : ''}
    </div>
    <div class="table-wrap"><table class="data-table">
      <thead><tr><th>Name</th><th>Course</th><th>Type</th><th>Size</th><th>Uploaded By</th><th>Date</th><th>Action</th></tr></thead>
      <tbody>
  `;

  if (!list.length) {
    html += `<tr><td colspan="7"><div class="empty-state"><div class="empty-icon">📂</div><div class="empty-title">No resources found</div></div></td></tr>`;
  } else {
    list.forEach(r => {
      const course = COURSES.find(c => c.id === r.courseId);
      const typeColor = { PDF:'badge-danger', PPTX:'badge-warning', DOCX:'badge-primary', ZIP:'badge-gray' };
      html += `
        <tr>
          <td><div class="flex items-center gap-2"><span style="font-size:18px">${r.icon}</span><div><div style="font-weight:500">${r.name}</div><div style="font-size:11px;color:var(--text3)">${r.desc}</div></div></div></td>
          <td><span class="badge badge-primary">${course?.code}</span></td>
          <td><span class="badge ${typeColor[r.type]||'badge-gray'}">${r.type}</span></td>
          <td style="color:var(--text2)">${r.size}</td>
          <td style="color:var(--text2)">${r.teacher}</td>
          <td style="color:var(--text2)">${r.date}</td>
          <td><button class="btn btn-sm" onclick="downloadFile('${r.name}')">⬇ Download</button></td>
        </tr>
      `;
    });
  }
  html += `</tbody></table></div>`;
  setHTML('view-resources', html);
}

// ── PROFILE ─────────────────────────────────────────────────────────────────────
function renderProfile() {
  const u = APP.currentUser;
  const isStudent = u.role === 'student';
  const avg = Math.round(GRADES.reduce((s,g) => s+g.score, 0) / GRADES.length);
  html = `
    <div class="page-header"><h1>My Profile</h1></div>
    <div class="grid-2" style="gap:20px;align-items:start">
      <div class="card" style="padding:0;overflow:hidden">
        <div class="profile-cover"></div>
        <div class="profile-av-wrap"><div class="profile-av" style="background:${u.color||'#eef2ff'};color:${u.tc||'#4338ca'}">${u.initials}</div></div>
        <div style="text-align:center;padding:12px 16px 20px">
          <div style="font-size:18px;font-weight:700;margin-top:6px">${u.name}</div>
          <div style="font-size:13px;color:var(--text3);margin-bottom:12px">${isStudent?'B.Tech CSE · SEM 4 · Section A':u.dept}</div>
          <div class="flex justify-center gap-2 flex-wrap">
            ${isStudent?`<span class="badge badge-primary">URN: ${u.urn}</span><span class="badge badge-info">SEM ${u.sem}</span><span class="badge badge-success">Section ${u.section}</span>`:`<span class="badge badge-success">Faculty</span>`}
          </div>
        </div>
        <div style="border-top:1px solid var(--border);padding:16px">
          <div style="font-size:12px;color:var(--text3);margin-bottom:8px;font-weight:600;text-transform:uppercase;letter-spacing:.5px">Contact Info</div>
          ${[['📧 Email', u.email],['📱 Phone', u.phone],['🏛 Institute', 'IILM University, Gurugram'],['🏫 School', 'School of Computer Science']].map(([k,v])=>`<div class="flex justify-between" style="padding:6px 0;border-bottom:1px solid var(--border);font-size:13px"><span style="color:var(--text3)">${k}</span><span style="font-weight:500">${v}</span></div>`).join('')}
        </div>
      </div>
      <div>
        ${isStudent ? `
          <div class="grid-3 mb-3">
            <div class="stat-card"><div class="stat-icon" style="background:#f0fdf4">📊</div><div class="stat-body"><div class="stat-num" style="color:var(--success)">${avg}%</div><div class="stat-label">Avg Grade</div></div></div>
            <div class="stat-card"><div class="stat-icon" style="background:#eef2ff">📚</div><div class="stat-body"><div class="stat-num" style="color:var(--primary)">${COURSES.length}</div><div class="stat-label">Courses</div></div></div>
            <div class="stat-card"><div class="stat-icon" style="background:#fef2f2">📝</div><div class="stat-body"><div class="stat-num" style="color:var(--danger)">${ASSIGNMENTS.filter(a=>a.status==='pending').length}</div><div class="stat-label">Pending</div></div></div>
          </div>
        ` : ''}
        <div class="card mb-3">
          <div class="card-title mb-3">✏ Edit Profile</div>
          <div class="form-group"><label class="form-label">Full Name</label><input class="form-control" value="${u.name}"></div>
          <div class="form-group"><label class="form-label">Email</label><input class="form-control" value="${u.email}" type="email"></div>
          <div class="form-group"><label class="form-label">Phone</label><input class="form-control" value="${u.phone}"></div>
          <button class="btn btn-primary" onclick="showToast('Profile updated successfully!', 'success')">Save Changes</button>
        </div>
        <div class="card">
          <div class="card-title mb-3">🔒 Change Password</div>
          <div class="form-group"><label class="form-label">Current Password</label><input class="form-control" type="password" placeholder="Enter current password"></div>
          <div class="form-group"><label class="form-label">New Password</label><input class="form-control" type="password" placeholder="Minimum 8 characters"></div>
          <div class="form-group"><label class="form-label">Confirm New Password</label><input class="form-control" type="password" placeholder="Repeat new password"></div>
          <button class="btn btn-primary" onclick="showToast('Password changed successfully!', 'success')">Update Password</button>
        </div>
      </div>
    </div>
  `;
  setHTML('view-profile', html);
}

// ── NOTIFICATIONS ─────────────────────────────────────────────────────────────
function buildNotifications() {
  const list = document.getElementById('notif-list');
  if (!list) return;
  list.innerHTML = NOTIFICATIONS.map(n => `
    <div class="notif-item">
      <div class="notif-icon" style="background:${n.color}">${n.icon}</div>
      <div class="notif-body"><div class="notif-title">${n.title}</div><div class="notif-time">${n.time}</div></div>
    </div>
  `).join('');
}

function toggleNotifications() {
  const panel = document.getElementById('notif-panel');
  APP.notifOpen = !APP.notifOpen;
  panel?.classList.toggle('open', APP.notifOpen);
}
function closeNotifications() {
  APP.notifOpen = false;
  document.getElementById('notif-panel')?.classList.remove('open');
}

// ── MODALS ──────────────────────────────────────────────────────────────────────
function openModal(id) { document.getElementById(id)?.classList.add('open'); }
function closeModal(id) { document.getElementById(id)?.classList.remove('open'); }

// Post assignment (teacher)
function postAssignment() {
  const title = document.getElementById('post-assign-title')?.value.trim();
  const course = document.getElementById('post-assign-course')?.value;
  const due = document.getElementById('post-assign-due')?.value;
  const marks = document.getElementById('post-assign-marks')?.value;
  const desc = document.getElementById('post-assign-desc')?.value.trim();
  if (!title || !due) { showToast('Please fill in title and due date', 'warning'); return; }
  ASSIGNMENTS.push({
    id: Date.now(), courseId: course, title, due: new Date(due).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'}),
    dueTs: new Date(due), posted: new Date().toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'}),
    marks: parseInt(marks)||20, status:'pending', desc: desc||'No description provided.', attachments:[], submission:null,
  });
  closeModal('modal-post-assignment');
  showToast(`Assignment "${title}" posted successfully!`, 'success');
  if (APP.currentView === 'assignments') renderAssignments();
}

function postAnnouncement() {
  const title = document.getElementById('post-ann-title')?.value.trim();
  const body = document.getElementById('post-ann-body')?.value.trim();
  const course = document.getElementById('post-ann-course')?.value;
  const type = document.getElementById('post-ann-type')?.value;
  if (!title || !body) { showToast('Title and body are required', 'warning'); return; }
  const courseObj = COURSES.find(c => c.id === course);
  ANNOUNCEMENTS.unshift({
    id: Date.now(), title, body, course: courseObj?.name||'General', courseId: course||null,
    teacher: APP.currentUser.name, date: new Date().toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'}),
    type: type||'general', priority:'medium',
  });
  closeModal('modal-post-announcement');
  showToast('Announcement posted!', 'success');
  if (APP.currentView === 'announcements') renderAnnouncements();
}

// ── UTILITIES ───────────────────────────────────────────────────────────────────
function setHTML(id, html) { const el = document.getElementById(id); if (el) el.innerHTML = html; }

function showToast(msg, type = 'default') {
  const c = document.getElementById('toast-container');
  if (!c) return;
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.innerHTML = `<span style="font-size:15px">${type==='success'?'✅':type==='warning'?'⚠️':type==='danger'?'❌':type==='info'?'ℹ️':'💬'}</span>${msg}`;
  c.appendChild(t);
  setTimeout(() => { t.style.opacity = '0'; t.style.transform = 'translateX(20px)'; t.style.transition = '.3s'; setTimeout(() => t.remove(), 300); }, 3500);
}

function downloadFile(name) { showToast(`Downloading "${name}"...`, 'info'); setTimeout(() => showToast(`"${name}" downloaded successfully!`, 'success'), 1500); }

// Close modals on overlay click
document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('open');
  }
  if (!e.target.closest('#notif-panel') && !e.target.closest('#notif-btn')) {
    closeNotifications();
  }
});
