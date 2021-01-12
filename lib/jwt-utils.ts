require("dotenv").config()
import jwt from "jsonwebtoken"

const { getCookieValue } = require("./cookie-utils")

const { JWT_SCRET = "dev" } = process.env
export const tokenGenerator = user => {
	const { id, email } = user
	const token = jwt.sign({ id, email }, JWT_SCRET, {
		expiresIn: "2h"
	})
	return token
}
export const jwtVerification = async (req, prisma) => {
	const { cookie } = req.headers
	console.log(cookie)
	let token = getCookieValue(cookie, "Bearer")

	if (!token) {
		throw new Error("로그인이 필요합니다")
	} else {
		const verify = jwt.verify(token, JWT_SCRET)
		const id = verify["id"]
		const { role } = await prisma.user.findFirst({
			where: {
				id
			}
		})
		console.log("권한 :", role)
		return role
	}
}
