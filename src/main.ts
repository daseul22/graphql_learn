require("dotenv").config()
import { ApolloServer } from "apollo-server"
import schema from "./schema"
import { createContext } from "./context"

const { PORT } = process.env

const server = new ApolloServer({
	schema,
	context: createContext
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
		console.log("end")
	})
