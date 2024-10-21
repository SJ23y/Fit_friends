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
    - file.env:  
      STATIC_DIRECTORY_PATH=H:\static - путь на сервере, где будут храниться статические файлы  
      UPLOADS_DIRECTORY_PATH=\uploads - маршрут, по которому будут отдаваться сохранённые ранее пользовательские файлы  

  Перед запуском сервера необходимо развернуть БД в докер-контейнере с помощью команды:
  ```bash
  docker compose --file apps/api/docker-compose.yml --env-file apps/api/env/api.env up -d
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
  Запуск бэкенда осуществляется из дерикториии 'frontend'.

  Запуск сервера бекенда осуществляется командой:
  ```bash
  npm start
  ```
