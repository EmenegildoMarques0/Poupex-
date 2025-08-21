---

# Poupex API

API desenvolvida em **Laravel 12** para o projeto **Poupex**, gerenciando:

* Autenticação de usuários
* Gastos pessoais
* Relatórios financeiros
* Categorias de despesas
* Educação financeira

---

## 🚀 Pré-requisitos

Certifique-se de ter os seguintes componentes instalados:

* **Composer**: versão `2` ou superior
* **PHP**: versão `8.2` ou superior (compatível com Laravel 12)
* **MySQL**: versão `8.0` ou superior

---

## ⚙️ Configuração do Ambiente

### 1. Instalar dependências

Na pasta do projeto, execute:

```bash
composer install
```

### 2. Configurar arquivo `.env`

Copie o arquivo de exemplo:

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:

```dotenv
APP_NAME=Poupex
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=poupex
DB_USERNAME=seu_usuario
DB_PASSWORD=sua_senha
```

Gere a chave da aplicação:

```bash
php artisan key:generate
```

### 3. Configurar banco de dados

Crie o banco no MySQL:

```sql
CREATE DATABASE poupex;
```

Execute as migrações:

```bash
php artisan migrate
```

---

## ▶️ Rodar a API

Inicie o servidor:

```bash
php artisan serve
```

Acesse no navegador ou no client de API:

```
http://localhost:8000
```

---

## 🛠 Resolução de Problemas

* **Erro de dependências**

  ```bash
  composer update
  # ou
  composer clear-cache
  ```

* **Erro de banco de dados**

  * Verifique as credenciais no `.env`.
  * Certifique-se de que o serviço MySQL está ativo.

---

