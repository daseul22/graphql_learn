import { gql } from "apollo-server"

export const typeDefs = gql`
	directive @auth(req: Role = USER) on FIELD_DEFINITION | OBJECT
	enum Role {
		ADMIN
		USER
	}
	type Query {
		findOneUser(id: int): User! @auth
		findManyUser: [User]! @auth(req: ADMIN)
	}
	type User {
		id: Int
		role: Role
		name: String
		email: String
		password: String
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
		role: String
		email: String
		password: String
	}
`
