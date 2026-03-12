# ---- Stage 1: Build ----
FROM node:18-alpine AS builder

WORKDIR /app

# Accept build arguments for environment variables
ARG VUE_APP_BACKEND_URL=https://luckybet-socket.akio.lol
ARG VUE_APP_SOCKET_URL=https://luckybet-socket.akio.lol
ARG VUE_APP_HCAPTCHA_KEY=10000000-ffff-ffff-ffff-000000000001

# Set environment variables for the build
ENV VUE_APP_BACKEND_URL=$VUE_APP_BACKEND_URL
ENV VUE_APP_SOCKET_URL=$VUE_APP_SOCKET_URL
ENV VUE_APP_HCAPTCHA_KEY=$VUE_APP_HCAPTCHA_KEY

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci --legacy-peer-deps

# Copy source files
COPY . .

# Build the Vue app for production with the environment variables
RUN npm run build

# ---- Stage 2: Serve ----
FROM node:18-alpine AS runner

WORKDIR /app

# Install the 'serve' static file server
RUN npm install -g serve

# Copy built assets from builder stage
COPY --from=builder /app/dist ./dist

# Expose port 8080 (Koyeb default)
EXPOSE 8080

# Serve the SPA; -s flag enables single-page app fallback routing
CMD ["serve", "-s", "dist", "-l", "8080"]
