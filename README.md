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
npm run dev # 실행해야 autocomplete가 적용됩니다!
```

- DB 컬럼 추가

```prisma
//schema.prisma
model User {
  id       Int    @id @default(autoincrement())
  role     String
  name     String
  email    String
  password String
  add      String? // 추가 컬럼 @default값이 없을땐 nullable로 만들어야합니다
  posts    Post[]
}
```

```
npx prisma migrate dev --name add --preview-feature
```
