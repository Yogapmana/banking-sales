# --- TAHAP 1: BUILD ---
    FROM node:20-alpine AS builder
    WORKDIR /usr/src/app
    
    COPY package*.json ./
    RUN npm install
    
    COPY . .
    
    # Jalankan build Next.js
    RUN npm run build
    
    # --- TAHAP 2: PRODUKSI ---
    FROM node:20-alpine
    WORKDIR /usr/src/app
    
    COPY package*.json ./
    RUN npm install --only=production
    
    # Copy folder .next (hasil build)
    COPY --from=builder /usr/src/app/.next ./.next
    # Copy folder public
    COPY --from=builder /usr/src/app/public ./public
    # Copy file konfigurasi Next.js
    COPY --from=builder /usr/src/app/next.config.ts ./next.config.ts
    
    # Buka port 3000 (port default Next.js)
    EXPOSE 3000
    
    # Perintah untuk menyalakan server produksi
    CMD ["npm", "start"]