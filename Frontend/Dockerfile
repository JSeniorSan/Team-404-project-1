FROM node:20.8.1
RUN mkdir /frontend
WORKDIR /frontend
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
CMD [ "npm", "run", "build" ]

# не работает пока