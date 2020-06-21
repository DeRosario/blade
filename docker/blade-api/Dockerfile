FROM node:10.16.0-alpine

EXPOSE 443

WORKDIR /blade-test

COPY . .

RUN npm install

CMD ["node","server.js"]
