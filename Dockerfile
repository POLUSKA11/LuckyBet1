# ---- Stage 1: Build ----
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci --legacy-peer-deps

# Copy source files
COPY . .

# Build the Vue app for production
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
