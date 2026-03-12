# TheLuckyBet — Frontend

A Vue 2 single-page application for the TheLuckyBet gambling platform.

## Local Development

```bash
npm install
npm run serve
```

## Production Build

```bash
npm run build
npm run start   # serves dist/ on port 8080
```

## Deploying to Koyeb

This project includes a multi-stage `Dockerfile` ready for Koyeb.

### Steps

1. Push this repository to GitHub.
2. In the [Koyeb dashboard](https://app.koyeb.com), create a new **Web Service**.
3. Select **GitHub** as the source and choose this repository.
4. Koyeb will auto-detect the `Dockerfile` and use it to build and serve the app.
5. Set the following **environment variables** in the Koyeb service settings:

| Variable | Description |
|---|---|
| `VUE_APP_BACKEND_URL` | Full HTTPS URL of your backend API (e.g. `https://your-backend.koyeb.app`) |
| `VUE_APP_SOCKET_URL` | Full HTTPS URL of your Socket.IO backend (same as above, **must use `https://`**) |
| `VUE_APP_HCAPTCHA_KEY` | Your hCaptcha site key |

> **Important:** `VUE_APP_SOCKET_URL` must use `https://` (not `wss://`). The socket.io-client library handles the WebSocket upgrade automatically.

6. Set the **port** to `8080`.
7. Deploy.

## Environment Variables

Copy `.env.production` and fill in your values. Never commit `.env.local` or `.env.development`.

## Tech Stack

- Vue 2 + Vuex + Vue Router
- Socket.IO Client v4
- Axios
- hCaptcha
