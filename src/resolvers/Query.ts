export const findOneUser = async (parents, { id }, ctx) => {
	const user = await ctx.prisma.user.findFirst({
		where: {
			id
		}
	})
	if (!user) throw new Error("존재하지 않는 user id입니다")
	return user
}

export const findManyUser = async (parents, args, ctx) => {
	const users = await ctx.prisma.user.findMany()
	return users
}
