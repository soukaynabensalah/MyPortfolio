// ── Portfolio Data ─────────────────────────────────────────────────────

import projectnexora from "../assets/projects/Nexora/img1.png";
import projectContactXtract from "../assets/projects/ContactXtract/img1.png";
import projectRestaurant_manager from "../assets/projects/Restaurant_manager/img1.png";
import projectCRM from "../assets/projects/crm/img1.webp";
import projectRestaurant_management from "../assets/projects/restaurante_management/img1.png";

export const projects = [
  {
    id: "01",
    title: "NEXORA – AI-Powered HR SaaS Platform with BPMS Automation",
    desc: "AI-powered HR platform designed to simplify and automate recruitment and internal processes.",
    longDesc: `NEXORA is an AI-powered HR platform designed to simplify and automate recruitment and internal processes.

It allows companies to manage their HR operations in one place — from handling employees and job applications to automating workflows like leave requests and training programs.

What makes NEXORA powerful is its AI integration. The platform analyzes CVs and matches candidates with job offers automatically, helping recruiters save time and make better decisions.

Built with a scalable multi-tenant architecture, each company has its own secure space within the platform. On top of that, a custom workflow system (BPMS) helps automate repetitive tasks and improve overall efficiency.

NEXORA combines modern web technologies with AI to deliver a smart, fast, and user-friendly HR solution.
`,
    tags: ["React", "Express.js", "TypeScript", "PostgreSQL ", "Prisma ORM", "SSE", "JWT"],
    color: "#7affd4",
    image: projectnexora,
    github: "https://github.com/Essafir/nexora",
    link: "https://nexora-si.com/"
  },
  {
    id: "02",
    title: "ContactXtract – Smart Contact Extraction Chrome Extension",
    longDesc: `ContactXtract is a lightweight and privacy-focused Chrome extension designed to extract contact information from any web page in real time. It automatically detects emails, phone numbers, and social media links, helping users quickly gather valuable data without manual effort.

The extension features a modern and intuitive user interface with clear feedback states (loading, empty, success) and one-click copy functionality for a smooth user experience. Built with a strong focus on privacy, all data processing is performed locally in the browser, ensuring that no sensitive information is sent to external servers.

Special attention was given to accessibility, implementing WCAG 2.1 best practices such as keyboard navigation, proper contrast, and ARIA live regions. The architecture is based on Manifest V3 and service workers, ensuring performance, security, and compliance with modern Chrome extension standards.`,
    tags: ["JavaScript", "Chrome Extensions API", "HTML", "CSS", "UX/UI Design", "Manifest V3"],
    color: "#a78bfa",
    image: projectContactXtract,
    github: "https://github.com/soukaynabensalah/ContactXtract_extension",
    link: ""
  },
  {
    id: "03",
    title: "Restaurant Management System",
    longDesc: `This project is a full-stack restaurant management platform designed to streamline restaurant data management and enhance user interaction through automation and AI.

The system includes secure authentication using JWT, a complete CRUD system for managing restaurants, and a favorites feature that allows users to personalize their experience. It also integrates automated data extraction powered by n8n workflows, enabling users to collect restaurant data based on location and keywords, with results exported and logged efficiently.

A key highlight of the platform is the AI-powered chatbot assistant, capable of understanding natural language queries and helping users interact with their data in a more intuitive way. The chatbot is integrated through workflow automation and leverages modern LLM capabilities for fast and context-aware responses.

On the frontend, the application delivers a modern, responsive experience with a glassmorphism design, smooth interactions, and Progressive Web App (PWA) support, allowing installation and offline usage.

The platform also includes analytics integration for tracking user behavior and improving the overall experience. Built with scalability and performance in mind, this project demonstrates strong full-stack architecture, API design, and real-world problem-solving.`,
    tags: ["Node.js", "Express", "MySQL", "JWT", "PWA", "n8n"],
    color: "#ff6b6b",
    image: projectRestaurant_manager,
    github: "https://github.com/soukaynabensalah/Restaurant-Manager",
    link: "https://restaurant-manager-beta.vercel.app/"
  },
  {
    id: "04",
    title: "Web Tools Hub – Portfolio Platform",
    longDesc: `Web Tools Hub is a centralized portfolio platform that showcases a collection of web applications developed as part of a collaborative student project. The platform provides a responsive and user-friendly interface, bringing together multiple tools such as a Task Manager, Crypto Tracker, and a fully functional CRM system.

The main focus of my contribution was the development of the CRM module, where I designed and implemented core business features. This includes full CRUD operations for managing clients and projects, along with advanced search and filtering capabilities to improve data accessibility and user efficiency.

I also built an interactive dashboard featuring key statistics and data visualizations, enabling users to gain insights into their activities at a glance. To enhance usability and accessibility, I implemented a freemium model combined with local data persistence, allowing the application to function without a backend while still delivering a smooth and reliable experience.

The entire platform was developed using pure HTML, CSS, and JavaScript, demonstrating strong fundamentals in web development, performance optimization, and the ability to build scalable solutions without relying on external frameworks.`,
    tags: ["HTML", "CSS", "JS", "REST APIs"],
    color: "#fbbf24",
    image: projectCRM,
    github: "https://github.com/Essafir/projets",
    link: "https://projets-ashen.vercel.app/"
  },
  {
    id: "05",
    title: "Restaurant Management System – Graduation Project",
    longDesc: `A full-stack web application developed as a graduation project to manage restaurant operations, including orders and reservations.

The system supports multiple roles: clients can book tables and place orders (on-site or delivery), kitchen staff handle order preparation, while servers and delivery staff manage order fulfillment. An admin dashboard allows team, table, and operations management with analytical insights.

This project demonstrates practical experience in building role-based systems and real-world business logic in a restaurant environment.`,
    tags: ["PHP", "MySQL", "HTML", "CSS", "Bootstrap"],
    color: "#38bdf8",
    image: projectRestaurant_management,
    github: "https://github.com/soukaynabensalah/Gestion_restaurant",
    link: ""
  }
];

export const skills = [
  "React",
  "Three.js",
  "GSAP",
  "TypeScript",
  "Node.js",
  "WebGL",
  "Framer Motion",
  "Figma",
  "Next.js",
  "GraphQL",
  "Python",
  "Rust",
];

export const navItems = ["HOME", "PROJECTS", "SKILLS", "CONTACT"];

export const marqueeItems = [
  "REACT", "◈", "THREE.JS", "◈", "GSAP", "◈", "WEBGL", "◈",
  "MOTION", "◈", "TYPESCRIPT", "◈", "NODE.JS", "◈", "NEXT.JS", "◈",
];

export const contactInfo = [
  { label: "EMAIL", value: "adam@axiom.dev", icon: "◉" },
  { label: "GITHUB", value: "@adam-karim", icon: "◉" },
  { label: "LINKEDIN", value: "in/adam-karim", icon: "◉" },
];

export const stats = [
  ["40+", "Projects delivered"],
  ["5", "Years of experience"],
  ["100%", "Client satisfaction"],
];

export const roles = [
  "Full-Stack Developer",
  "Creative Technologist",
];
