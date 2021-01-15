FROM node:14-alpine AS builder

ARG REACT_APP_IMAGE="No image sent in as argument"

ENV NODE_ENV=production
ENV REACT_APP_IMAGE=$REACT_APP_IMAGE

RUN mkdir /app && chown -R node:node /app

USER node

WORKDIR /app

COPY --chown=node:node package.json package-lock*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:stable-alpine

COPY --from=builder /app/build/ /usr/share/nginx/html
COPY --from=builder /app/nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80