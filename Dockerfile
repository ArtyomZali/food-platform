FROM node:16 as build-stage

WORKDIR /client
COPY ./client/package.json ./
RUN yarn && yarn --dev
COPY . .
RUN yarn build
WORKDIR /server
COPY ./server/* .
RUN yarn

CMD yarn sequelize-cli db:migrate --env production && NODE_ENV=production node index.js