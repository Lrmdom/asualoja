FROM node:20-alpine
#ENV NODE_ENV development
WORKDIR /app
COPY package.json .
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build
EXPOSE 3000
CMD [ "npm", "run", "start" ]

#  docker build  -f dev.Dockerfile -t execlog/execlogdemo . && docker run -p 80:3000 -it execlog/execlogdemo

#  docker build  -f dev.Dockerfile -t execlog/execlogdemo . && docker push execlog/execlogdemo