## Описание

FitFriends — это онлайн площадка для поиска тренировок. Сайт предлагает широкий выбор фитнес-тренировок для людей любого уровня подготовки, разных направлений. На сайте доступен личный кабинет пользователя, возможность индивидуального подбора тренировок, возможность покупки тренировок и отслеживания прогресса.

## Запуск

- **Запуск бэкенда**:  
  Запуск бэкенда осуществляется из дерикториии 'backend'.
  Для работы приложения используются переменные окружения. Переменные окружения располагаются в папке `backend/apps/api/env` в трёх файлах:
    - account.env:  
      JWT_ACCESS_TOKEN_SECRET=riddle - секрет для access токена  
      JWT_ACCESS_TOKEN_EXPIRES_IN=15m - срок действия access токена  
      JWT_REFRESH_TOKEN_SECRET=verysecret - секрет для refresh токена  
      JWT_REFRESH_TOKEN_EXPIRES_IN=7d - срок действия refresh токена  
    - api.env:  
      POSTGRES_USER=user - имя пользователя для БД в postgresSql  
      POSTGRES_PASSWORD=test - пароль пользователя для БД в postgresSql  
      POSTGRES_DB=db-name - имя для БД в postgresSql  
      PGADMIN_DEFAULT_EMAIL=example@mail.com - имя пользователя для pgAdmin  
      PGADMIN_DEFAULT_PASSWORD=test - пароль пользователя для pgAdmin
      DATABASE_URL=postgres://user:password@fit_friends.postgres:5432/fitfriends - путь к базе данных для Prisma
    - file.env:  
      STATIC_DIRECTORY_PATH=H:\static - абсолютный путь на сервере, где будут храниться статические файлы  
      UPLOADS_DIRECTORY_PATH=\uploads - маршрут, по которому будут отдаваться сохранённые ранее пользовательские файлы
    - notification.env  
      RABBITMQ_DEFAULT_USER=admin - имя пользователя для rabbitMQ  
      RABBITMQ_DEFAULT_PASS=test - пароль пользователя для rabbitMQ  
      RABBIT_HOST=localhost - имя хоста для rabbitMQ  
      RABBIT_PASSWORD=test - пароль пользователя для rabbitMQ  
      RABBIT_PORT=5672 - порт для rabbitMQ
      RABBIT_USER=admin - пароль пользователя для rabbitMQ  
      RABBIT_QUEUE=readme.notify.income - имя queue для rabbitMQ  
      RABBIT_EXCHANGE=readme.notify - имя exchange для rabbitMQ  
      MAIL_SMTP_HOST=localhost - имя хоста для SMTP сервера  
      MAIL_SMTP_PORT=25 - номер порта для SMTP сервера
      MAIL_USER=readmeMail - имя пользователя для SMTP сервера  
      MAIL_PASSWORD=1111 - пароль пользователя для SMTP сервера  
      MAIL_FROM=noreply@readme.com - почтовый адрес отпраителя для инормационных писем  
      CLIENT_PORT=5173 - номер порта для SMTP клиента    

  Перед запуском сервера необходимо развернуть БД в докер-контейнере с помощью команды:
  ```bash
  docker compose --file apps/api/docker-compose.yml --env-file apps/api/env/api.env up -d
  ```

  Перед запуском сервера необходимо развернуть запустить брокер сообщений и почтовый сервер в докер-контейнере с помощью команды:
  ```bash
  docker compose --file apps/api/notify.compose.dev.yml --env-file apps/api/env/notification.env up -d
  ```

  Запуск сервера бекенда осуществляется командой:
  ```bash
  npx nx run api:serve
  ```

  Начальное заполнение БД данными осуществляется командами:
  ```bash
  npx nx run api:db:migrate --name "name of migartions"
  npx nx run api:db:generate  
  npx nx run api:db:fill --trainings 10 --users 10 --purchases 10 --reviews 10
  ```

  После запуска сервера спецификацию Api сервиса в формате OpenApi можно посмотреть по сслыке:
  '{server url}/spec'

- **Запуск фронтенда**:  
  Запуск фронтенда осуществляется из дерикториии 'frontend'.

  Запуск сервера фронтенда осуществляется командой:
  ```bash
  npm start
  ```
- **Запуск проекта в докер-контейнере**:

  Для запуска проекта в контейнере предварительно необходимо в корневую директорию проекта скопировать все файлы с переменными окружения из бэкенд части приложения, либо создать их заново.

  Из дерикториии 'frontend' запустить команды:
  ```bash
  npm run build
  docker build --file ./Docerfile --tag fitfriends-frontend:v.1.1 .
  ```

  Из дерикториии 'backend' запустить команды:
  ```bash
  npx nx run api:build
  docker build --file ./apps/api/Docerfile --tag fitfriends-backend:v.1.0 .
  ```
  Из корневой директории запустить команду:
  ```bash
  
  docker compose up -d
  ```
