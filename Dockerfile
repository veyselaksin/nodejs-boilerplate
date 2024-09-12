#Build stage
FROM node:20.16 AS development

WORKDIR /app

COPY . .

RUN npm install
RUN npm rebuild bcrypt --build-from-source

CMD npm run start:dev

#Production stage
FROM node:20.16 AS production

WORKDIR /app

COPY package*.json .

RUN npm ci --only=production

COPY --from=build /app/dist ./dist

CMD ["node", "dist/index.js"]
