FROM node:16.16.0-alpine

RUN mkdir /frontend/
WORKDIR /frontend
COPY . /frontend/
# RUN cd /frontend/
RUN npm install
RUN npm run build
RUN  rm -rf node_modules

