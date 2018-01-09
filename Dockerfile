FROM node:6.9.5

RUN mkdir -p /app
WORKDIR /app
COPY . /app

RUN npm install --global rimraf \
    && npm run clean \
    && npm install --global webpack webpack-dev-server typescript@2.1.5 \
    && npm install \
    && npm run build:prod:aot

EXPOSE 3000

ENTRYPOINT ["npm", "run", "start"]
