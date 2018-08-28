
This is a straightforward boilerplate for building REST APIs with NodeJS,TypeScript,Express and MySql with Swagger documentacion.

Getting Started
---------------

# Install dependencies
- npm install


# Database
- create a database 
- config for database : 'src/configs/config.json'

# Start migrations

- config for db-migration: 'database.json'
- start migrations in terminal:node node_modules/db-migrate/bin/db-migrate up
- documentation for [db-migrate](https://db-migrate.readthedocs.io/en/latest/)

# Set PORT
 - set port in 'src/configs/config.json'

# Start development live-reload server
 - npm run dev

# Build application:
 
 - npm run build:dev

 # Start app from dist

 - node dist/index.js

 # Swagger 
  - set port in 'src/swagger.json'
  - http://localhost:{{PORT}}/api-docs
  - Documentacion for [swagger](https://github.com/scottie1984/swagger-ui-express) 

