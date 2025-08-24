# Imagem base com PHP e extensões comuns
FROM php:8.2-fpm

# Instalar dependências do sistema
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

# Instalar dependências PHP
RUN composer install --no-dev --optimize-autoloader

# Ajustar permissões de storage
RUN chown -R www-data:www-data storage bootstrap/cache

# Porta exposta
EXPOSE 9000

# Comando default (pode usar php-fpm ou artisan serve para testes)
CMD ["php-fpm"]