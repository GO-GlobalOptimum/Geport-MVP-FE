FROM node:18-alpine

RUN mkdir -p /usr/app
WORKDIR /usr/app

COPY package.json ./
# Install dependencies based on the preferred package manager
COPY . .

RUN npm install
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]