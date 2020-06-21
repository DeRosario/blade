FROM node:10.16.0-alpine

EXPOSE 5099

WORKDIR /blade

COPY . .

RUN npm install

CMD ["npm", "run", "dev-docker"]
