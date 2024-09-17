FROM execlog/execlogdemo
#ENV NODE_ENV=development
WORKDIR /app
COPY package.json .
RUN npm install --legacy-peer-deps
COPY . .
EXPOSE 3000
#RUN npm run build
CMD [ "npm", "run", "start" ]


#  docker build  -f dev.Dockerfile -t execlog/execlogdemo_dev . && docker run -p 80:5173 -it execlog/execlogdemo_dev