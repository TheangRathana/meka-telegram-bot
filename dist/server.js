"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const http_1 = require("http");
const drainHttpServer_1 = require("@apollo/server/plugin/drainHttpServer");
const schema_1 = require("@graphql-tools/schema");
const ws_1 = require("ws");
const ws_2 = require("graphql-ws/lib/use/ws");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const merge_1 = require("@graphql-tools/merge");
const path_1 = __importDefault(require("path"));
const load_files_1 = require("@graphql-tools/load-files");
require("dotenv/config");
const resolversFiles = (0, load_files_1.loadFilesSync)(path_1.default.join(__dirname, './graphql/resolvers'));
const typeDefsFiles = (0, load_files_1.loadFilesSync)(path_1.default.join(__dirname, './graphql/typeDefs'));
const resolvers = (0, merge_1.mergeResolvers)(resolversFiles);
const typeDefs = (0, merge_1.mergeTypeDefs)(typeDefsFiles);
async function startServer(typeDefs, resolvers) {
    const app = (0, express_1.default)();
    const httpServer = (0, http_1.createServer)(app);
    app.use(body_parser_1.default.json({ limit: '5mb' }));
    const wsServer = new ws_1.WebSocketServer({
        server: httpServer,
        path: '/graphql',
    });
    const schema = (0, schema_1.makeExecutableSchema)({ typeDefs, resolvers });
    const serverCleanup = (0, ws_2.useServer)({
        schema
    }, wsServer);
    const server = new server_1.ApolloServer({
        schema,
        plugins: [
            (0, drainHttpServer_1.ApolloServerPluginDrainHttpServer)({ httpServer }),
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanup.dispose();
                        },
                    };
                },
            }
        ],
    });
    await server.start();
    app.use('/graphql', (0, cors_1.default)(), body_parser_1.default.json(), (0, express4_1.expressMiddleware)(server, {
        context: async ({ req, res }) => ({ req: req, res: res }),
    }));
    httpServer.listen(+5300, () => {
        console.log(`🚀 Server is now running on http://localhost:${+5300}/graphql`);
    });
}
startServer(typeDefs, resolvers);
