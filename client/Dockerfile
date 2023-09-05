
FROM node:latest

WORKDIR /app

COPY package.json package-lock.json /app/
COPY public /app/public
COPY src /app/src

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
