FROM node:17-alpine

WORKDIR /app

COPY package.json .
COPY . .

RUN npm install
RUN npm install -g nodemon

CMD ["nodemon", "server.js"]
EXPOSE 4000

