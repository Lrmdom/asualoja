FROM node:18.20.1
#ENV NODE_ENV development
WORKDIR /app
COPY package.json .
RUN npm install --legacy-peer-deps
COPY . .

RUN npm run build
EXPOSE 3000
CMD [ "npm", "run", "start" ]
#docker build -t foo .  && docker run -p 80:3000 -it foo

# works on gcp cloud run
#
