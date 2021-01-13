import { tokenGenerator, getCookieValue } from "../lib"

export const userSignIn = async (
	parents,
	{ account: { email, password } },
	ctx
) => {
	const { req, res, prisma } = ctx

	const user = await prisma.user.findFirst({
		where: {
			email,
			password
		}
	})
	if (!user) throw new Error("이메일이나 비밀번호가 틀립니다")

	let token = tokenGenerator(user) // 로그인 성공 시 토큰 발급
	res.cookie("Bearer", token) // 쿠키 발행
	return user
}

export const userSignUp = async (parents, args, ctx) => {
	const { prisma } = ctx
	const {
		account: { name, email, password }
	} = args
	const isExistEmail = await prisma.user.findFirst({
		where: {
			email
		}
	})
	if (isExistEmail) throw new Error("존재하는 이메일입니다")

	const user = await prisma.user.create({
		data: {
			name,
			email,
			password
		}
	})

	return user
}

export const userSignOut = async (parents, args, ctx) => {
	const { req, res } = ctx
	res.cookie("Bearer", "")
	return "로그아웃 성공"
}
