// ── Portfolio Data ─────────────────────────────────────────────────────

import projectEcommerce from "../assets/projects/project_ecommerce.png";
import projectDashboard from "../assets/projects/project_dashboard.png";
import projectSocial from "../assets/projects/project_social.png";
import projectAuth from "../assets/projects/project_auth.png";

export const projects = [
  {
    id: "01",
    title: "Nebula OS",
    desc: "Futuristic system interface with real-time data visualization.",
    longDesc: "Nebula OS is a conceptual project exploring the future of operating systems. Designed with React, WebGL, and GSAP, it features a highly dynamic and interactive interface with real-time data visualizations, smooth animations, and a focus on visual feedback.",
    tags: ["React", "WebGL", "GSAP"],
    color: "#7affd4",
    image: projectEcommerce,
    github: "https://github.com",
    link: "https://example.com"
  },
  {
    id: "02",
    title: "Synthwave Studio",
    desc: "Web DAW with visual sound synthesis and real-time collaboration.",
    longDesc: "A digital audio workstation built directly in the browser. It leverages the Web Audio API for sound generation and precise timing, while Canvas renders a real-time reactive visualizer based on the playing frequencies.",
    tags: ["Web Audio API", "Canvas", "WebSockets"],
    color: "#ff6b6b",
    image: projectDashboard,
    github: "https://github.com",
    link: "https://example.com"
  },
  {
    id: "03",
    title: "Quantum Grid",
    desc: "Immersive 3D marketplace for NFTs with spatial navigation.",
    longDesc: "Quantum Grid provides an immersive 3D gallery where users can navigate a spatial environment to explore and purchase digital assets. Built with Next.js, Three.js and integrated with Solidity smart contracts constraint to Ethereum.",
    tags: ["Three.js", "Next.js", "Solidity"],
    color: "#a78bfa",
    image: projectSocial,
    github: "https://github.com",
    link: "https://example.com"
  },
  {
    id: "04",
    title: "Phantom Auth",
    desc: "Biometric authentication system based on mouse movements.",
    longDesc: "An innovative security experiment utilizing machine learning to analyze the behavioral biometrics of a user's mouse movements as an additional authentication layer. The system detects anomalous behaviors in real-time.",
    tags: ["ML", "TypeScript", "Node.js"],
    color: "#fbbf24",
    image: projectAuth,
    github: "https://github.com",
    link: "https://example.com"
  },
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
