// Mock data for Garv Sharma's portfolio
// Replace with backend / CMS content later

export const personal = {
  name: "Garv Sharma",
  initials: "GS",
  role: "Data Analyst",
  tagline: "Turning data into decisions.",
  summary:
    "Data Analyst with an MSc in Artificial Intelligence and a BSc in Computer Science — shipping dashboards, models and ETL that measurably move revenue, accuracy and reporting speed across sales, supply chain and hospitality domains.",
  location: "Oxford, United Kingdom",
  email: "garvsharma6767@gmail.com",
  phone: "+44 7909 493089",
  linkedin: "https://www.linkedin.com/in/garv-sharma6767",
  availability: "Open to Data Analyst roles — UK / Remote",
  resumeUrl: "#",
};

export const heroMeta = [
  { label: "ROLE", value: "Data Analyst" },
  { label: "EDUCATION", value: "MSc Artificial Intelligence" },
  { label: "LOCATION", value: "Oxford, UK" },
  { label: "STACK", value: "Power BI · SQL · Python · Excel" },
  { label: "STATUS", value: "Available for hire" },
];

export const headlineStats = [
  { value: 20, suffix: "%", label: "Reporting time reduced", detail: "via ETL & Power BI automation" },
  { value: 15, suffix: "%", label: "Predictive accuracy lift", detail: "customer segmentation model" },
  { value: 7, suffix: "%", label: "Revenue uplift", detail: "sales pattern EDA" },
  { value: 95, suffix: "%+", label: "Data accuracy", detail: "cleaning & validation pipelines" },
];

export const aboutParagraphs = [
  "I am a data analyst who treats every dashboard as a product — built for a real decision, a real user, a real number on the board. My work lives where SQL warehousing, Power BI modelling and Python analysis meet the business.",
  "Across brick-and-mortar retail, FMCG supply chain and hospitality revenue, I have engineered BI systems that cut manual reporting in half, surfaced service-level gaps hidden in thousands of shipment records, and translated occupancy data into market-share recovery opportunities.",
  "I am currently completing my MSc in Artificial Intelligence at Oxford Brookes, deepening my foundation in statistical modelling and machine learning — so the next version of my analytics is predictive, not just descriptive.",
];

export const focusAreas = [
  "Business Intelligence & Dashboarding",
  "SQL Data Modelling & Warehousing",
  "ETL & Reporting Automation",
  "Exploratory & Statistical Analysis",
  "KPI Design & Data Storytelling",
  "Predictive Modelling Fundamentals",
];

export const experiences = [
  {
    id: "biz360",
    code: "01",
    title: "Business 360",
    domain: "Brick & Mortar + E-commerce",
    role: "Data Analyst — BI Project",
    period: "2024",
    summary:
      "End-to-end BI platform unifying SQL warehouses and multiple spreadsheet sources into a single responsive Power BI experience.",
    bullets: [
      "Built an end-to-end BI dashboard integrating SQL databases with 3+ Excel/CSV sources, improving cross-functional visibility by 40%.",
      "Engineered a scalable data model using warehousing principles, optimising performance on 100,000+ records by 30%.",
      "Tuned DAX calculations with DAX Studio, cutting query execution time by 35% and lifting dashboard responsiveness.",
      "Delivered cross-functional EDA for sales, finance and operations — decisions projected to lift revenue 10% and cut cost 20%.",
      "Automated Power BI Service workflows, reducing manual reporting effort by 50% and improving refresh efficiency by 45%.",
    ],
    stack: ["Power BI", "SQL", "DAX Studio", "Excel", "Data Warehousing"],
    metric: { value: "50%", label: "manual reporting effort removed" },
  },
  {
    id: "sales-insights",
    code: "02",
    title: "Sales Insights",
    domain: "Brick & Mortar Retail",
    role: "Data Analyst — Sales Analytics",
    period: "2024",
    summary:
      "Interactive Power BI sales analytics engine across 5,000+ transactions and 10+ regions, powering faster retail reporting cycles.",
    bullets: [
      "Designed a Power BI dashboard on 5,000+ transactions across 10+ regions, enabling 30% faster reporting cycles.",
      "Engineered SQL models and queries improving revenue & product data retrieval efficiency by 40%.",
      "Performed EDA & statistical analysis that surfaced patterns contributing to a 7% revenue uplift.",
      "Implemented an end-to-end BI reporting system that cut manual reporting effort 50% and improved decision speed 25%.",
      "Ran advanced cleaning & wrangling, achieving 95%+ data accuracy for reliable forecasting.",
    ],
    stack: ["Power BI", "SQL", "EDA", "Statistical Analysis"],
    metric: { value: "+7%", label: "revenue uplift from EDA patterns" },
  },
  {
    id: "supply-chain",
    code: "03",
    title: "Supply Chain Analytics",
    domain: "FMCG",
    role: "Data Analyst — Logistics KPIs",
    period: "2024",
    summary:
      "Service-level KPI system tracking OT%, IF% and OTIF% across customer segments to de-risk FMCG expansion investment.",
    bullets: [
      "Built an interactive Power BI dashboard tracking OT%, IF% and OTIF% across 5+ customer segments — +40% supply chain visibility.",
      "Ran deep EDA on 1,000+ shipment records, identifying service-level gaps and enabling a 20% expansion-risk reduction.",
      "Engineered a structured BI reporting layer, improving stakeholder decision-making efficiency by 30% via real-time KPIs.",
      "Cleaned and standardised inconsistent logistics data in Excel, reaching 95%+ data accuracy.",
      "Translated analytics into investment-planning insight worth up to 20% projected cost savings on expansion spend.",
    ],
    stack: ["Power BI", "Excel", "KPI Design", "EDA"],
    metric: { value: "20%", label: "projected expansion cost saving" },
  },
  {
    id: "revenue-insights",
    code: "04",
    title: "Revenue Insights",
    domain: "Hospitality",
    role: "Data Analyst — Revenue Management",
    period: "2024",
    summary:
      "Occupancy & revenue analytics across three months and ~10,000 records to reverse market-share decline in hospitality portfolios.",
    bullets: [
      "Built a Power BI dashboard on 3 months of occupancy and revenue data (~10,000+ records), improving KPI tracking 35%.",
      "Ran EDA in Excel that isolated drivers of market-share decline, surfacing up to 20% revenue-recovery opportunities.",
      "Engineered a reporting & analytics framework spanning property segments, accelerating decision-making by 30%.",
      "Standardised inconsistent hospitality datasets through structured wrangling, achieving 95%+ data accuracy.",
      "Delivered BI insights and a KPI tracking system that guided occupancy strategy and up to 20% market-share recovery.",
    ],
    stack: ["Power BI", "Excel", "Revenue Analytics"],
    metric: { value: "+20%", label: "market-share recovery opportunity" },
  },
];

export const skillGroups = [
  {
    title: "Data Analysis & BI",
    items: [
      { name: "Power BI", level: 92 },
      { name: "DAX / Power Query", level: 88 },
      { name: "Data Modelling", level: 85 },
      { name: "Advanced Excel", level: 90 },
    ],
  },
  {
    title: "Databases & SQL",
    items: [
      { name: "Microsoft SQL Server", level: 88 },
      { name: "MySQL", level: 85 },
      { name: "Joins, CTEs, Window Fns", level: 86 },
      { name: "Data Warehousing", level: 78 },
    ],
  },
  {
    title: "Programming & Automation",
    items: [
      { name: "Python (Pandas, NumPy)", level: 82 },
      { name: "Web Scraping", level: 75 },
      { name: "ETL Pipelines", level: 80 },
      { name: "Reporting Automation", level: 84 },
    ],
  },
  {
    title: "Statistics & ML Foundations",
    items: [
      { name: "Regression", level: 80 },
      { name: "Hypothesis Testing", level: 78 },
      { name: "Probability", level: 78 },
      { name: "Predictive Modelling", level: 72 },
    ],
  },
];

export const competencies = [
  "Data Collection, Cleaning & Transformation",
  "Exploratory & Statistical Analysis",
  "Predictive Modelling & ML Fundamentals",
  "Data Visualisation & Dashboard Development",
  "Insight Generation & Data-Driven Decisions",
  "Data Storytelling & Stakeholder Communication",
  "Business Metrics (Revenue, Pricing, Performance)",
  "Cross-Functional Collaboration",
  "Problem Solving & Analytical Thinking",
  "Ad-hoc Analysis & Reporting",
  "Process Improvement & Optimisation",
];

export const education = [
  {
    degree: "MSc, Artificial Intelligence",
    school: "Oxford Brookes University",
    location: "Oxford, UK",
    period: "Sept 2024 — Sept 2025",
    note: "Applied statistical modelling and machine learning to real-world datasets — extracting actionable insights and improving model performance through data-driven optimisation.",
  },
  {
    degree: "BSc (Hons), Computer Science",
    school: "Aryabhatta College, University of Delhi",
    location: "Delhi, India",
    period: "Jul 2019 — Jul 2022",
    note: "Specialised in data analysis and algorithmic problem-solving — identifying patterns in structured datasets and supporting evidence-based decisions.",
  },
];

export const certifications = [
  {
    title: "CS50x — Introduction to Computer Science",
    issuer: "Harvard University",
    year: "2024",
    status: "Completed",
  },
  {
    title: "Microsoft PL-300 — Power BI Data Analyst Associate",
    issuer: "Microsoft",
    year: "2025",
    status: "In Progress",
  },
];

export const navLinks = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];
