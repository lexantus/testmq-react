FROM node:18-alpine3.20

WORKDIR screenshots

COPY package*.json ./

COPY dist/ .

RUN npm -v
RUN npm install --verbose

COPY . .

EXPOSE 7777

CMD [ "npm", "start" ]