// =========================================================================
// PASTE YOUR ORIGINAL HANDWRITTEN PDF LINK HERE:
// Example: "handwritten-notes.pdf" or "https://drive.google.com/file/d/YOUR_ID/view"
// =========================================================================
const ORIGINAL_HANDWRITTEN_PDF_LINK = "https://drive.google.com/file/d/1b6hnaLSJMIorJgEbUGb13pfhaUukVYyL/view?usp=sharing";

// Safe Storage Helpers (prevents crashes on strict file:// or sandboxed viewers)
function safeStorageGet(key, fallback = null) {
    try { return localStorage.getItem(key) ?? fallback; } catch (e) { return fallback; }
}
function safeStorageSet(key, val) {
    try { localStorage.setItem(key, val); } catch (e) {}
}

// Theme Toggle (Dark / Bright Mode)
const themeBtn = document.getElementById('themeToggleBtn');
function applyTheme(mode) {
    const isLight = mode === 'light';
    document.body.classList.toggle('light-mode', isLight);
    if (themeBtn) {
        themeBtn.textContent = isLight ? '☀️' : '🌙';
        themeBtn.title = isLight ? 'Switch to Dark Mode' : 'Switch to Bright Mode';
    }
}
function toggleThemeMode() {
    const nextMode = document.body.classList.contains('light-mode') ? 'dark' : 'light';
    applyTheme(nextMode);
    safeStorageSet('theme', nextMode);
}
applyTheme(safeStorageGet('theme', 'dark'));


// Mobile Menu Toggle & Click-to-Close
const menuToggleBtn = document.getElementById('menuToggleBtn');
const mainNav = document.getElementById('mainNav');
const brandLogo = document.getElementById('brandLogo');

function closeMobileMenu() {
    if (mainNav.classList.contains('open')) {
        mainNav.classList.remove('open');
        menuToggleBtn.textContent = '☰';
        menuToggleBtn.setAttribute('aria-expanded', 'false');
    }
}

menuToggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = mainNav.classList.toggle('open');
    menuToggleBtn.textContent = isOpen ? '✕' : '☰';
    menuToggleBtn.setAttribute('aria-expanded', String(isOpen));
});

mainNav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

brandLogo.addEventListener('click', (e) => {
    closeMobileMenu();
    if (window.location.hash === '#home' || window.location.hash === '') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

document.addEventListener('click', (e) => {
    if (!mainNav.contains(e.target) && !menuToggleBtn.contains(e.target)) {
        closeMobileMenu();
    }
});

// Hash Routing + Loader
function handleRouting() {
    const pageId = window.location.hash.substring(1) || 'home';
    const targetPage = document.getElementById(pageId);
    if (!targetPage) return;
    const loader = document.getElementById('loader');
    loader.classList.add('active');
    setTimeout(() => {
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        document.querySelectorAll('header .nav-link').forEach(b => b.classList.remove('active'));
        targetPage.classList.add('active');
        let navTarget = pageId;
        if (pageId.startsWith('unit') || pageId === 'revision') navTarget = 'notes-hub';
        if (pageId.startsWith('tut')) navTarget = 'tutorials-hub';
        if (pageId === 'handwritten-notes') navTarget = 'handwritten-notes';
        if (pageId === 'features') navTarget = 'more';
        const navBtn = document.querySelector(`[data-target="${navTarget}"]`);
        if (navBtn) navBtn.classList.add('active');
        window.scrollTo(0, 0);
        loader.classList.remove('active');
        if (pageId === 'practice' && isQuizActive && !isQuizEnded) startQuizTimer();
        else pauseQuizTimer();
    }, 450);
}
window.addEventListener('hashchange', handleRouting);
window.addEventListener('load', handleRouting);

// Typing Effect
const typeTextArray = ["Welcome to WebLearnx", "Welcome, Saket Kumar", "Master Web Technology (CS35302)", "Complete Units 1 to 5"];
let tIdx = 0, cIdx = 0, del = false;
const tw = document.getElementById("typewriter");
function typeLoop() {
    const str = typeTextArray[tIdx];
    cIdx += del ? -1 : 1;
    tw.textContent = str.substring(0, cIdx);
    let spd = del ? 50 : 95;
    if (!del && cIdx === str.length) { spd = 1800; del = true; }
    else if (del && cIdx === 0) { del = false; tIdx = (tIdx + 1) % typeTextArray.length; spd = 400; }
    setTimeout(typeLoop, spd);
}
setTimeout(typeLoop, 400);

// Fireworks
function blastFireworks() {
    const c = document.getElementById('fireworks-container'); c.innerHTML = '';
    for (let i = 0; i < 80; i++) {
        const p = document.createElement('div'); p.className = 'firework-particle';
        p.style.left = '50%'; p.style.top = '50%';
        p.style.setProperty('--x', `${(Math.random()-0.5)*600}px`);
        p.style.setProperty('--y', `${(Math.random()-0.5)*600}px`);
        p.style.setProperty('--color', `hsl(${Math.floor(Math.random()*360)},100%,50%)`);
        c.appendChild(p);
    }
    setTimeout(() => c.innerHTML = '', 1400);
}

// Assignments (with Student Name + Random Roll No. Registration)
const assignmentsData = {
    1: { title: "Assignment 1: Frontend Basics", completed: false, score: 0, userAnswers: [], studentName: "", rollNo: "", questions: [
        { q: "1. Which HTML tag displays the largest heading?", opts: ["&lt;head&gt;", "&lt;h6&gt;", "&lt;heading&gt;", "&lt;h1&gt;"], ans: 3 },
        { q: "2. What does CSS stand for?", opts: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style System", "Colorful Style Sheets"], ans: 1 },
        { q: "3. Which attribute specifies alternate text for an image?", opts: ["title", "src", "href", "alt"], ans: 3 },
        { q: "4. How do you select an element with id 'demo' in CSS?", opts: [".demo", "#demo", "*demo", "demo"], ans: 1 },
        { q: "5. Which tag defines an unordered list?", opts: ["&lt;ol&gt;", "&lt;li&gt;", "&lt;ul&gt;", "&lt;list&gt;"], ans: 2 }
    ]},
    2: { title: "Assignment 2: JavaScript & DOM", completed: false, score: 0, userAnswers: [], studentName: "", rollNo: "", questions: [
        { q: "1. Inside which HTML element do we put JavaScript?", opts: ["&lt;js&gt;", "&lt;scripting&gt;", "&lt;script&gt;", "&lt;javascript&gt;"], ans: 2 },
        { q: "2. Correct syntax for external script 'app.js'?", opts: ["&lt;script href='app.js'&gt;", "&lt;script src='app.js'&gt;", "&lt;script name='app.js'&gt;", "&lt;link src='app.js'&gt;"], ans: 1 },
        { q: "3. How do you write 'Hello' in an alert box?", opts: ["msgBox('Hello')", "alertBox('Hello')", "msg('Hello')", "alert('Hello')"], ans: 3 },
        { q: "4. Which method accesses an element by its ID?", opts: ["getElementById()", "getElement()", "getId()", "querySelectorId()"], ans: 0 },
        { q: "5. How do you declare a JavaScript variable?", opts: ["v carName", "variable carName", "let carName", "define carName"], ans: 2 }
    ]}
};
let currentAssignmentId = null;
let pendingAssignmentId = null;
let assignTempRollNo = '';

function generateAssignRollNo() {
    const randNum = Math.floor(100000 + Math.random() * 900000);
    assignTempRollNo = `WLX-ASG-${randNum}`;
    const el = document.getElementById('assignGeneratedRollNo');
    if (el) el.textContent = assignTempRollNo;
    return assignTempRollNo;
}

function openAssignment(id) {
    const data = assignmentsData[id];
    // If not yet registered & not completed, ask for Name + Random Roll No. first
    if (!data.completed && !data.studentName) {
        pendingAssignmentId = id;
        generateAssignRollNo();
        const modal = document.getElementById('assignCandidateModal');
        const input = document.getElementById('assignCandidateNameInput');
        const err = document.getElementById('assignNameError');
        err.style.display = 'none';
        if (typeof candidateName === 'string' && candidateName) input.value = candidateName;
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        setTimeout(() => input.focus(), 60);
        return;
    }
    launchAssignmentRunner(id);
}

function closeAssignCandidateModal() {
    const modal = document.getElementById('assignCandidateModal');
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    pendingAssignmentId = null;
}

function confirmAssignCandidateAndOpen() {
    const input = document.getElementById('assignCandidateNameInput');
    const err = document.getElementById('assignNameError');
    const trimmed = (input.value || '').trim();
    if (!trimmed) {
        err.style.display = 'block';
        input.focus();
        return;
    }
    err.style.display = 'none';
    const id = pendingAssignmentId;
    if (!id) return;
    assignmentsData[id].studentName = trimmed;
    assignmentsData[id].rollNo = assignTempRollNo || generateAssignRollNo();
    closeAssignCandidateModal();
    launchAssignmentRunner(id);
}

const assignNameInputEl = document.getElementById('assignCandidateNameInput');
if (assignNameInputEl) {
    assignNameInputEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') { e.preventDefault(); confirmAssignCandidateAndOpen(); }
    });
    assignNameInputEl.addEventListener('input', () => {
        document.getElementById('assignNameError').style.display = 'none';
    });
}

function launchAssignmentRunner(id) {
    currentAssignmentId = id;
    const data = assignmentsData[id];
    document.getElementById('assign-dashboard').style.display = 'none';
    document.getElementById('assign-runner').style.display = 'block';
    document.getElementById('assign-title').textContent = data.title;
    document.getElementById('assign-error-box').style.display = 'none';
    document.getElementById('assign-submitted-box').style.display = 'none';

    const strip = document.getElementById('assignStudentStrip');
    if (data.studentName) {
        document.getElementById('assignStudentNameDisplay').textContent = data.studentName;
        document.getElementById('assignStudentRollDisplay').textContent = data.rollNo;
        strip.style.display = 'inline-flex';
    } else {
        strip.style.display = 'none';
    }

    const qc = document.getElementById('assign-questions-container');
    qc.innerHTML = data.questions.map((qObj, qi) => `
        <div class="question-block" id="a${id}-q${qi}">
            <div class="question-header-row"><div class="question-title">${qObj.q}</div><span id="badge-a${id}-q${qi}" class="q-result-badge" style="display:none;"></span></div>
            ${qObj.opts.map((opt, oi) => `<label class="radio-option" id="label-a${id}-q${qi}-o${oi}"><input type="radio" name="assign${id}_q${qi}" value="${oi}" ${(data.completed && data.userAnswers[qi]===oi)?'checked':''} ${data.completed?'disabled':''} onchange="document.getElementById('a${id}-q${qi}').classList.remove('unanswered-highlight')">${opt}</label>`).join('')}
        </div>`).join('');
    qc.style.display = 'block';
    if (data.completed) {
        applyGradedStyles(id);
        renderAssignmentSummary(id);
        document.getElementById('assign-submit-wrapper').style.display = 'none';
    } else {
        document.getElementById('assign-result-box').style.display = 'none';
        document.getElementById('assign-submit-wrapper').style.display = 'block';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function closeAssignment() {
    document.getElementById('assign-runner').style.display = 'none';
    document.getElementById('assign-dashboard').style.display = 'flex';
    currentAssignmentId = null;
}

function gradeAssignment() {
    const id = currentAssignmentId, data = assignmentsData[id], err = document.getElementById('assign-error-box');
    let missing = [], picked = [];
    data.questions.forEach((q, qi) => {
        const blk = document.getElementById(`a${id}-q${qi}`); blk.classList.remove('unanswered-highlight');
        let val = null; document.getElementsByName(`assign${id}_q${qi}`).forEach(r => { if (r.checked) val = parseInt(r.value); });
        if (val === null) { missing.push(qi + 1); blk.classList.add('unanswered-highlight'); }
        picked.push(val);
    });
    if (missing.length) {
        err.innerHTML = `⚠️ Please answer ALL questions before submitting! Unanswered: <strong>Q${missing.join(', Q')}</strong>`;
        err.style.display = 'block';
        document.getElementById(`a${id}-q${missing[0]-1}`).scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
    }
    err.style.display = 'none';
    data.userAnswers = picked;
    data.score = data.questions.filter((q, i) => picked[i] === q.ans).length;
    data.completed = true;
    document.getElementById('assign-questions-container').style.display = 'none';
    document.getElementById('assign-submit-wrapper').style.display = 'none';
    document.getElementById('assign-result-box').style.display = 'none';
    document.getElementById('assign-submitted-box').style.display = 'block';
    const badge = document.getElementById(`status-badge-${id}`);
    badge.textContent = `Submitted (${data.score}/${data.questions.length})`;
    badge.className = "status-badge status-completed";
    const btn = document.getElementById(`btn-start-assign-${id}`);
    btn.textContent = "View Results";
    btn.style.background = "var(--glass-bg)";
    btn.style.color = "var(--text-main)";
    btn.style.border = "1px solid var(--primary)";
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function viewAssignmentResults(id) {
    document.getElementById('assign-submitted-box').style.display = 'none';
    document.getElementById('assign-questions-container').style.display = 'block';
    applyGradedStyles(id);
    renderAssignmentSummary(id);
    if (assignmentsData[id].score === assignmentsData[id].questions.length) blastFireworks();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function applyGradedStyles(id) {
    const data = assignmentsData[id];
    data.questions.forEach((q, qi) => {
        document.getElementsByName(`assign${id}_q${qi}`).forEach(r => r.disabled = true);
        const b = document.getElementById(`badge-a${id}-q${qi}`); b.style.display = 'inline-block';
        document.getElementById(`label-a${id}-q${qi}-o${q.ans}`).classList.add('correct-opt');
        if (data.userAnswers[qi] === q.ans) {
            b.textContent = "✔ Correct (+1 Mark)";
            b.className = "q-result-badge q-badge-correct";
        } else {
            document.getElementById(`label-a${id}-q${qi}-o${data.userAnswers[qi]}`).classList.add('wrong-opt');
            b.textContent = "✘ Wrong (0 Marks)";
            b.className = "q-result-badge q-badge-wrong";
        }
    });
}

function renderAssignmentSummary(id) {
    const d = assignmentsData[id], tot = d.questions.length, pct = Math.round((d.score/tot)*100);
    const grade = pct >= 80 ? "A (Excellent)" : pct >= 60 ? "B (Good)" : "C (Needs Practice)";
    const rb = document.getElementById('assign-result-box');
    rb.innerHTML = `
        <h3 style="margin-top:0;color:var(--primary);text-align:center;">📊 Assignment Result Summary</h3>
        <p style="text-align:center; color:var(--text-muted); margin-bottom:14px;">Student: <strong>${d.studentName || 'Candidate'}</strong> &nbsp;|&nbsp; Roll No: <strong style="color:var(--primary); font-family:Consolas,monospace;">${d.rollNo || 'N/A'}</strong></p>
        <div class="assign-result-grid">
            <div class="assign-stat-card"><span>Marks</span><strong>${d.score} / ${tot}</strong></div>
            <div class="assign-stat-card"><span>Percentage</span><strong>${pct}%</strong></div>
            <div class="assign-stat-card"><span>Correct</span><strong style="color:#22c55e;">${d.score}</strong></div>
            <div class="assign-stat-card"><span>Wrong</span><strong style="color:#ef4444;">${tot-d.score}</strong></div>
            <div class="assign-stat-card"><span>Grade</span><strong style="color:var(--accent);font-size:1.05rem;">${grade}</strong></div>
        </div>`;
    rb.style.display = 'block';
}

// ================= AUTHENTIC CBT PRACTICE MODE ENGINE =================
const fullCbtBank = [
    // UNIT 1 (5 Questions)
    { unit: "Unit 1", q: "Which email protocol keeps messages on the mail server and synchronizes folders across multiple devices?", opts: ["POP3", "IMAP", "SMTP", "FTP"], ans: 1, exp: "IMAP (Internet Message Access Protocol) stores emails on the server and synchronizes read/delete/folder actions across mobile, laptop, and tablet." },
    { unit: "Unit 1", q: "What is the default port number used by HTTPS for encrypted web communication?", opts: ["Port 25", "Port 80", "Port 443", "Port 110"], ans: 2, exp: "HTTP uses Port 80 by default, while HTTPS uses Port 443 with SSL/TLS encryption." },
    { unit: "Unit 1", q: "Which DNS record maps a domain name to an IPv4 address?", opts: ["MX Record", "A Record", "CNAME Record", "TXT Record"], ans: 1, exp: "An 'A' (Address) record maps a domain name to a 32-bit IPv4 address, while 'AAAA' maps to IPv6." },
    { unit: "Unit 1", q: "Which protocol is specifically used to send non-text multimedia attachments (images, PDFs, audio) via email?", opts: ["MIME", "POP3", "ARP", "TELNET"], ans: 0, exp: "MIME (Multipurpose Internet Mail Extensions) extends standard text email to support multimedia and file attachments." },
    { unit: "Unit 1", q: "Which HTTP status code indicates that the requested web resource was not found on the server?", opts: ["200 OK", "301 Moved Permanently", "404 Not Found", "503 Service Unavailable"], ans: 2, exp: "404 Not Found means the server could not find the requested resource at the given URL." },

    // UNIT 2 (5 Questions)
    { unit: "Unit 2", q: "Which XML parser loads the entire XML document into memory as a tree structure and allows modification?", opts: ["SAX Parser", "DOM Parser", "CSS Parser", "JSON Parser"], ans: 1, exp: "DOM (Document Object Model) builds an in-memory tree allowing random access and node editing, whereas SAX reads sequentially." },
    { unit: "Unit 2", q: "In the CSS Box Model, which layer sits directly between the Content and the Border?", opts: ["Margin", "Outline", "Padding", "Float"], ans: 2, exp: "The CSS Box Model order from inside out is: Content → Padding → Border → Margin." },
    { unit: "Unit 2", q: "Which HTML5 element is used to embed another webpage inside the current webpage after <frameset> was removed?", opts: ["<frame>", "<iframe>", "<embedset>", "<window>"], ans: 1, exp: "HTML5 deprecated <frameset> and <frame>; modern pages use <iframe> to embed external documents." },
    { unit: "Unit 2", q: "Dynamic HTML (DHTML) is a combination of HTML, CSS, JavaScript, and which fourth component?", opts: ["SQL", "DOM", "FTP", "SMTP"], ans: 1, exp: "DHTML combines HTML (structure), CSS (presentation), JavaScript (behaviour), and DOM (programmatic element access)." },
    { unit: "Unit 2", q: "Which advantage does XML Schema (XSD) have over DTD?", opts: ["Written in XML syntax with rich data types and namespaces", "Uses fewer tags than JSON", "Does not require a root element", "Only works with HTML4"], ans: 0, exp: "XSD is written in XML syntax itself and supports strong data typing (integer, date, string) and XML namespaces." },

    // UNIT 3 (5 Questions)
    { unit: "Unit 3", q: "In Web Service Architecture, which technology acts as a directory to publish and discover web services?", opts: ["SOAP", "WSDL", "UDDI", "CSS"], ans: 2, exp: "UDDI (Universal Description, Discovery and Integration) acts as the service registry: UDDI = Find, WSDL = Describe, SOAP = Communicate." },
    { unit: "Unit 3", q: "Which part of a SOAP message carries error information if a request fails?", opts: ["SOAP Envelope", "SOAP Header", "SOAP Fault", "SOAP Binding"], ans: 2, exp: "A SOAP message has 4 parts: Envelope, Header, Body, and Fault (inside Body) for reporting errors." },
    { unit: "Unit 3", q: "How does AJAX improve web application performance?", opts: ["By compiling HTML to binary", "By updating specific page sections asynchronously without full reloads", "By disabling CSS styling", "By storing passwords in URLs"], ans: 1, exp: "AJAX sends asynchronous background requests (XHR/Fetch) and updates only required DOM elements, saving bandwidth and time." },
    { unit: "Unit 3", q: "What is the role of the ORB in CORBA architecture?", opts: ["Object Request Broker that routes requests between distributed objects", "Online Resource Browser", "Open Relational Backend", "Object Rendering Buffer"], ans: 0, exp: "The ORB (Object Request Broker) enables distributed objects written in different languages (e.g., Java and C++) to communicate." },
    { unit: "Unit 3", q: "Which XML-based language describes a web service's operations, messages, protocols, and endpoints?", opts: ["UDDI", "WSDL", "HTML5", "IMAP"], ans: 1, exp: "WSDL (Web Services Description Language) describes what a web service does and how clients can bind to it." },

    // UNIT 4 (5 Questions)
    { unit: "Unit 4", q: "Which framework represents web resource information as Subject – Predicate – Object triples?", opts: ["RSS", "RDF", "MVC", "AJAX"], ans: 1, exp: "RDF (Resource Description Framework) models Semantic Web data as triples (e.g., Subject: Rahul, Predicate: Studies, Object: CSE)." },
    { unit: "Unit 4", q: "What are the three major stages in the working of a Search Engine?", opts: ["Designing, Hosting, Styling", "Crawling, Indexing, Ranking", "Compiling, Linking, Executing", "Encrypting, Decrypting, Signing"], ans: 1, exp: "Search engines discover pages via Crawling, organize them in Indexing, and order results via Ranking." },
    { unit: "Unit 4", q: "Which web application combines data or services from two or more external sources to create a new service?", opts: ["Mashup", "Cookie", "Firewall", "Frameset"], ans: 0, exp: "A Mashup integrates multiple sources—for example, combining Google Maps with a restaurant database." },
    { unit: "Unit 4", q: "What is the primary benefit of Edge Computing over centralized Cloud Computing?", opts: ["Higher network latency", "Processes data closer to the user/source for lower latency", "Eliminates HTML tags", "Increases server distance"], ans: 1, exp: "Edge Computing processes data near the source (e.g., IoT devices), reducing latency and bandwidth usage." },
    { unit: "Unit 4", q: "Ruby on Rails is a server-side web framework built around which architectural pattern?", opts: ["Peer-to-Peer", "Model-View-Controller (MVC)", "Ring Topology", "Token Bus"], ans: 1, exp: "Ruby on Rails follows MVC (Model = data/logic, View = UI, Controller = request coordination) and Convention over Configuration." },

    // UNIT 5 (5 Questions)
    { unit: "Unit 5", q: "Which emerging web generation emphasizes AI, IoT connectivity, automation, and highly personalized services?", opts: ["Web 1.0", "Web 2.0", "Web 3.0", "Web 4.0"], ans: 3, exp: "Web 4.0 combines AI, ML, IoT, and real-time automation for intelligent, context-aware, personalized web experiences." },
    { unit: "Unit 5", q: "How does Augmented Reality (AR) differ from Virtual Reality (VR)?", opts: ["AR overlays digital objects on the real world; VR creates a fully simulated 3D world", "VR keeps the real world visible; AR uses no camera", "AR only works without 5G", "Both are identical terms"], ans: 0, exp: "AR enhances the visible real world with digital overlays (e.g., virtual furniture), while VR immerses the user in a computer-generated world." },
    { unit: "Unit 5", q: "Which of the following tools is widely used for Web Automation and automated browser testing?", opts: ["Selenium", "POP3", "MIME", "XSD"], ans: 0, exp: "Selenium (along with Playwright and Puppeteer) is a standard tool for automating browser testing and repetitive web tasks." },
    { unit: "Unit 5", q: "In Blockchain integration, what are self-executing programs that run automatically when predefined conditions are met?", opts: ["Smart Contracts", "HTML Forms", "DNS Resolvers", "Cookies"], ans: 0, exp: "Smart Contracts are stored on a blockchain and execute automatically when specified conditions are satisfied." },
    { unit: "Unit 5", q: "How does an Adaptive Interface differ from a standard Responsive Interface?", opts: ["Adaptive changes layout, content, and functionality by user/device/context; Responsive mainly adjusts layout to screen size", "Responsive uses AI; Adaptive only uses tables", "Adaptive cannot work on mobile phones", "There is no difference"], ans: 0, exp: "Responsive design adapts layout via grids/media queries, while Adaptive interfaces personalize layout, content, and features based on user context." }
];

let selectedCbtScope = 'all';
let selectedCbtMode = 'practice'; // 'practice' or 'exam'
let selectedCbtDuration = 600;    // default 10 min

let candidateName = '';
let candidateRollNo = '';

let pQuestions = [];
let pCurrentQ = 0;
let pAttempts = [];      // 0, 1, or 2 (max 2 chances per question)
let pWrongChoices = [];  // array of wrong indices already picked on each Q
let pStatus = [];        // 'unviewed', 'viewed', 'marked', 'answered', 'wrong-ans'
let pSelectedOpts = [];  // final selected option index or null
let pLocked = [];        // true once solved or 2 attempts exhausted
let pMarks = [];         // 1 (1st try right), 0.5 (2nd try right), 0 (wrong/skipped)
let pQuestionTime = [];  // seconds spent per question

let quizTimerInterval = null;
let totalSeconds = 600;
let secondsLeft = 600;
let isQuizActive = false;
let isQuizEnded = false;

function getInitials(name) {
    const parts = (name || 'WL').trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return 'WL';
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function generateRandomRollNo() {
    const randNum = Math.floor(100000 + Math.random() * 900000);
    candidateRollNo = `WLX-26-${randNum}`;
    const el = document.getElementById('cbtGeneratedRollNo');
    if (el) el.textContent = candidateRollNo;
    return candidateRollNo;
}

function openCandidateModal() {
    const declareCheck = document.getElementById('cbtDeclareCheck');
    if (declareCheck && !declareCheck.checked) {
        alert('Please check the declaration box to confirm you have read the instructions.');
        return;
    }
    generateRandomRollNo();
    const modal = document.getElementById('cbtCandidateModal');
    const input = document.getElementById('cbtCandidateNameInput');
    const err = document.getElementById('cbtNameError');
    err.style.display = 'none';
    if (candidateName) input.value = candidateName;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    setTimeout(() => input.focus(), 60);
}

function closeCandidateModal() {
    const modal = document.getElementById('cbtCandidateModal');
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
}

function confirmCandidateAndStart() {
    const input = document.getElementById('cbtCandidateNameInput');
    const err = document.getElementById('cbtNameError');
    const trimmed = (input.value || '').trim();
    if (!trimmed) {
        err.style.display = 'block';
        input.focus();
        return;
    }
    err.style.display = 'none';
    candidateName = trimmed;
    if (!candidateRollNo) generateRandomRollNo();

    const initials = getInitials(candidateName);
    document.getElementById('cbtSideAvatar').textContent = initials;
    document.getElementById('cbtSideName').textContent = candidateName;
    document.getElementById('cbtSideRoll').textContent = `Roll No: ${candidateRollNo}`;
    document.getElementById('lobbyAvatar').textContent = initials;
    document.getElementById('lobbyCandName').textContent = candidateName;
    document.getElementById('lobbyCandMeta').textContent = `Roll No: ${candidateRollNo} | Web Technology (CS35302)`;

    closeCandidateModal();
    startQuiz();
}

const candNameInputEl = document.getElementById('cbtCandidateNameInput');
if (candNameInputEl) {
    candNameInputEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') { e.preventDefault(); confirmCandidateAndStart(); }
    });
    candNameInputEl.addEventListener('input', () => {
        document.getElementById('cbtNameError').style.display = 'none';
    });
}

function selectCbtScope(scope, btn) {
    selectedCbtScope = scope;
    document.querySelectorAll('#cbtScopeGroup .cbt-chip').forEach(c => c.classList.remove('active'));
    if (btn) btn.classList.add('active');
    if (scope !== 'all') {
        const fiveBtn = document.querySelector('#cbtTimeGroup [data-time="300"]');
        if (fiveBtn) selectCbtTime(300, fiveBtn);
    } else {
        const tenBtn = document.querySelector('#cbtTimeGroup [data-time="600"]');
        if (tenBtn) selectCbtTime(600, tenBtn);
    }
}

function selectCbtMode(mode, btn) {
    selectedCbtMode = mode;
    document.querySelectorAll('#cbtModeGroup .cbt-chip').forEach(c => c.classList.remove('active'));
    if (btn) btn.classList.add('active');
}

function selectCbtTime(sec, btn) {
    selectedCbtDuration = sec;
    document.querySelectorAll('#cbtTimeGroup .cbt-chip').forEach(c => c.classList.remove('active'));
    if (btn) btn.classList.add('active');
}

function startQuiz() {
    if (!candidateName) { openCandidateModal(); return; }
    pQuestions = selectedCbtScope === 'all'
        ? fullCbtBank.map(q => ({ ...q }))
        : fullCbtBank.filter(q => q.unit === selectedCbtScope).map(q => ({ ...q }));

    pCurrentQ = 0;
    pAttempts = new Array(pQuestions.length).fill(0);
    pWrongChoices = Array.from({ length: pQuestions.length }, () => []);
    pStatus = new Array(pQuestions.length).fill('unviewed');
    pSelectedOpts = new Array(pQuestions.length).fill(null);
    pLocked = new Array(pQuestions.length).fill(false);
    pMarks = new Array(pQuestions.length).fill(0);
    pQuestionTime = new Array(pQuestions.length).fill(0);

    totalSeconds = selectedCbtDuration;
    secondsLeft = totalSeconds;
    isQuizActive = true;
    isQuizEnded = false;

    document.getElementById('cbtModePill').textContent = selectedCbtMode === 'practice' ? 'PRACTICE MODE (2 CHANCES)' : 'REAL CBT EXAM (2 CHANCES)';
    document.getElementById('quiz-intro').style.display = 'none';
    document.getElementById('quiz-report').style.display = 'none';
    document.getElementById('quiz-wrapper').style.display = 'block';

    updateTimerDisplay();
    loadPQuestion();
    startQuizTimer();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function startQuizTimer() {
    if (isQuizEnded || !isQuizActive) return;
    clearInterval(quizTimerInterval);
    quizTimerInterval = setInterval(() => {
        secondsLeft--;
        pQuestionTime[pCurrentQ] = (pQuestionTime[pCurrentQ] || 0) + 1;
        updateTimerDisplay();
        updateQTimeDisplay();
        if (secondsLeft <= 0) {
            clearInterval(quizTimerInterval);
            alert("⏱️ Time's up! Your exam is being auto-submitted.");
            confirmFinalSubmit();
        }
    }, 1000);
}

function pauseQuizTimer() { clearInterval(quizTimerInterval); }

function updateTimerDisplay() {
    const m = String(Math.floor(Math.max(0, secondsLeft) / 60)).padStart(2, '0');
    const s = String(Math.max(0, secondsLeft) % 60).padStart(2, '0');
    const el = document.getElementById('timer-display');
    if (el) el.textContent = `${m}:${s}`;
    const box = document.getElementById('cbtTimerBox');
    if (box) box.classList.toggle('danger', secondsLeft <= 60);
}

function updateQTimeDisplay() {
    const qt = pQuestionTime[pCurrentQ] || 0;
    const m = String(Math.floor(qt / 60)).padStart(2, '0');
    const s = String(qt % 60).padStart(2, '0');
    const el = document.getElementById('cbtQTimeDisplay');
    if (el) el.textContent = `⏱ ${m}:${s}`;
}

function loadPQuestion() {
    const q = pQuestions[pCurrentQ];
    if (!q) return;

    document.getElementById('cbtQNumBadge').textContent = `Question ${pCurrentQ + 1} of ${pQuestions.length}`;
    document.getElementById('cbtUnitBadge').textContent = q.unit.toUpperCase();
    document.getElementById('question-text').textContent = `Q${pCurrentQ + 1}. ${q.q}`;
    updateQTimeDisplay();

    if (pStatus[pCurrentQ] === 'unviewed') pStatus[pCurrentQ] = 'viewed';
    renderPalette();

    const letters = ['A', 'B', 'C', 'D'];
    const oc = document.getElementById('options-container');
    const sm = document.getElementById('quiz-status-msg');
    const expBox = document.getElementById('cbtExplanationBox');
    const attDisplay = document.getElementById('attempt-display');
    const lockNote = document.getElementById('cbtLockNote');

    const isLocked = pLocked[pCurrentQ];
    const attemptsUsed = pAttempts[pCurrentQ];
    const chancesLeft = Math.max(0, 2 - attemptsUsed);
    const chosenIdx = pSelectedOpts[pCurrentQ];
    const wrongSet = pWrongChoices[pCurrentQ] || [];

    attDisplay.textContent = isLocked ? `🔒 Locked (${attemptsUsed}/2)` : `Attempts: ${attemptsUsed}/2`;
    lockNote.textContent = isLocked ? '🔒 Answer Locked (Cannot Change)' : `🎯 Chances Left: ${chancesLeft} / 2`;

    oc.innerHTML = q.opts.map((optText, i) => {
        let cls = '';
        let isDisabled = false;
        if (isLocked) {
            cls = 'locked-option';
            isDisabled = true;
            if (selectedCbtMode === 'practice') {
                if (i === q.ans) cls += ' correct';
                else if (wrongSet.includes(i) || i === chosenIdx) cls += ' wrong';
            } else {
                if (i === chosenIdx) cls += ' selected';
            }
        } else {
            if (selectedCbtMode === 'practice' && wrongSet.includes(i)) {
                cls = 'wrong locked-option';
                isDisabled = true;
            } else if (selectedCbtMode === 'exam' && i === chosenIdx) {
                cls = 'selected';
            }
        }
        return `<button type="button" class="cbt-option-btn ${cls}" ${isDisabled ? 'disabled' : ''} onclick="submitPAnswer(this, ${i})">
                    <span class="cbt-opt-letter">${letters[i]}</span>
                    <span>${optText}</span>
                </button>`;
    }).join('');

    document.getElementById('btn-prev').disabled = pCurrentQ === 0;
    document.getElementById('btn-next').textContent = pCurrentQ === pQuestions.length - 1 ? 'Review / Finish ✔' : 'Next ➡';

    const mb = document.getElementById('btn-mark');
    if (isLocked) {
        mb.disabled = true;
        oc.style.pointerEvents = 'none';
        if (selectedCbtMode === 'practice') {
            const isCor = chosenIdx === q.ans;
            if (isCor) {
                sm.textContent = attemptsUsed === 1
                    ? '✔ Correct on 1st Try! (Locked — +1 Mark)'
                    : '✔ Correct on 2nd Try! (Locked — +0.5 Mark)';
                sm.style.color = '#22c55e';
            } else {
                sm.textContent = `✘ Out of chances (2/2 used — 0 Marks). Correct Answer: Option ${letters[q.ans]}`;
                sm.style.color = '#ef4444';
            }
            expBox.classList.toggle('exp-wrong', !isCor);
            expBox.innerHTML = `<strong>💡 Concept Explanation:</strong> ${q.exp}`;
            expBox.style.display = 'block';
        } else {
            sm.textContent = `🔒 Option ${letters[chosenIdx]} permanently locked (2/2 changes used).`;
            sm.style.color = 'var(--primary)';
            expBox.style.display = 'none';
        }
    } else {
        mb.disabled = false;
        oc.style.pointerEvents = 'all';
        mb.textContent = pStatus[pCurrentQ] === 'marked' ? '🔖 Unmark Review' : '🔖 Mark for Review';
        expBox.style.display = 'none';
        if (attemptsUsed === 1 && selectedCbtMode === 'practice') {
            sm.textContent = '✘ 1st try was wrong — 1 final chance remaining (+0.5 Mark if correct).';
            sm.style.color = 'var(--accent)';
        } else if (attemptsUsed === 1 && selectedCbtMode === 'exam') {
            sm.textContent = `Option ${letters[chosenIdx]} selected (1/2). You have 1 change left before lock.`;
            sm.style.color = 'var(--primary)';
        } else {
            sm.textContent = 'You have 2 chances per question (1st try: +1 Mark, 2nd try: +0.5 Mark).';
            sm.style.color = 'var(--text-muted)';
        }
    }
}

function submitPAnswer(btn, idx) {
    if (pLocked[pCurrentQ]) return;

    const q = pQuestions[pCurrentQ];
    const letters = ['A', 'B', 'C', 'D'];
    const sm = document.getElementById('quiz-status-msg');
    const expBox = document.getElementById('cbtExplanationBox');

    // In exam mode, clicking the already-selected option shouldn't waste a chance
    if (selectedCbtMode === 'exam' && pSelectedOpts[pCurrentQ] === idx) return;

    pAttempts[pCurrentQ]++;
    const attemptsUsed = pAttempts[pCurrentQ];

    if (selectedCbtMode === 'exam') {
        pSelectedOpts[pCurrentQ] = idx;
        pStatus[pCurrentQ] = 'answered';
        if (attemptsUsed >= 2) {
            pLocked[pCurrentQ] = true;
            pMarks[pCurrentQ] = (idx === q.ans) ? 0.5 : 0;
        } else {
            pMarks[pCurrentQ] = (idx === q.ans) ? 1 : 0;
        }
        loadPQuestion();
        return;
    }

    // Practice Mode (2 chances max)
    if (idx === q.ans) {
        pSelectedOpts[pCurrentQ] = idx;
        pLocked[pCurrentQ] = true;
        pStatus[pCurrentQ] = 'answered';
        pMarks[pCurrentQ] = attemptsUsed === 1 ? 1 : 0.5;
        loadPQuestion();
        blastFireworks();
    } else {
        if (!pWrongChoices[pCurrentQ].includes(idx)) pWrongChoices[pCurrentQ].push(idx);
        if (attemptsUsed >= 2) {
            // 2nd chance used and still wrong -> Lock permanently with 0 marks
            pSelectedOpts[pCurrentQ] = idx;
            pLocked[pCurrentQ] = true;
            pStatus[pCurrentQ] = 'wrong-ans';
            pMarks[pCurrentQ] = 0;
        }
        loadPQuestion();
    }
}

function toggleMark() {
    if (pLocked[pCurrentQ]) return;
    pStatus[pCurrentQ] = pStatus[pCurrentQ] === 'marked'
        ? (pSelectedOpts[pCurrentQ] !== null ? 'answered' : 'viewed')
        : 'marked';
    document.getElementById('btn-mark').textContent = pStatus[pCurrentQ] === 'marked' ? '🔖 Unmark Review' : '🔖 Mark for Review';
    renderPalette();
}

function changeQuestion(d) {
    if (d === 1 && pCurrentQ === pQuestions.length - 1) {
        openSubmitModal();
        return;
    }
    if (d === -1 && pCurrentQ === 0) return;
    pCurrentQ += d;
    loadPQuestion();
}

function jumpToQuestion(i) {
    pCurrentQ = i;
    loadPQuestion();
}

function renderPalette() {
    const grid = document.getElementById('palette-grid');
    grid.innerHTML = pQuestions.map((_, i) => `<div class="pal-btn pal-${pStatus[i]} ${i === pCurrentQ ? 'active-q' : ''}" onclick="jumpToQuestion(${i})">${i + 1}</div>`).join('');

    const cntAns = pSelectedOpts.filter(v => v !== null).length;
    const cntView = pStatus.filter(s => s === 'viewed').length;
    const cntMark = pStatus.filter(s => s === 'marked').length;
    const cntUnv = pStatus.filter(s => s === 'unviewed').length;
    document.getElementById('cntAnswered').textContent = cntAns;
    document.getElementById('cntViewed').textContent = cntView;
    document.getElementById('cntMarked').textContent = cntMark;
    document.getElementById('cntUnviewed').textContent = cntUnv;
}

function toggleCbtFullscreen() {
    const ws = document.getElementById('quiz-wrapper');
    if (!document.fullscreenElement) ws.requestFullscreen?.();
    else document.exitFullscreen?.();
}

function openSubmitModal() {
    const cntAns = pSelectedOpts.filter(v => v !== null).length;
    const cntView = pStatus.filter(s => s === 'viewed').length;
    const cntMark = pStatus.filter(s => s === 'marked').length;
    const cntUnv = pStatus.filter(s => s === 'unviewed').length;
    document.getElementById('cbtModalSummary').innerHTML = `
        <div class="cbt-modal-stat"><span>🟩 Answered</span><strong>${cntAns}</strong></div>
        <div class="cbt-modal-stat"><span>🟥 Skipped</span><strong>${cntView}</strong></div>
        <div class="cbt-modal-stat"><span>🟪 Marked</span><strong>${cntMark}</strong></div>
        <div class="cbt-modal-stat"><span>⬜ Unvisited</span><strong>${cntUnv}</strong></div>`;
    const modal = document.getElementById('cbtSubmitModal');
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
}

function closeSubmitModal() {
    const modal = document.getElementById('cbtSubmitModal');
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
}

function confirmFinalSubmit() {
    closeSubmitModal();
    if (document.fullscreenElement) document.exitFullscreen?.();
    forceSubmitTest();
}

function forceSubmitTest() {
    pauseQuizTimer();
    isQuizEnded = true;
    isQuizActive = false;
    document.getElementById('quiz-wrapper').style.display = 'none';
    const r = document.getElementById('quiz-report');
    r.style.display = 'block';

    const total = pQuestions.length;
    let totalMarks = 0;
    let firstTryCorrect = 0;
    let secondTryCorrect = 0;
    let wrongCount = 0;
    let skippedCount = 0;
    const unitStats = {};

    pQuestions.forEach((q, i) => {
        if (!unitStats[q.unit]) unitStats[q.unit] = { total: 0, marks: 0 };
        unitStats[q.unit].total++;
        const chosen = pSelectedOpts[i];
        if (chosen === null) {
            skippedCount++;
        } else if (chosen === q.ans) {
            const earned = pAttempts[i] === 1 ? 1 : 0.5;
            totalMarks += earned;
            unitStats[q.unit].marks += earned;
            if (pAttempts[i] === 1) firstTryCorrect++;
            else secondTryCorrect++;
        } else {
            wrongCount++;
        }
    });

    const totalCorrect = firstTryCorrect + secondTryCorrect;
    const totalAttemptsMade = pAttempts.reduce((a, b) => a + b, 0);
    const pct = Math.round((totalMarks / total) * 100);
    const trueAccuracy = totalAttemptsMade > 0 ? Math.round((totalCorrect / totalAttemptsMade) * 100) : 0;
    const timeTaken = Math.max(1, totalSeconds - secondsLeft);

    let verdict = 'Needs Revision', verdictColor = '#ef4444';
    if (pct >= 85) { verdict = '🏆 Distinction (Exam Ready)'; verdictColor = '#22c55e'; blastFireworks(); }
    else if (pct >= 65) { verdict = '⭐ First Class (Strong)'; verdictColor = 'var(--primary)'; }
    else if (pct >= 45) { verdict = '👍 Pass (Keep Practicing)'; verdictColor = 'var(--accent)'; }

    const unitBarsHtml = Object.keys(unitStats).map(u => {
        const st = unitStats[u];
        const upct = Math.round((st.marks / st.total) * 100);
        return `<div class="cbt-unit-row">
                    <div class="cbt-unit-row-top"><span>${u}</span><span style="color:var(--primary);">${st.marks} / ${st.total} Marks (${upct}%)</span></div>
                    <div class="study-progress-track"><div class="study-progress-fill" style="width:${upct}%;"></div></div>
                </div>`;
    }).join('');

    const letters = ['A', 'B', 'C', 'D'];
    const reviewHtml = pQuestions.map((q, i) => {
        const chosen = pSelectedOpts[i];
        const isCor = chosen === q.ans;
        const earned = isCor ? (pAttempts[i] === 1 ? '+1' : '+0.5') : '0';
        const revCls = chosen === null ? 'rev-skipped' : (isCor ? 'rev-correct' : 'rev-wrong');
        const badgeTxt = chosen === null
            ? '⚪ Skipped (0)'
            : (isCor ? `✔ Correct on Try #${pAttempts[i]} (${earned})` : `✘ Wrong (${pAttempts[i]} tries • 0)`);
        const chosenLabel = chosen === null ? 'Not Attempted' : `${letters[chosen]}) ${q.opts[chosen]}`;
        return `<div class="cbt-review-item ${revCls}">
                    <div style="display:flex; justify-content:space-between; flex-wrap:wrap; gap:8px; margin-bottom:8px;">
                        <strong>Q${i + 1}. ${q.q}</strong>
                        <span style="font-weight:800; font-size:0.88rem;">${badgeTxt} &nbsp;|&nbsp; ${q.unit} &nbsp;|&nbsp; ${pQuestionTime[i] || 0}s</span>
                    </div>
                    <p style="margin:4px 0; font-size:0.94rem;"><strong>Your Answer:</strong> ${chosenLabel} &nbsp;|&nbsp; <strong style="color:#22c55e;">Correct Answer:</strong> ${letters[q.ans]}) ${q.opts[q.ans]}</p>
                    <p style="margin:6px 0 0; font-size:0.92rem; color:var(--text-muted);"><strong>💡 Explanation:</strong> ${q.exp}</p>
                </div>`;
    }).join('');

    r.innerHTML = `
        <div class="cbt-report-hero">
            <h2 style="border:none; margin-bottom:6px;">Web Technology (CS35302) — Official Score Card</h2>
            <p style="color:var(--text-muted); margin-bottom:10px;">Candidate: <strong>${candidateName}</strong> &nbsp;|&nbsp; Roll No: <strong style="color:var(--primary); font-family:Consolas,monospace;">${candidateRollNo}</strong> &nbsp;|&nbsp; Mode: <strong>${selectedCbtMode === 'practice' ? 'Practice Mode' : 'Real CBT Exam'}</strong></p>
            <span class="cbt-verdict-badge" style="background:rgba(0,198,255,0.12); color:${verdictColor}; border:1px solid ${verdictColor};">${verdict}</span>
        </div>

        <div class="cbt-kpi-grid">
            <div class="cbt-kpi-card"><span>Final Marks</span><strong>${totalMarks} / ${total}</strong></div>
            <div class="cbt-kpi-card"><span>1st Try / 2nd Try</span><strong><span style="color:#22c55e;">${firstTryCorrect}</span> / <span style="color:var(--accent);">${secondTryCorrect}</span></strong></div>
            <div class="cbt-kpi-card"><span>Wrong / Skipped</span><strong><span style="color:#ef4444;">${wrongCount}</span> / ${skippedCount}</strong></div>
            <div class="cbt-kpi-card"><span>True Accuracy</span><strong style="color:#22c55e;">${trueAccuracy}%</strong></div>
            <div class="cbt-kpi-card"><span>Score %</span><strong>${pct}%</strong></div>
            <div class="cbt-kpi-card"><span>Time Taken</span><strong style="color:var(--accent);">${Math.floor(timeTaken / 60)}m ${timeTaken % 60}s</strong></div>
        </div>

        <h3 style="margin-top:10px;">📊 Unit-Wise Progress</h3>
        <div class="cbt-unit-bars">${unitBarsHtml}</div>

        <h3>📝 Detailed Answer Key &amp; Review</h3>
        <div class="cbt-review-list">${reviewHtml}</div>

        <div style="display:flex; gap:14px; justify-content:center; flex-wrap:wrap; margin-top:28px;">
            <button type="button" class="quiz-btn" onclick="openCandidateModal()">🔄 New Test (New Roll No.)</button>
            <button type="button" class="quiz-btn cbt-btn-secondary" onclick="backToCbtLobby()">⚙ Back to Exam Lobby</button>
        </div>`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function backToCbtLobby() {
    pauseQuizTimer();
    isQuizActive = false;
    isQuizEnded = false;
    document.getElementById('quiz-wrapper').style.display = 'none';
    document.getElementById('quiz-report').style.display = 'none';
    document.getElementById('quiz-intro').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function restartQuiz() { openCandidateModal(); }

// Keyboard Shortcuts during Active CBT Exam (1-4 to select, ArrowLeft/ArrowRight to navigate)
document.addEventListener('keydown', (e) => {
    if (!isQuizActive || isQuizEnded) return;
    const activePage = document.querySelector('.page.active');
    if (!activePage || activePage.id !== 'practice') return;
    if (document.getElementById('searchModal')?.classList.contains('open')) return;
    if (document.getElementById('cbtSubmitModal')?.classList.contains('open')) return;
    if (document.getElementById('cbtCandidateModal')?.classList.contains('open')) return;
    if (document.getElementById('assignCandidateModal')?.classList.contains('open')) return;

    if (['1', '2', '3', '4'].includes(e.key)) {
        const idx = parseInt(e.key) - 1;
        const btns = document.querySelectorAll('#options-container .cbt-option-btn');
        if (btns[idx] && !btns[idx].disabled) btns[idx].click();
    } else if (e.key === 'ArrowRight') {
        changeQuestion(1);
    } else if (e.key === 'ArrowLeft') {
        changeQuestion(-1);
    }
});
    
// Handwritten Notes (Option 1: Virtual Handwritten + Pen/Pencil + Highlighter/Eraser | Option 2: Original PDF Link)
let currentHwSource = 'tut1';
let currentWritingTool = 'ink-blue';
const allToolClasses = ['ink-blue', 'ink-black', 'ink-purple', 'pencil-hb', 'pencil-2b'];
let isHighlighterOn = false;
let isEraserOn = false;
let currentHighlightColor = 'yellow';

function formatPdfEmbedUrl(rawUrl) {
    if (!rawUrl) return '';
    const trimmed = rawUrl.trim();
    const gdriveMatch = trimmed.match(/drive\.google\.com\/file\/d\/([^/]+)/);
    if (gdriveMatch) return `https://drive.google.com/file/d/${gdriveMatch[1]}/preview`;
    return trimmed;
}

function loadOriginalPdfViewer() {
    const container = document.getElementById('origPdfContainer');
    const newTabLink = document.getElementById('origPdfNewTabLink');
    const rawLink = (ORIGINAL_HANDWRITTEN_PDF_LINK || '').trim();

    if (!rawLink || rawLink === 'PASTE_YOUR_PDF_LINK_HERE.pdf') {
        newTabLink.style.display = 'none';
        container.innerHTML = `
            <div class="orig-pdf-placeholder">
                <h3>📄 Open Original Handwritten Notes (PDF)</h3>
                <p>Click to open and view the original handwritten notes directly in PDF format for easy reading, downloading, and exam revision.</p>
            </div>`;
        return;
    }
    const embedUrl = formatPdfEmbedUrl(rawLink);
    newTabLink.href = rawLink;
    newTabLink.style.display = 'inline-flex';
    container.innerHTML = `<iframe src="${embedUrl}" title="Original Handwritten Notes PDF" allow="autoplay"></iframe>`;
}

function switchHandwrittenMode(mode) {
    const isVirtual = mode === 'virtual';
    document.getElementById('hwVirtualPanel').style.display = isVirtual ? 'block' : 'none';
    document.getElementById('hwOriginalPanel').style.display = isVirtual ? 'none' : 'block';
    document.getElementById('modeBtnVirtual').classList.toggle('active', isVirtual);
    document.getElementById('modeBtnOriginal').classList.toggle('active', !isVirtual);
    if (!isVirtual) loadOriginalPdfViewer();
}

function selectHandwrittenSource(sourceId) {
    currentHwSource = sourceId;
    document.querySelectorAll('#hwTabs .hw-tab').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.source === sourceId);
    });
    const targetBody = document.getElementById('hwNotebookBody');
    const savedHighlighted = safeStorageGet(`weblearnx_hw_${sourceId}`, null);
    if (savedHighlighted && targetBody) {
        targetBody.innerHTML = savedHighlighted;
        return;
    }
    const sourceCard = document.querySelector(`#${sourceId} .glass-card`);
    if (sourceCard && targetBody) {
        const clone = sourceCard.cloneNode(true);
        clone.querySelectorAll('.complete-toggle-btn, .copy-code-btn').forEach(el => el.remove());
        targetBody.innerHTML = clone.innerHTML;
    }
}

function openHandwrittenTutorial(tutNum) {
    window.location.hash = '#handwritten-notes';
    setTimeout(() => {
        switchHandwrittenMode('virtual');
        selectHandwrittenSource(`tut${tutNum}`);
    }, 60);
}

function setWritingTool(toolClass, btnEl) {
    currentWritingTool = toolClass;
    const paper = document.getElementById('hwNotebookPaper');
    allToolClasses.forEach(c => paper.classList.remove(c));
    paper.classList.add(toolClass);
    document.querySelectorAll('.hw-pen-group .hw-ctrl-btn').forEach(b => b.classList.remove('tool-active'));
    if (btnEl) btnEl.classList.add('tool-active');
}

function updateHwToolUI() {
    const hlBtn = document.getElementById('hwHighlighterToggle');
    const erBtn = document.getElementById('hwEraserToggle');
    const paper = document.getElementById('hwNotebookPaper');
    const hint = document.getElementById('hwHlHint');

    hlBtn.classList.toggle('hl-active', isHighlighterOn);
    hlBtn.textContent = isHighlighterOn ? '🖍️ Highlighter: ON' : '🖍️ Highlighter: OFF';
    erBtn.classList.toggle('eraser-active', isEraserOn);
    erBtn.textContent = isEraserOn ? '🧽 Remove Highlighter: ON' : '🧽 Remove Highlighter: OFF';

    paper.classList.toggle('highlighter-cursor', isHighlighterOn);
    paper.classList.toggle('eraser-cursor', isEraserOn);

    if (isEraserOn) {
        hint.textContent = '🧽 Remove Highlighter ON: Click any highlighted phrase in the notebook to erase its highlight.';
    } else if (isHighlighterOn) {
        hint.textContent = '🖍️ Highlighter ON: Drag across any text in the notebook to highlight it (handwritten font stays unchanged).';
    } else {
        hint.textContent = 'Tip: Turn ON Highlighter to mark text, or turn ON Remove Highlighter and click any highlight to erase it.';
    }
}

function toggleHighlighterMode() {
    isHighlighterOn = !isHighlighterOn;
    if (isHighlighterOn) isEraserOn = false;
    updateHwToolUI();
}

function toggleEraserMode() {
    isEraserOn = !isEraserOn;
    if (isEraserOn) isHighlighterOn = false;
    updateHwToolUI();
}

function setHighlighterColor(color, swatchBtn) {
    currentHighlightColor = color;
    document.querySelectorAll('.hl-swatch').forEach(s => s.classList.remove('active'));
    if (swatchBtn) swatchBtn.classList.add('active');
    isEraserOn = false;
    isHighlighterOn = true;
    updateHwToolUI();
}

function saveCurrentHighlights() {
    const bodyEl = document.getElementById('hwNotebookBody');
    if (bodyEl) safeStorageSet(`weblearnx_hw_${currentHwSource}`, bodyEl.innerHTML);
}

function removeHighlightNode(markEl) {
    const parent = markEl.parentNode;
    if (!parent) return;
    while (markEl.firstChild) parent.insertBefore(markEl.firstChild, markEl);
    parent.removeChild(markEl);
    parent.normalize();
    saveCurrentHighlights();
}

function applySelectionHighlight() {
    if (!isHighlighterOn || isEraserOn) return;
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed || !sel.rangeCount) return;
    const range = sel.getRangeAt(0);
    const notebookBody = document.getElementById('hwNotebookBody');
    if (!notebookBody || !range.intersectsNode(notebookBody)) return;

    // Collect all text nodes inside #hwNotebookBody that intersect the selection
    const walker = document.createTreeWalker(
        notebookBody,
        NodeFilter.SHOW_TEXT,
        {
            acceptNode: function(node) {
                if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
                if (!range.intersectsNode(node)) return NodeFilter.FILTER_REJECT;
                return NodeFilter.FILTER_ACCEPT;
            }
        }
    );

    const textNodes = [];
    let currentNode;
    while ((currentNode = walker.nextNode())) {
        textNodes.push(currentNode);
    }
    if (!textNodes.length) return;

    const startContainer = range.startContainer;
    const startOffset = range.startOffset;
    const endContainer = range.endContainer;
    const endOffset = range.endOffset;

    let didHighlight = false;

    textNodes.forEach(textNode => {
        const fullText = textNode.nodeValue;
        const sOffset = (textNode === startContainer) ? startOffset : 0;
        const eOffset = (textNode === endContainer) ? endOffset : fullText.length;

        if (sOffset >= eOffset) return;
        const selectedText = fullText.slice(sOffset, eOffset);
        if (!selectedText.trim()) return;

        // If already inside a highlight mark, update its color without nesting or breaking layout
        const existingMark = textNode.parentElement && textNode.parentElement.closest('mark.hw-mark');
        if (existingMark && sOffset === 0 && eOffset === fullText.length) {
            existingMark.className = `hw-mark hw-mark-${currentHighlightColor}`;
            didHighlight = true;
            return;
        }
        if (existingMark) return;

        const parent = textNode.parentNode;
        if (!parent) return;

        const frag = document.createDocumentFragment();
        const beforeText = fullText.slice(0, sOffset);
        const afterText = fullText.slice(eOffset);

        if (beforeText) frag.appendChild(document.createTextNode(beforeText));

        const mark = document.createElement('mark');
        mark.className = `hw-mark hw-mark-${currentHighlightColor}`;
        mark.title = 'Use Remove Highlighter to erase';
        mark.textContent = selectedText;
        frag.appendChild(mark);

        if (afterText) frag.appendChild(document.createTextNode(afterText));

        parent.replaceChild(frag, textNode);
        didHighlight = true;
    });

    sel.removeAllRanges();
    if (didHighlight) {
        saveCurrentHighlights();
    }
}

const hwNotebookBodyEl = document.getElementById('hwNotebookBody');
if (hwNotebookBodyEl) {
    hwNotebookBodyEl.addEventListener('mouseup', applySelectionHighlight);
    hwNotebookBodyEl.addEventListener('touchend', applySelectionHighlight);
    hwNotebookBodyEl.addEventListener('click', (e) => {
        const mark = e.target.closest('mark.hw-mark');
        if (mark && isEraserOn) {
            removeHighlightNode(mark);
        }
    });
}

function clearCurrentHighlights() {
    const bodyEl = document.getElementById('hwNotebookBody');
    if (!bodyEl) return;
    bodyEl.querySelectorAll('mark.hw-mark').forEach(mark => {
        const parent = mark.parentNode;
        if (!parent) return;
        while (mark.firstChild) parent.insertBefore(mark.firstChild, mark);
        parent.removeChild(mark);
        parent.normalize();
    });
    try { localStorage.removeItem(`weblearnx_hw_${currentHwSource}`); } catch (e) {}
}

// Fix nav highlight so Handwritten Notes highlights its own header tab
window.addEventListener('hashchange', () => {
    if (window.location.hash === '#handwritten-notes') {
        setTimeout(() => {
            document.querySelectorAll('header .nav-link').forEach(b => b.classList.remove('active'));
            const hwBtn = document.querySelector('[data-target="handwritten-notes"]');
            if (hwBtn) hwBtn.classList.add('active');
        }, 470);
    }
});

// ================= NEW FUNCTIONS SUITE =================
// 1. Top Reading Progress Bar & Back-to-Top Visibility
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    const bar = document.getElementById('readingProgressBar');
    if (bar) bar.style.width = `${progress}%`;
    const topBtn = document.getElementById('backToTopBtn');
    if (topBtn) topBtn.style.display = scrollTop > 280 ? 'inline-flex' : 'none';
});

// 2. Live IST Clock
function updateIstClock() {
    const el = document.getElementById('liveIstClock');
    if (!el) return;
    const now = new Date();
    el.textContent = now.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
}
setInterval(updateIstClock, 1000);

// 3. Study Progress Tracker (Unit 1-5 & Tutorial 1-5)
const trackablePages = ['unit1','unit2','unit3','unit4','unit5','tut1','tut2','tut3','tut4','tut5'];
let completedPages = JSON.parse(safeStorageGet('weblearnx_completed', '[]'));

function injectCompletionButtons() {
    trackablePages.forEach(pid => {
        const page = document.getElementById(pid);
        if (!page) return;
        const card = page.querySelector('.glass-card');
        if (!card || card.querySelector('.complete-toggle-btn')) return;
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'complete-toggle-btn';
        btn.dataset.pid = pid;
        btn.style.marginBottom = '16px';
        btn.onclick = () => togglePageComplete(pid, btn);
        updateCompleteBtnUI(btn, completedPages.includes(pid));
        card.insertBefore(btn, card.firstChild);
    });
    updateStudyProgressBar();
}

function updateCompleteBtnUI(btn, isDone) {
    btn.classList.toggle('done', isDone);
    btn.textContent = isDone ? '✅ Marked as Completed' : '☐ Mark as Completed';
}

function togglePageComplete(pid, btn) {
    if (completedPages.includes(pid)) {
        completedPages = completedPages.filter(x => x !== pid);
    } else {
        completedPages.push(pid);
    }
    safeStorageSet('weblearnx_completed', JSON.stringify(completedPages));
    updateCompleteBtnUI(btn, completedPages.includes(pid));
    updateStudyProgressBar();
}

function updateStudyProgressBar() {
    const total = trackablePages.length;
    const done = completedPages.length;
    const pct = Math.round((done / total) * 100);
    const txt = document.getElementById('studyProgressText');
    const fill = document.getElementById('studyProgressFill');
    if (txt) txt.textContent = `${done} / ${total} Completed (${pct}%)`;
    if (fill) fill.style.width = `${pct}%`;
}

// 4. One-Click Copy Button on All <pre> Code Blocks
function injectCopyButtons() {
    document.querySelectorAll('pre').forEach(pre => {
        if (pre.parentElement.classList.contains('pre-wrapper')) return;
        const wrap = document.createElement('div');
        wrap.className = 'pre-wrapper';
        pre.parentNode.insertBefore(wrap, pre);
        wrap.appendChild(pre);
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'copy-code-btn';
        btn.textContent = 'Copy';
        btn.onclick = () => {
            navigator.clipboard?.writeText(pre.textContent.trim());
            btn.textContent = 'Copied ✔';
            setTimeout(() => btn.textContent = 'Copy', 1500);
        };
        wrap.appendChild(btn);
    });
}

// 5. Global Instant Search (🔍 button & Ctrl+K) — Fixed & Instant
const searchIndex = [];
function buildSearchIndex() {
    searchIndex.length = 0;
    const pages = ['features','syllabus','unit1','unit2','unit3','unit4','unit5','revision','tut1','tut2','tut3','tut4','tut5','handwritten-notes','assignments','practice','about'];
    pages.forEach(pid => {
        const el = document.getElementById(pid);
        if (!el) return;
        const cat = pid.toUpperCase().replace('-', ' ');
        const fullText = el.innerText.toLowerCase();
        el.querySelectorAll('h2, h3, h4').forEach(h => {
            const title = h.textContent.trim();
            if (title) searchIndex.push({ title, page: pid, cat, keywords: (title + ' ' + cat).toLowerCase() });
        });
        // Also index full page fallback
        const mainH2 = el.querySelector('h2');
        if (mainH2) {
            searchIndex.push({ title: mainH2.textContent.trim(), page: pid, cat, keywords: fullText });
        }
    });
}

const searchModal = document.getElementById('searchModal');
const globalSearchInput = document.getElementById('globalSearchInput');

function openSearchModal() {
    if (!searchIndex.length) buildSearchIndex();
    closeMobileMenu();
    searchModal.classList.add('open');
    searchModal.setAttribute('aria-hidden', 'false');
    globalSearchInput.value = '';
    renderSearchResults('');
    setTimeout(() => globalSearchInput.focus(), 40);
}

function closeSearchModal() {
    searchModal.classList.remove('open');
    searchModal.setAttribute('aria-hidden', 'true');
}

searchModal.addEventListener('click', (e) => { if (e.target === searchModal) closeSearchModal(); });
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); openSearchModal(); }
    if (e.key === 'Escape') closeSearchModal();
});

globalSearchInput.addEventListener('input', (e) => renderSearchResults(e.target.value));
function renderSearchResults(q) {
    const list = document.getElementById('searchResultsList');
    const term = q.trim().toLowerCase();
    if (!term) {
        list.innerHTML = '<div class="search-hint">Start typing to search across Units 1–5, Tutorials 1–5, Handwritten Notes, Syllabus &amp; Revision...</div>';
        return;
    }
    const seen = new Set();
    const matches = [];
    for (const item of searchIndex) {
        if (item.keywords.includes(term)) {
            const key = item.page + '|' + item.title;
            if (!seen.has(key)) {
                seen.add(key);
                matches.push(item);
            }
        }
        if (matches.length >= 16) break;
    }
    if (!matches.length) {
        list.innerHTML = '<div class="search-hint">No matching topics found. Try "HTTP", "POP3", "DOM", "AJAX", "Blockchain", or "5G".</div>';
        return;
    }
    list.innerHTML = matches.map(m => `<a href="#${m.page}" class="search-result-item" onclick="closeSearchModal()"><span>${m.title}</span><span class="search-result-cat">${m.cat}</span></a>`).join('');
}

// 6. Interactive Flashcards
const flashcards = [
    { q: "POP3 vs IMAP — Key Difference?", a: "POP3 downloads emails locally (best for single device/offline); IMAP keeps emails on the server and syncs across multiple devices." },
    { q: "HTTP vs HTTPS Default Ports?", a: "HTTP uses Port 80 (unencrypted). HTTPS uses Port 443 with SSL/TLS encryption." },
    { q: "What are the 4 components of DHTML?", a: "HTML (Structure), CSS (Presentation), JavaScript (Behaviour), and DOM (Element access & modification)." },
    { q: "DOM Parser vs SAX Parser?", a: "DOM is tree-based and loads the entire XML into memory (editable). SAX is event-based and reads sequentially (low memory, best for large files)." },
    { q: "Role of UDDI, WSDL, and SOAP?", a: "UDDI = Find/Discover services, WSDL = Describe service operations & endpoints, SOAP = Exchange XML messages." },
    { q: "How does AJAX improve performance?", a: "It sends asynchronous background requests and updates only specific DOM sections without reloading the full page." },
    { q: "What is CORBA?", a: "Common Object Request Broker Architecture (by OMG) — lets distributed objects in different languages (e.g., Java & C++) communicate via an ORB." },
    { q: "What is an RDF Triple?", a: "Resource Description Framework represents web data as Subject – Predicate – Object (e.g., Rahul – Studies – CSE)." },
    { q: "3 Stages of Search Engine Working?", a: "1. Crawling (discover pages), 2. Indexing (organize/store), 3. Ranking (order results by relevance)." },
    { q: "Cloud Computing vs Edge Computing?", a: "Cloud processes data in remote data centres (higher latency); Edge processes near the data source (low latency, ideal for IoT)." },
    { q: "AR vs VR?", a: "AR overlays digital objects onto the real world (real world stays visible); VR immerses the user in a fully simulated 3D environment." },
    { q: "Adaptive vs Responsive Interface?", a: "Responsive adjusts layout to screen size (media queries); Adaptive adjusts layout, content, and functionality based on user, device, and context." }
];
let fcIdx = 0;
function renderFlashcard() {
    const card = document.getElementById('revisionFlashcard');
    if (!card) return;
    card.classList.remove('flipped');
    document.getElementById('fcFrontText').textContent = flashcards[fcIdx].q;
    document.getElementById('fcBackText').textContent = flashcards[fcIdx].a;
    document.getElementById('fcCounter').textContent = `${fcIdx + 1} / ${flashcards.length}`;
}
function flipFlashcard() { document.getElementById('revisionFlashcard').classList.toggle('flipped'); }
function moveFlashcard(dir) { fcIdx = (fcIdx + dir + flashcards.length) % flashcards.length; renderFlashcard(); }
function shuffleFlashcards() { flashcards.sort(() => Math.random() - 0.5); fcIdx = 0; renderFlashcard(); }

// 7. Floating Toolkit: Font Size, Text-to-Speech, Pomodoro Timer
let baseFontSize = 16;
function adjustFontSize(delta) {
    baseFontSize = Math.min(22, Math.max(13, baseFontSize + delta));
    document.body.style.fontSize = `${baseFontSize}px`;
}

let isSpeaking = false;
function toggleReadAloud() {
    const btn = document.getElementById('ttsBtn');
    if (!('speechSynthesis' in window)) { alert('Text-to-Speech is not supported in this browser.'); return; }
    if (isSpeaking) {
        window.speechSynthesis.cancel();
        isSpeaking = false;
        btn.classList.remove('speaking');
        btn.textContent = '🔊';
        return;
    }
    const activePage = document.querySelector('.page.active');
    if (!activePage) return;
    const utter = new SpeechSynthesisUtterance(activePage.innerText.slice(0, 4000));
    utter.rate = 1.0;
    utter.onend = () => { isSpeaking = false; btn.classList.remove('speaking'); btn.textContent = '🔊'; };
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
    isSpeaking = true;
    btn.classList.add('speaking');
    btn.textContent = '⏹️';
}

let pomoSeconds = 1500, pomoInterval = null, pomoRunning = false, pomoMode = 'focus';
function togglePomodoroPopup() {
    const p = document.getElementById('pomodoroPopup');
    p.style.display = p.style.display === 'none' ? 'block' : 'none';
}
function setPomodoroMode(mode) {
    pomoMode = mode;
    pomoSeconds = mode === 'focus' ? 1500 : 300;
    document.getElementById('pomoFocusTab').classList.toggle('active', mode === 'focus');
    document.getElementById('pomoBreakTab').classList.toggle('active', mode === 'break');
    resetPomodoro(false);
}
function updatePomoUI() {
    const m = String(Math.floor(pomoSeconds / 60)).padStart(2, '0');
    const s = String(pomoSeconds % 60).padStart(2, '0');
    document.getElementById('pomoTimeDisplay').textContent = `${m}:${s}`;
}
function togglePomodoroRun() {
    const btn = document.getElementById('pomoStartBtn');
    if (pomoRunning) {
        clearInterval(pomoInterval); pomoRunning = false; btn.textContent = '▶ Start';
    } else {
        pomoRunning = true; btn.textContent = '⏸ Pause';
        pomoInterval = setInterval(() => {
            pomoSeconds--; updatePomoUI();
            if (pomoSeconds <= 0) {
                clearInterval(pomoInterval); pomoRunning = false; btn.textContent = '▶ Start';
                alert(pomoMode === 'focus' ? 'Focus session complete! Time for a 5-min break.' : 'Break over! Back to WebLearnx.');
            }
        }, 1000);
    }
}
function resetPomodoro(resetTime = true) {
    clearInterval(pomoInterval); pomoRunning = false;
    document.getElementById('pomoStartBtn').textContent = '▶ Start';
    if (resetTime) pomoSeconds = pomoMode === 'focus' ? 1500 : 300;
    updatePomoUI();
}


// ================= MORE DROPDOWN & EXTRA TOOLS =================
const moreDropdown = document.getElementById('moreDropdown');
const moreDropdownBtn = document.getElementById('moreDropdownBtn');

function toggleMoreDropdown(e) {
    if (e) e.stopPropagation();
    const isOpen = moreDropdown.classList.toggle('open');
    moreDropdownBtn.setAttribute('aria-expanded', String(isOpen));
}

function closeMoreDropdown() {
    if (moreDropdown && moreDropdown.classList.contains('open')) {
        moreDropdown.classList.remove('open');
        moreDropdownBtn.setAttribute('aria-expanded', 'false');
    }
}

document.addEventListener('click', (e) => {
    if (moreDropdown && !moreDropdown.contains(e.target)) {
        closeMoreDropdown();
    }
});

// Keyboard Shortcuts Modal
const shortcutsModal = document.getElementById('shortcutsModal');
function openShortcutsModal() {
    if (!shortcutsModal) return;
    shortcutsModal.classList.add('open');
    shortcutsModal.setAttribute('aria-hidden', 'false');
}
function closeShortcutsModal() {
    if (!shortcutsModal) return;
    shortcutsModal.classList.remove('open');
    shortcutsModal.setAttribute('aria-hidden', 'true');
}
if (shortcutsModal) {
    shortcutsModal.addEventListener('click', (e) => {
        if (e.target === shortcutsModal) closeShortcutsModal();
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeMoreDropdown();
        closeShortcutsModal();
    }
});

// Toast Helper
let toastTimeout = null;
function showWebLearnxToast(msg) {
    const toast = document.getElementById('weblearnxToast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => toast.classList.remove('show'), 3200);
}

// Full Account & Dashboard Reset Modal + Logic
const resetAccountModal = document.getElementById('resetAccountModal');
function openResetAccountModal() {
    if (!resetAccountModal) return;
    resetAccountModal.classList.add('open');
    resetAccountModal.setAttribute('aria-hidden', 'false');
}
function closeResetAccountModal() {
    if (!resetAccountModal) return;
    resetAccountModal.classList.remove('open');
    resetAccountModal.setAttribute('aria-hidden', 'true');
}
if (resetAccountModal) {
    resetAccountModal.addEventListener('click', (e) => {
        if (e.target === resetAccountModal) closeResetAccountModal();
    });
}
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeResetAccountModal();
});

function executeFullAccountReset() {
    closeResetAccountModal();

    // 1. Reset Study Progress & Dashboard Bar
    completedPages = [];
    safeStorageSet('weblearnx_completed', '[]');
    document.querySelectorAll('.complete-toggle-btn').forEach(btn => updateCompleteBtnUI(btn, false));
    updateStudyProgressBar();

    // 2. Reset All Saved Handwritten Highlights & Pen/Highlighter Tools
    const allHwKeys = ['tut1','tut2','tut3','tut4','tut5','unit1','unit2','unit3','unit4','unit5'];
    allHwKeys.forEach(k => {
        try { localStorage.removeItem(`weblearnx_hw_${k}`); } catch (e) {}
    });
    isHighlighterOn = false;
    isEraserOn = false;
    updateHwToolUI();
    const bluePenBtn = document.querySelector('.hw-pen-group [data-tool="ink-blue"]');
    setWritingTool('ink-blue', bluePenBtn);
    selectHandwrittenSource('tut1');

    // 3. Reset All LMS Assignments (Scores, Answers, Student Name & Roll No.)
    [1, 2].forEach(id => {
        const a = assignmentsData[id];
        a.completed = false;
        a.score = 0;
        a.userAnswers = [];
        a.studentName = '';
        a.rollNo = '';
        const badge = document.getElementById(`status-badge-${id}`);
        if (badge) { badge.textContent = 'Pending'; badge.className = 'status-badge status-pending'; }
        const btn = document.getElementById(`btn-start-assign-${id}`);
        if (btn) {
            btn.textContent = 'Start Assignment';
            btn.style.background = '';
            btn.style.color = '';
            btn.style.border = '';
        }
    });
    closeAssignment();
    const assignInput = document.getElementById('assignCandidateNameInput');
    if (assignInput) assignInput.value = '';

    // 4. Reset CBT Practice Mode (Candidate Name, Roll No., Timer & Lobby)
    pauseQuizTimer();
    isQuizActive = false;
    isQuizEnded = false;
    candidateName = '';
    candidateRollNo = '';
    const cbtInput = document.getElementById('cbtCandidateNameInput');
    if (cbtInput) cbtInput.value = '';
    document.getElementById('lobbyAvatar').textContent = 'WL';
    document.getElementById('lobbyCandName').textContent = 'Candidate Verification Required';
    document.getElementById('lobbyCandMeta').textContent = 'Enter your name on Start Test to receive your random Roll No. | CS35302';
    document.getElementById('cbtSideAvatar').textContent = 'WL';
    document.getElementById('cbtSideName').textContent = 'Candidate';
    document.getElementById('cbtSideRoll').textContent = 'Roll No: ---';
    backToCbtLobby();

    // 5. Reset Theme to Default Dark Mode, Font Size, TTS & Pomodoro
    applyTheme('dark');
    safeStorageSet('theme', 'dark');
    baseFontSize = 16;
    document.body.style.fontSize = '16px';
    if (isSpeaking) toggleReadAloud();
    setPomodoroMode('focus');
    const pomoPop = document.getElementById('pomodoroPopup');
    if (pomoPop) pomoPop.style.display = 'none';

    // 6. Return to Home Dashboard & Confirm with Toast
    window.location.hash = '#home';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showWebLearnxToast('✅ Account & Dashboard Reset Successfully!');
}

function resetStudyProgress() { openResetAccountModal(); }

// Run all initializers immediately (does not wait for external fonts)
(function initWebLearnx() {
    selectHandwrittenSource('tut1');
    updateIstClock();
    injectCompletionButtons();
    injectCopyButtons();
    buildSearchIndex();
    renderFlashcard();
    handleRouting();
})();