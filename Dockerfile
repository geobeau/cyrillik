FROM node:7.4
RUN mkdir -p /src
RUN npm install nodemon -g

WORKDIR /src/
ADD app/package.json /src/package.json
ADD app /src/app
 
RUN npm install

EXPOSE 80
CMD npm start
