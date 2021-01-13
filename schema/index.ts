import { gql } from "apollo-server"

export const typeDefs = gql`
	directive @auth(req: Role = ADMIN) on FIELD_DEFINITION | OBJECT
	enum Role {
		ADMIN
	}
	type Query {
		users(test: String): User
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
		userSignOut: String @auth
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
