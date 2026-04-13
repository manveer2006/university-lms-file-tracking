/* ===== VCS FILE TRACKER — Core Git-Based Versioning Engine ===== */

// ─── SHA-1 style hash generator ───────────────────────────────────────────
function generateHash(content, timestamp) {
  let str = content + timestamp + Math.random();
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16).padStart(8, '0').substring(0, 7);
}

// ─── VCS DATA STORE ───────────────────────────────────────────────────────
const VCS_STORE = {
  modules: [
    { id: 'vcs-mod',  courseId: 'vcs',  name: 'Version Control Systems',     icon: '⎇' },
    { id: 'se-mod',   courseId: 'se',   name: 'Software Engineering',         icon: '⚙' },
    { id: 'dbms-mod', courseId: 'dbms', name: 'Database Management Systems',  icon: '🗄' },
    { id: 'os-mod',   courseId: 'os',   name: 'Operating Systems',            icon: '💻' },
    { id: 'ps-mod',   courseId: 'ps',   name: 'Probability & Statistics',     icon: '📈' },
  ],
  files: [
    {
      id: 'f1', moduleId: 'vcs-mod', name: 'VCS_Lecture_Notes_Week1.pdf', type: 'PDF',
      size: '2.4 MB', icon: '📄', branch: 'main', status: 'updated',
      commits: [
        { hash: 'a3f9c2d', message: 'Initial upload — Week 1 lecture notes', author: 'Ms. Ishita Tandon', role: 'teacher', date: '2026-01-10 09:15', linesAdded: 142, linesRemoved: 0, fileSize: '2.1 MB', content: 'Week 1: Introduction to Version Control Systems\n\n1. What is VCS?\nA Version Control System (VCS) tracks changes to files over time.\n\n2. Types of VCS\n- Local VCS\n- Centralized VCS (CVCS)\n- Distributed VCS (DVCS)\n\n3. Git Overview\nGit is the most widely used DVCS.\nCreated by Linus Torvalds in 2005.\n\n4. Key Concepts\n- Repository (repo)\n- Commit\n- Branch\n- Merge\n\n5. Git Workflow\ngit init → git add → git commit → git push' },
        { hash: 'b7e1a84', message: 'Fix typos in Section 3 — corrected Git creator date', author: 'Ms. Ishita Tandon', role: 'teacher', date: '2026-01-14 14:30', linesAdded: 5, linesRemoved: 3, fileSize: '2.1 MB', content: 'Week 1: Introduction to Version Control Systems\n\n1. What is VCS?\nA Version Control System (VCS) tracks and manages changes to files over time, enabling collaboration.\n\n2. Types of VCS\n- Local VCS: Simple database on local machine\n- Centralized VCS (CVCS): Single server stores all versions\n- Distributed VCS (DVCS): Every client has full repository copy\n\n3. Git Overview\nGit is the most widely used DVCS.\nCreated by Linus Torvalds in April 2005 for the Linux kernel.\n\n4. Key Concepts\n- Repository (repo): Storage for all project files and history\n- Commit: A snapshot of changes with unique SHA-1 hash\n- Branch: Independent line of development\n- Merge: Combining two branches\n\n5. Git Workflow\ngit init → git add → git commit → git push' },
        { hash: 'c9d2f11', message: 'Add merge conflict resolution examples and diagrams', author: 'Ms. Ishita Tandon', role: 'teacher', date: '2026-01-18 11:00', linesAdded: 38, linesRemoved: 0, fileSize: '2.4 MB', content: 'Week 1: Introduction to Version Control Systems\n\n1. What is VCS?\nA Version Control System (VCS) tracks and manages changes to files over time, enabling collaboration.\n\n2. Types of VCS\n- Local VCS: Simple database on local machine\n- Centralized VCS (CVCS): Single server stores all versions\n- Distributed VCS (DVCS): Every client has full repository copy\n\n3. Git Overview\nGit is the most widely used DVCS.\nCreated by Linus Torvalds in April 2005 for the Linux kernel.\n\n4. Key Concepts\n- Repository (repo): Storage for all project files and history\n- Commit: A snapshot of changes with unique SHA-1 hash\n- Branch: Independent line of development\n- Merge: Combining two branches\n\n5. Git Workflow\ngit init → git add → git commit → git push\n\n6. Merge Conflicts\nOccur when two branches modify the same line.\nGit marks conflicts with:\n<<<<<<< HEAD\nyour changes\n=======\ntheir changes\n>>>>>>> branch-name\n\n7. Resolving Conflicts\nStep 1: Open the conflicting file\nStep 2: Choose which changes to keep\nStep 3: Remove conflict markers\nStep 4: git add → git commit\n\n8. Branching Strategies\n- Feature branches: feature/login, feature/dashboard\n- GitFlow: main, develop, release, hotfix branches' },
        { hash: 'e4b3a99', message: 'Update branching diagrams — Week 2 content added', author: 'Ms. Ishita Tandon', role: 'teacher', date: '2026-01-22 16:45', linesAdded: 21, linesRemoved: 15, fileSize: '2.4 MB', content: 'Week 1 & 2: Introduction and Branching in Version Control\n\n1. What is VCS?\nA Version Control System (VCS) tracks and manages changes to files over time, enabling collaboration and full history.\n\n2. Types of VCS\n- Local VCS: Simple database on local machine\n- Centralized VCS (CVCS): Single server stores all versions\n- Distributed VCS (DVCS): Every client has full repository copy\n\n3. Git Overview\nGit is the most widely used DVCS.\nCreated by Linus Torvalds in April 2005 for the Linux kernel.\nGit stores data as snapshots, not differences.\n\n4. Key Concepts\n- Repository (repo): Storage for all project files and history\n- Commit: A snapshot of changes with unique SHA-1 hash\n- Branch: Lightweight movable pointer to a commit\n- HEAD: Pointer to current branch\n- Merge: Combining two branches into one\n\n5. Git Workflow\ngit init → git add . → git commit -m "msg" → git push origin main\n\n6. Branching\ngit branch feature-x       # create branch\ngit checkout feature-x      # switch branch\ngit checkout -b feature-x   # create and switch\ngit merge feature-x         # merge into current\ngit branch -d feature-x     # delete branch\n\n7. Merge Conflicts\nOccur when two branches modify the same line.\nGit marks conflicts with:\n<<<<<<< HEAD\nyour changes\n=======\ntheir changes\n>>>>>>> branch-name\n\n8. Branching Strategies\n- Feature branches: feature/login, feature/dashboard\n- GitFlow: main, develop, release, hotfix branches\n- GitHub Flow: main + feature branches only' },
      ]
    },
    {
      id: 'f2', moduleId: 'vcs-mod', name: 'Git_Commands_Cheatsheet.pdf', type: 'PDF',
      size: '580 KB', icon: '📄', branch: 'main', status: 'new',
      commits: [
        { hash: 'f1c2b30', message: 'Add Git cheatsheet for student reference', author: 'Ms. Ishita Tandon', role: 'teacher', date: '2026-01-20 10:00', linesAdded: 56, linesRemoved: 0, fileSize: '520 KB', content: 'GIT COMMANDS CHEATSHEET\n========================\n\nSETUP\ngit config --global user.name "Your Name"\ngit config --global user.email "email@example.com"\n\nINITIALIZE\ngit init          # new repo\ngit clone <url>   # clone existing\n\nSTAGING\ngit status        # check status\ngit add .         # stage all\ngit add <file>    # stage specific\ngit reset <file>  # unstage\n\nCOMMITTING\ngit commit -m "message"\ngit commit --amend\n\nBRANCHING\ngit branch             # list branches\ngit branch <name>      # create\ngit checkout <name>    # switch\ngit checkout -b <name> # create + switch\ngit merge <name>       # merge\ngit branch -d <name>   # delete\n\nREMOTE\ngit remote add origin <url>\ngit push origin main\ngit pull origin main\ngit fetch origin\n\nHISTORY\ngit log\ngit log --oneline\ngit diff\ngit diff HEAD~1' },
        { hash: 'g5a7d80', message: 'Add rebase, stash, and cherry-pick commands', author: 'Ms. Ishita Tandon', role: 'teacher', date: '2026-01-25 12:30', linesAdded: 18, linesRemoved: 2, fileSize: '580 KB', content: 'GIT COMMANDS CHEATSHEET\n========================\n\nSETUP\ngit config --global user.name "Your Name"\ngit config --global user.email "email@example.com"\n\nINITIALIZE\ngit init          # new repo\ngit clone <url>   # clone existing\n\nSTAGING\ngit status        # check status\ngit add .         # stage all\ngit add <file>    # stage specific\ngit reset <file>  # unstage\ngit diff --staged # view staged changes\n\nCOMMITTING\ngit commit -m "message"\ngit commit --amend  # edit last commit\ngit revert <hash>   # safe undo\ngit reset --hard <hash>  # DANGER: rewrites history\n\nBRANCHING\ngit branch             # list branches\ngit branch <name>      # create\ngit checkout <name>    # switch\ngit checkout -b <name> # create + switch\ngit merge <name>       # merge\ngit rebase <branch>    # rebase\ngit cherry-pick <hash> # apply specific commit\ngit branch -d <name>   # delete\n\nSTASH\ngit stash           # save temporarily\ngit stash list      # list stashes\ngit stash pop       # restore latest\ngit stash drop      # discard\n\nREMOTE\ngit remote add origin <url>\ngit push origin main\ngit pull origin main\ngit fetch origin\n\nHISTORY\ngit log\ngit log --oneline --graph\ngit diff\ngit diff HEAD~1\ngit show <hash>' },
      ]
    },
    {
      id: 'f3', moduleId: 'vcs-mod', name: 'Assignment1_VCS.docx', type: 'DOCX',
      size: '320 KB', icon: '📝', branch: 'main', status: 'review',
      commits: [
        { hash: 'h2e9c11', message: 'Post Assignment 1 — Branching & Commits task', author: 'Ms. Ishita Tandon', role: 'teacher', date: '2026-02-01 08:00', linesAdded: 34, linesRemoved: 0, fileSize: '320 KB', content: 'ASSIGNMENT 1 — GIT BRANCHING & COMMITS\nCSE2480 Version Control Systems\nDue Date: 28 March 2026\nMax Marks: 20\n\nOBJECTIVE\nDemonstrate understanding of Git branching, commit history,\nand merge conflict resolution.\n\nTASKS\n1. Create a GitHub repository named "VCS-Assignment1-[URN]"\n2. Create at least 5 meaningful commits on the main branch\n3. Create a feature branch "feature/enhancements"\n4. Make 3 commits on the feature branch\n5. Merge feature branch back to main\n6. Demonstrate a merge conflict and resolve it\n7. Include a README.md with:\n   - Your name and URN\n   - Branch structure explanation\n   - Steps to reproduce\n\nSUBMISSION\n- Upload PDF report (with GitHub link)\n- Show git log --oneline --graph screenshot\n- Attach the GitHub repository link in the PDF\n\nRUBRIC\n- Repository structure: 4 marks\n- Commit quality & messages: 4 marks\n- Branching & merging: 6 marks\n- Merge conflict resolution: 4 marks\n- README completeness: 2 marks' },
      ]
    },
    {
      id: 'f4', moduleId: 'se-mod', name: 'SE_Unit2_UML_Diagrams.pptx', type: 'PPTX',
      size: '4.1 MB', icon: '📊', branch: 'main', status: 'updated',
      commits: [
        { hash: 'i3k7m22', message: 'Upload Unit 2 slides — UML basics', author: 'Dr. Tanu Gupta', role: 'teacher', date: '2026-02-10 09:00', linesAdded: 65, linesRemoved: 0, fileSize: '3.8 MB', content: 'Unit 2: UML Diagrams\n\nSlide 1: Introduction to UML\nUnified Modeling Language — standardized notation\n\nSlide 2: Types of UML Diagrams\n- Structural: Class, Object, Component\n- Behavioral: Use Case, Sequence, Activity\n\nSlide 3: Use Case Diagrams\nActors, Use Cases, System Boundary\nRelationships: include, extend, generalization\n\nSlide 4: Class Diagrams\nClasses, Attributes, Methods\nRelationships: association, aggregation, composition\n\nSlide 5: Sequence Diagrams\nObjects, Lifelines, Messages, Activation bars' },
        { hash: 'j9p4q55', message: 'Add advanced sequence diagrams and component diagrams', author: 'Dr. Tanu Gupta', role: 'teacher', date: '2026-02-18 14:20', linesAdded: 45, linesRemoved: 8, fileSize: '4.1 MB', content: 'Unit 2: UML Diagrams (Updated)\n\nSlide 1: Introduction to UML\nUnified Modeling Language — ISO/IEC 19505 standardized notation\nVersion: UML 2.5\n\nSlide 2: Types of UML Diagrams\n- Structural: Class, Object, Component, Deployment\n- Behavioral: Use Case, Sequence, Activity, State\n\nSlide 3: Use Case Diagrams\nActors, Use Cases, System Boundary\nRelationships: <<include>>, <<extend>>, generalization\nExample: Library Management System\n\nSlide 4: Class Diagrams\nClasses, Attributes (+public, -private, #protected)\nMethods, Relationships: association, aggregation, composition, inheritance\n\nSlide 5: Sequence Diagrams\nObjects, Lifelines, Messages (sync/async), Activation bars\nFragments: alt, opt, loop, ref\n\nSlide 6: Component Diagrams\nComponents, Interfaces (provided/required)\nConnectors, Subsystems\n\nSlide 7: Activity Diagrams\nActions, Decisions, Fork/Join, Swimlanes\n\nSlide 8: Practical Examples\nLibrary System complete UML suite\nOnline Shopping System diagrams' },
        { hash: 'k1r8t77', message: 'Add practice problems and exam preparation slides', author: 'Dr. Tanu Gupta', role: 'teacher', date: '2026-03-01 10:00', linesAdded: 28, linesRemoved: 0, fileSize: '4.1 MB', content: 'Unit 2: UML Diagrams (Final)\n\n[Previous content maintained]\n\nSlide 9: Practice Problems\n1. Draw Use Case diagram for ATM System\n2. Create Class diagram for Hospital Management\n3. Design Sequence diagram for Login Flow\n\nSlide 10: Exam Tips\n- Always label relationships correctly\n- Use proper notation for visibility (+/-/#)\n- Include system boundary in Use Case diagrams\n- Show cardinality in Class diagrams\n- Number your messages in Sequence diagrams\n\nSlide 11: Common Mistakes\n- Confusing include vs extend\n- Missing return messages in sequences\n- Wrong aggregation vs composition\n- Not showing multiplicity' },
      ]
    },
    {
      id: 'f5', moduleId: 'dbms-mod', name: 'DBMS_Lab_Manual_2026.pdf', type: 'PDF',
      size: '5.6 MB', icon: '📄', branch: 'main', status: 'stable',
      commits: [
        { hash: 'l5s9u33', message: 'Upload complete DBMS Lab Manual 2026', author: 'Dr. Pooja Batra', role: 'teacher', date: '2026-01-05 08:30', linesAdded: 180, linesRemoved: 0, fileSize: '5.2 MB', content: 'DBMS LAB MANUAL 2026\nCSE2310 Database Management Systems\n\nExperiment 1: MySQL Installation and Setup\nExperiment 2: DDL Commands — CREATE, ALTER, DROP\nExperiment 3: DML Commands — INSERT, UPDATE, DELETE\nExperiment 4: DQL Commands — SELECT with WHERE, ORDER BY\nExperiment 5: Aggregate Functions — COUNT, SUM, AVG, MAX, MIN\nExperiment 6: JOIN Operations — INNER, LEFT, RIGHT, FULL\nExperiment 7: Subqueries and Nested SELECT\nExperiment 8: Views and Stored Procedures\nExperiment 9: Normalization — 1NF, 2NF, 3NF\nExperiment 10: Transaction Management — COMMIT, ROLLBACK\nExperiment 11: Indexes and Query Optimization\nExperiment 12: ER Diagram to Schema Conversion' },
        { hash: 'm2v1w66', message: 'Add Experiment 13 — NoSQL introduction with MongoDB basics', author: 'Dr. Pooja Batra', role: 'teacher', date: '2026-02-15 11:00', linesAdded: 42, linesRemoved: 5, fileSize: '5.6 MB', content: 'DBMS LAB MANUAL 2026 (Updated)\n\nExperiment 1-12: [Previous content maintained]\n\nExperiment 13: Introduction to NoSQL — MongoDB\n\nObjective: Understand NoSQL databases and basic MongoDB operations\n\nMongoDB Basics:\n- Document-oriented database\n- Collections instead of tables\n- Documents instead of rows (JSON/BSON format)\n\nBasic Commands:\nuse mydb                          // switch/create database\ndb.createCollection("students")   // create collection\ndb.students.insertOne({name:"Aryan", age:20})\ndb.students.find()\ndb.students.find({age:{$gt:18}})\ndb.students.updateOne({name:"Aryan"}, {$set:{age:21}})\ndb.students.deleteOne({name:"Aryan"})\n\nComparison:\nMySQL vs MongoDB\nTables → Collections\nRows → Documents\nSQL → MongoDB Query Language\nSchema → Schema-less' },
      ]
    },
    {
      id: 'f6', moduleId: 'os-mod', name: 'OS_Scheduling_Notes.pdf', type: 'PDF',
      size: '1.8 MB', icon: '📄', branch: 'main', status: 'stable',
      commits: [
        { hash: 'n4x2y44', message: 'Upload process scheduling comprehensive notes', author: 'Dr. Megha Rana', role: 'teacher', date: '2026-02-20 09:00', linesAdded: 95, linesRemoved: 0, fileSize: '1.8 MB', content: 'PROCESS SCHEDULING\nCSE2410 Operating Systems\n\n1. CPU Scheduling Criteria\n- CPU Utilization (maximize)\n- Throughput (maximize)\n- Turnaround Time (minimize)\n- Waiting Time (minimize)\n- Response Time (minimize)\n\n2. FCFS (First Come First Served)\n- Non-preemptive\n- Simple, easy to implement\n- Convoy effect problem\n- Average waiting time often long\n\n3. SJF (Shortest Job First)\n- Optimal for minimizing average waiting time\n- Requires knowing burst time in advance\n- Preemptive version: SRTF\n\n4. Round Robin (RR)\n- Time quantum q (typically 10-100ms)\n- Preemptive FCFS\n- Good for time-sharing\n- Performance depends on quantum size\n\n5. Priority Scheduling\n- Each process has priority number\n- CPU allocated to highest priority\n- Problem: Starvation — solved by Aging\n\n6. Multilevel Queue Scheduling\n- Separate queues for process groups\n- Different algorithms per queue\n\n7. Solved Examples with Gantt Charts\n[FCFS Example]\nProcess  Arrival  Burst   WT   TAT\nP1       0        7       0    7\nP2       2        4       5    9\nP3       4        1       8    9\nAverage WT = 4.33, Average TAT = 8.33' },
      ]
    },
  ],
  // Student submissions tracked as file commits
  studentFiles: [],
};

// ─── DIFF ENGINE ──────────────────────────────────────────────────────────
function computeDiff(oldContent, newContent) {
  const oldLines = (oldContent || '').split('\n');
  const newLines = (newContent || '').split('\n');

  // LCS-based diff
  const m = oldLines.length, n = newLines.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      if (oldLines[i] === newLines[j]) dp[i][j] = dp[i+1][j+1] + 1;
      else dp[i][j] = Math.max(dp[i+1][j], dp[i][j+1]);
    }
  }

  const diff = [];
  let i = 0, j = 0;
  while (i < m || j < n) {
    if (i < m && j < n && oldLines[i] === newLines[j]) {
      diff.push({ type: 'context', line: newLines[j], oldNum: i+1, newNum: j+1 });
      i++; j++;
    } else if (j < n && (i >= m || dp[i+1][j] <= dp[i][j+1])) {
      diff.push({ type: 'added', line: newLines[j], oldNum: null, newNum: j+1 });
      j++;
    } else {
      diff.push({ type: 'removed', line: oldLines[i], oldNum: i+1, newNum: null });
      i++;
    }
  }
  return diff;
}

// Show only changed sections with context
function getHunkDiff(diff, contextLines = 3) {
  const changedIdx = diff.map((d, i) => d.type !== 'context' ? i : -1).filter(i => i >= 0);
  if (!changedIdx.length) return diff.map((d, i) => ({...d, show: true}));

  const showIdx = new Set();
  changedIdx.forEach(ci => {
    for (let k = Math.max(0, ci - contextLines); k <= Math.min(diff.length - 1, ci + contextLines); k++) {
      showIdx.add(k);
    }
  });

  const result = [];
  let lastShown = -1;
  diff.forEach((d, i) => {
    if (showIdx.has(i)) {
      if (lastShown >= 0 && i > lastShown + 1) result.push({ type: 'separator', line: `@@ ... ${i - lastShown - 1} lines hidden ... @@` });
      result.push({...d, show: true});
      lastShown = i;
    }
  });
  return result;
}

// ─── VCS RENDER FUNCTIONS ────────────────────────────────────────────────
let VCS_STATE = {
  selectedModule: null,
  selectedFile: null,
  selectedCommit: null,
  compareFrom: null,
  compareTo: null,
  branch: 'main',
  view: 'files', // files | history | diff | compare | upload
};

function renderVCS() {
  const isTeacher = APP.currentUser.role === 'teacher';
  const html = `
    <div class="page-header">
      <div class="flex justify-between items-center">
        <div>
          <h1>⎇ VCS File Tracker</h1>
          <p>Git-based file version control for all LMS modules — commit, diff, rollback</p>
        </div>
        ${isTeacher ? `<button class="btn btn-primary" onclick="openVCSUploadModal()">⬆ Upload & Commit</button>` : ''}
      </div>
    </div>

    <!-- Branch bar -->
    <div style="display:flex;align-items:center;gap:10px;padding:10px 14px;background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-sm);margin-bottom:16px;font-size:13px">
      <span style="display:flex;align-items:center;gap:5px;background:var(--surface2);border:1px solid var(--border);border-radius:6px;padding:4px 10px;font-family:monospace">⎇ ${VCS_STATE.branch}</span>
      <span style="color:var(--text3)">·</span>
      <span style="color:var(--text3)">${VCS_STORE.files.reduce((s,f) => s + f.commits.length, 0)} total commits across ${VCS_STORE.files.length} files</span>
      <span style="color:var(--text3)">·</span>
      <span style="color:var(--success)">● up to date</span>
      <span style="margin-left:auto;display:flex;gap:6px">
        <button class="btn btn-sm" onclick="renderVCSGlobalHistory()">📋 Full History</button>
        <button class="btn btn-sm" onclick="renderVCSStats()">📊 Stats</button>
      </span>
    </div>

    <div style="display:flex;gap:14px">
      <!-- Module sidebar -->
      <div style="width:220px;flex-shrink:0">
        <div class="card" style="padding:10px">
          <div style="font-size:10px;font-weight:700;color:var(--text3);text-transform:uppercase;letter-spacing:.7px;padding:0 6px;margin-bottom:8px">Modules</div>
          <div id="vcs-module-list">${renderVCSModuleList()}</div>
        </div>
      </div>
      <!-- Main panel -->
      <div style="flex:1;min-width:0" id="vcs-main-panel">
        ${VCS_STATE.selectedModule ? renderVCSFileList() : `
          <div class="card">
            <div class="empty-state"><div class="empty-icon">📁</div><div class="empty-title">Select a module</div><div class="empty-sub">Choose a module from the sidebar to view tracked files</div></div>
          </div>
        `}
      </div>
    </div>
  `;
  setHTML('view-vcs', html);
}

function renderVCSModuleList() {
  return VCS_STORE.modules.map(m => {
    const fileCount = VCS_STORE.files.filter(f => f.moduleId === m.id).length;
    const isActive = VCS_STATE.selectedModule === m.id;
    return `<button onclick="selectVCSModule('${m.id}')" style="display:flex;align-items:center;gap:8px;width:100%;padding:8px 10px;border-radius:6px;border:none;background:${isActive ? 'var(--primary-light)' : 'none'};color:${isActive ? 'var(--primary)' : 'var(--text2)'};cursor:pointer;font-size:13px;font-weight:${isActive ? '600' : '400'};text-align:left;transition:.12s" onmouseover="if(!${isActive})this.style.background='var(--bg)'" onmouseout="if(!${isActive})this.style.background='none'">
      <span style="font-size:15px">${m.icon}</span>
      <span style="flex:1">${m.name.split(' ').slice(0,2).join(' ')}</span>
      <span style="font-size:10px;background:var(--surface2);border:1px solid var(--border);border-radius:10px;padding:1px 5px;color:var(--text3)">${fileCount}</span>
    </button>`;
  }).join('');
}

function selectVCSModule(moduleId) {
  VCS_STATE.selectedModule = moduleId;
  VCS_STATE.selectedFile = null;
  VCS_STATE.view = 'files';
  renderVCS();
}

function renderVCSFileList() {
  const files = VCS_STORE.files.filter(f => f.moduleId === VCS_STATE.selectedModule);
  const module = VCS_STORE.modules.find(m => m.id === VCS_STATE.selectedModule);
  const isTeacher = APP.currentUser.role === 'teacher';

  if (VCS_STATE.selectedFile) return renderVCSFileDetail();

  const statusColors = { updated: '#d97706', new: '#059669', review: '#4f46e5', stable: '#0284c7' };
  const statusBg = { updated: '#fffbeb', new: '#f0fdf4', review: '#eef2ff', stable: '#f0f9ff' };

  return `
    <div class="card" style="padding:0;overflow:hidden">
      <div style="padding:14px 16px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between">
        <div style="font-size:15px;font-weight:600">${module?.icon} ${module?.name}</div>
        ${isTeacher ? `<button class="btn btn-primary btn-sm" onclick="openVCSUploadModal()">⬆ Commit New Version</button>` : ''}
      </div>
      ${files.length === 0 ? `<div class="empty-state"><div class="empty-icon">📂</div><div class="empty-title">No files committed yet</div></div>` : ''}
      ${files.map((f, fi) => {
        const latest = f.commits[f.commits.length - 1];
        const version = `v${f.commits.length}.0`;
        const totalAdded = f.commits.reduce((s, c) => s + c.linesAdded, 0);
        const totalRemoved = f.commits.reduce((s, c) => s + c.linesRemoved, 0);
        return `
          <div style="padding:14px 16px;border-bottom:1px solid var(--border);cursor:pointer;transition:.12s" onclick="selectVCSFile('${f.id}')" onmouseover="this.style.background='var(--surface2)'" onmouseout="this.style.background=''">
            <div style="display:flex;align-items:flex-start;gap:12px">
              <span style="font-size:24px;flex-shrink:0">${f.icon}</span>
              <div style="flex:1;min-width:0">
                <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:4px">
                  <span style="font-size:14px;font-weight:600">${f.name}</span>
                  <span style="font-size:10px;font-weight:700;padding:2px 7px;border-radius:4px;background:${statusBg[f.status]};color:${statusColors[f.status]}">${version}</span>
                  <span style="font-size:10px;padding:2px 7px;border-radius:4px;background:${statusBg[f.status]};color:${statusColors[f.status]}">${f.status}</span>
                </div>
                <div style="font-size:12px;color:var(--text3);display:flex;gap:10px;flex-wrap:wrap">
                  <span>📦 ${f.commits.length} commit${f.commits.length>1?'s':''}</span>
                  <span>💾 ${f.size}</span>
                  <span>🕐 ${latest.date.split(' ')[0]}</span>
                  <span style="color:var(--success)">+${totalAdded}</span>
                  <span style="color:var(--danger)">-${totalRemoved}</span>
                  <span>👤 ${latest.author.split(' ')[0]}</span>
                </div>
                <div style="font-size:12px;color:var(--text2);margin-top:4px;font-family:monospace">
                  <span style="background:var(--surface2);border:1px solid var(--border);border-radius:4px;padding:1px 5px;color:var(--accent)">${latest.hash}</span>
                  "${latest.message}"
                </div>
              </div>
              <div style="display:flex;flex-direction:column;gap:4px;flex-shrink:0">
                <button class="btn btn-xs" onclick="event.stopPropagation();selectVCSFile('${f.id}')">📋 History</button>
                <button class="btn btn-xs" onclick="event.stopPropagation();openVCSDiff('${f.id}')">🔀 Diff</button>
                <button class="btn btn-xs" onclick="event.stopPropagation();downloadFile('${f.name}')">⬇ Download</button>
              </div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function selectVCSFile(fileId) {
  VCS_STATE.selectedFile = fileId;
  VCS_STATE.selectedCommit = null;
  renderVCSPanel();
}

function renderVCSPanel() {
  setHTML('vcs-main-panel', renderVCSFileDetail());
}

function renderVCSFileDetail() {
  const file = VCS_STORE.files.find(f => f.id === VCS_STATE.selectedFile);
  if (!file) return renderVCSFileList();

  const isTeacher = APP.currentUser.role === 'teacher';
  const version = `v${file.commits.length}.0`;

  return `
    <div class="card" style="padding:0;overflow:hidden">
      <!-- File header -->
      <div style="padding:12px 16px;border-bottom:1px solid var(--border);background:var(--surface2);display:flex;align-items:center;gap:10px">
        <button class="btn btn-xs" onclick="VCS_STATE.selectedFile=null;renderVCS()">← Back</button>
        <span style="font-size:16px">${file.icon}</span>
        <div style="flex:1;min-width:0">
          <div style="font-size:14px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${file.name}</div>
          <div style="font-size:11px;color:var(--text3)">⎇ ${file.branch} · ${file.commits.length} commits · ${file.size}</div>
        </div>
        <span style="font-family:monospace;font-size:10px;background:var(--primary-light);color:var(--primary);padding:3px 8px;border-radius:4px;font-weight:700">${version}</span>
      </div>

      <!-- Tab bar -->
      <div style="display:flex;border-bottom:1px solid var(--border);padding:0 14px">
        ${[['commits','📋 Commits'],['diff','🔀 Diff'],['compare','⚡ Compare'],['content','📄 View File']].map(([v,l]) =>
          `<button onclick="VCS_STATE.vcsTab='${v}';renderVCSPanel()" style="padding:10px 14px;border:none;background:none;cursor:pointer;font-size:13px;border-bottom:2px solid ${VCS_STATE.vcsTab===v?'var(--primary)':'transparent'};color:${VCS_STATE.vcsTab===v?'var(--primary)':'var(--text2)'};font-weight:${VCS_STATE.vcsTab===v?'600':'400'}">${l}</button>`
        ).join('')}
        <div style="margin-left:auto;display:flex;align-items:center;gap:6px;padding:6px 0">
          ${isTeacher ? `<button class="btn btn-sm btn-primary" onclick="openVCSUploadModal('${file.id}')">⬆ New Version</button>` : ''}
          <button class="btn btn-sm" onclick="downloadFile('${file.name}')">⬇ Download</button>
        </div>
      </div>

      <div style="padding:16px">
        ${renderVCSTabContent(file)}
      </div>
    </div>
  `;
}

function renderVCSTabContent(file) {
  const tab = VCS_STATE.vcsTab || 'commits';

  if (tab === 'commits') return renderCommitTimeline(file);
  if (tab === 'diff') return renderDiffView(file);
  if (tab === 'compare') return renderCompareView(file);
  if (tab === 'content') return renderFileContent(file);
  return renderCommitTimeline(file);
}

function renderCommitTimeline(file) {
  const isTeacher = APP.currentUser.role === 'teacher';
  const commits = [...file.commits].reverse();

  return `
    <div style="position:relative;padding-left:28px">
      <div style="position:absolute;left:9px;top:12px;bottom:12px;width:2px;background:var(--border)"></div>
      ${commits.map((c, i) => {
        const isHead = i === 0;
        const authorColor = c.role === 'teacher' ? 'var(--primary)' : 'var(--success)';
        const dotColor = c.role === 'teacher' ? '#4f46e5' : '#059669';
        return `
          <div style="position:relative;background:var(--surface2);border:1px solid var(--border);border-radius:var(--radius);padding:14px;margin-bottom:12px;transition:.12s" onmouseover="this.style.borderColor='var(--border2)'" onmouseout="this.style.borderColor='var(--border)'">
            <div style="position:absolute;left:-22px;top:16px;width:11px;height:11px;border-radius:50%;background:${dotColor};border:2px solid var(--surface)"></div>
            <div style="display:flex;align-items:flex-start;gap:10px;flex-wrap:wrap;margin-bottom:8px">
              <span style="font-family:monospace;font-size:11px;background:var(--surface);border:1px solid var(--border);border-radius:4px;padding:2px 7px;color:var(--accent)">${c.hash}</span>
              <span style="flex:1;font-size:13px;font-weight:600">${c.message}</span>
              ${isHead ? `<span style="font-size:10px;background:var(--primary-light);color:var(--primary);padding:2px 7px;border-radius:4px;font-weight:700">HEAD → ${file.branch}</span>` : ''}
            </div>
            <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;font-size:12px;color:var(--text3);margin-bottom:10px">
              <span style="display:flex;align-items:center;gap:4px">
                <span style="width:18px;height:18px;border-radius:50%;background:${authorColor}22;color:${authorColor};display:inline-flex;align-items:center;justify-content:center;font-size:9px;font-weight:700">${c.author.charAt(0)}</span>
                <strong style="color:${authorColor}">${c.author}</strong>
                <span style="background:${c.role==='teacher'?'var(--primary-light)':'var(--success-bg)'};color:${c.role==='teacher'?'var(--primary)':'var(--success)'};font-size:10px;padding:1px 5px;border-radius:3px">${c.role}</span>
              </span>
              <span>🕐 ${c.date}</span>
              <span style="color:var(--success)">+${c.linesAdded}</span>
              <span style="color:var(--danger)">-${c.linesRemoved}</span>
              <span>💾 ${c.fileSize}</span>
            </div>
            <div style="display:flex;gap:6px;flex-wrap:wrap">
              <button class="btn btn-xs" onclick="showCommitDiff('${file.id}', '${c.hash}')">🔀 View Diff</button>
              <button class="btn btn-xs" onclick="viewCommitContent('${file.id}', '${c.hash}')">📄 View File at this commit</button>
              <button class="btn btn-xs" onclick="downloadFile('${file.name} (${c.hash})')">⬇ Download v${file.commits.length - i}.0</button>
              ${isTeacher && !isHead ? `<button class="btn btn-xs btn-danger" onclick="revertToCommit('${file.id}', '${c.hash}')">↩ Revert to this version</button>` : ''}
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function renderDiffView(file) {
  const commits = file.commits;
  if (commits.length < 2) {
    return `<div class="empty-state" style="padding:30px"><div class="empty-icon">🔀</div><div class="empty-title">Only one version</div><div class="empty-sub">Upload a new version to see the diff</div></div>`;
  }

  const latest = commits[commits.length - 1];
  const prev = commits[commits.length - 2];
  const diff = computeDiff(prev.content, latest.content);
  const hunks = getHunkDiff(diff);

  const added = diff.filter(d => d.type === 'added').length;
  const removed = diff.filter(d => d.type === 'removed').length;

  return `
    <div style="margin-bottom:12px;display:flex;align-items:center;gap:10px;flex-wrap:wrap">
      <span style="font-size:13px;color:var(--text2)">Showing changes from</span>
      <span style="font-family:monospace;font-size:11px;background:var(--surface2);border:1px solid var(--border);border-radius:4px;padding:2px 7px;color:var(--danger)">${prev.hash}</span>
      <span style="color:var(--text3)">→</span>
      <span style="font-family:monospace;font-size:11px;background:var(--surface2);border:1px solid var(--border);border-radius:4px;padding:2px 7px;color:var(--success)">${latest.hash}</span>
      <span style="font-size:12px;font-weight:600;color:var(--success)">+${added}</span>
      <span style="font-size:12px;font-weight:600;color:var(--danger)">-${removed}</span>
    </div>
    <div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);overflow:hidden">
      <div style="padding:8px 14px;background:var(--surface2);border-bottom:1px solid var(--border);display:flex;align-items:center;gap:8px;font-size:12px">
        <span>📄</span><span style="font-family:monospace">${file.name}</span>
        <span style="margin-left:auto;color:var(--text3)">Unified diff</span>
      </div>
      <div style="overflow-x:auto;font-family:monospace;font-size:12px">
        ${hunks.map(d => {
          if (d.type === 'separator') return `<div style="padding:4px 14px;background:var(--surface2);color:var(--text3);font-style:italic">${d.line}</div>`;
          const bg = d.type === 'added' ? 'rgba(5,150,105,0.08)' : d.type === 'removed' ? 'rgba(220,38,38,0.08)' : 'transparent';
          const color = d.type === 'added' ? 'var(--success)' : d.type === 'removed' ? 'var(--danger)' : 'var(--text3)';
          const prefix = d.type === 'added' ? '+' : d.type === 'removed' ? '-' : ' ';
          const lineNumColor = d.type === 'context' ? 'var(--text3)' : color;
          return `<div style="display:flex;background:${bg};line-height:1.6">
            <span style="width:36px;text-align:right;padding:0 8px;color:${lineNumColor};background:rgba(0,0,0,.02);border-right:1px solid var(--border);user-select:none;flex-shrink:0">${d.oldNum||''}</span>
            <span style="width:36px;text-align:right;padding:0 8px;color:${lineNumColor};background:rgba(0,0,0,.02);border-right:1px solid var(--border);user-select:none;flex-shrink:0">${d.newNum||''}</span>
            <span style="width:18px;text-align:center;color:${color};font-weight:700;flex-shrink:0">${prefix}</span>
            <span style="padding:0 10px;flex:1;color:${d.type==='context'?'var(--text)':color};white-space:pre">${escapeHtml(d.line)}</span>
          </div>`;
        }).join('')}
      </div>
    </div>
  `;
}

function renderCompareView(file) {
  const commits = file.commits;
  const fromIdx = VCS_STATE.compareFrom ?? 0;
  const toIdx = VCS_STATE.compareTo ?? (commits.length - 1);

  const options = commits.map((c, i) => `<option value="${i}" ${i===fromIdx||i===toIdx?'':''}>v${i+1}.0 — ${c.hash} — ${c.message.substring(0,40)}</option>`).join('');

  let diffHTML = '';
  if (fromIdx !== toIdx) {
    const from = commits[fromIdx];
    const to = commits[toIdx];
    const diff = computeDiff(from.content, to.content);
    const hunks = getHunkDiff(diff);
    const added = diff.filter(d => d.type === 'added').length;
    const removed = diff.filter(d => d.type === 'removed').length;

    diffHTML = `
      <div style="margin-bottom:12px;padding:12px;background:var(--surface2);border-radius:var(--radius-sm);display:flex;gap:16px;flex-wrap:wrap;font-size:13px">
        <span><strong>From:</strong> v${fromIdx+1}.0 — ${from.hash} — "${from.message}"</span><br>
        <span><strong>To:</strong> v${toIdx+1}.0 — ${to.hash} — "${to.message}"</span><br>
        <span style="color:var(--success)">+${added} lines added</span>
        <span style="color:var(--danger)">-${removed} lines removed</span>
        <span style="color:var(--text3)">${Math.abs(added - removed)} net change</span>
      </div>
      <div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);overflow:hidden">
        <div style="overflow-x:auto;font-family:monospace;font-size:12px">
          ${hunks.map(d => {
            if (d.type === 'separator') return `<div style="padding:4px 14px;background:var(--surface2);color:var(--text3);font-style:italic">${d.line}</div>`;
            const bg = d.type === 'added' ? 'rgba(5,150,105,0.08)' : d.type === 'removed' ? 'rgba(220,38,38,0.08)' : 'transparent';
            const color = d.type === 'added' ? 'var(--success)' : d.type === 'removed' ? 'var(--danger)' : 'var(--text3)';
            const prefix = d.type === 'added' ? '+' : d.type === 'removed' ? '-' : ' ';
            return `<div style="display:flex;background:${bg};line-height:1.6">
              <span style="width:36px;text-align:right;padding:0 8px;color:${color};background:rgba(0,0,0,.02);border-right:1px solid var(--border);user-select:none">${d.oldNum||''}</span>
              <span style="width:36px;text-align:right;padding:0 8px;color:${color};background:rgba(0,0,0,.02);border-right:1px solid var(--border);user-select:none">${d.newNum||''}</span>
              <span style="width:18px;text-align:center;color:${color};font-weight:700">${prefix}</span>
              <span style="padding:0 10px;flex:1;color:${d.type==='context'?'var(--text)':color};white-space:pre">${escapeHtml(d.line)}</span>
            </div>`;
          }).join('')}
        </div>
      </div>
    `;
  }

  return `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px">
      <div>
        <label style="font-size:12px;font-weight:600;color:var(--text2);display:block;margin-bottom:5px">Base version</label>
        <select class="form-control" onchange="VCS_STATE.compareFrom=parseInt(this.value);renderVCSPanel()">${options}</select>
      </div>
      <div>
        <label style="font-size:12px;font-weight:600;color:var(--text2);display:block;margin-bottom:5px">Compare with</label>
        <select class="form-control" onchange="VCS_STATE.compareTo=parseInt(this.value);renderVCSPanel()">
          ${commits.map((c,i)=>`<option value="${i}" ${i===toIdx?'selected':''}>v${i+1}.0 — ${c.hash} — ${c.message.substring(0,40)}</option>`).join('')}
        </select>
      </div>
    </div>
    ${diffHTML || `<div class="empty-state" style="padding:30px"><div class="empty-icon">⚡</div><div class="empty-title">Select two different versions to compare</div></div>`}
  `;
}

function renderFileContent(file) {
  const latest = file.commits[file.commits.length - 1];
  return `
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px">
      <span style="font-family:monospace;font-size:11px;background:var(--surface2);border:1px solid var(--border);border-radius:4px;padding:2px 7px;color:var(--accent)">${latest.hash}</span>
      <span style="font-size:12px;color:var(--text3)">Latest version · ${latest.date} · by ${latest.author}</span>
    </div>
    <div style="background:var(--surface2);border:1px solid var(--border);border-radius:var(--radius);overflow:hidden">
      <div style="padding:8px 14px;background:var(--surface);border-bottom:1px solid var(--border);font-size:12px;font-family:monospace;display:flex;justify-content:space-between">
        <span>${file.name}</span>
        <span style="color:var(--text3)">${latest.content.split('\n').length} lines</span>
      </div>
      <div style="overflow-x:auto">
        ${latest.content.split('\n').map((line, i) => `
          <div style="display:flex;line-height:1.7;font-size:12px;font-family:monospace">
            <span style="width:40px;text-align:right;padding:0 10px;color:var(--text3);background:rgba(0,0,0,.02);border-right:1px solid var(--border);user-select:none;flex-shrink:0">${i+1}</span>
            <span style="padding:0 12px;color:var(--text);white-space:pre">${escapeHtml(line)||' '}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// ─── Helper actions ─────────────────────────────────────────────────────
function showCommitDiff(fileId, hash) {
  const file = VCS_STORE.files.find(f => f.id === fileId);
  VCS_STATE.selectedFile = fileId;
  VCS_STATE.vcsTab = 'diff';
  renderVCSPanel();
}

function viewCommitContent(fileId, hash) {
  const file = VCS_STORE.files.find(f => f.id === fileId);
  const commitIdx = file.commits.findIndex(c => c.hash === hash);
  const commit = file.commits[commitIdx];
  // Show in a modal
  setHTML('vcs-content-modal-body', `
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px">
      <span style="font-family:monospace;font-size:11px;background:var(--surface2);border:1px solid var(--border);border-radius:4px;padding:2px 7px;color:var(--accent)">${commit.hash}</span>
      <span style="font-size:12px;color:var(--text2)">${commit.message}</span>
      <span style="font-size:11px;color:var(--text3)">${commit.date} · ${commit.author}</span>
    </div>
    <div style="background:var(--surface2);border:1px solid var(--border);border-radius:var(--radius);overflow:hidden">
      ${commit.content.split('\n').map((line, i) => `
        <div style="display:flex;line-height:1.7;font-size:12px;font-family:monospace">
          <span style="width:40px;text-align:right;padding:0 10px;color:var(--text3);background:rgba(0,0,0,.02);border-right:1px solid var(--border);user-select:none;flex-shrink:0">${i+1}</span>
          <span style="padding:0 12px;color:var(--text);white-space:pre">${escapeHtml(line)||' '}</span>
        </div>
      `).join('')}
    </div>
  `);
  document.getElementById('vcs-content-modal-title').textContent = `📄 ${file.name} at ${commit.hash}`;
  openModal('modal-vcs-content');
}

function openVCSDiff(fileId) {
  VCS_STATE.selectedFile = fileId;
  VCS_STATE.vcsTab = 'diff';
  renderVCSPanel();
  setHTML('vcs-main-panel', renderVCSFileDetail());
}

function revertToCommit(fileId, hash) {
  const file = VCS_STORE.files.find(f => f.id === fileId);
  const commit = file.commits.find(c => c.hash === hash);
  if (!confirm(`Revert "${file.name}" to commit ${hash}?\n\nThis creates a new revert commit preserving the full history.`)) return;

  const newHash = generateHash(commit.content, Date.now());
  const revertCommit = {
    hash: newHash,
    message: `Revert to ${hash} — rollback by ${APP.currentUser.name}`,
    author: APP.currentUser.name,
    role: APP.currentUser.role,
    date: new Date().toLocaleString('en-GB', { year:'numeric', month:'2-digit', day:'2-digit', hour:'2-digit', minute:'2-digit' }).replace(',', ''),
    linesAdded: commit.linesAdded,
    linesRemoved: commit.linesRemoved,
    fileSize: commit.fileSize,
    content: commit.content,
  };
  file.commits.push(revertCommit);
  renderVCSPanel();
  showToast(`↩ Reverted to commit ${hash} — new commit ${newHash} created`, 'success');
}

// ─── VCS Upload Modal ────────────────────────────────────────────────────
function openVCSUploadModal(fileId = null) {
  const moduleOptions = VCS_STORE.modules.map(m => `<option value="${m.id}">${m.name}</option>`).join('');
  setHTML('vcs-upload-modal-body', `
    <div class="form-group">
      <label class="form-label">Module</label>
      <select class="form-control" id="vcs-upload-module" onchange="updateVCSFileOptions(this.value)">
        <option value="">-- Select Module --</option>${moduleOptions}
      </select>
    </div>
    <div class="form-group" id="vcs-file-select-wrap" style="display:none">
      <label class="form-label">File (Upload new file or new version of existing)</label>
      <select class="form-control" id="vcs-upload-existing">
        <option value="new">+ Upload as New File</option>
      </select>
    </div>
    <div class="form-group">
      <label class="form-label">File Name</label>
      <input class="form-control" id="vcs-upload-filename" placeholder="e.g. Lecture_Notes_Week3.pdf">
    </div>
    <div class="form-group">
      <label class="form-label">Commit Message *</label>
      <input class="form-control" id="vcs-upload-message" placeholder="e.g. Add Week 3 lecture notes with examples">
    </div>
    <div class="form-group">
      <label class="form-label">Upload File</label>
      <div class="upload-zone" onclick="document.getElementById('vcs-file-real').click()" ondragover="this.classList.add('drag-over');event.preventDefault()" ondragleave="this.classList.remove('drag-over')" ondrop="handleVCSDrop(event)">
        <div class="upload-icon">📤</div>
        <div class="upload-text">Click or drag & drop file</div>
        <div class="upload-sub">PDF, DOCX, PPTX, ZIP, TXT, PY, Java</div>
      </div>
      <input type="file" id="vcs-file-real" style="display:none" onchange="previewVCSFile(event)">
      <div id="vcs-file-preview"></div>
    </div>
    <div class="form-group">
      <label class="form-label">Description (optional)</label>
      <textarea class="form-control" id="vcs-upload-desc" placeholder="What changed in this version?"></textarea>
    </div>
  `);
  if (fileId) {
    const f = VCS_STORE.files.find(x => x.id === fileId);
    if (f) {
      setTimeout(() => {
        const modEl = document.getElementById('vcs-upload-module');
        if (modEl) { modEl.value = f.moduleId; updateVCSFileOptions(f.moduleId); }
        const fnEl = document.getElementById('vcs-upload-filename');
        if (fnEl) fnEl.value = f.name;
      }, 50);
    }
  }
  openModal('modal-vcs-upload');
}

function updateVCSFileOptions(moduleId) {
  const wrap = document.getElementById('vcs-file-select-wrap');
  const sel = document.getElementById('vcs-upload-existing');
  if (!moduleId || !wrap || !sel) return;
  wrap.style.display = '';
  const files = VCS_STORE.files.filter(f => f.moduleId === moduleId);
  sel.innerHTML = `<option value="new">+ Upload as New File</option>` + files.map(f => `<option value="${f.id}">${f.name} (${f.commits.length} commits)</option>`).join('');
}

function previewVCSFile(event) {
  const file = event.target.files[0];
  if (!file) return;
  document.querySelector('#vcs-upload-modal-body .upload-zone').style.display = 'none';
  setHTML('vcs-file-preview', `
    <div class="file-preview mt-2">
      <span style="font-size:20px">📄</span>
      <div style="flex:1"><div style="font-weight:600;font-size:13px">${file.name}</div><div style="font-size:11px;color:var(--success)">${file.size > 1024*1024 ? (file.size/1024/1024).toFixed(1)+' MB' : Math.round(file.size/1024)+' KB'} · Ready to commit</div></div>
      <button class="btn btn-xs btn-danger" onclick="clearVCSFile()">Remove</button>
    </div>
  `);
  const fnEl = document.getElementById('vcs-upload-filename');
  if (fnEl && !fnEl.value) fnEl.value = file.name;
}

function handleVCSDrop(e) {
  e.preventDefault(); e.target.classList.remove('drag-over');
  if (e.dataTransfer.files.length) { document.getElementById('vcs-file-real').files = e.dataTransfer.files; previewVCSFile({target: document.getElementById('vcs-file-real')}); }
}

function clearVCSFile() {
  document.getElementById('vcs-file-real').value = '';
  setHTML('vcs-file-preview', '');
  const uz = document.querySelector('#vcs-upload-modal-body .upload-zone');
  if (uz) uz.style.display = '';
}

function commitVCSFile() {
  const moduleId = document.getElementById('vcs-upload-module')?.value;
  const message = document.getElementById('vcs-upload-message')?.value.trim();
  const filename = document.getElementById('vcs-upload-filename')?.value.trim();
  const existingId = document.getElementById('vcs-upload-existing')?.value;
  const fileInput = document.getElementById('vcs-file-real');
  const desc = document.getElementById('vcs-upload-desc')?.value.trim();

  if (!moduleId) { showToast('Please select a module', 'warning'); return; }
  if (!message) { showToast('Commit message is required', 'warning'); return; }
  if (!filename) { showToast('File name is required', 'warning'); return; }

  const file = fileInput?.files[0];
  const fileSize = file ? (file.size > 1024*1024 ? (file.size/1024/1024).toFixed(1)+' MB' : Math.round(file.size/1024)+' KB') : '—';
  const fileContent = desc || `Content of ${filename}\n\nCommitted: ${new Date().toLocaleString()}\nBy: ${APP.currentUser.name}\nModule: ${VCS_STORE.modules.find(m=>m.id===moduleId)?.name}`;

  const newCommit = {
    hash: generateHash(filename + message, Date.now()),
    message,
    author: APP.currentUser.name,
    role: APP.currentUser.role,
    date: new Date().toLocaleString('en-GB', {year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit'}).replace(',',''),
    linesAdded: Math.floor(Math.random() * 60) + 10,
    linesRemoved: Math.floor(Math.random() * 20),
    fileSize: file ? fileSize : '—',
    content: fileContent,
  };

  if (existingId && existingId !== 'new') {
    const existing = VCS_STORE.files.find(f => f.id === existingId);
    if (existing) { existing.commits.push(newCommit); existing.size = file ? fileSize : existing.size; existing.status = 'updated'; }
    showToast(`✅ New version committed to "${filename}"`, 'success');
  } else {
    const ext = filename.split('.').pop()?.toUpperCase() || 'FILE';
    const iconMap = { PDF:'📄', DOCX:'📝', PPTX:'📊', ZIP:'🗜', PY:'🐍', JAVA:'☕', TXT:'📋' };
    VCS_STORE.files.push({
      id: 'f' + Date.now(), moduleId, name: filename, type: ext,
      size: file ? fileSize : '—', icon: iconMap[ext]||'📄',
      branch: 'main', status: 'new', commits: [newCommit],
    });
    showToast(`✅ New file committed: "${filename}"`, 'success');
  }

  closeModal('modal-vcs-upload');
  if (VCS_STATE.selectedModule === moduleId) renderVCS();
  else { VCS_STATE.selectedModule = moduleId; renderVCS(); }
}

// ─── Global history ───────────────────────────────────────────────────────
function renderVCSGlobalHistory() {
  const allCommits = [];
  VCS_STORE.files.forEach(f => {
    const mod = VCS_STORE.modules.find(m => m.id === f.moduleId);
    f.commits.forEach((c, i) => allCommits.push({...c, fileName: f.name, fileIcon: f.icon, moduleName: mod?.name, versionNum: i+1, totalVersions: f.commits.length, fileId: f.id}));
  });
  allCommits.sort((a, b) => b.date.localeCompare(a.date));

  const html = `
    <div class="card" style="padding:0;overflow:hidden">
      <div style="padding:14px 16px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between">
        <span style="font-size:15px;font-weight:600">📋 Full Commit History</span>
        <button class="btn btn-xs" onclick="VCS_STATE.selectedFile=null;renderVCS()">← Back to Files</button>
      </div>
      <div style="padding:16px">
        <div style="position:relative;padding-left:28px">
          <div style="position:absolute;left:9px;top:12px;bottom:12px;width:2px;background:var(--border)"></div>
          ${allCommits.map((c) => {
            const dotColor = c.role === 'teacher' ? '#4f46e5' : '#059669';
            return `
              <div style="position:relative;background:var(--surface2);border:1px solid var(--border);border-radius:var(--radius-sm);padding:12px;margin-bottom:8px">
                <div style="position:absolute;left:-22px;top:14px;width:10px;height:10px;border-radius:50%;background:${dotColor};border:2px solid var(--surface)"></div>
                <div style="display:flex;align-items:flex-start;gap:8px;flex-wrap:wrap">
                  <span style="font-family:monospace;font-size:11px;background:var(--surface);border:1px solid var(--border);border-radius:4px;padding:1px 5px;color:var(--accent)">${c.hash}</span>
                  <span style="flex:1;font-size:13px;font-weight:500">${c.message}</span>
                </div>
                <div style="font-size:11px;color:var(--text3);margin-top:6px;display:flex;gap:8px;flex-wrap:wrap">
                  <span>${c.fileIcon} ${c.fileName}</span>
                  <span>📁 ${c.moduleName}</span>
                  <span>👤 ${c.author}</span>
                  <span>🕐 ${c.date}</span>
                  <span style="color:var(--success)">+${c.linesAdded}</span>
                  <span style="color:var(--danger)">-${c.linesRemoved}</span>
                  <span>v${c.versionNum}.0</span>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </div>
  `;
  setHTML('vcs-main-panel', html);
}

function renderVCSStats() {
  const totalCommits = VCS_STORE.files.reduce((s, f) => s + f.commits.length, 0);
  const totalAdded = VCS_STORE.files.reduce((s, f) => s + f.commits.reduce((ss, c) => ss + c.linesAdded, 0), 0);
  const totalRemoved = VCS_STORE.files.reduce((s, f) => s + f.commits.reduce((ss, c) => ss + c.linesRemoved, 0), 0);
  const contributors = [...new Set(VCS_STORE.files.flatMap(f => f.commits.map(c => c.author)))];

  const html = `
    <div class="card" style="padding:0;overflow:hidden">
      <div style="padding:14px 16px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between">
        <span style="font-size:15px;font-weight:600">📊 Repository Statistics</span>
        <button class="btn btn-xs" onclick="VCS_STATE.selectedFile=null;renderVCS()">← Back</button>
      </div>
      <div style="padding:16px">
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:12px;margin-bottom:16px">
          ${[['Total Files', VCS_STORE.files.length, '#4f46e5', '📁'], ['Total Commits', totalCommits, '#059669', '📦'], ['Lines Added', totalAdded, '#059669', '➕'], ['Lines Removed', totalRemoved, '#dc2626', '➖'], ['Contributors', contributors.length, '#0284c7', '👥'], ['Modules', VCS_STORE.modules.length, '#d97706', '📚']].map(([l,v,c,i]) => `
            <div style="background:var(--surface2);border:1px solid var(--border);border-radius:var(--radius);padding:14px;text-align:center">
              <div style="font-size:20px;margin-bottom:4px">${i}</div>
              <div style="font-size:22px;font-weight:700;color:${c}">${v}</div>
              <div style="font-size:11px;color:var(--text3)">${l}</div>
            </div>
          `).join('')}
        </div>
        <div style="margin-bottom:14px">
          <div style="font-size:13px;font-weight:600;margin-bottom:8px">Files by module</div>
          ${VCS_STORE.modules.map(m => {
            const count = VCS_STORE.files.filter(f => f.moduleId === m.id).length;
            const commits = VCS_STORE.files.filter(f => f.moduleId === m.id).reduce((s, f) => s + f.commits.length, 0);
            return `<div style="display:flex;align-items:center;gap:10px;margin-bottom:6px">
              <span style="width:120px;font-size:12px;color:var(--text2)">${m.icon} ${m.name.split(' ')[0]}</span>
              <div style="flex:1;height:8px;background:var(--border);border-radius:4px"><div style="height:100%;border-radius:4px;background:var(--primary);width:${Math.min(100,count*25)}%"></div></div>
              <span style="font-size:11px;color:var(--text3);width:80px;text-align:right">${count} files · ${commits} commits</span>
            </div>`;
          }).join('')}
        </div>
        <div>
          <div style="font-size:13px;font-weight:600;margin-bottom:8px">Contributors</div>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            ${contributors.map(a => `<span style="background:var(--surface2);border:1px solid var(--border);border-radius:6px;padding:6px 10px;font-size:12px;display:flex;align-items:center;gap:6px"><span style="width:22px;height:22px;border-radius:50%;background:var(--primary-light);color:var(--primary);display:inline-flex;align-items:center;justify-content:center;font-size:10px;font-weight:700">${a.charAt(0)}</span>${a}</span>`).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
  setHTML('vcs-main-panel', html);
}

function escapeHtml(text) {
  return (text || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
