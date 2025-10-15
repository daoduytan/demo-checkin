
FROM oven/bun:1 AS base

# Stage 1: Build Next.js app
FROM base AS builder
WORKDIR /app

# Copy package files
COPY package.json bun.lockb* ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Build Next.js app
RUN bun run build

# Stage 2: Production image
FROM base AS runner
WORKDIR /app

# Install Mosquitto
RUN apt-get update && \
    apt-get install -y mosquitto mosquitto-clients supervisor && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Create mosquitto config directory
RUN mkdir -p /mosquitto/config /mosquitto/data /mosquitto/log

# Copy Mosquitto configuration
COPY mosquitto.conf /mosquitto/config/mosquitto.conf

# Set environment to production
ENV NODE_ENV=production

# Copy built Next.js app from builder
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Create supervisor config
RUN echo '[supervisord]' > /etc/supervisor/conf.d/supervisord.conf && \
    echo 'nodaemon=true' >> /etc/supervisor/conf.d/supervisord.conf && \
    echo '' >> /etc/supervisor/conf.d/supervisord.conf && \
    echo '[program:mosquitto]' >> /etc/supervisor/conf.d/supervisord.conf && \
    echo 'command=/usr/sbin/mosquitto -c /mosquitto/config/mosquitto.conf' >> /etc/supervisor/conf.d/supervisord.conf && \
    echo 'autostart=true' >> /etc/supervisor/conf.d/supervisord.conf && \
    echo 'autorestart=true' >> /etc/supervisor/conf.d/supervisord.conf && \
    echo 'stdout_logfile=/var/log/mosquitto.log' >> /etc/supervisor/conf.d/supervisord.conf && \
    echo 'stderr_logfile=/var/log/mosquitto_err.log' >> /etc/supervisor/conf.d/supervisord.conf && \
    echo '' >> /etc/supervisor/conf.d/supervisord.conf && \
    echo '[program:nextjs]' >> /etc/supervisor/conf.d/supervisord.conf && \
    echo 'command=bun run server.js' >> /etc/supervisor/conf.d/supervisord.conf && \
    echo 'directory=/app' >> /etc/supervisor/conf.d/supervisord.conf && \
    echo 'autostart=true' >> /etc/supervisor/conf.d/supervisord.conf && \
    echo 'autorestart=true' >> /etc/supervisor/conf.d/supervisord.conf && \
    echo 'stdout_logfile=/var/log/nextjs.log' >> /etc/supervisor/conf.d/supervisord.conf && \
    echo 'stderr_logfile=/var/log/nextjs_err.log' >> /etc/supervisor/conf.d/supervisord.conf

# Expose ports
EXPOSE 3000 1883 9001

# Start supervisor
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
