import utiles from "../lib"
const { tokenGenerator, getCookieValue } = utiles
//_, args, ctx
const userSignIn = async (_, { account: { email, password } }, ctx) => {
	const { req, res, prisma } = ctx

	console.log(getCookieValue(req.headers.cookie, "Bearer")) //토큰을 갖고 있는지 화인 directive에서 검증 ㄱㄱ
	const user = await prisma.user.findFirst({
		where: {
			email,
			password
		}
	})
	console.log(user)
	if (!user) throw new Error("이메일이나 비번 틀림")

	let token = tokenGenerator(user) // 로그인 성공 시 토큰 발급
	//console.log(token)
	res.cookie("Bearer", token) // 쿠키 발행
	return user
}

const userSignUp = async (_, args, ctx) => {
	const { prisma } = ctx
	const {
		account: { name, email, password }
	} = args
	const isExistEmail = await prisma.user.findFirst({
		where: {
			email
		}
	})
	if (isExistEmail) throw new Error("존재하는 이메일")

	const user = await prisma.user.create({
		data: {
			name,
			email,
			password
		}
	})
	console.log(user) // create user

	return user
}

const userSignOut = async (_, args, ctx) => {
	const { req, res } = ctx
	res.cookie("Bearer", "")
	return "로그아웃 성공"
}

module.exports = {
	userSignIn,
	userSignUp,
	userSignOut
}
