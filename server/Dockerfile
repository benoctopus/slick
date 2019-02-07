FROM node:alpine

EXPOSE 80

ENV PORT=80

RUN apk add --no-cache tini
RUN chmod +x /sbin/tini

RUN npm install -g webpack webpack-cli

ENTRYPOINT ["/sbin/tini", "--"]


RUN mkdir -p /var/www/app

WORKDIR /var/www/app


COPY tsconfig.json .
COPY webpack.config.js .
COPY package.json .

RUN npm install

COPY src src

ENV NODE_ENV=production

RUN npm run build
RUN npm prune --production
RUN npm remove -g webpack webpack-cli
RUN rm -rf src

CMD ["node", "./dist"]



