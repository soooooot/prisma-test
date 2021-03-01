# prisma-test

Repo for ad-hoc testing prisma.io ORM

Decimal type has rounding issue when persisting the object

```
npm run db:up
npm install
npm run migrate:dev
npm run start
```

Clean up

```
npm run db:down
```
