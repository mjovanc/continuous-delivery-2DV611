FROM node:14-alpine

ENV NODE_ENV=production

RUN mkdir /app && chown -R node:node /app

USER node

WORKDIR /app

COPY --chown=node:node package.json package-lock*.json ./

RUN npm install

COPY . .

EXPOSE 5001

CMD [ "npm", "run", "start" ]