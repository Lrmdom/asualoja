FROM node:20-alpine
ENV NODE_ENV=development
ENV HOST=0.0.0.0
WORKDIR /app
COPY package.json .
RUN npm install --legacy-peer-deps
COPY . .
EXPOSE 5173
CMD [ "npm", "run", "dev" ]

#docker build -t execlog/execlogdemo_dev -f dev.Dockerfile .  && docker run -p 80:5173 -it execlog/execlogdemo_dev