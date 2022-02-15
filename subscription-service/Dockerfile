FROM node:12-alpine
WORKDIR /subs
COPY package.json ./
COPY tsconfig.json ./
COPY nodemon.json ./
COPY src ./src
RUN ls -a
RUN npm install --global nodemon
RUN npm install
EXPOSE 40001
CMD ["npm","run","dev"]