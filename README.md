# TikTo Frontend

Web application for the TikTo Calendar system, built with **Vite** and modern **vanilla JavaScript**. Delivers an interactive calendar interface for managing tasks, events, and viewing system notifications.

---

## 🚀 Key Features

* 📅 **Calendar & Planner Views**: Interactive scheduling for tasks and calendar events.
* 📋 **Task Management**: Create, update, toggle completion status, and remove tasks.
* 🔔 **Telegram Notifications**: View real-time system and notification health directly from the UI.
* ⚡ **Fast & Lightweight**: Zero frontend framework bloat; powered by Vite for lightning-fast HMR (Hot Module Replacement).

---

## 🛠️ Local Development

### Prerequisites
* **Node.js** `>= 20`
* **npm** `>= 10`
* The **TikTo Backend** running on `http://localhost:3000`

### Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev
```

Vite serves the application at **`http://localhost:5173`**.

> [!NOTE]
> **API Proxying**: In local development, Vite automatically proxies all requests made to `/api/*` directly to the backend at `http://localhost:3000`.

---

## ⚙️ Environment Variables

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

| Variable | Description | Default |
| :--- | :--- | :--- |
| `VITE_API_ORIGIN` | Backend origin for direct CORS requests. Leave empty in production so requests remain same-origin via CloudFront/Nginx. | `""` |

> [!WARNING]
> **Security Warning**: Any variable prefixed with `VITE_` is baked directly into the client-side JavaScript bundle. **Never store API keys, tokens, or AWS credentials in frontend environment files.**

---

## 📜 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the local development server with instant hot-reloading |
| `npm run build` | Compiles and optimizes assets into the `dist/` directory for production |
| `npm run preview` | Locally serves and previews the production build from `dist/` |
| `npm test` | Runs frontend unit and integration tests |
| `npm run lint` | Inspects code style and syntax issues using ESLint |

---

## 📦 Production Build & Deployment

### 1. Static Hosting (AWS S3 + CloudFront)
```bash
npm run build
```
Deploy the compiled `dist/` directory to an Amazon S3 bucket behind AWS CloudFront. 
Configure CloudFront with two cache behaviors:
* Default (`/*`): Serves static files from the S3 origin.
* `/api/*`: Forwards API traffic to the backend origin.

### 2. Containerized Hosting (Docker + Nginx)
The included `Dockerfile` packages the production build into a minimal Alpine Nginx image:

```bash
# Build the Docker image
docker build -t tikto-frontend .

# Run the container
docker run -p 8080:80 tikto-frontend
```

---

## 🔄 CI/CD Workflows

Workflows rely on shared actions from `tikto-calender/reusable-workflow`:

* **Pull Requests into `dev`**: Executes automated linting, unit tests, and production build checks. Documentation-only modifications skip pipeline execution to save runner minutes.
* **Release (`prod`)**: Releases triggered from tagged versions (`vX.Y.Z`) deploy the tested frontend assets to the production CloudFront distribution.
