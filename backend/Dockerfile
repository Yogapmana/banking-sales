# --- TAHAP 1: BUILD ---
    # Kita pakai image Node 18, sebut 'builder'
    FROM node:20-alpine AS builder
    
    # Buat folder kerja di dalam container
    WORKDIR /usr/src/app
    
    # Copy package.json dan install SEMUA dependensi (termasuk dev)
    COPY package*.json ./
    RUN npm install
    
    # Copy sisa source code
    COPY . .
    
    # Generate Prisma Client (penting untuk TS)
    RUN DATABASE_URL="postgresql://dummy:dummy@dummy:5432/dummy" npx prisma generate
    
    # Jalankan 'tsc' untuk meng-compile .ts menjadi .js
    RUN npm run build
    
    # --- TAHAP 2: PRODUKSI ---
    # Mulai lagi dari image Node 18 yang bersih
    FROM node:20-alpine
    
    WORKDIR /usr/src/app
    
    # Copy package.json lagi, tapi...
    COPY package*.json ./
    # ...install HANYA dependensi produksi (lebih hemat)
    RUN npm install --only=production
    
    # Copy folder 'dist' (hasil build JS) dari tahap 'builder'
    COPY --from=builder /usr/src/app/dist ./dist
    
    # Copy folder 'prisma' (untuk skema)
    COPY --from=builder /usr/src/app/prisma ./prisma
    
    # Buka port 8000 (sesuai port di index.ts)
    EXPOSE 8000
    
    # Perintah untuk menyalakan server
    CMD ["node", "dist/src/index.js"]