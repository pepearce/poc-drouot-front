FROM node:12.2.0-alpine as build-deps
# Set working directory
WORKDIR /app
# Add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Install and cache app dependencies
COPY package.json /app/package.json
RUN npm install
RUN npm i -g react-scripts@3.0.1
# Add source files
COPY ./ ./
# Build app
RUN PUBLIC_URL=%PUBLIC_PATH_URL% npm run build
# # STAGE 2 - The production environment # #
FROM nginx:1.19-alpine
COPY --from=build-deps /app/build /usr/share/nginx/html
WORKDIR /usr/share/nginx/html
COPY ./Docker/app/docker-entrypoint.sh ./docker-entrypoint.sh
COPY ./Docker/app/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["sh", "-c", "./docker-entrypoint.sh && nginx -g \"daemon off;\""]
ENV PUBLIC_PATH_URL "http://paul-poc.zonesecure.org"