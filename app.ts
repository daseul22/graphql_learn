require("dotenv").config();
import { PrismaClient } from "@prisma/client";
import { ApolloServer, gql } from "apollo-server";
import schemaDirectives from "./directives";
import resolvers from "./resolvers";
const { PORT } = process.env;

const typeDefs = gql`
  #다른건 모르겠고 FIELD_DEF는 타입 정의에 직접 directive 쓸때 사용하는 타입 인듯
  directive @auth(req: Role = ADMIN) on FIELD_DEFINITION | OBJECT
  enum Role {
    ADMIN
    USER
  }
  type Query {
    users(test: String): User
    str: String @auth(req: ADMIN)
  }
  type User @auth(req: USER) {
    id: ID
    email: String
    password: String
    posts: [Post]
  }
  type Post {
    id: ID
    title: String
    content: String
  }
  type Mutation {
    userSignIn(account: AccountInput): User
  }
  input AccountInput {
    email: String
    password: String
  }
`;

const prisma = new PrismaClient();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: prisma,
  schemaDirectives,
});

async function main() {
  server.listen(PORT).then(({ url }) => {
    console.log(`server ready at ${url}`);
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
