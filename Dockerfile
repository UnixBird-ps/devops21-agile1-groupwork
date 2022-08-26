#FROM node:lts-bullseye-slim
FROM node:18.7.0-alpine3.16
WORKDIR /schemademo
COPY admin admin/
COPY schedule-data-service schedule-data-service/
COPY www www/
COPY package*.json ./
RUN \
   apk add --no-cache make g++ py3-pip python3 --virtual .gyp \
   && npm install -g npm@8.18.0 \
   && cd schedule-data-service && npm install && cd .. \
   && cd admin && npm install && cd .. \
   && npm install \
   && apk del .gyp
CMD \
   npm run dev
