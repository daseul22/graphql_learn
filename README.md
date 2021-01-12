# graphql_learn

- primsa setting

```
//dotenv file
PORT=
DATABASE_URL=mysql://USER:PASSWORD@localhost:3306/DB_NAME?connection_limit=5
JWT_SCRET=
```

```
npx prisma migrate dev --name init --preview-feature
npx prisma generate
npm run dev
```
