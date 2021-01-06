require("dotenv").config()
import jwt from "jsonwebtoken"

const { JWT_SCRET } = process.env
module.exports = {
	tokenGenerator: ({ id, email }) => {
		const token = jwt.sign({ id, email }, JWT_SCRET || "", {
			expiresIn: "2h"
		})
		return token
	},
	jwtVerification: () => {
		let token
	}
}
