import Fastify from 'fastify';
import cors from '@fastify/cors';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import ShortUniqueId from 'short-unique-id';

import type { FastifyInstance } from 'fastify';

const prisma = new PrismaClient({
	log: ['query'],
});

async function bootstrap() {
	const fastify: FastifyInstance = Fastify({
		logger: true,
	});

	fastify.register(cors, { origin: true });

	fastify.get('/pools/count', async () => {
		const count = await prisma.pool.count();

		return { count };
	});

	fastify.get('/users/count', async () => {
		const count = await prisma.user.count();

		return { count };
	});

	fastify.get('/guesses/count', async () => {
		const count = await prisma.guess.count();

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

	fastify.listen({ port: 3333 });
}

bootstrap();