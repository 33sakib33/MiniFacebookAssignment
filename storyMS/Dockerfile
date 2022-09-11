FROM node:latest
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN npm install
RUN npm install multer
COPY . /usr/src/app
EXPOSE  4002
CMD ["node", "app.js"]