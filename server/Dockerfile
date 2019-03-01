FROM node:alpine

EXPOSE 80

ENTRYPOINT ["/sbin/tini", "--"]

ENV PORT=80

RUN apk add --no-cache tini
RUN chmod +x /sbin/tini

RUN npm install -g webpack webpack-cli

RUN mkdir -p /var/www/app

WORKDIR /var/www/app

COPY package.json .

RUN npm install

COPY webpack.config.js .
COPY tsconfig.json .
COPY src src

ENV NODE_ENV=production

RUN npm run build
RUN npm prune --production
RUN npm remove -g webpack webpack-cli
RUN rm -rf src

CMD ["node", "./dist"]



