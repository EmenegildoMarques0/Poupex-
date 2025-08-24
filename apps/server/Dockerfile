FROM php:8.2-fpm AS php-base

# Instalar dependências
RUN apt-get update && apt-get install -y \
    git unzip zip libzip-dev libpq-dev libonig-dev curl \
    && docker-php-ext-install pdo pdo_mysql mbstring zip bcmath \
    && apt-get clean

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www
COPY . .

RUN composer install --no-dev --optimize-autoloader
RUN chown -R www-data:www-data storage bootstrap/cache

# Executar migrations e gerar swagger durante o build
RUN php artisan migrate --force && php artisan l5-swagger:generate

# Etapa final com Nginx
FROM nginx:stable-alpine
COPY --from=php-base /var/www /var/www
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
