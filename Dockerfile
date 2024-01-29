FROM --platform=linux/amd64 node:21

WORKDIR /app

COPY package.json .

RUN yarn install

COPY . .

RUN yarn run build

EXPOSE 5173

CMD [ "yarn", "run", "dev" ]