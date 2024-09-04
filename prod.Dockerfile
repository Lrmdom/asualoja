FROM node:20-alpine

ENV NODE_ENV production

WORKDIR /app

COPY package.json .
RUN npm install --legacy-peer-deps
COPY . .
#RUN npm run build
CMD [ "npm", "run", "start" ]
#docker build -t foo . && docker run -p 80:5173 -it foon