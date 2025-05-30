# PushDB – Dev Setup Guide 🚀

PushDB is a simple developer tool to push structured data to MongoDB. This guide walks you through setting up and running the project in development mode.

---

## 🧠 Prerequisites

- **Node.js** v18 or newer
- **npm** or **yarn**
- A MongoDB URI (e.g., MongoDB Atlas)
- A hosted PostgreSQL database (or use the Docker setup)

---

## Setup for the NextAuth Client From Google Cloud Console

- get the client id
- get the client secret
- create the next auth secret
  ```bash
  openssl rand -base64 32
  ```

## 🛠️ Local Development (Without Docker)

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/pushdb.git
cd pushdb
````

### 2. Create .env File
```
- copy as per described in the .env.example to .env
```

### 3. Install dependencies
```bash
npm install
```

### 4. Generate Prisma Client
```bash
npx prisma generate
```

### 5. Start Development Server
```bash
npm run dev
```

## 2. Use Docker
```bash
docker compose up --build
```
