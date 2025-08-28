# Etapa 1: build das dependências PHP
FROM php:8.2-fpm-alpine AS build

# Instalar dependências do sistema e extensões PHP necessárias
RUN apk add --no-cache \
    git \
    unzip \
    libzip-dev \
    libpng-dev \
    oniguruma-dev \
    yaml-dev \
    && docker-php-ext-install pdo pdo_mysql mbstring zip bcmath \
    && pecl install yaml && docker-php-ext-enable yaml

# Instalar Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

# Copiar arquivos do projeto
COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader --no-interaction --prefer-dist

COPY . .

# Copiar .env.example como .env
COPY .env.example .env

# Ajustar permissões na etapa de build
RUN chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

# Gerar caches do Laravel (executar comandos separadamente para depuração)
RUN php artisan config:cache -v
RUN php artisan route:cache -v
RUN php artisan view:cache -v
RUN php artisan l5-swagger:generate -v

# Etapa 2: imagem final com PHP-FPM + Nginx
FROM php:8.2-fpm-alpine

# Instalar dependências do sistema
RUN apk add --no-cache nginx supervisor git unzip libzip-dev libpng-dev oniguruma-dev curl \
    && docker-php-ext-install pdo pdo_mysql mbstring zip bcmath

WORKDIR /var/www

# Copiar arquivos da etapa de build
COPY --from=build /var/www /var/www

# Garante que storage/ e database/ sejam graváveis
RUN chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache \
    && mkdir -p storage \
    && touch storage/database.sqlite \
    && chown www-data:www-data storage/database.sqlite \
    && chmod 664 storage/database.sqlite

# Copiar configurações
COPY ./deploy/nginx.conf /etc/nginx/nginx.conf
COPY ./deploy/supervisord.conf /etc/supervisord.conf

EXPOSE 8080

# Usar formato JSON para CMD
CMD ["/bin/sh", "-c", "php artisan migrate --force && /usr/bin/supervisord -c /etc/supervisord.conf"]