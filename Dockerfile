FROM node:latest

WORKDIR /app
COPY . /app

RUN npm install

ENV NODE_ENV="production"
ENV PORT=1234

EXPOSE ${PORT}

ENTRYPOINT [ "npm", "run", "prod" ]
