# ---------------------------
# Etapa 1: PHP + Composer
# ---------------------------
FROM php:8.2-fpm AS php-base

# Instalar dependências do sistema e extensões PHP
RUN apt-get update && apt-get install -y \
    git unzip zip libzip-dev libpq-dev libonig-dev curl \
    && docker-php-ext-install pdo pdo_mysql mbstring zip bcmath \
    && apt-get clean

# Instalar Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Definir diretório de trabalho
WORKDIR /var/www

# Copiar arquivos do Laravel
COPY . .

# Instalar dependências PHP (sem dev, otimizado)
RUN composer install --no-dev --optimize-autoloader

# Ajustar permissões de storage
RUN chown -R www-data:www-data storage bootstrap/cache

# ---------------------------
# Etapa 2: Nginx para servir Laravel
# ---------------------------
FROM nginx:stable-alpine

# Copiar código Laravel da primeira etapa
COPY --from=php-base /var/www /var/www

# Copiar configuração do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expor a porta que o Render usa
EXPOSE 8080

# Rodar migrations, gerar swagger e iniciar Nginx
CMD sh -c "php /var/www/artisan migrate --force && php /var/www/artisan l5-swagger:generate && nginx -g 'daemon off;'"
