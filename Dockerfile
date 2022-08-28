#FROM node:lts-bullseye-slim
FROM node:18.7.0-alpine3.16

VOLUME /schemademo

# RUN \
#    apk add --no-cache make g++ py3-pip python3 --virtual .gyp

WORKDIR /schemademo

# COPY admin admin/
# COPY schedule-data-service schedule-data-service/
# COPY www www/
# COPY package*.json ./

#    && npm install -g npm@8.18.0
# RUN \
#    cd schedule-data-service && npm install && npm audit fix && cd .. \
#    && cd admin && npm install && npm audit fix && cd .. \
#    && npm install && npm audit fix

# RUN \
#    apk del .gyp

CMD \
   pwd && ls -al . \
   && npm run dev
