# FitCheck

## Setting up the database

You can create a PostgreSQL container with the following example line:

```console
docker run --name postgresql-container -e POSTGRES_PASSWORD=root -p 5469:5432 -d postgres
```

This will create a postgres db with:

- root user: postgres
- root passwd: root
- port: 5469
