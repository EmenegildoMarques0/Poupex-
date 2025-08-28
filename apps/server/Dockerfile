# Etapa 1: build das dependências PHP
FROM composer:2 AS build

WORKDIR /var/www

COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader --no-interaction --prefer-dist --no-scripts; \
    if [ $? -ne 0 ]; then echo "Erro: Falha ao instalar dependências do Composer"; exit 1; fi

COPY . .

# Gera caches do Laravel (não executa migrate aqui)
RUN php artisan config:cache; \
    if [ $? -ne 0 ]; then echo "Erro: Falha ao gerar cache de configuração do Laravel"; exit 1; fi && \
    php artisan route:cache; \
    if [ $? -ne 0 ]; then echo "Erro: Falha ao gerar cache de rotas do Laravel"; exit 1; fi && \
    php artisan view:cache; \
    if [ $? -ne 0 ]; then echo "Erro: Falha ao gerar cache de views do Laravel"; exit 1; fi && \
    php artisan l5-swagger:generate; \
    if [ $? -ne 0 ]; then echo "Erro: Falha ao gerar documentação do Swagger"; exit 1; fi

# Etapa 2: imagem final com PHP-FPM + Nginx
FROM php:8.2-fpm-alpine

RUN apk add --no-cache nginx supervisor git unzip libzip-dev libpng-dev oniguruma-dev curl; \
    if [ $? -ne 0 ]; then echo "Erro: Falha ao instalar pacotes via apk"; exit 1; fi && \
    docker-php-ext-install pdo pdo_mysql mbstring zip bcmath; \
    if [ $? -ne 0 ]; then echo "Erro: Falha ao instalar extensões do PHP"; exit 1; fi

WORKDIR /var/www

COPY --from=build /var/www /var/www

# Garante que storage/ e database/ sejam graváveis
RUN chown -R www-data:www-data storage bootstrap/cache; \
    if [ $? -ne 0 ]; then echo "Erro: Falha ao alterar permissões de storage/bootstrap"; exit 1; fi && \
    chmod -R 775 storage bootstrap/cache; \
    if [ $? -ne 0 ]; then echo "Erro: Falha ao definir permissões de storage/bootstrap"; exit 1; fi && \
    mkdir -p storage; \
    if [ $? -ne 0 ]; then echo "Erro: Falha ao criar diretório storage"; exit 1; fi && \
    touch storage/database.sqlite; \
    if [ $? -ne 0 ]; then echo "Erro: Falha ao criar arquivo database.sqlite"; exit 1; fi && \
    chown www-data:www-data storage/database.sqlite; \
    if [ $? -ne 0 ]; then echo "Erro: Falha ao alterar permissões do database.sqlite"; exit 1; fi && \
    chmod 664 storage/database.sqlite; \
    if [ $? -ne 0 ]; then echo "Erro: Falha ao definir permissões do database.sqlite"; exit 1; fi

COPY ./deploy/nginx.conf /etc/nginx/nginx.conf
COPY ./deploy/supervisord.conf /etc/supervisord.conf

EXPOSE 8080

# Executa migrations e inicia Supervisor
CMD sh -c "php artisan migrate --force; \
    if [ $? -ne 0 ]; then echo 'Erro: Falha ao executar migrations do Laravel'; exit 1; fi && \
    /usr/bin/supervisord -c /etc/supervisord.conf; \
    if [ $? -ne 0 ]; then echo 'Erro: Falha ao iniciar o Supervisor'; exit 1; fi"