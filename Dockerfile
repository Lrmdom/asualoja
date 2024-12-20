FROM node:20-alpine
#ENV NODE_ENV development
WORKDIR /app
COPY package.json .
RUN npm install --legacy-peer-deps
COPY . .

RUN npm run build
EXPOSE 3000
CMD [ "npm", "run", "start" ]
#docker build -t execlog/execlogdemo -f prod.Dockerfile .  && docker run -p 80:3000 -it foo

# works on gcp cloud run
#docker buildx build --platform=linux/amd64 -t execlog/execlogdemo555 --push .