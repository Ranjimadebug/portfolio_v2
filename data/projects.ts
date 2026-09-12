// Single source of truth for all portfolio projects.
// Used by the Projects grid (sections/Projects/Projects.tsx) and the
// per-project detail pages (app/projects/[slug]/page.tsx).
//
// TODO: swap every "[PLACEHOLDER]" value with real content — links,
// screenshots, and case-study copy — once it's ready.

export interface Project {
    id: string
    slug: string
    title: string
    tagline: string
    desc: string
    longDesc: string[]
    stack: string[]
    role: string
    timeline: string
    features: string[]
    challenges: { title: string; detail: string }[]
    links: {
        github?: string
        live?: string
        // For a project shipped as multiple separately-deployed apps (e.g.
        // MediSlot's patient/doctor/admin frontends) instead of one demo URL.
        apps?: { label: string; url: string }[]
    }
    coverImage?: string
    gallery?: string[]
}

export const projects: Project[] = [
    {
        id: "01",
        slug: "medislot",
        title: "MediSlot",
        tagline: "Healthcare appointment scheduling, built for three kinds of users at once.",
        desc: "Full-stack healthcare SaaS platform for doctor appointment scheduling with dedicated dashboards for patients, doctors, and admins.",
        longDesc: [
            "MediSlot is a full-stack healthcare scheduling platform built as three separate applications — Patient, Doctor, and Admin — sharing one Express/MongoDB API, each with its own JWT-scoped login so a token issued for one role can never be replayed against another.",
            "The core loop is a booking's lifecycle: a patient finds a doctor and requests a slot, the doctor confirms or declines it, and the appointment moves through PENDING → CONFIRMED → COMPLETED, with reschedule and cancellation handled at every step along the way. From there the platform layers on the pieces a real clinic actually needs — prescriptions tied to completed visits, recurring weekly availability rules per doctor, automated email reminders, in-app messaging between doctor and patient, post-visit ratings, and an admin console with live appointment and patient analytics.",
            "Rather than a single admin panel bolted onto a booking form, each role gets a dashboard built around what that person actually does day to day — a patient managing their own care, a doctor running their queue and schedule, an admin operating the clinic — all reading and writing through the same authorization-checked API underneath."
        ],
        stack: ["Next.js", "Node.js", "MongoDB", "Express"],
        role: "Solo full-stack developer — designed the system architecture, built the Express/MongoDB API, and shipped all three Next.js frontends (Patient, Doctor, Admin) end to end.",
        timeline: "Feb – Sep 2026",
        features: [
            "Role-based dashboards for patients, doctors, and admins",
            "Real-time appointment slot booking and availability management",
            "JWT authentication with per-role authorization enforced on every API request, not just at login",
            "Prescriptions tied to completed appointments, with per-medicine dosage and status tracking",
            "Doctor-configurable recurring weekly availability, down to per-day time windows and slot length",
            "Automated email reminders and in-app doctor–patient messaging",
            "Post-visit doctor ratings and admin-side clinic-wide analytics"
        ],
        challenges: [
            {
                title: "Keeping three independent frontends in sync on identity",
                detail: "Admin, doctor, and patient apps are separate Next.js projects hitting one Express API, so a single JWT payload (id + role only) had to drive every permission check. Solved with a shared protect + authorize(...roles) middleware chain on the backend and a /auth/me endpoint each frontend calls once on load to hydrate the full user profile client-side."
            },
            {
                title: "Coordinating booking state across roles without a shared frontend",
                detail: "A booking's status (pending → confirmed → completed/cancelled) has to stay consistent whether it's changed from the doctor app or the admin app, with no shared client state between them. Solved by treating the backend as the single source of truth and having each app poll/refetch on the appointment resource rather than trust local state."
            },
            {
                title: "Deriving patient records instead of storing them separately",
                detail: "Rather than maintain a separate \"patients\" collection prone to drifting out of sync with appointments, the admin patients view is computed on the fly from appointment history (dedupe by patient ID, roll up visit counts and last-visit status) — one less place for data to go stale."
            },
            {
                title: "Fire-and-forget email notifications",
                detail: "Appointment emails are sent async and failures are logged rather than blocking the request, so a flaky SMTP provider never breaks a booking."
            }
        ],
        links: {
            github: "https://github.com/Ranjimadebug/medislot", // private repo
            apps: [
                { label: "Patient App", url: "https://medislot-qrzp.vercel.app/patient/login" },
                { label: "Doctor App", url: "https://medislot-doctor.vercel.app/doctor/login" },
                { label: "Admin App", url: "https://medislot-admin-eight.vercel.app/admin/login" }
            ]
        },
        coverImage: "/projects/medislot/cover.png",
        gallery: []
    },
    {
        id: "02",
        slug: "convocore",
        title: "ConvoCore",
        tagline: "Real-time messaging that stays fast at scale.",
        desc: "Real-time chat application supporting instant messaging, typing indicators, and scalable socket-based communication.",
        longDesc: [
            "ConvoCore is a real-time communication platform designed for instant one-to-one and room-based messaging. The application uses Socket.io to establish persistent WebSocket connections, enabling messages, typing indicators, and presence updates to propagate instantly without requiring page refreshes.",
            "The backend follows a socket-driven architecture where users can join conversation rooms and exchange messages through isolated channels. Messages are persisted in MongoDB, allowing conversations to remain available across sessions while Socket.io handles the real-time delivery layer.",
            "The system separates real-time events from persistent data operations, allowing the application to scale more cleanly as the number of concurrent conversations increases."
        ],
        stack: ["Next.js", "Node.js", "MongoDB", "Socket.io", "Express.js"],
        role: "Full-Stack Developer",
        timeline: "3 Weeks",
        features: [
            "Instant one-to-one messaging using Socket.io",
            "Real-time typing indicators",
            "Online/offline presence tracking",
            "Conversation and room-based messaging",
            "Persistent message history with MongoDB",
            "User authentication and session management",
            "Real-time message delivery without page refresh",
            "Automatic conversation history loading",
            "Responsive chat interface",
            "Connection and reconnection handling"
        ],
        challenges: [
            {
                title: "Managing Real-Time State",
                detail: "Maintaining synchronized chat state between multiple connected users was one of the primary challenges. The application uses Socket.io events to update conversations immediately when a message, typing event, or presence change occurs. Persistent data is handled separately through the backend API and MongoDB, preventing temporary socket state from becoming the source of truth."
            },
            {
                title: "Message Persistence & Synchronization",
                detail: "Real-time messages need to appear instantly while also being reliably stored. The system writes messages to MongoDB while broadcasting the corresponding Socket.io event to connected participants. This provides immediate UI feedback while ensuring the conversation can be reconstructed when users reconnect."
            },
            {
                title: "Connection Reliability",
                detail: "Users can temporarily lose network connectivity or refresh their browser while maintaining an active conversation. Socket connection lifecycle events are used to detect disconnects and reconnects, while conversation history is retrieved from the database when the user returns."
            }
        ],
        links: {
            github: undefined,
            live: undefined
        },
        coverImage: "/projects/convocore/cover.png",
        gallery: []
    },
    {
        id: "03",
        slug: "pawmart",
        title: "PawMart",
        tagline: "A cross-platform marketplace for pet products.",
        desc: "Cross-platform mobile marketplace for pet products, built as an Expo/React Native app with a full onboarding, auth, and checkout flow across five tab sections.",
        longDesc: [
            "PawMart is a cross-platform mobile marketplace for discovering and purchasing pet products, built with React Native and Expo. The application provides a complete shopping journey spanning onboarding, authentication, product discovery, product details, cart management, checkout, and order tracking.",
            "The application is structured around a modular React Native architecture, separating navigation, reusable UI components, application state, screens, and API communication. The backend exposes RESTful APIs for users, products, carts, and orders, with MongoDB providing persistent application data.",
            "The project focuses on creating a consistent shopping experience across mobile platforms while keeping the application architecture flexible enough to support additional product categories and marketplace functionality."
        ],
        stack: ["React Native", "Expo", "Node.js", "Express.js", "MongoDB"],
        role: "Full-Stack / React Native Developer",
        timeline: "4 Weeks",
        features: [
            "Multi-step user onboarding",
            "User registration and authentication",
            "Product discovery and category browsing",
            "Product search and filtering",
            "Detailed product pages",
            "Add to cart and quantity management",
            "Persistent shopping cart",
            "Checkout workflow",
            "Order placement and order history",
            "Profile and account management",
            "Five-section bottom-tab navigation",
            "Responsive React Native UI",
            "REST API integration with Axios"
        ],
        challenges: [
            {
                title: "Managing a Multi-Screen Shopping Flow",
                detail: "The application contains several interconnected flows, including authentication, product browsing, cart management, and checkout. Navigation was separated into logical stacks and tab-based sections, allowing authentication screens and the main application experience to remain independent while preserving navigation state throughout the shopping journey."
            },
            {
                title: "Synchronizing Cart State",
                detail: "Keeping cart quantities and totals synchronized across product, cart, and checkout screens was an important state-management challenge. Cart-related state is centralized so that changes made from one screen are immediately reflected throughout the shopping flow rather than maintaining separate copies of cart data."
            },
            {
                title: "Designing a Consistent Mobile Architecture",
                detail: "As the number of screens increased, keeping UI logic maintainable became increasingly important. Reusable components were extracted for common elements such as product cards, buttons, inputs, headers, and navigation elements. Screen-specific logic remains inside individual screens while shared functionality is organized into dedicated context and utility modules."
            },
            {
                title: "API & Loading States",
                detail: "The application communicates with backend services for product and user-related operations. Axios is used as the API communication layer, with loading, success, and error states handled at the screen/component level to provide feedback during asynchronous operations."
            }
        ],
        links: {
            github: undefined,
            live: undefined
        },
        coverImage: "/projects/pawmart/cover.png",
        gallery: []
    }
]

export function getProjectBySlug(slug: string): Project | undefined {
    return projects.find((p) => p.slug === slug)
}
