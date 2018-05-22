FROM node:boron
RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN npm install -g nodemon
RUN npm install -g twilio
RUN npm install
COPY . /app
EXPOSE 8080
CMD ["npm", "start"]
