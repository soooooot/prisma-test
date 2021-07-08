# prisma-test

Repo for ad-hoc testing prisma.io ORM

Decimal type has rounding issue when persisting the object

```
yarn db:up
yarn
yarn prisma:generate
yarn migrate:deploy
yarn start
```

Clean up

```
yarn db:down
```
