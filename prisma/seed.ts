import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	const user = await prisma.user.create({
		data: {
			name: "John Doe",
			email: "jogn.doe@gmail.com",
			avatarUrl: "github.com/SadS4ndWiCh.png"
		}
	});

	const pool = await prisma.pool.create({
		data: {
			title: "Example Pool",
			code: "POOL12",
			ownerId: user.id,

			participants: {
				create: {
					userId: user.id,
				}
			}
		}
	});

	await prisma.game.create({
		data: {
			date: "2022-11-04T12:00:00.638Z",
			firstTeamCountryCode: "DE",
			secondTeamCountryCode: "BR",
		}
	});

	await prisma.game.create({
		data: {
			date: "2022-11-05T12:00:00.638Z",
			firstTeamCountryCode: "BR",
			secondTeamCountryCode: "AR",

			guesses: {
				create: {
					firstTeamPoints: 3,
					secondTeamPoints: 1,

					participant: {
						connect: {
							userId_poolId: {
								userId: user.id,
								poolId: pool.id,
							}
						}
					}
				}
			}
		}
	});
}

main();