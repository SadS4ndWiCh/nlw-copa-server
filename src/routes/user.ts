import { FastifyInstance } from "fastify"
import { prisma } from "../libs/prisma";

export const userRoutes = async (fastify: FastifyInstance) => {
	fastify.get('/users/count', async () => {
		const count = await prisma.user.count();

		return { count };
	});


}