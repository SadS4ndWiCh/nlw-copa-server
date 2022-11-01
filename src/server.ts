import Fastify from 'fastify';
import { PrismaClient } from '@prisma/client';
import type { FastifyInstance } from 'fastify';

const prisma = new PrismaClient({
	log: ['query'],
});

async function bootstrap() {
	const fastify: FastifyInstance = Fastify({
		logger: true,
	});

	fastify.get('/pools/count', async () => {
		const count = await prisma.pool.count();

		return { count };
	});

	fastify.listen({ port: 3333 });
}

bootstrap();