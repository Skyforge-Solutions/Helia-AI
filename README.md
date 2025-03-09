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
  <a href="#setup"><strong>Setup</strong></a>
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

---

## Technology Stack

- **Frontend**: Next.js 14 (App Router), Tailwind CSS
- **Backend**: FastAPI
- **Database**: PostgreSQL with `pgvector`
- **Authentication**: NextAuth.js
- **Storage**: AWS S3 for large files, Vercel Blob for smaller assets
- **Deployment**: Vercel, Docker (optional for local development)
- **Streaming**: WebSockets for real-time interactions

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

## Contributing
We welcome contributions! Feel free to submit issues, feature requests, or pull requests.

---

## License
This project is licensed under the MIT License.

---

## Contact
For inquiries or collaboration, reach out via [email/contact page].

