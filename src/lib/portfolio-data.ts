export const contact = {
  email: "Sargunaelangovan21@gmail.com",
  phone: "+91-9943580445",
  location: "Villupuram, Tamil Nadu, India",
  linkedin: "https://linkedin.com/in/sargunaelangovan",
  github: "https://github.com/saro-elangovan",
};

export const nav = ["Home", "About", "Skills", "Experience", "Projects", "Education", "Contact"];

export const stats = [
  { value: 10000, suffix: "+", label: "Patient Records", note: "Dataset used in my disease prediction project." },
  { value: 87, suffix: "%", label: "Model Accuracy", note: "Reported accuracy of my disease prediction model." },
  { value: 5000, suffix: "+", label: "Records Processed", note: "Data cleaning and organization during my internship." },
  { value: 4, suffix: " hrs/wk", label: "Time Saved", note: "Reported savings via Excel macro automation." },
];

export const skills = [
  { title: "Programming Languages", desc: "Foundations for analysis and software.", items: ["Python", "Java — Intermediate", "C"] },
  { title: "Python Libraries & ML", desc: "Building and evaluating models.", items: ["NumPy", "Pandas", "Scikit-learn", "Data Preprocessing", "Machine Learning", "Deep Learning Fundamentals"] },
  { title: "Data Analytics & BI", desc: "From raw data to decisions.", items: ["SQL", "MySQL", "Power BI", "DAX", "Power Query", "Microsoft Excel", "Data Cleaning", "Data Visualization", "ETL"] },
  { title: "Web Development & Tools", desc: "Shipping and versioning work.", items: ["HTML", "CSS", "JavaScript — In Progress", "Git"] },
];

export const experience = {
  role: "Data Analytics Intern",
  company: "Nexila Technologies",
  duration: "March 2026 – April 2026",
  mode: "Remote · Internship",
  points: [
    "Collected, cleaned, and organized more than 5,000 records using Python, Excel, and structured ETL workflows.",
    "Reduced data inconsistencies by approximately 30% through data cleaning and validation.",
    "Developed analytical dashboards using Power BI, contributing to a reported 20% improvement in reporting accuracy.",
    "Collaborated with a cross-functional team of five members.",
    "Automated data-handling workflows using Excel macros, saving approximately four hours per week.",
  ],
  stack: ["Python", "Excel", "Power BI", "ETL", "Data Cleaning"],
};

export type Project = {
  title: string; tech: string[]; desc: string; features: string[]; note?: string; github?: string; visual: "chat" | "ml" | "dash";
};

export const projects: Project[] = [
  {
    title: "AI Mental Health Support Chatbot",
    tech: ["Python", "FastAPI", "Gemini API", "RAG", "Pytest"],
    desc: "A context-aware AI chatbot built with FastAPI and Google Gemini to support mental health-related conversations.",
    features: [
      "RAG pipeline for document-based question answering",
      "Crisis-detection safeguard that surfaces helpline resources",
      "Rate limiting and request logging",
      "Automated Pytest suites for endpoints and safety behavior",
    ],
    note: "A supportive tool — not a replacement for professional mental health care.",
    github: "https://github.com/saro-elangovan/ai-mental-health-chatbot",
    visual: "chat",
  },
  {
    title: "AI-Powered Disease Prediction System",
    tech: ["Python", "NumPy", "Pandas", "Scikit-learn", "Classification"],
    desc: "An end-to-end supervised machine learning pipeline predicting disease outcomes from structured healthcare data.",
    features: [
      "Worked with 10,000+ patient records",
      "Feature engineering and data preprocessing",
      "Reduced null-value errors by 40% before training",
      "87% accuracy, reported as 15% above baseline",
    ],
    note: "Academic portfolio project — not a clinically validated diagnostic system.",
    visual: "ml",
  },
  {
    title: "HR Analytics Dashboard",
    tech: ["Power BI", "Power Query", "DAX", "Data Cleaning", "KPI Reporting"],
    desc: "An interactive Power BI dashboard analyzing employee data, attrition patterns, and workforce metrics.",
    features: [
      "Cleaned missing values, duplicates, and inconsistent data",
      "DAX measures for headcount, attrition count, and rate",
      "Filters for department, gender, age, salary, experience",
      "Insights to support retention and workforce planning",
    ],
    note: "Preview uses illustrative sample visuals, not real employee data.",
    visual: "dash",
  },
];

export const certifications = [
  { title: "C Programming Certification", detail: "Programming fundamentals in C." },
  { title: "Java Programming Certification", detail: "Object-oriented programming in Java." },
  { title: "Data Analytics Internship Certificate", detail: "Nexila Technologies" },
  { title: "Drone Technology Certification", detail: "Quill Drone Technologies — hardware and software training." },
];

export const services = [
  { title: "Data Analytics", desc: "Analyze, clean, and interpret datasets to identify useful patterns." },
  { title: "Power BI Dashboards", desc: "Develop interactive reports, KPI dashboards, and visual summaries." },
  { title: "Python Data Analysis", desc: "Use Python, NumPy, and Pandas for data processing and analysis." },
  { title: "Machine Learning Projects", desc: "Build and evaluate introductory supervised machine learning models." },
  { title: "Data Cleaning and ETL", desc: "Prepare structured datasets through validation, transformation, and cleaning." },
  { title: "SQL and Database Analysis", desc: "Query and organize structured data using SQL and MySQL." },
];
