FROM nginx:alpine

WORKDIR /var/www/html

COPY ./frontend/dist/frontend .

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3334