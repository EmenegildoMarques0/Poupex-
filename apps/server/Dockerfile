# Etapa 1: build das dependências PHP
FROM composer:2 AS build

WORKDIR /var/www

# Copia apenas arquivos do Composer primeiro para aproveitar cache
COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader --no-interaction --prefer-dist

# Copia todo o projeto
COPY . .

# Gera caches de config, routes, views, etc.
RUN php artisan config:cache \
 && php artisan route:cache \
 && php artisan view:cache \
 && php artisan l5-swagger:generate

# Etapa 2: imagem final com PHP-FPM + Nginx
FROM php:8.2-fpm-alpine

# Instalar dependências do sistema
RUN apk add --no-cache nginx supervisor git unzip libzip-dev libpng-dev oniguruma-dev curl \
 && docker-php-ext-install pdo pdo_mysql mbstring zip bcmath

# Definir diretório de trabalho
WORKDIR /var/www

# Copiar aplicação e vendor já prontos
COPY --from=build /var/www /var/www

# Permissões de pasta de escrita
RUN chown -R www-data:www-data storage bootstrap/cache

# Copiar configs do Nginx e Supervisor
COPY ./deploy/nginx.conf /etc/nginx/nginx.conf
COPY ./deploy/supervisord.conf /etc/supervisord.conf

# Expor porta que o Render define automaticamente
EXPOSE 8080

# Iniciar supervisor (gerencia Nginx e PHP-FPM)
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]
