FROM node:16.15.1

USER node

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

COPY . .

RUN npm install

CMD ["yarn", "start:dev"]