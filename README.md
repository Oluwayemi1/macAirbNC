# AirBNC

An app to rate experiences in holiday properties like Airbnb

# Get started with the below steps

Install all necessary dependencies using

```sh
npm install
```

Create an airbnc_test database by running

```sh
npm run setup-db
```

Create credentials for an .env file to access the database

```sh
PGDATABASE=airbnc_test
PGDATABASE=airbnc_dev
```

Seed the database by running the following script

```sh
npm run seed-test (for test env)
npm run seed-dev (for dev env)
```

Switch on the server by running the following script. This script runs nodemon

```sh
npm run dev
```

Run the app tests using the following

```sh
npm test
```

App hosted at

```sh
https://abnc-rater.onrender.com/

```

Frontend work in progress
