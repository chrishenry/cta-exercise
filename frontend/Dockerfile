FROM node:22.1.0-bullseye-slim

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

EXPOSE 80 5173

CMD [ "npm", "run", "dev", "--", "--host" ]
