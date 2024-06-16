"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendTelegramMessage_1 = require("../../fn/telegrapBot/sendTelegramMessage");
const UserResolver = {
    Mutation: {
        send: async (_root) => {
            try {
                console.log("first");
                (0, sendTelegramMessage_1.sendTelegramMessage)(-1002216061059, "New customer request the quotation");
                return "Sucxc";
            }
            catch (error) {
                return error;
            }
        }
    }
};
exports.default = UserResolver;
