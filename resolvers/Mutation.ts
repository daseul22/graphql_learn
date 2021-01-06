//_, args, ctx
const userSignIn = async (_, { account: { email, password } }, ctx) => {
	//
	return {
		id: 2,
		email,
		password
	}
}

module.exports = {
	userSignIn
}
