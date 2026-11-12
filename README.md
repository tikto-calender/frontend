# TikTo Frontend

Vite web app for managing tasks and events in TikTo Calendar. The dashboard shows the Frontend, Backend and Notification Service versions.

## Run locally

Use Node.js 24 or Node.js 22.13+ on the 22.x line. Start [Backend](https://github.com/tikto-calender/backend) on port 3000, then run this from the Frontend repo root on Linux, macOS or Windows:

```sh
npm ci
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). Vite proxies `/api` to Backend. Create a task or use **Test notification** to demo the integration with Notification Service. Run `npm test` for tests or `npm run build` to build the app.

## Deployment

Push to `dev` to build the GHCR image and update Manifest. After checking Dev, run [Promote Frontend](https://github.com/tikto-calender/manifest#promote-to-production) and verify Prod before running **Finalize release**.
