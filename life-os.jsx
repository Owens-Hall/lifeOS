import { useState, useEffect, useRef, useCallback } from "react";
import { User, Heart, Baby, Users, Church, MapPin, Briefcase, Home, Star, BookOpen, Dumbbell, Palette, Globe, TreePine, Flame, Shield, Compass, Mountain, Sun, Coffee, Music, Landmark, HandHeart, GraduationCap, Sparkles, Crown, Gem, Target, Leaf, Cross, Handshake, DollarSign, Brain, Lightbulb, PenTool, Bike, Dog, Laptop } from "lucide-react";
const ICONS = { User, Heart, Baby, Users, Church, MapPin, Briefcase, Home, Star, BookOpen, Dumbbell, Palette, Globe, TreePine, Flame, Shield, Compass, Mountain, Sun, Coffee, Music, Landmark, HandHeart, GraduationCap, Sparkles, Crown, Gem, Target, Leaf, Cross, Handshake, DollarSign, Brain, Lightbulb, PenTool, Bike, Dog, Laptop };
const ICON_NAMES = Object.keys(ICONS);

const INIT_SPHERES = [
  { id: 1, name: "Personal", letter: "P", icon: "User", purpose: "Steward your body, mind, and soul with care and intentionality.", people: [{ name: "David Chen", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face" }, { name: "James Ko", photo: null }, { name: "Marcus Bell", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=face" }], intentions: ["Establish a consistent morning rhythm", "Read 2 books this quarter"] },
  { id: 2, name: "Marriage", letter: "M", icon: "Heart", purpose: "Cultivate deep partnership and mutual flourishing with your spouse.", people: [{ name: "Arwen", photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=face" }, { name: "Tom & Sarah", photo: null }], intentions: ["Weekly date night rhythm", "Work through conflict framework together"] },
  { id: 3, name: "Family & Parenting", letter: "F", icon: "Baby", purpose: "Raise and nurture your children with presence and purpose.", people: [{ name: "Eldarion", photo: null }, { name: "Miriel", photo: null }], intentions: ["Create bedtime liturgy", "Plan summer adventure calendar"] },
  { id: 4, name: "Extended Family", letter: "E", icon: "Users", purpose: "Honor and engage your broader family with grace and generosity.", people: [{ name: "Thranduil", photo: null }, { name: "Celeborn & Galadriel", photo: null }], intentions: ["Monthly family call rhythm", "Plan holiday gathering"] },
  { id: 5, name: "Being Church", letter: "C", icon: "Church", purpose: "Belong to and build up the body of Christ in your local community.", people: [{ name: "Pastor Elrond", photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face" }, { name: "Samwise", photo: "https://images.unsplash.com/photo-1599566150163-29194dcabd9c?w=120&h=120&fit=crop&crop=face" }], intentions: ["Lead small group study", "Deepen prayer partnership"] },
  { id: 6, name: "Neighboring", letter: "N", icon: "MapPin", purpose: "Be a faithful, loving presence in your neighborhood and city.", people: [{ name: "The Gamgees", photo: null }, { name: "Treebeard", photo: null }], intentions: ["Host monthly neighborhood dinner", "Volunteer at community center"] },
  { id: 7, name: "Career", letter: "W", icon: "Briefcase", purpose: "Pursue your vocation as an expression of your God-given design.", people: [{ name: "Aragorn", photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&h=120&fit=crop&crop=face" }, { name: "Gimli", photo: null }, { name: "Gandalf", photo: "https://images.unsplash.com/photo-1548372290-8d01b6c8e78c?w=120&h=120&fit=crop&crop=face" }], intentions: ["Launch Q2 initiative", "Develop leadership pipeline"] },
  { id: 8, name: "House & Home", letter: "H", icon: "Home", purpose: "Create a space of rest, beauty, and hospitality.", people: [{ name: "Household", photo: null }], intentions: ["Complete garage renovation", "Establish cleaning rhythm"] },
];
const INIT_PROFILE = {
  name: "Legolas",
  description: "Nurturing Visionary Protector \u2014 Lead by Seeing, Shepherding, Sharpening, and Sending out those in my domain",
  motto: "You Have My Bow",
  nameBank: [
    { name: "Beloved Son, with whom I am well pleased", meaning: "I am loved and can love without any strings attached" },
    { name: "Jason", meaning: 'Meaning "to heal" or "healer". Rooted in Greek mythology as the hero who led the Argonauts, and in the Bible, a person hospitable to St. Paul. Associated with strength and leadership.' },
    { name: "J / J-Lou", meaning: "Mal's name for me. Playful, Endearing" },
    { name: "Pastor Of Pastors", meaning: "Shepherding heart" },
    { name: "PJ", meaning: "Teaching Den Groups" },
  ],
  vision: "To see the restoration of God's design for life, fighting for people to walk in peace, freedom, and glory, unburdened by the legacy of the shadow.",
  purpose: "To Shepherd people with the nurturing strength of Father's Heart",
  desires: [
    { name: "Relational Depth", desc: "Mutuality of feeling fully known and deeply loved" },
    { name: "Be On Purpose", desc: "I deeply believe there should be meaning in all that I do" },
    { name: "Holistic Integration", desc: "I value seeing that everything connected, compounding, and in its place" },
    { name: "Still Waters", desc: '"Restorative" drive to make things whole and unbroken (Eden/Heaven)' },
    { name: "Glory of Nature", desc: 'I long to reflect God\'s heart by being "Vast, Wild, and Refreshing"' },
    { name: "A Heart for the Fatherless", desc: "I reveal God's heart for Fathering the Fatherless" },
  ],
  strengths: [
    { name: "Heightened Sensitivity", subs: [
      { name: "Feeling", desc: "Empathy to feel what others are going through, tenderness to share love" },
      { name: "Sight", desc: "Vision to see through to the heart, see long-term potential, see patterns, seeing and naming what's true" },
      { name: "Hearing", desc: "The voice of God and the enemy to echo the love of God clearly" },
    ]},
    { name: "Shepherd's Heart", subs: [{ name: "", desc: 'A gentle strength to lead with a "nurturing spirit" and a "shepherd\'s heart" \u2014 provides safety and protection while nurturing and encouraging growth' }] },
    { name: "Sharpening Arrows", subs: [{ name: "", desc: "Leading those around me to be restored, stirred up, and sharpened in the sense of their value, purpose, and glory, and to send them back into their domains with increased impact" }] },
    { name: "Building Relationships", subs: [{ name: "", desc: "Leading with trust and a genuine desire to connect, nurturing a loyal cohort" }] },
    { name: "Creating", subs: [{ name: "", desc: "Providing solutions to problems, challenge current thinking with new ideas without diminishing the self-worth of those you are leading" }] },
  ],
};
const DEFAULT_SPHERE_TEMPLATES = [
  { name: "Personal", letter: "P", icon: "User", purpose: "Steward your body, mind, and soul." },
  { name: "Marriage", letter: "M", icon: "Heart", purpose: "Cultivate deep partnership." },
  { name: "Family", letter: "F", icon: "Baby", purpose: "Raise your children with presence." },
  { name: "Community", letter: "C", icon: "Users", purpose: "Belong to and build up your community." },
  { name: "Career", letter: "W", icon: "Briefcase", purpose: "Pursue your vocation with purpose." },
  { name: "Home", letter: "H", icon: "Home", purpose: "Create a space of rest and beauty." },
];
const PROJECTS = [
  { id: 1, sphereId: 1, name: "Morning Rhythm Design", type: "project", status: "active", total: 6, done: 2, intention: "Establish a consistent morning rhythm" },
  { id: 2, sphereId: 1, name: "Q1 Reading List", type: "project", status: "active", total: 4, done: 1, intention: "Read 2 books this quarter" },
  { id: 13, sphereId: 1, name: "Planning", type: "rhythm", status: "active", total: 0, done: 0, intention: "Establish a consistent morning rhythm" },
  { id: 3, sphereId: 2, name: "Date Night Planning", type: "project", status: "active", total: 3, done: 1, intention: "Weekly date night rhythm" },
  { id: 4, sphereId: 2, name: "Conflict Resolution", type: "project", status: "active", total: 5, done: 0, intention: "Work through conflict framework" },
  { id: 14, sphereId: 2, name: "Weekly Check-in", type: "rhythm", status: "active", total: 0, done: 0, intention: "Weekly date night rhythm" },
  { id: 5, sphereId: 3, name: "Summer Adventures", type: "project", status: "planning", total: 8, done: 0, intention: "Plan summer adventure calendar" },
  { id: 6, sphereId: 3, name: "Bedtime Liturgy", type: "project", status: "active", total: 4, done: 3, intention: "Create bedtime liturgy" },
  { id: 7, sphereId: 5, name: "Romans Study", type: "project", status: "active", total: 12, done: 5, intention: "Lead small group study" },
  { id: 15, sphereId: 5, name: "Daily Prayer", type: "rhythm", status: "active", total: 0, done: 0, intention: "Deepen prayer partnership" },
  { id: 8, sphereId: 6, name: "Dinner Series", type: "project", status: "active", total: 6, done: 2, intention: "Host monthly neighborhood dinner" },
  { id: 9, sphereId: 7, name: "Q2 Product Launch", type: "project", status: "active", total: 15, done: 4, intention: "Launch Q2 initiative" },
  { id: 10, sphereId: 7, name: "Leadership Pipeline", type: "project", status: "planning", total: 7, done: 0, intention: "Develop leadership pipeline" },
  { id: 11, sphereId: 8, name: "Garage Renovation", type: "project", status: "active", total: 10, done: 6, intention: "Complete garage renovation" },
  { id: 16, sphereId: 8, name: "Saturday Deep Clean", type: "rhythm", status: "active", total: 0, done: 0, intention: "Establish cleaning rhythm" },
  { id: 12, sphereId: 4, name: "Holiday Gathering", type: "project", status: "planning", total: 5, done: 0, intention: "Plan holiday gathering" },
];
/* ═══ GOALS ═══ */
const INIT_GOALS = [
  { id: 7001, sphereId: 1, name: "Run a half marathon", target: "Complete the Peachtree Road Race", targetDate: "Jun 15", progress: 35 },
  { id: 7002, sphereId: 1, name: "Read 12 books this year", target: "1 book per month avg", targetDate: "Dec 31", progress: 16 },
  { id: 7003, sphereId: 2, name: "Complete marriage retreat", target: "Attend Gottman weekend retreat", targetDate: "May 10", progress: 0 },
  { id: 7004, sphereId: 7, name: "Promotion to Senior Lead", target: "Demonstrate leadership pipeline results", targetDate: "Sep 1", progress: 20 },
  { id: 7005, sphereId: 3, name: "Family camping trip", target: "3-night trip to Appalachian Trail", targetDate: "Jul 20", progress: 10 },
  { id: 7006, sphereId: 8, name: "Finish garage renovation", target: "Fully functional workshop space", targetDate: "Apr 30", progress: 60 },
];
let nextGoalId = 7100;

const INIT_TASKS = [
  { id: 1, text: "Journal and pray \u2014 morning rhythm", sphere: "Personal", project: "Morning Rhythm Design", doingDate: "Today", dueDate: null, done: false, priority: "focus" },
  { id: 2, text: "Review Romans 8 notes for small group", sphere: "Being Church", project: "Romans Study", doingDate: "Today", dueDate: "Mar 2", done: false, priority: "focus" },
  { id: 3, text: "Call electrician about garage wiring", sphere: "House & Home", project: "Garage Renovation", doingDate: "Today", dueDate: "Mar 5", done: false, priority: "normal" },
  { id: 4, text: "Draft Q2 launch timeline", sphere: "Career", project: "Q2 Product Launch", doingDate: "Today", dueDate: "Mar 1", done: false, priority: "focus" },
  { id: 5, text: "Research date night restaurants", sphere: "Marriage", project: "Date Night Planning", doingDate: "Today", dueDate: null, done: true, priority: "normal" },
  { id: 6, text: "Text neighbors about March dinner", sphere: "Neighboring", project: "Dinner Series", doingDate: "Today", dueDate: "Mar 3", done: false, priority: "normal" },
];
const TOMORROW_TASKS = [
  { id: 7, text: "Buy supplies for liturgy cards", sphere: "Family & Parenting", project: "Bedtime Liturgy", doingDate: "Tomorrow", dueDate: null, done: false, priority: "normal" },
  { id: 8, text: "Read chapters 3-4", sphere: "Personal", project: "Q1 Reading List", doingDate: "Tomorrow", dueDate: null, done: false, priority: "normal" },
];
const UPCOMING_TASKS = [
  { id: 9, text: "Schedule call with Mom and Dad", sphere: "Extended Family", project: "Holiday Gathering", doingDate: "Mar 1", dueDate: "Mar 7", done: false, priority: "normal" },
  { id: 10, text: "Finalize launch deck slides", sphere: "Career", project: "Q2 Product Launch", doingDate: "Mar 1", dueDate: "Mar 3", done: false, priority: "focus" },
  { id: 11, text: "Order drywall for garage", sphere: "House & Home", project: "Garage Renovation", doingDate: "Mar 2", dueDate: "Mar 8", done: false, priority: "normal" },
  { id: 12, text: "Plan date night for anniversary", sphere: "Marriage", project: "Date Night Planning", doingDate: "Mar 3", dueDate: null, done: false, priority: "normal" },
  { id: 17, text: "Prep small group discussion questions", sphere: "Being Church", project: "Romans Study", doingDate: "Mar 4", dueDate: "Mar 5", done: false, priority: "focus" },
  { id: 18, text: "Research summer camp options", sphere: "Family & Parenting", project: "Summer Adventures", doingDate: "Mar 5", dueDate: null, done: false, priority: "normal" },
  { id: 19, text: "Draft leadership framework doc", sphere: "Career", project: "Leadership Pipeline", doingDate: "Mar 6", dueDate: "Mar 14", done: false, priority: "normal" },
];
const INBOX_ITEMS = [
  { id: 101, text: "Look into that podcast Marcus mentioned", created: "Feb 26" },
  { id: 102, text: "New curriculum idea for small group", created: "Feb 25" },
  { id: 103, text: "Fix the leaky faucet in the upstairs bathroom", created: "Feb 24" },
  { id: 104, text: "Birthday gift idea for Arwen", created: "Feb 24" },
  { id: 105, text: "Research neighborhood block party permits", created: "Feb 22" },
];
const PROJECT_TASKS = {
  1: [{ id: 201, text: "Research ideal morning routine elements", done: true, priority: "normal", dueDate: null }, { id: 202, text: "Draft initial rhythm schedule", done: true, priority: "normal", dueDate: null }, { id: 203, text: "Try wake-up at 5:30am for one week", done: false, priority: "focus", dueDate: "Mar 3" }, { id: 204, text: "Journal template design", done: false, priority: "normal", dueDate: "Mar 5" }, { id: 205, text: "Set up prayer station in study", done: false, priority: "normal", dueDate: null }, { id: 206, text: "One-month review and adjust", done: false, priority: "normal", dueDate: "Mar 28" }],
  9: [{ id: 301, text: "Competitive landscape analysis", done: true, priority: "focus", dueDate: "Feb 15" }, { id: 302, text: "Draft product requirements doc", done: true, priority: "focus", dueDate: "Feb 20" }, { id: 303, text: "Design review with team", done: true, priority: "normal", dueDate: "Feb 24" }, { id: 304, text: "Build prototype v1", done: true, priority: "focus", dueDate: "Feb 28" }, { id: 305, text: "Draft Q2 launch timeline", done: false, priority: "focus", dueDate: "Mar 1" }, { id: 306, text: "Finalize launch deck slides", done: false, priority: "normal", dueDate: "Mar 3" }, { id: 307, text: "Stakeholder review meeting", done: false, priority: "focus", dueDate: "Mar 7" }, { id: 308, text: "QA testing sprint", done: false, priority: "normal", dueDate: "Mar 10" }, { id: 309, text: "Marketing assets handoff", done: false, priority: "normal", dueDate: "Mar 12" }, { id: 310, text: "Soft launch to beta users", done: false, priority: "focus", dueDate: "Mar 17" }, { id: 311, text: "Full launch", done: false, priority: "focus", dueDate: "Mar 21" }],
  7: [{ id: 401, text: "Select study guide for Romans", done: true, priority: "normal", dueDate: null }, { id: 402, text: "Prepare Romans 1-3 overview", done: true, priority: "focus", dueDate: null }, { id: 403, text: "Lead session on Romans 1-3", done: true, priority: "focus", dueDate: null }, { id: 404, text: "Prepare Romans 4-5 notes", done: true, priority: "normal", dueDate: null }, { id: 405, text: "Lead session on Romans 4-5", done: true, priority: "focus", dueDate: null }, { id: 406, text: "Review Romans 8 notes", done: false, priority: "focus", dueDate: "Mar 2" }, { id: 407, text: "Prep discussion questions ch. 6-7", done: false, priority: "normal", dueDate: "Mar 5" }, { id: 408, text: "Lead session on Romans 6-8", done: false, priority: "focus", dueDate: "Mar 9" }],
};
const RHYTHM_DETAILS = {
  13: { name: "Planning", cadence: "Weekly", day: "Sunday", time: "7:00 PM", steps: ["Review completed tasks from the week", "Process inbox items", "Review each sphere briefly", "Set focus intentions for next week", "Plan tomorrow's tasks"], streak: 4 },
  14: { name: "Weekly Check-in", cadence: "Weekly", day: "Friday", time: "8:00 PM", steps: ["Share highs and lows", "Discuss upcoming calendar", "Pray together"], streak: 6 },
  15: { name: "Daily Prayer", cadence: "Daily", day: null, time: "6:00 AM", steps: ["Scripture reading", "Journaled prayer", "Intercession list"], streak: 12 },
  16: { name: "Saturday Deep Clean", cadence: "Weekly", day: "Saturday", time: "9:00 AM", steps: ["Kitchen deep clean", "Bathrooms", "Vacuum all rooms", "Laundry cycle", "Declutter one area"], streak: 3 },
};
const winsMap = { 1: "Morning rhythm 5/7 days", 5: "Great Romans 4-5 session", 7: "Prototype v1 on time", 8: "Garage wiring 80% done" };

/* ═══ LIBRARY DATA ═══ */
const NOTE_TYPES = [
  { id: "reference", label: "Reference", color: "#3B5998" },
  { id: "running", label: "Running Note", color: "#0048BA" },
  { id: "meeting", label: "Meeting Note", color: "#6B88C4" },
  { id: "inspiration", label: "Inspiration", color: "#A8B4D0" },
  { id: "best-practice", label: "Best Practice", color: "#101456" },
  { id: "review", label: "Review", color: "#6B88C4" },
];
let nextNoteId = 5000;
let nextFolderId = 6000;
const INIT_LIBRARY = {
  "sphere-1": {
    folders: [
      { id: 6001, name: "Morning Routine Research", notes: [
        { id: 5001, title: "Huberman Morning Protocol", type: "reference", body: "Key takeaways from Andrew Huberman\u2019s morning routine episode:\n\n\u2022 Sunlight exposure within 30 min of waking\n\u2022 Delay caffeine 90-120 min\n\u2022 Cold exposure for dopamine baseline\n\u2022 Movement before deep work", created: "Feb 20", updated: "Feb 24", pinned: false },
        { id: 5002, title: "My Ideal Morning \u2014 Draft 3", type: "running", body: "5:30 \u2014 Wake, no phone\n5:35 \u2014 Prayer + Scripture (20 min)\n6:00 \u2014 Journal (10 min)\n6:15 \u2014 Walk or stretch\n6:30 \u2014 Shower, get ready\n7:00 \u2014 Deep work block begins\n\nReflection: The prayer-first order matters. When I start with journaling I get stuck in my own head.", created: "Feb 18", updated: "Feb 27", pinned: true },
      ]},
      { id: 6002, name: "Reading Notes", notes: [
        { id: 5003, title: "Atomic Habits \u2014 Key Frameworks", type: "reference", body: "The 4 Laws of Behavior Change:\n1. Make it obvious (cue)\n2. Make it attractive (craving)\n3. Make it easy (response)\n4. Make it satisfying (reward)\n\nIdentity-based habits > outcome-based habits. Ask \u2018who do I want to become?\u2019 not \u2018what do I want to achieve?\u2019\n\nThis connects deeply to the Glory Frame concept \u2014 identity before action.", created: "Feb 10", updated: "Feb 10", pinned: false },
      ]},
    ],
    loose: [
      { id: 5004, title: "Quote \u2014 Buechner on Vocation", type: "inspiration", body: "\"The place God calls you to is the place where your deep gladness and the world's deep hunger meet.\" \u2014 Frederick Buechner\n\nThis keeps coming back to me. My deep gladness = shepherding. The world\u2019s deep hunger = fatherlessness, disconnection.", created: "Feb 14", updated: "Feb 14", pinned: true },
      { id: 5005, title: "Therapy Session \u2014 Feb 21", type: "meeting", body: "Key themes:\n\u2022 Discussed the pattern of over-functioning when anxious\n\u2022 Named the fear underneath: \u2018If I don\u2019t hold everything together, it falls apart\u2019\n\u2022 Homework: Notice when I\u2019m reaching for control vs. resting in trust\n\u2022 Next session: Explore childhood origins of this pattern", created: "Feb 21", updated: "Feb 21", pinned: false },
    ],
  },
  "sphere-2": {
    folders: [
      { id: 6003, name: "Communication Frameworks", notes: [
        { id: 5006, title: "Gottman\u2019s Four Horsemen", type: "best-practice", body: "The four communication patterns that predict divorce:\n1. Criticism \u2014 attacking character, not behavior\n2. Contempt \u2014 disrespect, mockery, eye-rolling\n3. Defensiveness \u2014 deflecting responsibility\n4. Stonewalling \u2014 withdrawing, shutting down\n\nAntidotes: Gentle startup, build culture of appreciation, take responsibility, self-soothe then re-engage.", created: "Jan 28", updated: "Feb 15", pinned: true },
      ]},
    ],
    loose: [
      { id: 5007, title: "Date Night Ideas \u2014 Running List", type: "running", body: "\u2022 Cooking class at Sur La Table\n\u2022 Jazz night at The Blue Note\n\u2022 Picnic at Piedmont Park\n\u2022 Pottery painting\n\u2022 Bookstore + coffee crawl\n\u2022 Stargazing at the lake\n\u2022 Museum late night\n\u2022 Farm-to-table dinner at The Farmhouse", created: "Feb 5", updated: "Feb 26", pinned: false },
    ],
  },
  "sphere-7": { folders: [], loose: [
    { id: 5008, title: "Leadership Principles \u2014 Working Draft", type: "running", body: "What I\u2019m learning about the kind of leader I want to be:\n\n1. See people before problems\n2. Create safety for honest conversation\n3. Hold tension between vision and patience\n4. Celebrate in public, coach in private\n5. The team\u2019s growth IS the work, not a side effect of it\n\nStill refining. These feel right but need stress-testing.", created: "Feb 12", updated: "Feb 25", pinned: true },
  ]},
  "project-9": {
    folders: [{ id: 6004, name: "Research & Analysis", notes: [
      { id: 5009, title: "Competitive Landscape \u2014 Feb 15", type: "reference", body: "Analyzed 4 main competitors:\n\nCompetitor A: Strong on onboarding, weak on retention features\nCompetitor B: Best-in-class API but poor UX\nCompetitor C: Great mobile experience, limited integrations\nCompetitor D: Enterprise focus, too complex for our market\n\nOur angle: Best onboarding + mobile-first + integrations sweet spot.", created: "Feb 15", updated: "Feb 15", pinned: false },
    ]}],
    loose: [
      { id: 5010, title: "Stakeholder Meeting \u2014 Feb 24", type: "meeting", body: "Attendees: Aragorn, Gimli, Gandalf\n\nDecisions made:\n\u2022 Launch date confirmed: March 21\n\u2022 Soft launch to beta users March 17\n\u2022 Marketing owns launch assets by March 12\n\u2022 Go/no-go checkpoint: March 14\n\nOpen questions:\n\u2022 Pricing tier structure still TBD\n\u2022 Need to decide on onboarding flow length", created: "Feb 24", updated: "Feb 24", pinned: false },
    ],
  },
  "project-7": { folders: [], loose: [
    { id: 5011, title: "Discussion Guide Template", type: "best-practice", body: "Structure that\u2019s been working:\n\n1. Opening prayer (2 min)\n2. Quick recap of last session (3 min)\n3. Observation: What does the text say? (10 min)\n4. Interpretation: What does it mean? (15 min)\n5. Application: What do we do about it? (12 min)\n6. Prayer requests & closing (8 min)\n\nKey: Don\u2019t rush interpretation to get to application. The meaning IS the transformative part.", created: "Feb 8", updated: "Feb 22", pinned: true },
  ]},
  "attune": { folders: [
    { id: 6010, name: "Annual Reviews", notes: [] },
    { id: 6011, name: "Monthly Reviews", notes: [] },
  ], loose: [] },
};

/* ═══ DESIGN SYSTEM ═══ */
const P = {
  midnight: "#101456", blue: "#0048BA", steel: "#3B5998", sky: "#6B88C4",
  mist: "#A8B4D0", fog: "#D0D4DF", cloud: "#E8EAF0", offwhite: "#DFE0D8",
  white: "#FFFFFF", ink: "#101456", bg: "#EDEEE8", muted: "#6E7186", soft: "#9EA1B2",
};
const T = { blue: "#E4EAF8", deep: "#D0D8EE", warm: "#F0F1EB" };
const h = "'DM Sans', sans-serif";
const b = "'DM Sans', sans-serif";
const s = "'Crimson Pro', Georgia, serif";
const findSphere = (spheres, name) => spheres.find(sp => sp.name === name);
const scArr = [P.blue, P.steel, P.midnight, P.sky];
const stArr = [T.blue, T.blue, T.deep, T.blue];
const getColor = (idx) => scArr[idx % scArr.length];
const getTint = (idx) => stArr[idx % stArr.length];
let nextSphereId = 100;

/* ── RESPONSIVE ── */
function useIsMobile(bp = 768) {
  const [mobile, setMobile] = useState(() => typeof window !== "undefined" ? window.innerWidth < bp : false);
  useEffect(() => {
    const handler = () => setMobile(window.innerWidth < bp);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [bp]);
  return mobile;
}

/* ── DRAG AND DROP HOOK ── */
function useDragReorder(items, onReorder) {
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);
  const [dragIdx, setDragIdx] = useState(null);

  const onDragStart = useCallback((idx) => {
    dragItem.current = idx;
    setDragIdx(idx);
  }, []);

  const onDragEnter = useCallback((idx) => {
    dragOverItem.current = idx;
  }, []);

  const onDragEnd = useCallback(() => {
    if (dragItem.current !== null && dragOverItem.current !== null && dragItem.current !== dragOverItem.current) {
      const arr = [...items];
      const [moved] = arr.splice(dragItem.current, 1);
      arr.splice(dragOverItem.current, 0, moved);
      onReorder(arr);
    }
    dragItem.current = null;
    dragOverItem.current = null;
    setDragIdx(null);
  }, [items, onReorder]);

  return { dragIdx, onDragStart, onDragEnter, onDragEnd };
}

/* ── SHARED COMPONENTS ── */
function Pill({ children, color = P.blue, solid }) {
  return <span style={{ display: "inline-block", fontSize: 11, fontFamily: h, fontWeight: 600, color: solid ? P.white : color, background: solid ? color : (color + "14"), padding: "4px 14px", borderRadius: 100 }}>{children}</span>;
}
function Bar({ done, total, color = P.blue }) {
  const pct = total > 0 ? (done / total) * 100 : 0;
  return <div style={{ display: "flex", alignItems: "center", gap: 10 }}><div style={{ flex: 1, height: 5, background: P.fog, borderRadius: 3 }}><div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 3, transition: "width 0.5s ease" }} /></div><span style={{ fontSize: 12, fontFamily: b, fontWeight: 600, color: P.muted }}>{done}/{total}</span></div>;
}
function Heading({ children }) {
  return <p style={{ fontSize: 11, fontFamily: h, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: P.muted, margin: "0 0 14px" }}>{children}</p>;
}
function Btn({ label, onClick, variant = "primary" }) {
  const styles = { primary: { color: P.white, bg: P.blue }, secondary: { color: P.blue, bg: T.blue }, ghost: { color: P.muted, bg: P.white }, danger: { color: "#C0392B", bg: "#FDEDEC" } };
  const st2 = styles[variant];
  return <button onClick={onClick} style={{ fontSize: 12, fontFamily: h, fontWeight: 600, color: st2.color, background: st2.bg, border: "none", padding: "6px 16px", borderRadius: 100, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 4 }}>{label}</button>;
}
function Task({ task, spheres, onToggle, onClick, draggable, onDragStart, onDragEnter, onDragEnd, isDragging }) {
  const sp = findSphere(spheres, task.sphere); const idx = sp ? spheres.findIndex(x => x.id === sp.id) : 0;
  const c = getColor(idx); const isFocus = task.priority === "focus" && !task.done;
  return (
    <div
      draggable={draggable}
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      onDragEnd={onDragEnd}
      onDragOver={e => e.preventDefault()}
      onClick={onClick}
      style={{ display: "flex", gap: 10, padding: "14px 18px", marginBottom: 3, background: P.white, borderRadius: 14, cursor: draggable ? "grab" : "pointer", borderLeft: isFocus ? `4px solid ${P.blue}` : "4px solid transparent", alignItems: "flex-start", opacity: isDragging ? 0.4 : 1, transition: "opacity 0.15s" }}
    >
      <button onClick={e => { e.stopPropagation(); onToggle?.(task.id); }} style={{ width: 22, height: 22, flexShrink: 0, marginTop: 1, padding: 0, border: task.done ? "none" : `2px solid ${isFocus ? P.blue : P.fog}`, background: task.done ? P.steel : "transparent", borderRadius: 7, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {task.done && <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 6L5 8.5L9.5 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
      </button>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: 15, fontFamily: b, fontWeight: 450, lineHeight: 1.5, color: task.done ? P.soft : P.ink, textDecoration: task.done ? "line-through" : "none", margin: "0 0 2px" }}>{task.text}</p>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 7, height: 7, borderRadius: 2, background: c, flexShrink: 0 }} />
          <span style={{ fontSize: 12, fontFamily: b, color: P.muted }}>{task.sphere}</span>
          {task.dueDate && <span style={{ fontSize: 11, fontFamily: b, fontWeight: 600, color: P.blue }}>{task.dueDate}</span>}
        </div>
      </div>
    </div>
  );
}
function Person({ person }) {
  const initials = person.name.split(" ").map(w => w[0]).join("");
  return <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 72 }}>
    {person.photo
      ? <img src={person.photo} alt="" style={{ width: 52, height: 52, objectFit: "cover", borderRadius: 16 }} />
      : <div style={{ width: 52, height: 52, borderRadius: 16, background: T.blue, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontSize: 17, fontFamily: h, fontWeight: 700, color: P.steel }}>{initials}</span></div>
    }
    <span style={{ fontSize: 11, fontFamily: b, fontWeight: 500, color: P.ink, textAlign: "center", marginTop: 6, lineHeight: 1.2 }}>{person.name}</span>
  </div>;
}
function SphereIcon({ sphere, size = 20, color = "#0048BA" }) {
  if (sphere.icon && sphere.icon.startsWith("http")) return <img src={sphere.icon} alt="" style={{ width: size, height: size, objectFit: "contain", borderRadius: 4 }} />;
  if (sphere.icon && ICONS[sphere.icon]) { const Ic = ICONS[sphere.icon]; return <Ic size={size} color={color} strokeWidth={2.2} />; }
  return <span style={{ fontSize: size * 0.7, fontFamily: h, fontWeight: 800, color }}>{sphere.letter}</span>;
}
function IconPicker({ current, onSelect, onClose }) {
  const [search, setSearch] = useState(""); const [tab, setTab] = useState("icons"); const [url, setUrl] = useState("");
  const filtered = ICON_NAMES.filter(n => n.toLowerCase().includes(search.toLowerCase()));
  const tabStyle = (t2) => ({ fontSize: 12, fontFamily: h, fontWeight: 600, padding: "6px 16px", borderRadius: 100, border: "none", cursor: "pointer", background: tab === t2 ? P.ink : P.bg, color: tab === t2 ? P.white : P.muted });
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(16,20,86,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999 }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ background: "#FFFFFF", borderRadius: 22, padding: "28px 28px 20px", width: 440, maxHeight: "75vh", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontSize: 18, fontFamily: h, fontWeight: 700, color: P.ink, margin: 0 }}>Choose Icon</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 22, color: P.muted, cursor: "pointer", padding: 4 }}>\u00d7</button>
        </div>
        <div style={{ display: "flex", gap: 4, marginBottom: 14 }}>
          <button onClick={() => setTab("icons")} style={tabStyle("icons")}>Library</button>
          <button onClick={() => setTab("url")} style={tabStyle("url")}>Thiings / URL</button>
        </div>
        {tab === "icons" && <>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search icons..." style={{ border: `1px solid ${P.fog}`, borderRadius: 10, padding: "10px 14px", fontSize: 14, fontFamily: h, outline: "none", color: P.ink, marginBottom: 10, width: "100%", boxSizing: "border-box" }} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, overflow: "auto", flex: 1, padding: "4px 0" }}>
            {filtered.map(name => { const Ic = ICONS[name]; const active = current === name; return (
              <button key={name} onClick={() => { onSelect(name); onClose(); }} title={name} style={{ width: 48, height: 48, borderRadius: 12, border: active ? `2px solid ${P.blue}` : "2px solid transparent", background: active ? T.blue : "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <Ic size={22} color={active ? P.blue : P.muted} strokeWidth={2} />
              </button>
            ); })}
          </div>
        </>}
        {tab === "url" && <div style={{ flex: 1 }}>
          <a href="https://www.thiings.co/things" target="_blank" rel="noopener" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "14px 20px", background: P.ink, color: P.white, borderRadius: 12, textDecoration: "none", fontSize: 14, fontFamily: h, fontWeight: 600, marginBottom: 16 }}>Browse Thiings.co Collection \u2197</a>
          <p style={{ fontSize: 13, fontFamily: h, color: P.muted, marginBottom: 10, lineHeight: 1.5 }}>Find an icon on Thiings, right-click the image and "Copy image address", then paste below.</p>
          <input value={url} onChange={e => setUrl(e.target.value)} placeholder="Paste image URL here..." style={{ border: `1px solid ${P.fog}`, borderRadius: 10, padding: "12px 14px", fontSize: 14, fontFamily: h, outline: "none", color: P.ink, width: "100%", boxSizing: "border-box", marginBottom: 12 }} />
          {url && <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 16px", background: P.bg, borderRadius: 12, marginBottom: 12 }}>
            <img src={url} alt="preview" style={{ width: 48, height: 48, objectFit: "contain", borderRadius: 8 }} onError={e => { e.target.style.display = "none"; }} />
            <div style={{ flex: 1 }}><p style={{ fontSize: 13, fontFamily: h, color: P.ink, margin: 0, wordBreak: "break-all" }}>Preview</p></div>
            <button onClick={() => { onSelect(url); onClose(); }} style={{ fontSize: 12, fontFamily: h, fontWeight: 600, color: P.white, background: P.blue, border: "none", padding: "8px 18px", borderRadius: 100, cursor: "pointer" }}>Use This</button>
          </div>}
        </div>}
      </div>
    </div>
  );
}

/* ── LIBRARY COMPONENTS ── */
function NoteTypePill({ type }) {
  const nt = NOTE_TYPES.find(t => t.id === type);
  if (!nt) return null;
  return <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 10, fontFamily: h, fontWeight: 600, color: nt.color, background: nt.color + "14", padding: "3px 10px", borderRadius: 100 }}><span style={{ width: 5, height: 5, borderRadius: 5, background: nt.color }} />{nt.label}</span>;
}
function NoteCard({ note, onClick }) {
  const lines = (note.body || "").split("\n").filter(l => l.trim());
  const preview = lines.slice(0, 2).join(" ").slice(0, 120);
  return (
    <div onClick={onClick} style={{ padding: "16px 20px", background: P.white, borderRadius: 14, cursor: "pointer", marginBottom: 4, borderLeft: note.pinned ? `3px solid ${P.blue}` : "3px solid transparent" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
        {note.pinned && <svg width="10" height="10" viewBox="0 0 24 24" fill={P.blue} stroke="none"><circle cx="12" cy="12" r="4"/></svg>}
        <p style={{ fontSize: 15, fontFamily: h, fontWeight: 600, color: P.ink, margin: 0, lineHeight: 1.3 }}>{note.title}</p>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
        <NoteTypePill type={note.type} />
        <span style={{ fontSize: 11, fontFamily: b, color: P.soft }}>{note.updated}</span>
      </div>
      {preview && <p style={{ fontSize: 13, fontFamily: b, color: P.muted, margin: 0, lineHeight: 1.55, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{preview}</p>}
    </div>
  );
}
function NoteEditor({ note, onSave, onBack, onDelete, onTogglePin }) {
  const [title, setTitle] = useState(note?.title || "");
  const [body, setBody] = useState(note?.body || "");
  const [type, setType] = useState(note?.type || "running");
  const [showTypeMenu, setShowTypeMenu] = useState(false);
  const isNew = !note?.id;
  const nt = NOTE_TYPES.find(t => t.id === type);
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <button onClick={onBack} style={{ background: P.white, border: "none", fontSize: 12, fontFamily: h, fontWeight: 600, color: P.muted, padding: "6px 16px", borderRadius: 100, cursor: "pointer" }}>{"\u2190"} Back</button>
        <div style={{ display: "flex", gap: 6 }}>
          {!isNew && <button onClick={onTogglePin} style={{ fontSize: 12, fontFamily: h, fontWeight: 600, color: note?.pinned ? P.blue : P.muted, background: note?.pinned ? T.blue : P.white, border: "none", padding: "6px 14px", borderRadius: 100, cursor: "pointer" }}>{note?.pinned ? "Pinned" : "Pin"}</button>}
          {!isNew && <button onClick={onDelete} style={{ fontSize: 12, fontFamily: h, fontWeight: 600, color: "#C0392B", background: "#FDEDEC", border: "none", padding: "6px 14px", borderRadius: 100, cursor: "pointer" }}>Delete</button>}
          <button onClick={() => onSave({ title, body, type })} style={{ fontSize: 12, fontFamily: h, fontWeight: 600, color: P.white, background: P.blue, border: "none", padding: "6px 18px", borderRadius: 100, cursor: "pointer" }}>{isNew ? "Create" : "Save"}</button>
        </div>
      </div>
      <div style={{ maxWidth: 640 }}>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Note title..." style={{ width: "100%", boxSizing: "border-box", border: "none", background: "transparent", fontSize: 28, fontFamily: h, fontWeight: 800, color: P.ink, outline: "none", padding: 0, marginBottom: 12, letterSpacing: "-0.02em" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
          <div style={{ position: "relative" }}>
            <button onClick={() => setShowTypeMenu(!showTypeMenu)} style={{ display: "flex", alignItems: "center", gap: 6, background: P.white, border: `1px solid ${P.fog}`, borderRadius: 100, padding: "6px 14px", cursor: "pointer", fontSize: 12, fontFamily: h, fontWeight: 600, color: nt?.color || P.muted }}>
              <span style={{ width: 6, height: 6, borderRadius: 6, background: nt?.color || P.muted }} />{nt?.label || "Type"}<span style={{ fontSize: 10, marginLeft: 2 }}>{"\u25BE"}</span>
            </button>
            {showTypeMenu && <div style={{ position: "absolute", top: 36, left: 0, background: P.white, borderRadius: 12, padding: 6, minWidth: 160, boxShadow: "0 4px 20px rgba(16,20,86,0.12)", zIndex: 10 }}>
              {NOTE_TYPES.map(nt2 => (
                <button key={nt2.id} onClick={() => { setType(nt2.id); setShowTypeMenu(false); }} style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "8px 12px", border: "none", background: type === nt2.id ? nt2.color + "14" : "none", borderRadius: 8, cursor: "pointer", fontSize: 13, fontFamily: h, fontWeight: 500, color: nt2.color }}>
                  <span style={{ width: 6, height: 6, borderRadius: 6, background: nt2.color }} />{nt2.label}
                </button>
              ))}
            </div>}
          </div>
          {!isNew && <span style={{ fontSize: 12, fontFamily: b, color: P.soft }}>Last edited {note?.updated}</span>}
        </div>
        <textarea value={body} onChange={e => setBody(e.target.value)} placeholder="Start writing..." style={{ width: "100%", boxSizing: "border-box", minHeight: 360, border: "none", background: P.white, borderRadius: 18, padding: "22px 24px", fontSize: 15, fontFamily: b, fontWeight: 400, color: P.ink, outline: "none", resize: "vertical", lineHeight: 1.75 }} />
      </div>
    </div>
  );
}
function TypeFilter({ current, onSelect }) {
  return (
    <div style={{ display: "flex", gap: 4, marginBottom: 14, flexWrap: "wrap" }}>
      <button onClick={() => onSelect(null)} style={{ fontSize: 11, fontFamily: h, fontWeight: 600, padding: "4px 12px", borderRadius: 100, border: "none", cursor: "pointer", background: !current ? P.ink : P.white, color: !current ? P.white : P.muted }}>All</button>
      {NOTE_TYPES.map(nt => (
        <button key={nt.id} onClick={() => onSelect(current === nt.id ? null : nt.id)} style={{ fontSize: 11, fontFamily: h, fontWeight: 600, padding: "4px 12px", borderRadius: 100, border: "none", cursor: "pointer", background: current === nt.id ? nt.color + "20" : P.white, color: current === nt.id ? nt.color : P.muted }}>{nt.label}</button>
      ))}
    </div>
  );
}
function NewFolderForm({ onSave, onBack }) {
  const [name, setName] = useState("");
  return (
    <div>
      <button onClick={onBack} style={{ background: P.white, border: "none", fontSize: 12, fontFamily: h, fontWeight: 600, color: P.muted, padding: "6px 16px", borderRadius: 100, cursor: "pointer", marginBottom: 20 }}>{"\u2190"} Back</button>
      <h2 style={{ fontSize: 24, fontFamily: h, fontWeight: 800, color: P.ink, marginBottom: 16, letterSpacing: "-0.02em" }}>New Folder</h2>
      <input value={name} onChange={e => setName(e.target.value)} onKeyDown={e => e.key === "Enter" && name.trim() && onSave(name)} placeholder="Folder name..." style={{ width: "100%", boxSizing: "border-box", border: `1px solid ${P.fog}`, borderRadius: 12, padding: "14px 18px", fontSize: 17, fontFamily: h, fontWeight: 600, color: P.ink, outline: "none", marginBottom: 16 }} />
      <div style={{ display: "flex", gap: 8 }}><Btn label="Create Folder" onClick={() => name.trim() && onSave(name)} /><Btn label="Cancel" variant="ghost" onClick={onBack} /></div>
    </div>
  );
}
function Library({ libraryKey, library, setLibrary }) {
  const [view, setView] = useState("list");
  const [openFolder, setOpenFolder] = useState(null);
  const [editingNote, setEditingNote] = useState(null);
  const [filterType, setFilterType] = useState(null);
  const [targetFolder, setTargetFolder] = useState(null);

  const data = library[libraryKey] || { folders: [], loose: [] };
  const setData = (nd) => setLibrary({ ...library, [libraryKey]: nd });
  const allNotes = [...data.loose, ...data.folders.flatMap(f => f.notes)];
  const filteredNotes = (notes) => filterType ? notes.filter(n => n.type === filterType) : notes;

  const saveNote = (noteData) => {
    const d = { ...data, folders: data.folders.map(f => ({ ...f, notes: [...f.notes] })), loose: [...data.loose] };
    if (editingNote?.id) {
      const updated = { ...editingNote, ...noteData, updated: "Just now" };
      let found = false;
      d.folders = d.folders.map(f => ({ ...f, notes: f.notes.map(n => { if (n.id === updated.id) { found = true; return updated; } return n; }) }));
      if (!found) d.loose = d.loose.map(n => n.id === updated.id ? updated : n);
    } else {
      const newNote = { id: nextNoteId++, ...noteData, created: "Just now", updated: "Just now", pinned: false };
      if (targetFolder) { d.folders = d.folders.map(f => f.id === targetFolder ? { ...f, notes: [...f.notes, newNote] } : f); }
      else { d.loose = [...d.loose, newNote]; }
    }
    setData(d); setView("list"); setEditingNote(null); setTargetFolder(null);
  };
  const deleteNote = (nid) => { setData({ ...data, folders: data.folders.map(f => ({ ...f, notes: f.notes.filter(n => n.id !== nid) })), loose: data.loose.filter(n => n.id !== nid) }); setView(openFolder ? "folder" : "list"); setEditingNote(null); };
  const togglePin = (nid) => { const d = { ...data, folders: data.folders.map(f => ({ ...f, notes: f.notes.map(n => n.id === nid ? { ...n, pinned: !n.pinned } : n) })), loose: data.loose.map(n => n.id === nid ? { ...n, pinned: !n.pinned } : n) }; setData(d); if (editingNote) setEditingNote({ ...editingNote, pinned: !editingNote.pinned }); };
  const createFolder = (name) => { if (!name.trim()) return; setData({ ...data, folders: [...data.folders, { id: nextFolderId++, name: name.trim(), notes: [] }] }); setView("list"); };
  const deleteFolder = (fid) => { const folder = data.folders.find(f => f.id === fid); setData({ ...data, folders: data.folders.filter(f => f.id !== fid), loose: [...data.loose, ...(folder?.notes || [])] }); setOpenFolder(null); setView("list"); };

  if (view === "note" || view === "new-note") return <NoteEditor note={editingNote} onSave={saveNote} onBack={() => { setView(openFolder ? "folder" : "list"); setEditingNote(null); }} onDelete={() => deleteNote(editingNote?.id)} onTogglePin={() => togglePin(editingNote?.id)} />;
  if (view === "new-folder") return <NewFolderForm onSave={createFolder} onBack={() => setView("list")} />;

  if (view === "folder" && openFolder) {
    const folder = data.folders.find(f => f.id === openFolder);
    if (!folder) { setView("list"); return null; }
    const notes = filteredNotes(folder.notes); const pinned = notes.filter(n => n.pinned); const unpinned = notes.filter(n => !n.pinned);
    return (
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <button onClick={() => { setView("list"); setOpenFolder(null); setFilterType(null); }} style={{ background: P.white, border: "none", fontSize: 12, fontFamily: h, fontWeight: 600, color: P.muted, padding: "6px 16px", borderRadius: 100, cursor: "pointer" }}>{"\u2190"} Library</button>
          <div style={{ display: "flex", gap: 6 }}>
            <Btn label="+ Note" variant="secondary" onClick={() => { setTargetFolder(folder.id); setEditingNote(null); setView("new-note"); }} />
            <button onClick={() => deleteFolder(folder.id)} style={{ fontSize: 12, fontFamily: h, fontWeight: 600, color: "#C0392B", background: "#FDEDEC", border: "none", padding: "6px 14px", borderRadius: 100, cursor: "pointer" }}>Remove Folder</button>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={P.blue} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
          <h2 style={{ fontSize: 24, fontFamily: h, fontWeight: 800, color: P.ink, margin: 0 }}>{folder.name}</h2>
          <span style={{ fontSize: 12, fontFamily: b, color: P.soft }}>{folder.notes.length} notes</span>
        </div>
        <TypeFilter current={filterType} onSelect={setFilterType} />
        {pinned.length > 0 && <div style={{ marginBottom: 16 }}><Heading>Pinned</Heading>{pinned.map(n => <NoteCard key={n.id} note={n} onClick={() => { setEditingNote(n); setView("note"); }} />)}</div>}
        {unpinned.map(n => <NoteCard key={n.id} note={n} onClick={() => { setEditingNote(n); setView("note"); }} />)}
        {notes.length === 0 && <div style={{ padding: "28px 20px", background: P.white, borderRadius: 18, textAlign: "center" }}><p style={{ fontSize: 14, fontFamily: b, color: P.soft }}>No notes yet.</p></div>}
      </div>
    );
  }

  const looseFiltered = filteredNotes(data.loose);
  const loosePinned = looseFiltered.filter(n => n.pinned);
  const looseUnpinned = looseFiltered.filter(n => !n.pinned);
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}><Heading>Library</Heading><span style={{ fontSize: 12, fontFamily: b, color: P.soft, marginBottom: 14 }}>{allNotes.length} notes</span></div>
        <div style={{ display: "flex", gap: 6 }}><Btn label="+ Note" variant="secondary" onClick={() => { setTargetFolder(null); setEditingNote(null); setView("new-note"); }} /><Btn label="+ Folder" variant="ghost" onClick={() => setView("new-folder")} /></div>
      </div>
      <TypeFilter current={filterType} onSelect={setFilterType} />
      {data.folders.length > 0 && <div style={{ marginBottom: 16 }}>{data.folders.map(folder => (
        <div key={folder.id} onClick={() => { setOpenFolder(folder.id); setView("folder"); }} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 18px", marginBottom: 4, background: P.white, borderRadius: 14, cursor: "pointer" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={P.steel} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
          <span style={{ flex: 1, fontSize: 15, fontFamily: h, fontWeight: 600, color: P.ink }}>{folder.name}</span>
          <span style={{ fontSize: 12, fontFamily: b, color: P.soft }}>{filteredNotes(folder.notes).length}</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={P.mist} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </div>
      ))}</div>}
      {loosePinned.length > 0 && <div style={{ marginBottom: 12 }}><Heading>Pinned</Heading>{loosePinned.map(n => <NoteCard key={n.id} note={n} onClick={() => { setEditingNote(n); setView("note"); }} />)}</div>}
      {looseUnpinned.length > 0 && <div style={{ marginBottom: 12 }}>{data.folders.length > 0 && <Heading>Unfiled</Heading>}{looseUnpinned.map(n => <NoteCard key={n.id} note={n} onClick={() => { setEditingNote(n); setView("note"); }} />)}</div>}
      {allNotes.length === 0 && data.folders.length === 0 && <div style={{ padding: "32px 20px", background: P.white, borderRadius: 18, textAlign: "center" }}>
        <p style={{ fontSize: 20, fontFamily: h, fontWeight: 700, color: P.ink, marginBottom: 4 }}>Your Library is empty</p>
        <p style={{ fontSize: 14, fontFamily: s, fontStyle: "italic", color: P.muted, marginBottom: 16 }}>This is where your thinking, reference materials, and inspiration live.</p>
        <div style={{ display: "flex", gap: 8, justifyContent: "center" }}><Btn label="+ New Note" onClick={() => { setTargetFolder(null); setEditingNote(null); setView("new-note"); }} /><Btn label="+ New Folder" variant="secondary" onClick={() => setView("new-folder")} /></div>
      </div>}
    </div>
  );
}

/* ── GLORY MAP ── */
function ScreenGloryMap({ spheres, setSpheres, profile, onSphereClick, onStartOver, mobile }) {
  const iC = spheres.reduce((a, sp) => a + sp.intentions.length, 0);
  const [editing, setEditing] = useState(false);
  const [namesOpen, setNamesOpen] = useState(false);
  const { dragIdx, onDragStart, onDragEnter, onDragEnd } = useDragReorder(spheres, setSpheres);
  const addSphere = () => { const id = nextSphereId++; setSpheres([...spheres, { id, name: "New Sphere", letter: "N", icon: null, purpose: "Define the purpose of this sphere.", people: [], intentions: [] }]); };
  const remove = (id) => { if (spheres.length <= 1) return; setSpheres(spheres.filter(sp => sp.id !== id)); };
  const lbl = { fontSize: 10, fontFamily: h, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 };
  const card = { background: P.white, borderRadius: 18, padding: "22px 24px" };
  return (
    <div>
      <div style={{ background: P.ink, color: P.white, padding: mobile ? "36px 24px 32px" : "56px 56px 48px", margin: mobile ? "-20px -20px 0" : "-44px -60px 0", borderRadius: "0 0 28px 28px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 20, right: 40, display: "flex", gap: 8, opacity: 0.06 }}>{[P.blue, P.steel, P.sky, P.midnight].map((c, i) => <div key={i} style={{ width: 60, height: 60, borderRadius: 14, background: c, transform: `rotate(${i * 12}deg)` }} />)}</div>
        <div style={{ position: "relative", maxWidth: 760 }}>
          <p style={{ ...lbl, color: P.sky, marginBottom: 20 }}>Glory Frame</p>
          <h1 style={{ fontSize: mobile ? 48 : 72, fontFamily: h, fontWeight: 800, lineHeight: 0.88, margin: "0 0 16px", letterSpacing: "-0.04em" }}>{profile.name || "Your Name"}</h1>
          {profile.motto && <p style={{ fontSize: 20, fontFamily: s, fontStyle: "italic", fontWeight: 400, color: "rgba(255,255,255,0.7)", lineHeight: 1.5, margin: "0 0 20px" }}>"{profile.motto}"</p>}
          {profile.description && <div style={{ display: "inline-flex", alignItems: "center", background: "rgba(255,255,255,0.07)", padding: "8px 20px", borderRadius: 100 }}><span style={{ fontSize: 13, fontFamily: b, fontWeight: 400, color: "rgba(255,255,255,0.5)" }}>{profile.description}</span></div>}
        </div>
      </div>
      <div style={{ margin: mobile ? "-16px 0 28px" : "-20px 0 36px", position: "relative", zIndex: 2 }}>
        {profile.nameBank?.length > 0 && <div style={{ ...card, marginBottom: 10 }}>
          <button onClick={() => setNamesOpen(!namesOpen)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
            <p style={{ ...lbl, color: P.blue, margin: 0 }}>Name Bank</p>
            <span style={{ fontSize: 14, color: P.muted, transform: namesOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>&#9662;</span>
          </button>
          {namesOpen && <div style={{ marginTop: 14 }}>{profile.nameBank.map((n, i) => (
            <div key={i} style={{ padding: "10px 0", borderTop: i > 0 ? `1px solid ${P.bg}` : "none" }}>
              <p style={{ fontSize: 15, fontFamily: h, fontWeight: 600, color: P.ink, margin: "0 0 3px" }}>{n.name}</p>
              <p style={{ fontSize: 13, fontFamily: s, fontStyle: "italic", color: P.muted, margin: 0, lineHeight: 1.5 }}>{n.meaning}</p>
            </div>
          ))}</div>}
        </div>}
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: 10, marginBottom: 10 }}>
          <div style={{ ...card, borderTop: `3px solid ${P.blue}` }}>
            <p style={{ ...lbl, color: P.blue }}>Life Vision</p>
            <p style={{ fontSize: 16, fontFamily: s, fontStyle: "italic", color: P.ink, lineHeight: 1.65, margin: 0 }}>{profile.vision || "\u2014"}</p>
          </div>
          <div style={{ ...card, borderTop: `3px solid ${P.steel}` }}>
            <p style={{ ...lbl, color: P.steel }}>Core Purpose</p>
            <p style={{ fontSize: 16, fontFamily: s, fontStyle: "italic", color: P.ink, lineHeight: 1.65, margin: 0 }}>{profile.purpose || "\u2014"}</p>
          </div>
        </div>
        {profile.desires?.length > 0 && <div style={{ ...card, marginBottom: 10 }}>
          <p style={{ ...lbl, color: P.sky }}>Desires, Values, & Truths</p>
          <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: 6 }}>
            {profile.desires.map((d, i) => (
              <div key={i} style={{ padding: "12px 14px", background: P.bg, borderRadius: 12 }}>
                <p style={{ fontSize: 14, fontFamily: h, fontWeight: 600, color: P.ink, margin: "0 0 3px" }}>{d.name}</p>
                <p style={{ fontSize: 13, fontFamily: b, color: P.muted, margin: 0, lineHeight: 1.5 }}>{d.desc}</p>
              </div>
            ))}
          </div>
        </div>}
        {profile.strengths?.length > 0 && <div style={{ ...card, marginBottom: 10 }}>
          <p style={{ ...lbl, color: P.steel }}>Strengths & Skills</p>
          {profile.strengths.map((str, i) => (
            <div key={i} style={{ marginBottom: i < profile.strengths.length - 1 ? 16 : 0 }}>
              <p style={{ fontSize: 15, fontFamily: h, fontWeight: 700, color: P.ink, margin: "0 0 6px" }}>{str.name}</p>
              {str.subs?.map((sub, j) => (
                <div key={j} style={{ padding: "8px 0 8px 16px", borderLeft: `2px solid ${P.fog}`, marginBottom: 4 }}>
                  {sub.name && <p style={{ fontSize: 13, fontFamily: h, fontWeight: 600, color: P.steel, margin: "0 0 2px" }}>{sub.name}</p>}
                  <p style={{ fontSize: 13, fontFamily: b, color: P.muted, margin: 0, lineHeight: 1.55 }}>{sub.desc}</p>
                </div>
              ))}
            </div>
          ))}
        </div>}
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <Heading>My Domain</Heading>
        <div style={{ display: "flex", gap: 6 }}>
          <Btn label={editing ? "Done" : "Edit"} variant={editing ? "primary" : "ghost"} onClick={() => setEditing(!editing)} />
          <Btn label="+ New Sphere" variant="secondary" onClick={addSphere} />
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: editing || mobile ? "1fr" : "1fr 1fr", gap: editing ? 6 : 10 }}>
        {spheres.map((sphere, idx) => {
          const ac = PROJECTS.filter(p => p.sphereId === sphere.id && p.status === "active").length;
          const c = getColor(idx); const t2 = getTint(idx);
          if (editing) return (
            <div key={sphere.id} draggable onDragStart={() => onDragStart(idx)} onDragEnter={() => onDragEnter(idx)} onDragEnd={onDragEnd} onDragOver={e => e.preventDefault()} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 18px", background: P.white, borderRadius: 14, borderLeft: `4px solid ${c}`, cursor: "grab", opacity: dragIdx === idx ? 0.4 : 1 }}>
              <div style={{ width: 30, height: 30, background: t2, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><SphereIcon sphere={sphere} size={16} color={c} /></div>
              <span style={{ flex: 1, fontSize: 16, fontFamily: h, fontWeight: 600, color: P.ink }}>{sphere.name}</span>
              <span style={{ fontSize: 12, fontFamily: b, color: P.soft }}>{ac} active</span>
              <button onClick={() => remove(sphere.id)} style={{ width: 28, height: 28, borderRadius: 7, border: "none", background: "#FDEDEC", color: "#C0392B", cursor: "pointer", fontSize: 14, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>&#215;</button>
            </div>
          );
          return (
            <div key={sphere.id} onClick={() => onSphereClick(sphere)} style={{ padding: "22px", background: P.white, borderRadius: 18, cursor: "pointer", borderTop: `3px solid ${c}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <div style={{ width: 34, height: 34, background: t2, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}><SphereIcon sphere={sphere} size={20} color={c} /></div>
                <h3 style={{ fontSize: 17, fontFamily: h, fontWeight: 700, color: P.ink, margin: 0 }}>{sphere.name}</h3>
              </div>
              <p style={{ fontSize: 14, fontFamily: s, color: P.muted, lineHeight: 1.6, marginBottom: 12, fontStyle: "italic" }}>{sphere.purpose}</p>
              {sphere.intentions.map((intent, i) => <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}><span style={{ width: 6, height: 6, borderRadius: 2, background: c, flexShrink: 0 }} /><span style={{ fontSize: 13, fontFamily: b, color: P.ink }}>{intent}</span></div>)}
              <p style={{ fontSize: 12, fontFamily: b, fontWeight: 500, color: P.soft, marginTop: 10, marginBottom: 0 }}>{ac} active</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── SPHERE DETAIL ── */
function ScreenSphere({ sphere, spheres, setSpheres, goals, setGoals, onBack, onProjectClick, onRhythmClick, onGoalClick, mobile, library, setLibrary }) {
  if (!sphere) return null;
  const idx = spheres.findIndex(sp => sp.id === sphere.id); const c = getColor(idx); const t2 = getTint(idx);
  const all = PROJECTS.filter(p => p.sphereId === sphere.id);
  const projects = all.filter(p => p.type === "project"); const rhythms = all.filter(p => p.type === "rhythm");
  const sphereGoals = goals.filter(g => g.sphereId === sphere.id);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({ name: sphere.name, letter: sphere.letter, purpose: sphere.purpose, icon: sphere.icon });
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [newPerson, setNewPerson] = useState("");
  const [newIntent, setNewIntent] = useState("");

  const save = () => { setSpheres(spheres.map(sp => sp.id === sphere.id ? { ...sp, name: draft.name, letter: draft.letter, purpose: draft.purpose, icon: draft.icon } : sp)); setEditing(false); };
  const cancel = () => { setDraft({ name: sphere.name, letter: sphere.letter, purpose: sphere.purpose, icon: sphere.icon }); setEditing(false); };
  const addPerson = () => { if (!newPerson.trim()) return; setSpheres(spheres.map(sp => sp.id === sphere.id ? { ...sp, people: [...sp.people, { name: newPerson.trim(), photo: null }] } : sp)); setNewPerson(""); };
  const removePerson = (i) => { setSpheres(spheres.map(sp => sp.id === sphere.id ? { ...sp, people: sp.people.filter((_, j) => j !== i) } : sp)); };
  const addIntent = () => { if (!newIntent.trim()) return; setSpheres(spheres.map(sp => sp.id === sphere.id ? { ...sp, intentions: [...sp.intentions, newIntent.trim()] } : sp)); setNewIntent(""); };
  const removeIntent = (i) => { setSpheres(spheres.map(sp => sp.id === sphere.id ? { ...sp, intentions: sp.intentions.filter((_, j) => j !== i) } : sp)); };

  return (
    <div>
      <div style={{ background: P.ink, color: P.white, padding: mobile ? "28px 24px 28px" : "44px 56px 40px", margin: mobile ? "-20px -20px 0" : "-44px -60px 0", borderRadius: "0 0 28px 28px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", bottom: -20, right: 40, width: 80, height: 80, borderRadius: 20, background: c, opacity: 0.08, transform: "rotate(12deg)" }} />
        <div style={{ position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
            <button onClick={onBack} style={{ background: "rgba(255,255,255,0.07)", border: "none", fontSize: 12, fontFamily: h, fontWeight: 600, color: "rgba(255,255,255,0.45)", cursor: "pointer", padding: "6px 16px", borderRadius: 100 }}>{"\u2190"} Glory Frame</button>
            {!editing && <button onClick={() => { setDraft({ name: sphere.name, letter: sphere.letter, purpose: sphere.purpose, icon: sphere.icon }); setEditing(true); }} style={{ background: "rgba(255,255,255,0.12)", border: "none", fontSize: 12, fontFamily: h, fontWeight: 600, color: "rgba(255,255,255,0.7)", cursor: "pointer", padding: "6px 16px", borderRadius: 100 }}>Edit Sphere</button>}
          </div>
          {editing ? (
            <div>
              <div style={{ display: "flex", gap: 12, marginBottom: 14 }}>
                <button onClick={() => setShowIconPicker(true)} style={{ width: 52, height: 52, borderRadius: 14, border: `2px solid ${c}`, background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>{draft.icon && draft.icon.startsWith("http") ? <img src={draft.icon} alt="" style={{ width: 30, height: 30, objectFit: "contain" }} /> : draft.icon && ICONS[draft.icon] ? (() => { const Ic = ICONS[draft.icon]; return <Ic size={26} color="white" strokeWidth={2} />; })() : <span style={{ fontSize: 24, fontFamily: h, fontWeight: 800, color: P.white }}>{draft.letter}</span>}</button>
                <input value={draft.name} onChange={e => setDraft({ ...draft, name: e.target.value })} style={{ flex: 1, border: "none", borderBottom: `2px solid ${c}`, background: "transparent", color: P.white, fontSize: 40, fontFamily: h, fontWeight: 800, outline: "none", letterSpacing: "-0.03em", padding: "0 0 4px" }} />
              </div>
              <textarea value={draft.purpose} onChange={e => setDraft({ ...draft, purpose: e.target.value })} rows={2} style={{ width: "100%", border: "none", borderBottom: "1px solid rgba(255,255,255,0.2)", background: "transparent", color: "rgba(255,255,255,0.8)", fontSize: 17, fontFamily: s, fontStyle: "italic", outline: "none", resize: "none", lineHeight: 1.6, maxWidth: 500, padding: "0 0 6px" }} />
              <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
                <button onClick={save} style={{ fontSize: 12, fontFamily: h, fontWeight: 600, color: P.ink, background: P.white, border: "none", padding: "8px 20px", borderRadius: 100, cursor: "pointer" }}>Save</button>
                <button onClick={cancel} style={{ fontSize: 12, fontFamily: h, fontWeight: 600, color: "rgba(255,255,255,0.5)", background: "transparent", border: "none", padding: "8px 16px", cursor: "pointer" }}>Cancel</button>
              </div>
            </div>
          ) : (
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}><div style={{ width: 6, height: 44, borderRadius: 3, background: c }} /><h1 style={{ fontSize: mobile ? 36 : 50, fontFamily: h, fontWeight: 800, lineHeight: 0.95, margin: 0, letterSpacing: "-0.03em" }}>{sphere.name}</h1></div>
              <p style={{ fontSize: 17, fontFamily: s, fontStyle: "italic", fontWeight: 400, lineHeight: 1.6, margin: 0, opacity: 0.75, maxWidth: 500 }}>{sphere.purpose}</p>
            </div>
          )}
        </div>
      </div>
      {/* People and Intentions */}
      <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: 10, margin: mobile ? "-12px 0 24px" : "-20px 8px 32px", position: "relative", zIndex: 2 }}>
        <div style={{ background: P.white, borderRadius: 18, padding: "20px 22px" }}>
          <Heading>To Engage</Heading>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 12 }}>
            {sphere.people.map((p, i) => (
              <div key={i} style={{ position: "relative" }}>
                <Person person={p} />
                <button onClick={() => removePerson(i)} style={{ position: "absolute", top: -2, right: -2, width: 18, height: 18, borderRadius: 9, border: "none", background: P.fog, color: P.muted, fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>&#215;</button>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <input value={newPerson} onChange={e => setNewPerson(e.target.value)} onKeyDown={e => e.key === "Enter" && addPerson()} placeholder="Add person..." style={{ flex: 1, border: `1px solid ${P.fog}`, borderRadius: 8, padding: "7px 12px", fontSize: 13, fontFamily: b, outline: "none", color: P.ink }} />
            <Btn label="Add" variant="secondary" onClick={addPerson} />
          </div>
        </div>
        <div style={{ background: P.white, borderRadius: 18, padding: "20px 22px" }}>
          <Heading>Focus Intentions</Heading>
          {sphere.intentions.map((intent, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", marginBottom: 4, background: t2, borderRadius: 10 }}>
              <span style={{ fontSize: 16, fontFamily: h, fontWeight: 800, color: c, flexShrink: 0 }}>{i + 1}</span>
              <span style={{ flex: 1, fontSize: 14, fontFamily: b, color: P.ink }}>{intent}</span>
              <button onClick={() => removeIntent(i)} style={{ width: 22, height: 22, borderRadius: 6, border: "none", background: "#FDEDEC", color: "#C0392B", cursor: "pointer", fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>&#215;</button>
            </div>
          ))}
          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <input value={newIntent} onChange={e => setNewIntent(e.target.value)} onKeyDown={e => e.key === "Enter" && addIntent()} placeholder="Add intention..." style={{ flex: 1, border: `1px solid ${P.fog}`, borderRadius: 8, padding: "7px 12px", fontSize: 13, fontFamily: b, outline: "none", color: P.ink }} />
            <Btn label="Add" variant="secondary" onClick={addIntent} />
          </div>
        </div>
      </div>
      {/* ── ENGAGEMENTS ── */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}><Heading>Engagements</Heading><div style={{ display: "flex", gap: 6 }}><Btn label="+ Project" variant="secondary" /><Btn label="+ Rhythm" variant="ghost" /><Btn label="+ Goal" variant="ghost" /></div></div>
        {/* Goals */}
        {sphereGoals.map(g => (
          <div key={g.id} onClick={() => onGoalClick?.(g)} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", marginBottom: 4, background: P.white, borderRadius: 14, cursor: "pointer" }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                <span style={{ fontSize: 15, fontFamily: b, fontWeight: 500, color: P.ink }}>{g.name}</span>
                <Pill color={P.blue}>Goal</Pill>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 4 }}>
                <span style={{ fontSize: 12, fontFamily: b, color: P.muted }}>{g.target}</span>
                <span style={{ fontSize: 11, fontFamily: h, fontWeight: 600, color: P.blue }}>{g.targetDate}</span>
              </div>
            </div>
            <div style={{ width: 100 }}><Bar done={g.progress} total={100} color={c} /></div>
          </div>
        ))}
        {/* Projects */}
        {projects.map(p => (
          <div key={p.id} onClick={() => onProjectClick?.(p)} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", marginBottom: 4, background: P.white, borderRadius: 14, cursor: "pointer" }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}><span style={{ fontSize: 15, fontFamily: b, fontWeight: 500, color: P.ink }}>{p.name}</span><Pill color={p.status === "active" ? P.steel : P.muted}>{p.status}</Pill></div>
              <p style={{ fontSize: 12, fontFamily: b, color: P.muted, margin: 0 }}>{p.intention}</p>
            </div>
            {p.total > 0 && <div style={{ width: 120 }}><Bar done={p.done} total={p.total} color={c} /></div>}
          </div>
        ))}
        {/* Rhythms */}
        {rhythms.map(r2 => (
          <div key={r2.id} onClick={() => onRhythmClick?.(r2)} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", marginBottom: 4, background: P.white, borderRadius: 14, cursor: "pointer" }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ fontSize: 15, fontFamily: b, fontWeight: 500, color: P.ink }}>{r2.name}</span><Pill color={P.sky}>Rhythm</Pill></div>
              <p style={{ fontSize: 12, fontFamily: b, color: P.muted, margin: 0 }}>{r2.intention}</p>
            </div>
          </div>
        ))}
      </div>
      {/* ── LIBRARY ── */}
      <div style={{ marginBottom: 32 }}>
        <Library libraryKey={`sphere-${sphere.id}`} library={library} setLibrary={setLibrary} />
      </div>
      {showIconPicker && <IconPicker current={draft.icon} onSelect={(name) => { setDraft(d2 => ({ ...d2, icon: name })); setSpheres(spheres.map(sp => sp.id === sphere.id ? { ...sp, icon: name } : sp)); }} onClose={() => setShowIconPicker(false)} />}
    </div>
  );
}

/* ── INBOX ── */
function ScreenInbox({ items, addItem }) {
  const [v, setV] = useState("");
  const allItems = items || INBOX_ITEMS;
  return (
    <div>
      <h1 style={{ fontSize: 48, fontFamily: h, fontWeight: 800, color: P.ink, letterSpacing: "-0.03em", margin: "0 0 6px" }}>Inbox</h1>
      <p style={{ fontSize: 16, fontFamily: s, fontStyle: "italic", color: P.muted, marginBottom: 24 }}>Capture now, organize later.</p>
      <div style={{ display: "flex", alignItems: "center", gap: 12, background: P.white, borderRadius: 14, padding: "14px 18px", marginBottom: 24 }}><span style={{ fontSize: 20, fontFamily: h, fontWeight: 500, color: P.blue }}>+</span><input value={v} onChange={e => setV(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && v.trim()) { addItem?.(v.trim()); setV(""); }}} placeholder="What's on your mind?" style={{ flex: 1, border: "none", outline: "none", fontSize: 15, fontFamily: b, fontWeight: 400, color: P.ink, background: "transparent" }} /><kbd style={{ fontSize: 10, fontFamily: b, fontWeight: 600, color: P.soft, border: `1px solid ${P.fog}`, background: P.bg, padding: "2px 8px", borderRadius: 5 }}>&#9166;</kbd></div>
      {allItems.map(item => <div key={item.id} style={{ display: "flex", gap: 14, padding: "14px 18px", marginBottom: 3, background: P.white, borderRadius: 14, cursor: "pointer" }}><div style={{ width: 20, height: 20, flexShrink: 0, marginTop: 2, border: `2px solid ${P.fog}`, borderRadius: 7 }} /><div style={{ flex: 1 }}><p style={{ fontSize: 15, fontFamily: b, color: P.ink, margin: "0 0 2px", lineHeight: 1.5 }}>{item.text}</p><span style={{ fontSize: 11, fontFamily: b, color: P.soft }}>{item.created}</span></div><button style={{ background: T.blue, border: "none", fontSize: 11, fontFamily: h, fontWeight: 600, color: P.blue, padding: "5px 14px", borderRadius: 100, cursor: "pointer", alignSelf: "center" }}>Organize</button></div>)}
      <p style={{ fontSize: 12, fontFamily: b, color: P.soft, marginTop: 10 }}>{allItems.length} waiting</p>
    </div>
  );
}

/* ── TODAY ── */
function ScreenToday({ tasks, setTasks, spheres, onTaskClick, toggleTask, addTask }) {
  const [v, setV] = useState("");
  const focus = tasks.filter(t => t.priority === "focus" && !t.done);
  const other = tasks.filter(t => t.priority !== "focus" && !t.done);
  const done = tasks.filter(t => t.done);
  const pct = tasks.length > 0 ? (done.length / tasks.length) * 100 : 0;

  const focusDrag = useDragReorder(focus, (newArr) => {
    const rest = tasks.filter(t => !focus.includes(t));
    setTasks([...newArr, ...rest.filter(t => other.includes(t)), ...rest.filter(t => done.includes(t))]);
  });
  const otherDrag = useDragReorder(other, (newArr) => {
    const rest = tasks.filter(t => !other.includes(t));
    setTasks([...rest.filter(t => focus.includes(t)), ...newArr, ...rest.filter(t => done.includes(t))]);
  });

  return (
    <div>
      <p style={{ fontSize: 12, fontFamily: h, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: P.muted, marginBottom: 6 }}>Friday, February 27</p>
      <h1 style={{ fontSize: 56, fontFamily: h, fontWeight: 800, color: P.ink, letterSpacing: "-0.04em", margin: "0 0 16px" }}>Today</h1>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        <div style={{ width: 160, height: 6, background: P.fog, borderRadius: 3 }}><div style={{ width: `${pct}%`, height: "100%", background: P.steel, borderRadius: 3, transition: "width 0.5s ease" }} /></div>
        <span style={{ fontSize: 13, fontFamily: b, fontWeight: 600, color: P.muted }}>{done.length}/{tasks.length}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, background: P.white, borderRadius: 14, padding: "14px 18px", marginBottom: 24 }}><span style={{ fontSize: 20, fontFamily: h, fontWeight: 500, color: P.blue }}>+</span><input value={v} onChange={e => setV(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && v.trim()) { addTask?.(v.trim()); setV(""); }}} placeholder="What needs doing today?" style={{ flex: 1, border: "none", outline: "none", fontSize: 15, fontFamily: b, fontWeight: 400, color: P.ink, background: "transparent" }} /><kbd style={{ fontSize: 10, fontFamily: b, fontWeight: 600, color: P.soft, border: `1px solid ${P.fog}`, background: P.bg, padding: "2px 8px", borderRadius: 5 }}>&#9166;</kbd></div>
      {focus.length > 0 && <div style={{ marginBottom: 28 }}><div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}><Pill color={P.blue} solid>Focus</Pill><span style={{ fontSize: 13, fontFamily: s, fontStyle: "italic", color: P.muted }}>What matters most</span></div>
        {focus.map((t, i) => <Task key={t.id} task={t} spheres={spheres} onClick={() => onTaskClick(t)} onToggle={toggleTask} draggable onDragStart={() => focusDrag.onDragStart(i)} onDragEnter={() => focusDrag.onDragEnter(i)} onDragEnd={focusDrag.onDragEnd} isDragging={focusDrag.dragIdx === i} />)}
      </div>}
      {other.length > 0 && <div style={{ marginBottom: 28 }}><Heading>Also Today</Heading>
        {other.map((t, i) => <Task key={t.id} task={t} spheres={spheres} onClick={() => onTaskClick(t)} onToggle={toggleTask} draggable onDragStart={() => otherDrag.onDragStart(i)} onDragEnter={() => otherDrag.onDragEnter(i)} onDragEnd={otherDrag.onDragEnd} isDragging={otherDrag.dragIdx === i} />)}
      </div>}
      {done.length > 0 && <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}><Heading>Completed</Heading><span style={{ fontSize: 12, fontFamily: h, fontWeight: 600, color: P.steel, background: T.blue, padding: "3px 10px", borderRadius: 100 }}>{done.length} done</span></div>
        {done.map(t => <div key={t.id} style={{ display: "flex", gap: 10, padding: "10px 18px", marginBottom: 2, background: P.white, borderRadius: 12, opacity: 0.4, alignItems: "center" }}>
          <button onClick={e => { e.stopPropagation(); toggleTask(t.id); }} style={{ width: 20, height: 20, flexShrink: 0, padding: 0, border: "none", background: P.steel, borderRadius: 6, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2.5 6L5 8.5L9.5 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
          <span style={{ fontSize: 14, fontFamily: b, color: P.muted, textDecoration: "line-through", flex: 1 }}>{t.text}</span>
        </div>)}
      </div>}
      <div style={{ background: P.white, borderRadius: 18, padding: "18px 22px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}><p style={{ fontSize: 11, fontFamily: h, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: P.steel, margin: 0 }}>Tomorrow</p><span style={{ fontSize: 12, fontFamily: b, color: P.soft }}>{TOMORROW_TASKS.length}</span></div>
        {TOMORROW_TASKS.map(task => { const sp = findSphere(spheres, task.sphere); const idx2 = sp ? spheres.findIndex(x => x.id === sp.id) : 0; return <div key={task.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", marginBottom: 3, background: P.bg, borderRadius: 10 }}><div style={{ width: 18, height: 18, border: `2px solid ${P.fog}`, borderRadius: 6, flexShrink: 0 }} /><span style={{ flex: 1, fontSize: 14, fontFamily: b, color: P.ink }}>{task.text}</span><span style={{ width: 7, height: 7, borderRadius: 2, background: getColor(idx2) }} /><button style={{ background: T.blue, border: "none", fontSize: 10, fontFamily: h, fontWeight: 600, color: P.steel, padding: "3px 12px", borderRadius: 100, cursor: "pointer" }}>Pull in</button></div>; })}
      </div>
    </div>
  );
}

/* ── UPCOMING ── */
function ScreenUpcoming({ spheres }) {
  const grouped = {}; UPCOMING_TASKS.forEach(t => { (grouped[t.doingDate] ||= []).push(t); });
  return (
    <div>
      <h1 style={{ fontSize: 48, fontFamily: h, fontWeight: 800, color: P.ink, letterSpacing: "-0.03em", margin: "0 0 6px" }}>Upcoming</h1>
      <p style={{ fontSize: 16, fontFamily: s, fontStyle: "italic", color: P.muted, marginBottom: 28 }}>What lies ahead.</p>
      {Object.entries(grouped).map(([date, tasks]) => <div key={date} style={{ marginBottom: 22 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 8 }}><span style={{ fontSize: 14, fontFamily: h, fontWeight: 700, color: P.blue, background: T.blue, padding: "4px 14px", borderRadius: 8 }}>{date}</span><span style={{ fontSize: 12, fontFamily: b, color: P.soft }}>{tasks.length}</span></div>
        {tasks.map(task => { const sp = findSphere(spheres, task.sphere); const idx2 = sp ? spheres.findIndex(x => x.id === sp.id) : 0; return <div key={task.id} style={{ display: "flex", gap: 14, padding: "12px 18px", marginBottom: 3, background: P.white, borderRadius: 14, cursor: "pointer", borderLeft: task.priority === "focus" ? `4px solid ${P.blue}` : "4px solid transparent" }}><div style={{ width: 18, height: 18, marginTop: 3, border: `2px solid ${task.priority === "focus" ? P.blue : P.fog}`, borderRadius: 6, flexShrink: 0 }} /><div style={{ flex: 1 }}><p style={{ fontSize: 15, fontFamily: b, color: P.ink, margin: "0 0 2px" }}>{task.text}</p><div style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ width: 7, height: 7, borderRadius: 2, background: getColor(idx2) }} /><span style={{ fontSize: 12, fontFamily: b, color: P.muted }}>{task.sphere}</span>{task.dueDate && <span style={{ fontSize: 11, fontFamily: b, fontWeight: 600, color: P.blue }}>{task.dueDate}</span>}</div></div></div>; })}
      </div>)}
    </div>
  );
}

/* ── PROJECTS ── */
function ScreenProjects({ spheres, onProjectClick, onRhythmClick }) {
  return (
    <div>
      <h1 style={{ fontSize: 48, fontFamily: h, fontWeight: 800, color: P.ink, letterSpacing: "-0.03em", margin: "0 0 6px" }}>Projects</h1>
      <p style={{ fontSize: 16, fontFamily: s, fontStyle: "italic", color: P.muted, marginBottom: 28 }}>Everything you're building.</p>
      {spheres.map((sphere, idx) => {
        const sp = PROJECTS.filter(p => p.sphereId === sphere.id); if (!sp.length) return null; const c = getColor(idx); const t2 = getTint(idx);
        return <div key={sphere.id} style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}><div style={{ width: 28, height: 28, background: t2, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}><SphereIcon sphere={sphere} size={16} color={c} /></div><h2 style={{ fontSize: 16, fontFamily: h, fontWeight: 700, color: P.ink, margin: 0 }}>{sphere.name}</h2></div>
          {sp.map(p => <div key={p.id} onClick={() => p.type === "rhythm" ? onRhythmClick?.(p) : onProjectClick?.(p)} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", marginBottom: 3, background: P.white, borderRadius: 14, cursor: "pointer" }}><div style={{ flex: 1 }}><div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}><span style={{ fontSize: 15, fontFamily: b, fontWeight: 500, color: P.ink }}>{p.name}</span>{p.type === "rhythm" ? <Pill color={P.sky}>Rhythm</Pill> : <Pill color={p.status === "active" ? P.steel : P.muted}>{p.status}</Pill>}</div><p style={{ fontSize: 12, fontFamily: b, color: P.muted, margin: 0 }}>{p.intention}</p></div>{p.total > 0 && <div style={{ width: 120 }}><Bar done={p.done} total={p.total} color={c} /></div>}</div>)}
        </div>;
      })}
    </div>
  );
}

/* ── TASK DETAIL ── */
function ScreenDetail({ task, spheres, onBack }) {
  if (!task) return null; const sp = findSphere(spheres, task.sphere); const idx = sp ? spheres.findIndex(x => x.id === sp.id) : 0;
  const [recur, setRecur] = useState(task.recurrence || "none");
  const recurOpts = ["none", "daily", "weekdays", "weekly", "biweekly", "monthly", "quarterly", "yearly"];
  return (
    <div>
      <button onClick={onBack} style={{ background: P.white, border: "none", fontSize: 12, fontFamily: h, fontWeight: 600, color: P.muted, padding: "6px 16px", borderRadius: 100, cursor: "pointer", marginBottom: 20 }}>{"\u2190"} Back</button>
      <div style={{ maxWidth: 520 }}>
        <h1 style={{ fontSize: 28, fontFamily: h, fontWeight: 700, color: P.ink, lineHeight: 1.25, marginBottom: 10 }}>{task.text}</h1>
        {task.priority === "focus" && <Pill color={P.blue} solid>Focus</Pill>}
        <div style={{ background: P.white, borderRadius: 18, padding: "20px 22px", marginTop: 18 }}>
          {[{ l: "Sphere", v: <span style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ width: 8, height: 8, borderRadius: 3, background: getColor(idx) }} />{task.sphere}</span> }, { l: "Project", v: task.project }, { l: "Doing", v: task.doingDate }, { l: "Due", v: <span style={{ color: task.dueDate ? P.blue : P.soft }}>{task.dueDate || "None"}</span> },
            { l: "Repeat", v: <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>{recurOpts.map(o => <button key={o} onClick={e => { e.stopPropagation(); setRecur(o); }} style={{ fontSize: 11, fontFamily: h, fontWeight: 600, padding: "4px 10px", borderRadius: 100, border: "none", cursor: "pointer", background: recur === o ? P.blue : P.bg, color: recur === o ? P.white : P.muted }}>{o === "none" ? "Off" : o.charAt(0).toUpperCase() + o.slice(1)}</button>)}</div> },
          ].map((f, i) => <div key={i} style={{ display: "flex", gap: 14, padding: "11px 0", borderTop: i > 0 ? `1px solid ${P.bg}` : "none", alignItems: i === 4 ? "flex-start" : "center" }}><span style={{ fontSize: 11, fontFamily: h, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: P.muted, width: 65, paddingTop: i === 4 ? 4 : 0 }}>{f.l}</span><span style={{ fontSize: 15, fontFamily: b, color: P.ink, flex: 1 }}>{f.v}</span></div>)}
        </div>
        <div style={{ marginTop: 18 }}><Heading>Notes</Heading><div style={{ background: P.white, padding: 18, borderRadius: 14, fontSize: 14, fontFamily: s, fontStyle: "italic", color: P.soft, minHeight: 60 }}>Add reflections or context...</div></div>
        <div style={{ display: "flex", gap: 8, marginTop: 18 }}><Btn label="Complete" /><Btn label="Reschedule" variant="ghost" /></div>
      </div>
    </div>
  );
}

/* ── PROJECT DETAIL ── */
function ScreenProjectDetail({ project, spheres, onBack, onArchive, library, setLibrary }) {
  if (!project) return null; const sphere = spheres.find(sp2 => sp2.id === project.sphereId); const idx = sphere ? spheres.findIndex(x => x.id === sphere.id) : 0;
  const tasks = PROJECT_TASKS[project.id] || []; const doneTasks = tasks.filter(t => t.done); const todoTasks = tasks.filter(t => !t.done);
  const [showActions, setShowActions] = useState(false);
  const [savedTemplate, setSavedTemplate] = useState(false);
  const [duplicated, setDuplicated] = useState(false);
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <button onClick={onBack} style={{ background: P.white, border: "none", fontSize: 12, fontFamily: h, fontWeight: 600, color: P.muted, padding: "6px 16px", borderRadius: 100, cursor: "pointer" }}>{"\u2190"} Back</button>
        <div style={{ position: "relative" }}>
          <button onClick={() => setShowActions(!showActions)} style={{ background: P.white, border: "none", fontSize: 18, color: P.muted, cursor: "pointer", padding: "4px 10px", borderRadius: 8 }}>&#8943;</button>
          {showActions && <div style={{ position: "absolute", right: 0, top: 36, background: P.white, borderRadius: 14, padding: 6, minWidth: 180, boxShadow: "0 4px 20px rgba(16,20,86,0.12)", zIndex: 10 }}>
            <button onClick={() => { setDuplicated(true); setShowActions(false); setTimeout(() => setDuplicated(false), 2000); }} style={{ display: "block", width: "100%", textAlign: "left", padding: "10px 14px", border: "none", background: "none", fontSize: 14, fontFamily: h, fontWeight: 500, color: P.ink, cursor: "pointer", borderRadius: 8 }}>{duplicated ? "\u2713 Duplicated!" : "Duplicate Project"}</button>
            <button onClick={() => { setSavedTemplate(true); setShowActions(false); setTimeout(() => setSavedTemplate(false), 2000); }} style={{ display: "block", width: "100%", textAlign: "left", padding: "10px 14px", border: "none", background: "none", fontSize: 14, fontFamily: h, fontWeight: 500, color: P.ink, cursor: "pointer", borderRadius: 8 }}>{savedTemplate ? "\u2713 Template Saved!" : "Save as Template"}</button>
            <button onClick={() => { onArchive?.(project); setShowActions(false); onBack(); }} style={{ display: "block", width: "100%", textAlign: "left", padding: "10px 14px", border: "none", background: "none", fontSize: 14, fontFamily: h, fontWeight: 500, color: P.ink, cursor: "pointer", borderRadius: 8 }}>Archive Project</button>
            <div style={{ height: 1, background: P.fog, margin: "4px 10px" }} />
            <button style={{ display: "block", width: "100%", textAlign: "left", padding: "10px 14px", border: "none", background: "none", fontSize: 14, fontFamily: h, fontWeight: 500, color: "#C0392B", cursor: "pointer", borderRadius: 8 }}>Delete Project</button>
          </div>}
        </div>
      </div>
      <div style={{ maxWidth: 600 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>{sphere && <div style={{ width: 24, height: 24, background: getTint(idx), borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center" }}><SphereIcon sphere={sphere} size={14} color={getColor(idx)} /></div>}<span style={{ fontSize: 13, fontFamily: b, color: P.muted }}>{sphere?.name}</span><Pill color={project.status === "active" ? P.steel : P.muted}>{project.status}</Pill></div>
        <h1 style={{ fontSize: 32, fontFamily: h, fontWeight: 800, color: P.ink, letterSpacing: "-0.02em", margin: "0 0 6px" }}>{project.name}</h1>
        <p style={{ fontSize: 14, fontFamily: s, fontStyle: "italic", color: P.muted, marginBottom: 18 }}>{project.intention}</p>
        {tasks.length > 0 && <div style={{ marginBottom: 20 }}><Bar done={doneTasks.length} total={tasks.length} color={getColor(idx)} /></div>}
        {todoTasks.length > 0 && <div style={{ marginBottom: 20 }}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}><Heading>Tasks</Heading><Btn label="+ Task" variant="secondary" /></div>
          {todoTasks.map(t => <div key={t.id} style={{ display: "flex", gap: 10, padding: "12px 18px", marginBottom: 3, background: P.white, borderRadius: 14, borderLeft: t.priority === "focus" ? `4px solid ${P.blue}` : "4px solid transparent", alignItems: "center", cursor: "grab" }} draggable><div style={{ width: 18, height: 18, marginTop: 0, border: `2px solid ${t.priority === "focus" ? P.blue : P.fog}`, borderRadius: 6, flexShrink: 0 }} /><div style={{ flex: 1 }}><p style={{ fontSize: 15, fontFamily: b, color: P.ink, margin: "0 0 2px" }}>{t.text}</p>{t.dueDate && <span style={{ fontSize: 11, fontFamily: b, fontWeight: 600, color: P.blue }}>{t.dueDate}</span>}{t.recurrence && t.recurrence !== "none" && <span style={{ fontSize: 10, fontFamily: h, fontWeight: 600, color: P.steel, background: T.blue, padding: "2px 8px", borderRadius: 100, marginLeft: 6 }}>{t.recurrence}</span>}</div></div>)}
        </div>}
        {doneTasks.length > 0 && <div style={{ opacity: 0.4 }}><Heading>Done</Heading>{doneTasks.map(t => <div key={t.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "10px 18px", marginBottom: 2, background: P.white, borderRadius: 10 }}><div style={{ width: 18, height: 18, background: P.steel, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2.5 6L5 8.5L9.5 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div><span style={{ fontSize: 14, fontFamily: b, color: P.muted, textDecoration: "line-through" }}>{t.text}</span></div>)}</div>}
        <div style={{ marginTop: 24 }}><Library libraryKey={`project-${project.id}`} library={library} setLibrary={setLibrary} /></div>
      </div>
    </div>
  );
}

/* ── RHYTHM DETAIL ── */
function ScreenRhythmDetail({ rhythm, spheres, onBack }) {
  if (!rhythm) return null; const project = PROJECTS.find(p => p.id === rhythm.id); const sphere = project ? spheres.find(sp2 => sp2.id === project.sphereId) : null; const idx = sphere ? spheres.findIndex(x => x.id === sphere.id) : 0;
  const d = RHYTHM_DETAILS[rhythm.id]; if (!d) return null;
  return (
    <div>
      <button onClick={onBack} style={{ background: P.white, border: "none", fontSize: 12, fontFamily: h, fontWeight: 600, color: P.muted, padding: "6px 16px", borderRadius: 100, cursor: "pointer", marginBottom: 20 }}>{"\u2190"} Back</button>
      <div style={{ maxWidth: 520 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>{sphere && <div style={{ width: 24, height: 24, background: getTint(idx), borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center" }}><SphereIcon sphere={sphere} size={14} color={getColor(idx)} /></div>}{sphere && <span style={{ fontSize: 13, fontFamily: b, color: P.muted }}>{sphere.name}</span>}<Pill color={P.sky}>Rhythm</Pill></div>
        <h1 style={{ fontSize: 32, fontFamily: h, fontWeight: 800, color: P.ink, letterSpacing: "-0.02em", margin: "0 0 18px" }}>{d.name}</h1>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginBottom: 18 }}>
          {[{ n: d.cadence, l: "Cadence" }, { n: d.day || "Daily", l: "Day" }, { n: d.time, l: "Time" }].map((item, i) => <div key={i} style={{ padding: "14px 10px", textAlign: "center", background: P.white, borderRadius: 14 }}><p style={{ fontSize: 17, fontFamily: h, fontWeight: 700, color: P.ink, margin: "0 0 2px" }}>{item.n}</p><p style={{ fontSize: 9, fontFamily: h, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: P.muted, margin: 0 }}>{item.l}</p></div>)}
        </div>
        <div style={{ background: T.warm, padding: "16px 20px", borderRadius: 14, display: "flex", alignItems: "center", gap: 14, marginBottom: 22 }}><span style={{ fontSize: 36, fontFamily: h, fontWeight: 800, color: P.sky }}>{d.streak}</span><div><p style={{ fontSize: 14, fontFamily: h, fontWeight: 600, color: P.sky, margin: 0 }}>week streak</p><p style={{ fontSize: 12, fontFamily: s, fontStyle: "italic", color: P.muted, margin: 0 }}>Keep it going</p></div></div>
        <Heading>Checklist</Heading>
        {d.steps.map((step, i) => <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 18px", marginBottom: 3, background: P.white, borderRadius: 10 }}><div style={{ width: 18, height: 18, border: `2px solid ${P.fog}`, borderRadius: 6, flexShrink: 0 }} /><span style={{ fontSize: 15, fontFamily: b, color: P.ink }}>{step}</span></div>)}
      </div>
    </div>
  );
}

/* ── ARCHIVE ── */
function ScreenArchive({ archived, spheres, onUnarchive }) {
  return (
    <div>
      <h1 style={{ fontSize: 48, fontFamily: h, fontWeight: 800, color: P.ink, letterSpacing: "-0.03em", margin: "0 0 6px" }}>Archive</h1>
      <p style={{ fontSize: 16, fontFamily: s, fontStyle: "italic", color: P.muted, marginBottom: 28 }}>Completed and shelved projects.</p>
      {archived.length === 0 && <div style={{ background: P.white, borderRadius: 18, padding: "40px 24px", textAlign: "center" }}>
        <p style={{ fontSize: 15, fontFamily: b, color: P.soft, marginBottom: 4 }}>No archived projects yet.</p>
        <p style={{ fontSize: 13, fontFamily: s, fontStyle: "italic", color: P.mist }}>Projects you archive will appear here.</p>
      </div>}
      {archived.map(proj => {
        const sphere = spheres.find(sp => sp.id === proj.sphereId); const idx = sphere ? spheres.findIndex(x => x.id === sphere.id) : 0;
        return (
          <div key={proj.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 18px", marginBottom: 6, background: P.white, borderRadius: 14, opacity: 0.7 }}>
            {sphere && <div style={{ width: 24, height: 24, background: getTint(idx), borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center" }}><SphereIcon sphere={sphere} size={14} color={getColor(idx)} /></div>}
            <div style={{ flex: 1 }}><p style={{ fontSize: 15, fontFamily: b, fontWeight: 500, color: P.ink, margin: "0 0 2px" }}>{proj.name}</p><div style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ fontSize: 12, fontFamily: b, color: P.muted }}>{sphere?.name}</span>{proj.archivedDate && <span style={{ fontSize: 11, fontFamily: b, color: P.soft }}>Archived {proj.archivedDate}</span>}</div></div>
            <button onClick={() => onUnarchive(proj)} style={{ fontSize: 11, fontFamily: h, fontWeight: 600, color: P.blue, background: T.blue, border: "none", padding: "5px 14px", borderRadius: 100, cursor: "pointer" }}>Unarchive</button>
          </div>
        );
      })}
    </div>
  );
}

/* ── ATTUNE (was Planning) ── */
function ScreenAttune({ spheres, library, setLibrary }) {
  const [cycle, setCycle] = useState("daily");
  const reviewData = spheres.map(sp => ({ ...sp, projects: PROJECTS.filter(p => p.sphereId === sp.id), wins: winsMap[sp.id] || null }));
  const cycles = [
    { id: "daily", label: "Daily", desc: "Evening shutdown ritual" },
    { id: "weekly", label: "Weekly", desc: "Sunday reset & preview" },
    { id: "monthly", label: "Monthly", desc: "Altitude check" },
    { id: "annual", label: "Annual", desc: "Vision & trajectory" },
  ];
  const cur = cycles.find(c2 => c2.id === cycle);
  const [annualResponses, setAnnualResponses] = useState({});
  const [saved, setSaved] = useState(false);

  const saveAnnualToLibrary = () => {
    const body = Object.entries(annualResponses).filter(([_, v]) => v.trim()).map(([q, v]) => `## ${q}\n${v}`).join("\n\n");
    if (!body.trim()) return;
    const d = library["attune"] || { folders: [{ id: 6010, name: "Annual Reviews", notes: [] }, { id: 6011, name: "Monthly Reviews", notes: [] }], loose: [] };
    const newNote = { id: nextNoteId++, title: `Annual Review \u2014 ${new Date().getFullYear()}`, type: "review", body, created: "Just now", updated: "Just now", pinned: true };
    const annualFolder = d.folders.find(f => f.name === "Annual Reviews");
    if (annualFolder) { annualFolder.notes = [...annualFolder.notes, newNote]; }
    else { d.folders = [...d.folders, { id: nextFolderId++, name: "Annual Reviews", notes: [newNote] }]; }
    setLibrary({ ...library, attune: d });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <div style={{ background: P.ink, color: P.white, padding: "40px 56px 36px", margin: "-44px -60px 0", borderRadius: "0 0 28px 28px", marginBottom: 24, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", bottom: -10, right: 50, display: "flex", gap: 6, opacity: 0.06 }}>{[P.blue, P.steel, P.sky].map((c2, i) => <div key={i} style={{ width: 40, height: 40, borderRadius: 12, background: c2, transform: `rotate(${i * 15}deg)` }} />)}</div>
        <p style={{ fontSize: 11, fontFamily: h, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: P.sky, marginBottom: 14 }}>Attune</p>
        <h1 style={{ fontSize: 44, fontFamily: h, fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 10px" }}>Review & Realign</h1>
        <p style={{ fontSize: 16, fontFamily: s, fontStyle: "italic", opacity: 0.6 }}>Pause. Reflect. Recalibrate. Advance.</p>
      </div>
      <div style={{ display: "flex", gap: 4, marginBottom: 24 }}>{cycles.map(c2 => <button key={c2.id} onClick={() => setCycle(c2.id)} style={{ flex: 1, padding: "10px 4px", background: cycle === c2.id ? P.blue : P.white, color: cycle === c2.id ? P.white : P.muted, border: "none", borderRadius: 10, cursor: "pointer", fontSize: 12, fontFamily: h, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase" }}>{c2.label}</button>)}</div>
      <p style={{ fontSize: 13, fontFamily: s, fontStyle: "italic", color: P.muted, marginBottom: 20 }}>{cur.desc}</p>

      {/* DAILY — checklist */}
      {cycle === "daily" && <div>
        <Heading>Evening Shutdown</Heading>
        {["Capture \u2014 Transfer any loose tasks, notes, or ideas into your inbox.", "Review Today \u2014 What did you complete? What moved forward? What stalled?", "Process Inbox \u2014 Clarify each item: action, schedule, or delete?", "Migrate \u2014 Move incomplete tasks forward intentionally.", "Preview Tomorrow \u2014 Time-block your top 3 priorities.", "Shutdown Complete \u2014 Say it out loud. Close the loops. Rest."].map((step, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "12px 16px", marginBottom: 3, background: P.white, borderRadius: 10 }}>
            <div style={{ width: 22, height: 22, border: `2px solid ${P.fog}`, borderRadius: 7, flexShrink: 0, marginTop: 1 }} />
            <span style={{ fontSize: 14, fontFamily: b, color: P.ink, lineHeight: 1.5 }}>{step}</span>
          </div>
        ))}
      </div>}

      {/* WEEKLY — checklist */}
      {cycle === "weekly" && <div>
        <Heading>Weekly Reset</Heading>
        {[
          { section: "Get Clear", steps: ["Empty all inboxes to zero", "Review completed tasks \u2014 celebrate progress", "Review upcoming calendar for next 2 weeks", "Process all loose notes and captured items"] },
          { section: "Get Current", steps: ["Review each active project \u2014 is it advancing?", "Review each sphere \u2014 any neglected areas?", "Review your intentions \u2014 still aligned?", "Move stalled items: reschedule, delegate, or drop"] },
          { section: "Get Creative", steps: ["Is there a new project or idea calling for attention?", "What would make this next week great?", "Set your top 3 focus intentions for the week", "Time-block your deep work sessions"] },
        ].map((block, bi) => <div key={bi} style={{ marginBottom: 24 }}>
          <p style={{ fontSize: 14, fontFamily: h, fontWeight: 700, color: P.blue, marginBottom: 10 }}>{block.section}</p>
          {block.steps.map((step, si) => <div key={si} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "10px 16px", marginBottom: 3, background: P.white, borderRadius: 10 }}>
            <div style={{ width: 18, height: 18, border: `2px solid ${P.fog}`, borderRadius: 6, flexShrink: 0, marginTop: 1 }} />
            <span style={{ fontSize: 14, fontFamily: b, color: P.ink }}>{step}</span>
          </div>)}
        </div>)}
        <Heading>Sphere Check-in</Heading>
        {reviewData.map((sp2, i) => <div key={sp2.id} style={{ padding: "14px 18px", marginBottom: 4, background: P.white, borderRadius: 14 }}><div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}><div style={{ width: 24, height: 24, background: getTint(i), borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center" }}><SphereIcon sphere={sp2} size={14} color={getColor(i)} /></div><span style={{ fontSize: 15, fontFamily: h, fontWeight: 700, color: P.ink }}>{sp2.name}</span><span style={{ fontSize: 12, fontFamily: b, color: P.soft, marginLeft: "auto" }}>{sp2.projects.filter(p => p.status === "active").length} active</span></div>{sp2.wins && <div style={{ background: T.warm, padding: "3px 12px", borderRadius: 100, display: "inline-block", marginBottom: 6 }}><span style={{ fontSize: 12, fontFamily: b, fontWeight: 600, color: P.sky }}>{sp2.wins}</span></div>}<div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>{sp2.intentions.map((intent, j) => <span key={j} style={{ fontSize: 12, fontFamily: b, color: P.ink, background: getTint(i), padding: "3px 10px", borderRadius: 100 }}>{intent}</span>)}</div></div>)}
      </div>}

      {/* MONTHLY — checklist */}
      {cycle === "monthly" && <div>
        <Heading>Monthly Altitude Check</Heading>
        {["What themes or patterns emerged this month?", "Which spheres thrived? Which were neglected?", "Review your intentions \u2014 still alive and relevant?", "Project health audit \u2014 pause, complete, or kill?", "What do I want to be true by end of next month?", "What habits or rhythms need adjusting?"].map((step, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "12px 16px", marginBottom: 3, background: P.white, borderRadius: 10 }}>
            <div style={{ width: 22, height: 22, border: `2px solid ${P.fog}`, borderRadius: 7, flexShrink: 0, marginTop: 1 }} />
            <span style={{ fontSize: 14, fontFamily: b, color: P.ink, lineHeight: 1.5 }}>{step}</span>
          </div>
        ))}
      </div>}

      {/* ANNUAL — interactive with save to library */}
      {cycle === "annual" && <div>
        <Heading>Annual Vision Review</Heading>
        {[
          { q: "Celebrate: What were your biggest wins this year?", hint: "Name them. Don\u2019t skip this. Gratitude fuels vision." },
          { q: "Grieve: What losses or disappointments need to be acknowledged?", hint: "What didn\u2019t happen that you hoped for?" },
          { q: "Learn: What did this year teach you about yourself?", hint: "Patterns, strengths revealed, blind spots uncovered." },
          { q: "Review your Glory Frame", hint: "Does your vision, purpose, and description still ring true?" },
          { q: "Sphere-by-sphere deep review", hint: "For each sphere: what\u2019s the trajectory? What needs a reset?" },
          { q: "Set annual intentions", hint: "1-2 bold intentions per sphere for the year ahead." },
          { q: "Define your year in a word or phrase", hint: "A north star to return to when decisions get complex." },
          { q: "Letter to future self", hint: "Write to yourself one year from now. What do you want to be true?" },
        ].map((step, i) => <div key={i} style={{ marginBottom: 18 }}>
          <p style={{ fontSize: 15, fontFamily: h, fontWeight: 600, color: P.ink, marginBottom: 4 }}>{step.q}</p>
          <p style={{ fontSize: 12, fontFamily: b, color: P.muted, marginBottom: 8 }}>{step.hint}</p>
          <textarea value={annualResponses[step.q] || ""} onChange={e => setAnnualResponses({ ...annualResponses, [step.q]: e.target.value })} placeholder="Your reflection..." rows={4} style={{ width: "100%", boxSizing: "border-box", background: P.white, padding: "14px 18px", borderRadius: 14, border: "none", fontSize: 15, fontFamily: b, color: P.ink, outline: "none", resize: "vertical", lineHeight: 1.7 }} />
        </div>)}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 8 }}>
          <Btn label={saved ? "\u2713 Saved to Library" : "Save to Library"} variant={saved ? "ghost" : "primary"} onClick={saveAnnualToLibrary} />
          <span style={{ fontSize: 12, fontFamily: b, color: P.soft }}>Saves as a dated note in your Attune library</span>
        </div>
      </div>}

      {/* Attune Library */}
      {(cycle === "annual" || cycle === "monthly") && <div style={{ marginTop: 32 }}>
        <Library libraryKey="attune" library={library} setLibrary={setLibrary} />
      </div>}
    </div>
  );
}

/* ── ONBOARDING ── */
function Onboarding({ onComplete }) {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState({ name: "", description: "", motto: "", nameBank: [], vision: "", purpose: "", desires: [], strengths: [] });
  const [obSpheres, setObSpheres] = useState(DEFAULT_SPHERE_TEMPLATES.map((t2, i) => ({ ...t2, id: 900 + i, enabled: i < 4, people: [], intentions: [""] })));
  const [newSphereName, setNewSphereName] = useState("");
  const toggleSphere = (id) => setObSpheres(obSpheres.map(sp => sp.id === id ? { ...sp, enabled: !sp.enabled } : sp));
  const addSphere = () => { if (!newSphereName.trim()) return; setObSpheres([...obSpheres, { id: 900 + obSpheres.length, name: newSphereName.trim(), letter: newSphereName.trim()[0].toUpperCase(), icon: null, purpose: "", enabled: true, people: [], intentions: [""] }]); setNewSphereName(""); };
  const updateIntent = (sId, iIdx, val) => setObSpheres(obSpheres.map(sp => sp.id === sId ? { ...sp, intentions: sp.intentions.map((x, j) => j === iIdx ? val : x) } : sp));
  const addIntent = (sId) => setObSpheres(obSpheres.map(sp => sp.id === sId ? { ...sp, intentions: [...sp.intentions, ""] } : sp));
  const finish = () => { onComplete({ profile, spheres: obSpheres.filter(sp => sp.enabled).map((sp, i) => ({ id: i + 1, name: sp.name, letter: sp.letter, icon: sp.icon, purpose: sp.purpose, people: sp.people, intentions: sp.intentions.filter(x => x.trim()) })) }); };
  const next = () => setStep(Math.min(4, step + 1));
  const prev = () => setStep(Math.max(0, step - 1));
  const canNext = step === 0 ? true : step === 1 ? profile.name.trim() : step === 2 ? true : step === 3 ? obSpheres.some(sp => sp.enabled) : true;
  const stepLabels = ["Welcome", "Identity", "Traits", "Spheres", "Intentions"];
  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,400;0,600;1,400;1,600&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&display=swap" rel="stylesheet" />
      <div style={{ minHeight: "100vh", background: P.bg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: b, padding: 40 }}>
        <div style={{ width: "100%", maxWidth: 580 }}>
          <div style={{ display: "flex", gap: 4, marginBottom: 40 }}>{stepLabels.map((label, i) => (
            <div key={i} style={{ flex: 1 }}><div style={{ height: 3, borderRadius: 2, background: i <= step ? P.blue : P.fog, transition: "background 0.3s" }} /><p style={{ fontSize: 9, fontFamily: h, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: i <= step ? P.blue : P.soft, marginTop: 6, textAlign: "center" }}>{label}</p></div>
          ))}</div>
          {step === 0 && <div style={{ textAlign: "center" }}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 4, marginBottom: 16 }}><span style={{ fontSize: 48, fontFamily: h, fontWeight: 800, color: P.ink, letterSpacing: "-0.03em" }}>Life</span><span style={{ fontSize: 48, fontFamily: h, fontWeight: 800, color: P.blue, letterSpacing: "-0.03em" }}>OS</span></div>
            <p style={{ fontSize: 22, fontFamily: s, fontStyle: "italic", color: P.muted, lineHeight: 1.6, maxWidth: 400, margin: "0 auto 24px" }}>A place to steward your whole life with intentionality, presence, and purpose.</p>
            <p style={{ fontSize: 15, fontFamily: b, color: P.muted, lineHeight: 1.7, maxWidth: 440, margin: "0 auto" }}>We'll walk through a few steps to set up your Glory Frame \u2014 the foundation of your personal operating system. This should take about 3 minutes.</p>
          </div>}
          {step === 1 && <div>
            <h2 style={{ fontSize: 36, fontFamily: h, fontWeight: 800, color: P.ink, letterSpacing: "-0.03em", marginBottom: 6 }}>Who are you?</h2>
            <p style={{ fontSize: 15, fontFamily: s, fontStyle: "italic", color: P.muted, marginBottom: 28 }}>Start with your name, then articulate your vision and purpose.</p>
            <div style={{ marginBottom: 20 }}><p style={{ fontSize: 10, fontFamily: h, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: P.muted, marginBottom: 6 }}>Your Name</p><input value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} placeholder="First name" style={{ width: "100%", boxSizing: "border-box", border: `1px solid ${P.fog}`, borderRadius: 12, padding: "14px 18px", fontSize: 24, fontFamily: h, fontWeight: 700, color: P.ink, outline: "none" }} /></div>
            <div style={{ marginBottom: 20 }}><p style={{ fontSize: 10, fontFamily: h, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: P.muted, marginBottom: 6 }}>Vision</p><textarea value={profile.vision} onChange={e => setProfile({ ...profile, vision: e.target.value })} rows={3} placeholder="The world I want to help create..." style={{ width: "100%", boxSizing: "border-box", border: `1px solid ${P.fog}`, borderRadius: 12, padding: "14px 18px", fontSize: 16, fontFamily: s, fontStyle: "italic", color: P.ink, outline: "none", resize: "none", lineHeight: 1.6 }} /></div>
            <div><p style={{ fontSize: 10, fontFamily: h, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: P.muted, marginBottom: 6 }}>Purpose</p><textarea value={profile.purpose} onChange={e => setProfile({ ...profile, purpose: e.target.value })} rows={3} placeholder="I exist to..." style={{ width: "100%", boxSizing: "border-box", border: `1px solid ${P.fog}`, borderRadius: 12, padding: "14px 18px", fontSize: 16, fontFamily: s, fontStyle: "italic", color: P.ink, outline: "none", resize: "none", lineHeight: 1.6 }} /></div>
          </div>}
          {step === 2 && <div>
            <h2 style={{ fontSize: 36, fontFamily: h, fontWeight: 800, color: P.ink, letterSpacing: "-0.03em", marginBottom: 6 }}>Your foundation</h2>
            <p style={{ fontSize: 15, fontFamily: s, fontStyle: "italic", color: P.muted, marginBottom: 28 }}>A few more details to anchor your Glory Frame.</p>
            {[{ key: "description", label: "Description", placeholder: "Nurturing Visionary Protector..." }, { key: "motto", label: "Motto", placeholder: "You Have My Bow..." }].map(f => (
              <div key={f.key} style={{ marginBottom: 20 }}><p style={{ fontSize: 10, fontFamily: h, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: P.muted, marginBottom: 6 }}>{f.label}</p><input value={profile[f.key]} onChange={e => setProfile({ ...profile, [f.key]: e.target.value })} placeholder={f.placeholder} style={{ width: "100%", boxSizing: "border-box", border: `1px solid ${P.fog}`, borderRadius: 12, padding: "14px 18px", fontSize: 15, fontFamily: f.key === "motto" ? s : b, fontStyle: f.key === "motto" ? "italic" : "normal", color: P.ink, outline: "none" }} /></div>
            ))}
          </div>}
          {step === 3 && <div>
            <h2 style={{ fontSize: 36, fontFamily: h, fontWeight: 800, color: P.ink, letterSpacing: "-0.03em", marginBottom: 6 }}>Your spheres</h2>
            <p style={{ fontSize: 15, fontFamily: s, fontStyle: "italic", color: P.muted, marginBottom: 24 }}>Toggle on the ones that apply, or add your own.</p>
            {obSpheres.map((sp, idx) => (
              <div key={sp.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 16px", marginBottom: 6, background: sp.enabled ? P.white : P.bg, borderRadius: 14, border: sp.enabled ? `1px solid ${P.fog}` : "1px solid transparent", opacity: sp.enabled ? 1 : 0.5 }}>
                <button onClick={() => toggleSphere(sp.id)} style={{ width: 24, height: 24, borderRadius: 8, border: sp.enabled ? "none" : `2px solid ${P.fog}`, background: sp.enabled ? P.blue : "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>{sp.enabled && <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 6L5 8.5L9.5 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}</button>
                <div style={{ width: 32, height: 32, background: getTint(idx), borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}><SphereIcon sphere={sp} size={18} color={getColor(idx)} /></div>
                <input value={sp.name} onChange={e => setObSpheres(obSpheres.map(x => x.id === sp.id ? { ...x, name: e.target.value, letter: e.target.value[0]?.toUpperCase() || "?" } : x))} style={{ border: "none", background: "transparent", fontSize: 16, fontFamily: h, fontWeight: 600, color: P.ink, outline: "none", width: "100%", padding: 0 }} />
              </div>
            ))}
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}><input value={newSphereName} onChange={e => setNewSphereName(e.target.value)} onKeyDown={e => e.key === "Enter" && addSphere()} placeholder="Add a custom sphere..." style={{ flex: 1, border: `1px solid ${P.fog}`, borderRadius: 10, padding: "10px 14px", fontSize: 14, fontFamily: b, outline: "none", color: P.ink }} /><button onClick={addSphere} style={{ fontSize: 12, fontFamily: h, fontWeight: 600, color: P.blue, background: T.blue, border: "none", padding: "10px 18px", borderRadius: 100, cursor: "pointer" }}>+ Add</button></div>
          </div>}
          {step === 4 && <div>
            <h2 style={{ fontSize: 36, fontFamily: h, fontWeight: 800, color: P.ink, letterSpacing: "-0.03em", marginBottom: 6 }}>Set your intentions</h2>
            <p style={{ fontSize: 15, fontFamily: s, fontStyle: "italic", color: P.muted, marginBottom: 24 }}>What do you want to focus on in each sphere?</p>
            {obSpheres.filter(sp => sp.enabled).map((sp, idx) => (
              <div key={sp.id} style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}><div style={{ width: 24, height: 24, background: getTint(idx), borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center" }}><SphereIcon sphere={sp} size={14} color={getColor(idx)} /></div><span style={{ fontSize: 15, fontFamily: h, fontWeight: 700, color: P.ink }}>{sp.name}</span></div>
                {sp.intentions.map((intent, iIdx) => <input key={iIdx} value={intent} onChange={e => updateIntent(sp.id, iIdx, e.target.value)} placeholder={`Intention ${iIdx + 1}...`} style={{ width: "100%", boxSizing: "border-box", border: `1px solid ${P.fog}`, borderRadius: 10, padding: "10px 14px", fontSize: 14, fontFamily: b, color: P.ink, outline: "none", marginBottom: 4 }} />)}
                {sp.intentions.length < 3 && <button onClick={() => addIntent(sp.id)} style={{ fontSize: 12, fontFamily: h, fontWeight: 600, color: P.blue, background: "none", border: "none", padding: "4px 0", cursor: "pointer" }}>+ Add another</button>}
              </div>
            ))}
          </div>}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 36 }}>
            {step > 0 ? <button onClick={prev} style={{ fontSize: 14, fontFamily: h, fontWeight: 600, color: P.muted, background: P.white, border: "none", padding: "12px 24px", borderRadius: 100, cursor: "pointer" }}>Back</button> : <span />}
            {step < 4 ? <button onClick={next} disabled={!canNext} style={{ fontSize: 14, fontFamily: h, fontWeight: 600, color: P.white, background: canNext ? P.blue : P.fog, border: "none", padding: "12px 32px", borderRadius: 100, cursor: canNext ? "pointer" : "default" }}>{step === 0 ? "Get Started" : "Continue"}</button>
            : <button onClick={finish} style={{ fontSize: 14, fontFamily: h, fontWeight: 600, color: P.white, background: P.ink, border: "none", padding: "12px 32px", borderRadius: 100, cursor: "pointer" }}>Launch Your Life OS</button>}
          </div>
        </div>
      </div>
    </>
  );
}

/* ═══ MAIN APP ═══ */
export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [onboarded, setOnboarded] = useState(true);
  const [profile, setProfile] = useState(INIT_PROFILE);
  const [screen, setScreen] = useState("today");
  const [selected, setSelected] = useState(null);
  const [selectedSphere, setSelectedSphere] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedRhythm, setSelectedRhythm] = useState(null);
  const [tasks, setTasks] = useState(INIT_TASKS);
  const [spheres, setSpheres] = useState(INIT_SPHERES);
  const [goals, setGoals] = useState(INIT_GOALS);
  const [archivedProjects, setArchivedProjects] = useState([]);
  const [inboxItems, setInboxItems] = useState(INBOX_ITEMS);
  const [library, setLibrary] = useState(INIT_LIBRARY);
  let nextTaskId = 500;

  useEffect(() => {
    (async () => {
      try {
        const res = await window.storage.get("life-os-data");
        if (res && res.value) {
          const d = JSON.parse(res.value);
          if (d.onboarded !== undefined) setOnboarded(d.onboarded);
          if (d.profile) setProfile(d.profile);
          if (d.tasks) setTasks(d.tasks);
          if (d.spheres) setSpheres(d.spheres);
          if (d.goals) setGoals(d.goals);
          if (d.archived) setArchivedProjects(d.archived);
          if (d.inbox) setInboxItems(d.inbox);
          if (d.library) setLibrary(d.library);
          if (d.screen) setScreen(d.screen);
        }
      } catch (e) {}
      setLoaded(true);
    })();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    (async () => {
      try {
        await window.storage.set("life-os-data", JSON.stringify({
          onboarded, profile, tasks, spheres, goals, archived: archivedProjects, inbox: inboxItems, library, screen
        }));
      } catch (e) {}
    })();
  }, [onboarded, profile, tasks, spheres, goals, archivedProjects, inboxItems, library, screen, loaded]);

  const handleOnboardComplete = ({ profile: p, spheres: s2 }) => { setProfile(p); setSpheres(s2); setTasks([]); setInboxItems([]); setOnboarded(true); setScreen("glorymap"); };
  if (!onboarded) return <Onboarding onComplete={handleOnboardComplete} />;

  const toggle = (id) => setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  const archiveProject = (proj) => { setArchivedProjects(prev => [...prev, { ...proj, archivedDate: "Mar 4" }]); };
  const unarchiveProject = (proj) => { setArchivedProjects(prev => prev.filter(p => p.id !== proj.id)); };
  const clickTask = (t) => { setSelected(t); setScreen("detail"); };
  const clickSphere = (sp) => { setSelectedSphere(sp); setScreen("sphere"); };
  const clickProject = (p) => { setSelectedProject(p); setScreen("projectdetail"); };
  const clickRhythm = (r) => { setSelectedRhythm(r); setScreen("rhythmdetail"); };

  const currentSphere = selectedSphere ? spheres.find(sp => sp.id === selectedSphere.id) : null;
  const isActive = (id) => screen === id || (screen === "detail" && id === "today") || ((screen === "projectdetail" || screen === "rhythmdetail") && id === "projects") || (screen === "sphere" && id === "sphere");
  const full = screen === "glorymap" || screen === "sphere" || screen === "attune";
  const mobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);
  const navTo = (s2) => { setScreen(s2); setMenuOpen(false); };

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,400;0,600;1,400;1,600&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&display=swap" rel="stylesheet" />
      <div style={{ display: "flex", height: "100vh", background: P.bg, fontFamily: b }}>
        {!mobile && <div style={{ width: 232, background: P.white, borderRight: `1px solid ${P.fog}`, padding: "28px 0", display: "flex", flexDirection: "column", flexShrink: 0, overflow: "auto" }}>
          <div style={{ padding: "0 24px", marginBottom: 32 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 3 }}><span style={{ fontSize: 28, fontFamily: h, fontWeight: 800, color: P.ink, letterSpacing: "-0.03em" }}>Life</span><span style={{ fontSize: 28, fontFamily: h, fontWeight: 800, color: P.blue, letterSpacing: "-0.03em" }}>OS</span></div>
            <p style={{ fontSize: 11, fontFamily: s, fontStyle: "italic", color: P.soft, margin: "2px 0 0" }}>Flow. Know. Grow.</p>
          </div>
          <button onClick={() => setScreen("glorymap")} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 24px", width: "100%", textAlign: "left", background: isActive("glorymap") ? P.ink : "transparent", border: "none", cursor: "pointer", fontSize: 14, fontFamily: h, fontWeight: 600, color: isActive("glorymap") ? P.white : P.ink, borderRadius: 0 }}><span style={{ width: 6, height: 6, borderRadius: 2, background: P.sky, flexShrink: 0 }} />Glory Frame</button>
          <div style={{ padding: "18px 24px 12px" }}>
            <p style={{ fontSize: 9, fontFamily: h, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: P.soft, marginBottom: 10 }}>Spheres</p>
            {spheres.map((sp, idx) => {
              const sel = currentSphere?.id === sp.id && screen === "sphere";
              return <div key={sp.id} onClick={() => clickSphere(sp)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "5px 8px", marginBottom: 1, borderRadius: 8, cursor: "pointer", background: sel ? getTint(idx) : "transparent" }}><span style={{ width: 7, height: 7, borderRadius: 2, background: getColor(idx), flexShrink: 0 }} /><span style={{ fontSize: 13, fontFamily: b, fontWeight: sel ? 600 : 400, color: sel ? P.ink : P.muted }}>{sp.name}</span></div>;
            })}
          </div>
          <div style={{ height: 1, background: P.fog, margin: "4px 20px" }} />
          {[
            { id: "projects", label: "Projects" },
            { id: "today", label: "Today" },
            { id: "upcoming", label: "Upcoming" },
            { id: "inbox", label: "Inbox", badge: inboxItems.length },
            { id: "attune", label: "Attune" },
            { id: "archive", label: "Archive" },
          ].map(item => (
            <button key={item.id} onClick={() => navTo(item.id)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 24px", width: "100%", textAlign: "left", background: isActive(item.id) ? P.ink : "transparent", border: "none", cursor: "pointer", fontSize: 14, fontFamily: h, fontWeight: 600, color: isActive(item.id) ? P.white : P.ink, borderRadius: 0 }}>
              {item.label}
              {item.badge && <span style={{ fontSize: 10, fontFamily: h, fontWeight: 700, color: isActive(item.id) ? P.ink : P.white, background: isActive(item.id) ? P.white : P.blue, borderRadius: 100, minWidth: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 6px" }}>{item.badge}</span>}
            </button>
          ))}
          <div style={{ marginTop: "auto", padding: "0 24px" }}>
            <div style={{ borderTop: `1px solid ${P.fog}`, paddingTop: 14 }}>
              <button onClick={() => { setOnboarded(false); }} style={{ fontSize: 10, fontFamily: h, fontWeight: 600, color: P.soft, background: "none", border: "none", cursor: "pointer", padding: 0, letterSpacing: "0.06em", textTransform: "uppercase" }}>Restart Setup</button>
            </div>
          </div>
        </div>}

        {/* Mobile slide-out menu */}
        {mobile && menuOpen && <div style={{ position: "fixed", inset: 0, zIndex: 900 }}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(16,20,86,0.3)" }} onClick={() => setMenuOpen(false)} />
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 280, background: P.white, padding: "28px 0", display: "flex", flexDirection: "column", overflow: "auto" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", marginBottom: 28 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 3 }}><span style={{ fontSize: 24, fontFamily: h, fontWeight: 800, color: P.ink }}>Life</span><span style={{ fontSize: 24, fontFamily: h, fontWeight: 800, color: P.blue }}>OS</span></div>
              <button onClick={() => setMenuOpen(false)} style={{ background: "none", border: "none", fontSize: 24, color: P.muted, cursor: "pointer" }}>\u00d7</button>
            </div>
            <button onClick={() => navTo("glorymap")} style={{ padding: "12px 20px", background: isActive("glorymap") ? P.ink : "transparent", border: "none", textAlign: "left", fontSize: 15, fontFamily: h, fontWeight: 600, color: isActive("glorymap") ? P.white : P.ink, cursor: "pointer" }}>Glory Frame</button>
            <div style={{ padding: "14px 20px 8px" }}>
              <p style={{ fontSize: 9, fontFamily: h, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: P.soft, marginBottom: 8 }}>Spheres</p>
              {spheres.map((sp, idx) => <div key={sp.id} onClick={() => { clickSphere(sp); setMenuOpen(false); }} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 8px", borderRadius: 8, cursor: "pointer" }}><span style={{ width: 7, height: 7, borderRadius: 2, background: getColor(idx) }} /><span style={{ fontSize: 14, fontFamily: b, color: P.muted }}>{sp.name}</span></div>)}
            </div>
            <div style={{ height: 1, background: P.fog, margin: "8px 16px" }} />
            {["projects", "attune", "archive"].map(id => <button key={id} onClick={() => navTo(id)} style={{ padding: "12px 20px", background: isActive(id) ? P.ink : "transparent", border: "none", textAlign: "left", fontSize: 15, fontFamily: h, fontWeight: 600, color: isActive(id) ? P.white : P.ink, cursor: "pointer" }}>{id === "projects" ? "Projects" : id === "attune" ? "Attune" : "Archive"}</button>)}
            <div style={{ marginTop: "auto", padding: "0 20px" }}><div style={{ borderTop: `1px solid ${P.fog}`, paddingTop: 14 }}><button onClick={() => { setOnboarded(false); setMenuOpen(false); }} style={{ fontSize: 10, fontFamily: h, fontWeight: 600, color: P.soft, background: "none", border: "none", cursor: "pointer", padding: 0, letterSpacing: "0.06em", textTransform: "uppercase" }}>Restart Setup</button></div></div>
          </div>
        </div>}

        <div style={{ flex: 1, overflow: "auto", padding: full ? 0 : mobile ? "20px 20px 80px" : "44px 60px", paddingBottom: mobile ? 80 : undefined }}>
          <div style={{ maxWidth: full ? "none" : 780, padding: full ? (mobile ? "20px 20px 80px" : "44px 60px") : 0 }}>
            {screen === "glorymap" && <ScreenGloryMap spheres={spheres} setSpheres={setSpheres} profile={profile} onSphereClick={clickSphere} onStartOver={() => setOnboarded(false)} mobile={mobile} />}
            {screen === "sphere" && <ScreenSphere sphere={currentSphere} spheres={spheres} setSpheres={setSpheres} goals={goals} setGoals={setGoals} onBack={() => setScreen("glorymap")} onProjectClick={clickProject} onRhythmClick={clickRhythm} onGoalClick={() => {}} mobile={mobile} library={library} setLibrary={setLibrary} />}
            {screen === "today" && <ScreenToday tasks={tasks} setTasks={setTasks} spheres={spheres} onTaskClick={clickTask} toggleTask={toggle} addTask={(text) => { setTasks(prev => [...prev, { id: nextTaskId++, text, sphere: spheres[0]?.name || "Personal", project: "", doingDate: "Today", dueDate: null, done: false, priority: "normal" }]); }} />}
            {screen === "upcoming" && <ScreenUpcoming spheres={spheres} />}
            {screen === "projects" && <ScreenProjects spheres={spheres} onProjectClick={clickProject} onRhythmClick={clickRhythm} />}
            {screen === "inbox" && <ScreenInbox items={inboxItems} addItem={(text) => { setInboxItems(prev => [...prev, { id: Date.now(), text, created: "Today" }]); }} />}
            {screen === "attune" && <ScreenAttune spheres={spheres} library={library} setLibrary={setLibrary} />}
            {screen === "archive" && <ScreenArchive archived={archivedProjects} spheres={spheres} onUnarchive={unarchiveProject} />}
            {screen === "projectdetail" && <ScreenProjectDetail project={selectedProject} spheres={spheres} onBack={() => setScreen(currentSphere ? "sphere" : "projects")} onArchive={archiveProject} library={library} setLibrary={setLibrary} />}
            {screen === "rhythmdetail" && <ScreenRhythmDetail rhythm={selectedRhythm} spheres={spheres} onBack={() => setScreen(currentSphere ? "sphere" : "projects")} />}
            {screen === "detail" && <ScreenDetail task={selected} spheres={spheres} onBack={() => setScreen("today")} />}
          </div>
        </div>

        {mobile && <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, height: 64, background: P.white, borderTop: `1px solid ${P.fog}`, display: "flex", alignItems: "center", justifyContent: "space-around", zIndex: 800, paddingBottom: "env(safe-area-inset-bottom)" }}>
          {[
            { id: "menu", label: "Frame", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg> },
            { id: "inbox", label: "Inbox", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>, badge: inboxItems.length },
            { id: "today", label: "Today", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
            { id: "upcoming", label: "Upcoming", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="13 17 18 12 13 7"/><polyline points="6 17 11 12 6 7"/></svg> },
          ].map(tab => {
            const act = tab.id === "menu" ? menuOpen : isActive(tab.id);
            return (
              <button key={tab.id} onClick={() => tab.id === "menu" ? setMenuOpen(!menuOpen) : navTo(tab.id)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, background: "none", border: "none", cursor: "pointer", padding: "6px 12px", position: "relative", color: act ? P.blue : P.muted }}>
                {tab.icon}
                <span style={{ fontSize: 10, fontFamily: h, fontWeight: 600 }}>{tab.label}</span>
                {tab.badge && <span style={{ position: "absolute", top: 2, right: 4, fontSize: 9, fontFamily: h, fontWeight: 700, color: P.white, background: P.blue, borderRadius: 100, minWidth: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 4px" }}>{tab.badge}</span>}
              </button>
            );
          })}
        </div>}
      </div>
    </>
  );
}
