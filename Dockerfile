FROM node:boron
RUN mkdir /app
WORKDIR /app
COPY package.json /app
ENV NODE_ENV=production                                                                                                       
RUN npm install
COPY . /app
EXPOSE 8080
CMD ["npm", "start"]
