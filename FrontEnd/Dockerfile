FROM node:alpine
WORKDIR '/app'
COPY ./app/package.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "start"] 