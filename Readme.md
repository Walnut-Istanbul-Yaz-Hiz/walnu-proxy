# Walnut Proxy

Run the following command to start the proxy.

```
 yarn walnut-proxy start

 # npm run walnut-proxy start
```


Run the following command to see the list of your proxies.

```
 yarn walnut-proxy proxies:list

 # or 
 # npm run walnut-proxy proxies:list
```

Run the following command to create a new proxy

```
 yarn walnut-proxy generate "proxy name" 8080 "example.org"

 # or 
 # npm run walnut-proxy generate "proxy name" 8080 "example.org"
```

and then navigate to http://localhost:8080 in your browser and that's it.

Run the following command to remove a proxy

```
 yarn walnut-proxy remove 1

 # or 
 # npm run walnut-proxy remove 1
```


## Config for Database Connection 

By default the configuration is as follows.

```js
//path: /src/config/database.js

/**
 * Database connection settings are made here.
 */
module.exports = ({ env }) => ({
  client: "sqlite",
  connection: {
    filename: env("DATABASE_FILENAME", ".tmp/walnut_proxy.db"),
  },
});
```

## Database Connection with MySQL

```js
//path: /src/config/database.js

/**
 * Database connection settings are made here.
 */
module.exports = ({ env }) => ({
  client: "mysql",
  connection: {
    host: env("DATABASE_HOST", "127.0.0.1"),
    port: env.int("DATABASE_PORT", 3306),
    database: env("DATABASE_NAME"),
    user: env("DATABASE_USERNAME"),
    password: env("DATABASE_PASSWORD"),
    ssl: env.bool("DATABASE_SSL", false),
  },
});
```
You can replace the sample database information with your own database information in the `.env` file.

> Note: Make a copy in the .env.example file and rename it to .env

```php
DATABASE_NAME=walnut_proxy
DATABASE_USERNAME=# your database username
DATABASE_PASSWORD=# your database password
```

