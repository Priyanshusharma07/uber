# Use Node.js runtime for building
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files and install all dependencies (including dev)
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

# Build the TypeScript project using npx
RUN npx nest build

# Use a smaller production image
FROM node:18-alpine

WORKDIR /app

# Copy only necessary files from builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY package.json ./

EXPOSE 3000

ENV NODE_ENV=production

CMD ["node", "dist/main.js"]
