import { FastifyInstance } from "fastify"
import ShortUniqueId from "short-unique-id";
import { z } from "zod";

import { prisma } from "../libs/prisma";

export const poolRoutes = async (fastify: FastifyInstance) => {
	fastify.get('/pools/count', async () => {
		const count = await prisma.pool.count();

		return { count };
	});

	fastify.post('/pools', async (req, reply) => {
		const createPoolBody = z.object({
			title: z.string(),
		});
		const generateId = new ShortUniqueId({ length: 6 });

		const { title } = createPoolBody.parse(req.body);
		const code = String(generateId()).toUpperCase();

		await prisma.pool.create({
			data: {
				title,
				code,
			}
		})

		return reply.status(201).send({ code });
	});


}