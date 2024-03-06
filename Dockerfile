FROM node:20-alpine3.18 as Builder
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build
FROM nginx:alpine-slim
WORKDIR /usr/share/nginx/html
RUN rm -rf ./* 
RUN rm /etc/nginx/conf.d/default.conf 
COPY nginx.conf /etc/nginx/conf.d
COPY --from=Builder /app/build .
ENTRYPOINT [ "nginx","-g","daemon off;" ]