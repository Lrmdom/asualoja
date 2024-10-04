FROM node:20-alpine
ENV NODE_ENV development
WORKDIR /app
COPY package.json .
RUN npm install --legacy-peer-deps
COPY . .
EXPOSE 5173
CMD [ "npm", "run", "dev" ]

#docker build -t foo . && docker run -p 80:5173 -it foo