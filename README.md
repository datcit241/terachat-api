# terachat-api
## Project description
Terachat is a real-time chat web based applciation consists of 2 projects:
- [Api server](https://github.com/datcit241/terachat-api)
- [Client application](https://github.com/datcit241/terachat-client-app/)

## Table of contents
- [Set up](#set-up)
- [Start the server](#start-the-server)

## Set up
### Install MySQL

### Create database
```sql
create table terachat;
```

### Config the project to use the database created
File **`/config/config.json`**
```js
{
  "development": {
    "username": "<db-user>",
    "password": "<db-user-password>",
    "database": "terachat",
    "host": "127.0.0.1",
    "dialect": "mariadb"
  },
  ...
 }
```
### Install project's dependencies
```shell
npm install
```

## Start the server
#### Start the server
```shell
npm start
```
