# Multi-stage Dockerfile for BirdsWorld API
# Stage 1: Build stage
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Stage 2: Production stage using distroless image
FROM gcr.io/distroless/nodejs18-debian11

# Set working directory
WORKDIR /app

# Copy node_modules from builder stage
COPY --from=builder /app/node_modules ./node_modules

# Copy application code
COPY --from=builder /app .

# Expose port
EXPOSE 3001

# Run the application
CMD ["app.js"]