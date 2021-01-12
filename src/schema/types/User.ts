import {
	objectType,
	extendType,
	idArg,
	intArg,
	stringArg,
	nonNull
} from "nexus"

import { tokenGenerator, getCookieValue } from "../../../lib"

// =================== Type =========================

export const User = objectType({
	name: "User",
	definition(t) {
		t.model.id()
		t.model.name()
		t.model.role()
		t.model.email()
		t.model.password()
		t.model.posts()
	}
})

// =================== Query =========================

export const UserQuery = extendType({
	type: "Query",
	definition(t) {
		t.field("findOneUser", {
			type: "User",
			args: {
				id: nonNull(intArg())
			},
			resolve(_root, { id }, ctx) {
				const user = ctx.prisma.user.findFirst({
					where: {
						id
					}
				})
				return user
			}
		})

		t.list.field("findManyUser", {
			type: "User",
			resolve: async (_root, args, ctx) => {
				const users = await ctx.prisma.user.findMany()
				return users
			}
		})
	}
})
// =================== Muttation =========================

export const UserMutation = extendType({
	type: "Mutation",
	definition(t) {
		t.field("userSignIn", {
			type: "User",
			args: {
				email: nonNull(stringArg()),
				password: nonNull(stringArg())
			},
			resolve: async (_root, { email, password }, ctx) => {
				const user = await ctx.prisma.user.findFirst({
					where: {
						email,
						password
					}
				})
				if (!user) throw new Error("이메일이나 비번 틀림")
				const token = tokenGenerator(user)
				ctx.res.cookie("Bearer", token)
				return user
			}
		})

		t.field("userSignUp", {
			type: "User",
			args: {
				name: nonNull(stringArg()),
				role: nonNull(stringArg()),
				email: nonNull(stringArg()),
				password: nonNull(stringArg())
			},
			resolve(_root, { name, role, email, password }, ctx) {
				const isExistEmail = ctx.prisma.user.findFirst({
					where: {
						email
					}
				})
				if (isExistEmail) throw new Error("존재하는 이메일")

				const createdUser = ctx.prisma.user.create({
					// role 빠진것도 찾아줌ㄷㄷ
					data: {
						name,
						role,
						email,
						password
					}
				})
				return createdUser
			}
		})
		t.field("userSignOut", {
			type: "String",
			authorize: async (root, args, ctx) => {
				await ctx.auth(ctx)
				return true
			},
			resolve(_root, args, ctx) {
				ctx.res.cookie("Bearer", "")
				return "로그아웃 성공"
			}
		})
	}
})
