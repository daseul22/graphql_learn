import { defaultFieldResolver, isDefinitionNode } from "graphql"
import { objectType, queryField } from "nexus"

export const Post = objectType({
	name: "Post",
	definition(t) {
		t.id("id")
		t.string("title")
		t.string("content")
	}
})
