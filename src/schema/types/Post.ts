import { isNonNullType } from "graphql"
import { objectType, extendType, nonNull, intArg, stringArg } from "nexus"

// =================== Type =========================

export const Post = objectType({
	name: "Post",
	definition(t) {
		t.model.id()
		t.model.title()
		t.model.content()
		t.model.userId()
	}
})

// =================== Query =========================

export const PostQuery = extendType({
	type: "Query",
	definition(t) {
		t.list.field("findManyPost", {
			type: "Post",
			args: {
				userId: nonNull(intArg())
			},
			authorize: async (root, args, ctx) => {
				await ctx.auth(ctx)
				return true
			},
			resolve: async (root, { userId }, ctx) => {
				let post = await ctx.prisma.post.findMany({
					where: {
						userId
					}
				})
				return post
			}
		})
	}
})

// =================== Muttation =========================

export const PostMutatoin = extendType({
	type: "Mutation",
	definition(t) {}
})
