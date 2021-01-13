require("dotenv").config()
import { PrismaClient } from "@prisma/client"
import { ApolloServer } from "apollo-server"
import * as schemaDirectives from "./directives"
import resolvers from "./resolvers"
import { typeDefs } from "./schema"
import { Context } from "./types"
const { PORT } = process.env

const prisma = new PrismaClient()
const server = new ApolloServer({
	typeDefs,
	resolvers,
	cors: {
		credentials: true,
		origin: "http://localhost:3000"
	},
	context: ({ req, res }): Context => ({ req, res, prisma }),
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
