import { objectType, queryField } from "nexus"

export const Post = objectType({
	name: "Post",
	definition(t) {
		t.model.id()
		t.model.title()
		t.model.content()
	}
})
