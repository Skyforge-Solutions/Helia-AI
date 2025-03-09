# Helia-AI

<p align="center">
  <img alt="Helia-AI" src="app/(chat)/opengraph-image.png">
</p>

<p align="center">
  <strong>A Smart, Personalized AI Chatbot with Real-Time Interactions</strong>
</p>

<p align="center">
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#technology-stack"><strong>Technology Stack</strong></a> ·
  <a href="#deployment"><strong>Deployment</strong></a> ·
  <a href="#setup"><strong>Setup</strong></a> ·
  <a href="#license"><strong>License</strong></a>
</p>

---

## Features

- **Real-Time Chat**: Seamless, interactive conversations powered by OpenAI's API.
- **Vector Search with PostgreSQL (`pgvector`)**: Efficient retrieval of stored embeddings for intelligent responses.
- **User Authentication**: Secure login and profile management.
- **Credit System**: Users start with free credits; each message deducts one credit.
- **Chat History Management**: View, edit, and delete past conversations.
- **Multi-Language Support**: Powered by `next-intl` for internationalization.
- **WebSocket Integration**: For fast, real-time chat responses.
- **Attachment Handling**: Users can upload and process images in chat.
- **Personalized AI Responses**: Uses user-specific metadata for more relevant interactions.
- **Responsive Design**: Optimized for both desktop and mobile experiences.

---

## Technology Stack

### 🛠️ Core Technologies
- **Next.js**: The main framework for server-side rendering (SSR) and static site generation (SSG)
- **React 19 (Experimental)**: Frontend library for building UI components
- **TypeScript**: Statically typed JavaScript to enhance code safety
- **Tailwind CSS**: Utility-first CSS framework for styling
- **ShadCN/UI**: Component library for UI elements

### 🌐 Backend & API
- **Next.js API Routes**: Handles backend logic (/api/ routes for chat, auth, and credit management)
- **Gemini AI API**: Google's AI model used for chatbot responses (replaced OpenAI)
- **Vercel Blob**: For image/file storage and retrieval
- **SWR**: Data fetching with stale-while-revalidate caching strategy

### 🗄️ Database & ORM
- **PostgreSQL**: Database for storing users, chat history, and credits
- **Drizzle ORM**: Lightweight Object-Relational Mapper for database queries
- **Vercel Postgres**: Managed PostgreSQL database on Vercel
- **Neon Database (Optional)**: Alternative managed Postgres instance

### 🔐 Authentication & Security
- **NextAuth.js**: Authentication library for handling login/signup
- **bcrypt-ts**: Password hashing for authentication
- **JSON Web Tokens (JWT)**: Used for session management

### 📦 Build & Deployment
- **Vercel**: Hosting and deployment platform
- **Turbopack (Experimental)**: Next.js's new build tool for faster builds
- **ESLint**: Linter for enforcing code quality
- **Prettier**: Code formatting

### ⚡ State Management & Hooks
- **React Context API**: For global state management
- **Zustand**: State management library used in some parts of the app
- **usehooks-ts**: Collection of useful React hooks

### 📄 UI Components & Utilities
- **Radix UI**: Provides accessible UI components (dropdowns, modals, tooltips, etc.)
- **Lucide Icons**: Icon set for UI elements
- **Framer Motion**: Used for animations
- **Sonner**: Notification system

### 📂 File Upload & Processing
- **Vercel Blob**: Used for handling file uploads
- **Papaparse**: CSV file parsing for structured data inputs

### 📜 Miscellaneous Utilities
- **Zod**: TypeScript-first schema validation
- **clsx & tailwind-merge**: Utility for conditional classNames in React components
- **nanoid**: Generates unique IDs for chats/messages
- **date-fns**: Library for date manipulation

### 🧪 Testing
- **Playwright**: End-to-end testing framework

---

## Deployment

You can deploy your own version of Helia-AI with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

Alternatively, deploy via Docker:
```bash
docker build -t helia-ai .
docker run -p 3000:3000 helia-ai
```

---

## Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Skyforge-Solutions/Helia-AI.git
cd Helia-AI
```

### 2. Install Dependencies
```bash
pnpm install  # or npm install
docker-compose up -d  # Start PostgreSQL if using Docker
```

### 3. Configure Environment Variables
Create a `.env` file and define required variables (refer to `.env.example`).

### 4. Run the App Locally
```bash
pnpm dev  # Start the development server
```
Your app should now be running on [localhost:3000](http://localhost:3000/).

---

## License

This project is proprietary software owned by Skyforge Private Limited.

Copyright © 2024 Skyforge Private Limited. All rights reserved.

This software is distributed under the Skyforge Private Limited Software License Agreement, which restricts its use, copying, modification, and distribution. See the LICENSE file for complete details.

For permission beyond the scope of this license, please contact [your contact information].

---

## Contact

For inquiries, support, or collaboration opportunities, please reach out to:

- **Email**: [srinathshrestha9890@gmail.com]
- **Website**: [https://www.skyforge.com]
- **Address**: [Your Company Address]

---

## About Skyforge Private Limited

Skyforge Private Limited is a leading provider of AI-powered solutions for businesses and individuals. We specialize in creating intelligent, intuitive interfaces that enhance productivity and user experience.

