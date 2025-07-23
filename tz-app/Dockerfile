# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.ts ./next.config.ts
COPY --from=builder /app/tsconfig.json ./tsconfig.json
COPY --from=builder /app/constants ./constants
COPY --from=builder /app/types ./types
COPY --from=builder /app/hooks ./hooks
COPY --from=builder /app/components ./components
COPY --from=builder /app/stores ./stores
COPY --from=builder /app/utils ./utils
COPY --from=builder /app/app ./app
EXPOSE 3000
CMD ["npx", "next", "start"] 