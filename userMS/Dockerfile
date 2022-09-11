FROM node:latest
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN npm install
COPY . /usr/src/app
EXPOSE  4000
CMD ["node", "app.js"]

# sudo docker container run -d -p 4001:3001 mustahid/status