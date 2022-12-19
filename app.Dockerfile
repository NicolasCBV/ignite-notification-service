FROM node:16.18.1

RUN mkdir -p /usr/app/
WORKDIR /usr/app

COPY package*.json /usr/app
COPY . /usr/app

run yarn install && yarn build

VOLUME ["/usr/app/node_modules"]

EXPOSE 3000
