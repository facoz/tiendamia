
FROM node:latest

WORKDIR /app

COPY package.json package-lock.json /app/
COPY index.js /app/

RUN npm install --save-dev jest mysql2


RUN npm install

COPY . /app/

EXPOSE 3001

CMD ["node", "index.js"]
