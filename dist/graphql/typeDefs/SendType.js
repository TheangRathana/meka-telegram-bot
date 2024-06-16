"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GlobalType = `#graphql
    type Query {
        getTest: String!
    }
    type Mutation {
        send: String!
    }
`;
exports.default = GlobalType;
