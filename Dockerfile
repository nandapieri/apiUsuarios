FROM node:14-alpine

WORKDIR /node-app

COPY package.json .

RUN npm install --quiet

RUN npm install nodemon -g --quiet

COPY . . 

EXPOSE 9000

ENTRYPOINT [ "npm" ]
CMD [ "start" ]