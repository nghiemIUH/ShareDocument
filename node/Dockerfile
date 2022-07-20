FROM node:16.16.0-alpine

RUN mkdir /nodeJS/
WORKDIR /nodeJS
COPY . /nodeJS/
RUN cd /nodeJS/
RUN npm i
RUN npm run build
