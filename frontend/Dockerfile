# -------- Build Stage --------
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies first (cached if package.json unchanged)
COPY package*.json ./
RUN npm ci

# Copy rest of the app and build
COPY . .
RUN npm run build

# -------- Production Stage --------
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy built output and only production packages
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["npx", "next", "start", "-H", "0.0.0.0"]
