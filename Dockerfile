# --- Installing stage
FROM node:10.16 AS installer

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
RUN yarn install --production

# --- Run stage
FROM node:10.16-alpine

## Clean new directory
WORKDIR /app

COPY --from=installer /app/node_modules node_modules
COPY --from=installer /app/package.json package.json
COPY ./commands commands
COPY ./features features
COPY ./reactions reactions
COPY ./bot.js bot.js
COPY ./newrelic.js newrelic.js

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

ENTRYPOINT [ "node", "bot.js" ]
