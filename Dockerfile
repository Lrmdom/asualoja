# # base node image
FROM node:20-bullseye-slim
# # Build the dev image
RUN mkdir /app/
WORKDIR /app/
COPY . /app
RUN npm install --legacy-peer-deps

RUN npm run build
RUN npm run start



##teste  locally with "docker build -t  foo . && docker run  --publish=80:8080 -it foo test"
