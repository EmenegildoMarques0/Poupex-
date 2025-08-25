# Etapa 1: build das dependências PHP
FROM composer:2 AS build

WORKDIR /var/www

COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader --no-interaction --prefer-dist --no-scripts

COPY . .

RUN php artisan config:cache \
 && php artisan route:cache \
 && php artisan view:cache \
 && php artisan l5-swagger:generate

# Etapa 2: imagem final com PHP-FPM + Nginx
FROM php:8.2-fpm-alpine

RUN apk add --no-cache nginx supervisor git unzip libzip-dev libpng-dev oniguruma-dev curl \
 && docker-php-ext-install pdo pdo_mysql mbstring zip bcmath

WORKDIR /var/www

COPY --from=build /var/www /var/www

RUN chown -R www-data:www-data storage bootstrap/cache

COPY ./deploy/nginx.conf /etc/nginx/nginx.conf
COPY ./deploy/supervisord.conf /etc/supervisord.conf

EXPOSE 8080

CMD sh -c "php artisan migrate --force && /usr/bin/supervisord -c /etc/supervisord.conf"
