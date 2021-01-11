import { time } from "console"
import { objectType } from "nexus"

export const User = objectType({
	name: "User",
	definition(t) {
		t.model.id()
		t.model.role()
		t.model.email()
		t.model.password()
		t.model.posts()
	}
})
