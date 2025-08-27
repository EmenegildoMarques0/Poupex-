# Etapa 1: build das dependências PHP
FROM composer:2 AS build

WORKDIR /var/www

COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader --no-interaction --prefer-dist --no-scripts

COPY . .

# Gera caches do Laravel (não executa migrate aqui)
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

# Garante que storage/ e database/ sejam graváveis
RUN chown -R www-data:www-data storage bootstrap/cache \
 && chmod -R 775 storage bootstrap/cache \
 && mkdir -p storage \
 && touch storage/database.sqlite \
 && chown www-data:www-data storage/database.sqlite \
 && chmod 664 storage/database.sqlite

COPY ./deploy/nginx.conf /etc/nginx/nginx.conf
COPY ./deploy/supervisord.conf /etc/supervisord.conf

EXPOSE 8080

# Executa migrations e inicia Supervisor
CMD sh -c "php artisan migrate --force && /usr/bin/supervisord -c /etc/supervisord.conf"
