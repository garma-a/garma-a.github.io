import { base } from "$app/paths";

const projectsData = {
  "healthcare-management": {
    title: "Healthcare Management System",
    subtitle: "Built for Magdi Yacoub Heart Foundation",
    description:
      "A full-stack healthcare platform developed during my time at Magdi Yacoub Heart Center. Features include patient management, appointment scheduling, lab results tracking with Westgard rule validation, and role-based access control for medical staff.",
    stack: ["NestJS", "PostgreSQL", "Docker", "Prisma", "TypeScript", "Redis"],
    highlights: [
      "Patient record management with HIPAA-aligned security",
      "Real-time lab results with Westgard rule violation detection",
      "Role-based access control (Admin, Doctor, Lab Technician)",
      "Dockerized microservice architecture",
      "CI/CD pipeline for automated testing and deployment",
    ],
    images: [],
    videoUrl: "",
    githubUrl: "https://github.com/GARMA-A",
    year: "2024-2025",
  },
  "restful-api-platform": {
    title: "RESTful API Platform",
    subtitle: "Production-Ready API Architecture",
    description:
      "A comprehensive REST API demonstrating best practices in API design, featuring JWT authentication, role-based authorization, rate limiting, request validation, and comprehensive error handling. Built to serve as a reference architecture for scalable backend systems.",
    stack: ["Express.js", "MongoDB", "JWT", "Prisma", "Node.js", "Jest"],
    highlights: [
      "JWT-based authentication with refresh token rotation",
      "Middleware-based authorization with role hierarchy",
      "Rate limiting and request throttling",
      "Comprehensive input validation with Joi/Zod",
      "API versioning and OpenAPI documentation",
      "Integration and unit test coverage",
    ],
    images: [],
    videoUrl: "",
    githubUrl: "https://github.com/GARMA-A",
    year: "2025",
  },
  "realtime-chat-backend": {
    title: "Real-time Chat Backend",
    subtitle: "High-Performance Go Server",
    description:
      "A high-performance chat server built in Go, handling real-time messaging through WebSocket connections with message persistence and Redis pub/sub for horizontal scaling across multiple server instances.",
    stack: ["Go", "WebSocket", "Redis", "Docker", "PostgreSQL"],
    highlights: [
      "Concurrent WebSocket connection handling in Go",
      "Redis pub/sub for cross-instance message broadcast",
      "Message persistence with PostgreSQL",
      "Horizontal scaling with Docker Compose",
      "Graceful connection management and reconnection",
    ],
    images: [],
    videoUrl: "",
    githubUrl: "https://github.com/GARMA-A",
    year: "2025",
  },
  "smart-safety": {
    title: "SmartSafety — UEA7 Winner",
    subtitle: "Award-Winning Safety Platform",
    description:
      "An award-winning safety monitoring platform that secured 2nd place at the Upper Egypt in Action 7 competition and received ITIDA funding. Combines IoT sensor integration with real-time alerting and analytics dashboards.",
    stack: ["Node.js", "PostgreSQL", "Express.js", "CI/CD", "Docker"],
    highlights: [
      "2nd place at Upper Egypt in Action 7 competition",
      "Secured ITIDA funding for further development",
      "IoT sensor data ingestion pipeline",
      "Real-time alerting and notification system",
      "Analytics dashboard with historical data",
    ],
    images: [],
    videoUrl: "",
    githubUrl: "https://github.com/GARMA-A",
    year: "2025",
  },
};

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
  const project = projectsData[params.slug];

  if (!project) {
    return {
      status: 404,
      error: "Project not found",
    };
  }

  return {
    project,
    slug: params.slug,
  };
}

/** @type {import('./$types').EntryGenerator} */
export function entries() {
  return Object.keys(projectsData).map((slug) => ({ slug }));
}
