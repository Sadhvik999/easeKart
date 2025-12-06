const { prisma } = require('./src/db/dbConfig');

async function check() {
    try {
        console.log("prisma.Users is:", prisma.Users ? "DEFINED" : "UNDEFINED");
        console.log("prisma.users is:", prisma.users ? "DEFINED" : "UNDEFINED");
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

check();
