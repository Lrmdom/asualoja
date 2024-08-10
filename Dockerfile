FROM node:18-alpine
# Installing libvips-dev for sharp Compatibility
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ENV PORT=8080
WORKDIR /opt/
COPY package.json yarn.lock ./
RUN yarn install --ignore-engines
WORKDIR /opt/app
COPY . .
ENV PATH /opt/node_modules/.bin:$PATH
RUN chown -R node:node /opt/app
USER node
RUN ["yarn", "build"]
EXPOSE 8080
CMD ["yarn", "start"]
##teste  locally with "docker build -t  foo . && docker run  --publish=80:8080 -it foo test"
