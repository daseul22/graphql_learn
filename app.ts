require("dotenv").config()
import { PrismaClient } from "@prisma/client"
import { ApolloServer, gql } from "apollo-server"
import schemaDirectives from "./directives"
const { PORT } = process.env

const typeDefs = gql`
	#다른건 모르겠고 FIELD_DEF는 타입 정의에 직접 directive 쓸때 사용하는 타입 인듯
	directive @auth(req: Role = ADMIN) on FIELD_DEFINITION | OBJECT
	enum Role {
		ADMIN
		USER
		EVERY
	}
	type Query {
		users(test: String): User
		str: String @auth(req: ADMIN)
	}
	type User { #@auth(req: USER)
		id: ID
		role: Role
		name: String #@auth
		email: String #@auth
		password: String #@auth
		posts: [Post]
	}
	type Post {
		id: ID
		title: String
		content: String
	}
	type Mutation {
		userSignIn(account: SignInInput): User
		userSignUp(account: SignUpInput): User
		userSignOut: String @auth(req: EVERY)
	}
	input SignInInput {
		email: String
		password: String
	}
	input SignUpInput {
		name: String
		email: String
		password: String
	}
`

const prisma = new PrismaClient()
const server = new ApolloServer({
	typeDefs,
	cors: {
		credentials: true,
		origin: "http://localhost:3000"
	},
	context: ({ req, res }) => {
		// res.setHeader("Authorization", "ABC")// 셋 헤더
		// console.log(req.headers) //헤더
		//res.cookie("AAAs", "SDFSDF") // 셋 쿠키
		//console.log(req.headers.cookie) //쿠키
		return { req, res, prisma }
	},
	schemaDirectives
})

async function main() {
	server.listen(PORT).then(({ url }) => {
		console.log(`server ready at ${url}`)
	})
}

main()
	.catch(e => {
		throw e
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
