#FROM node:lts-bullseye-slim
FROM node:18.7.0-alpine3.16

VOLUME /schemademo/schedule-data-service/database

WORKDIR /schemademo

RUN \
   npm install -g npm@8.18.0 \
   && apk add --no-cache make g++ py3-pip python3 --virtual .gyp

COPY admin admin/
COPY schedule-data-service schedule-data-service/
COPY www www/
COPY package*.json ./

RUN \
   cd schedule-data-service && npm install && npm audit fix && cd .. \
   && cd admin && npm install && npm audit fix && cd .. \
   && npm install && npm audit fix

RUN \
   apk del .gyp

CMD npm run dev
