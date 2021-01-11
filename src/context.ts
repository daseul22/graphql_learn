import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export type Context = {
	prisma: PrismaClient
	req: any
	res: any
}

export const createContext = (req, res): Context => ({
	prisma,
	req,
	res
})
