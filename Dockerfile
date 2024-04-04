FROM node:18-alpine

WORKDIR /root

# Install dependencies based on the preferred package manager
COPY ./ ./

RUN npm install
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]