# terachat-api

## Table of contents
- [Set up](#set-up)
- [Start the server](#start-the-server)

## Set up
### Install MySQL

### Create database
```sql
create table terachat;
```

### Config the project to use the database creatd
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
