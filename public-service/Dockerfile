FROM node:12-alpine
WORKDIR /public
COPY package.json ./
COPY tsconfig.json ./
COPY nodemon.json ./
COPY src ./src
RUN ls -a
RUN npm install --global nodemon
RUN npm install
EXPOSE 40000
CMD ["npm","run","dev"]