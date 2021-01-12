import { PrismaClient } from "@prisma/client"
import { jwtVerification } from "../lib"

const prisma = new PrismaClient()

export type Context = {
	prisma: PrismaClient
	req: any
	res: any
	auth: any
}

const auth = async ({ req, prisma }) => {
	const userRole = await jwtVerification(req, prisma)
}

export const createContext = ({ req, res }): Context => ({
	prisma,
	req,
	res,
	auth
})
