# Etapa 1: build das dependências PHP
FROM composer:2 AS build

WORKDIR /var/www

# Copia apenas os arquivos necessários para instalar dependências
COPY composer.json composer.lock ./

# Instala dependências sem rodar scripts do Laravel
RUN composer install --no-dev --optimize-autoloader --no-interaction --prefer-dist --no-scripts

# Copia todo o código do projeto
COPY . .

# Agora que temos tudo, rodamos manualmente os caches do Laravel
RUN php artisan config:cache \
 && php artisan route:cache \
 && php artisan view:cache \
 && php artisan l5-swagger:generate


# Etapa 2: imagem final com PHP-FPM + Nginx
FROM php:8.2-fpm-alpine

# Instalar dependências do sistema e extensões PHP
RUN apk add --no-cache nginx supervisor git unzip libzip-dev libpng-dev oniguruma-dev curl \
 && docker-php-ext-install pdo pdo_mysql mbstring zip bcmath

# Definir diretório de trabalho
WORKDIR /var/www

# Copiar aplicação e vendor da etapa de build
COPY --from=build /var/www /var/www

# Ajustar permissões de storage e bootstrap/cache
RUN chown -R www-data:www-data storage bootstrap/cache

# Copiar configs do Nginx e Supervisor
COPY ./deploy/nginx.conf /etc/nginx/nginx.conf
COPY ./deploy/supervisord.conf /etc/supervisord.conf

# Expor a porta que o Render usa (definida via $PORT)
EXPOSE 8080

# Iniciar o Supervisor, que gerencia Nginx + PHP-FPM
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]
