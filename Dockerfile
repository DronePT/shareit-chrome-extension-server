# if you're doing anything beyond your local machine, please pin this to a specific version at https://hub.docker.com/_/node/
FROM node:alpine AS base

RUN mkdir -p /opt/app

# you'll likely want the latest npm, reguardless of node version, for speed and fixes
RUN npm install -g --force --no-progress yarn

# install dependencies first, in a different location for easier app bind mounting for local development
WORKDIR /opt

# ---------------------------- #
# ---- DEPENDENCIES STAGE ---- #
# ---------------------------- #
FROM base AS dependencies

COPY package.json yarn.lock* ./

RUN \
  yarn install --production && \
  cp -R node_modules production_node_modules && \
  yarn

# ---------------------------- #
# ----- BUILD API STAGE ------ #
# ---------------------------- #
FROM dependencies AS build
COPY . .

RUN yarn build

WORKDIR /opt/app

COPY --from=dependencies /opt/production_node_modules ./node_modules
COPY --from=dependencies /opt/package.json .
RUN \
  mv /opt/dist /opt/app/dist

# ---------------------------- #
# ------ RELEASE STAGE ------- #
# ---------------------------- #
FROM base AS release

WORKDIR /opt/app

COPY --from=build /opt/app .

RUN ls -lha

# check every 30s to ensure this service returns HTTP 200
# HEALTHCHECK --interval=30s CMD node healthcheck.js

# copy in our source code last, as it changes the most
WORKDIR /opt/app
COPY . /opt/app

# set our node environment, either development or production
# defaults to production, compose overrides this to development on build and run
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# default to port 80 for node, and 9229 and 9230 (tests) for debug
ARG PORT=80
ENV PORT $PORT
EXPOSE $PORT 9229 9230

# if you want to use npm start instead, then use `docker run --init in production`
# so that signals are passed properly. Note the code in index.js is needed to catch Docker signals
# using node here is still more graceful stopping then npm with --init afaik
# I still can't come up with a good production way to run with npm and graceful shutdown
CMD [ "yarn", "start" ]
