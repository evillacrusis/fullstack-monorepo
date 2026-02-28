"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
function createPrismaClient() {
    return new client_1.PrismaClient({
        log: process.env['NODE_ENV'] === 'development'
            ? ['query', 'warn', 'error']
            : ['warn', 'error'],
    });
}
exports.prisma = globalThis.__prismaClient ?? createPrismaClient();
if (process.env['NODE_ENV'] !== 'production') {
    globalThis.__prismaClient = exports.prisma;
}
//# sourceMappingURL=client.js.map