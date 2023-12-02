FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# Bundle app source code into the container
COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
