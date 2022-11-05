import Fastify from 'fastify';
import type { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';

import { authRoutes } from './routes/auth';
import { gameRoutes } from './routes/game';
import { guessRoutes } from './routes/guess';
import { poolRoutes } from './routes/pool';
import { userRoutes } from './routes/user';

async function bootstrap() {
	const fastify: FastifyInstance = Fastify({
		logger: true,
	});

	fastify.register(cors, { origin: true });

	fastify.register(authRoutes);
	fastify.register(gameRoutes);
	fastify.register(guessRoutes);
	fastify.register(poolRoutes);
	fastify.register(userRoutes);

	fastify.listen({ port: 3333 });
}

bootstrap();