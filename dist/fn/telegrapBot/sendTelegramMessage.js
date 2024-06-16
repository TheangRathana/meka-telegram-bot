"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendTelegramMessage = void 0;
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const token = "7359754931:AAH8JX7X-C8uzGXKArY3_12lEVNbrWQ2UKE";
const bot = new node_telegram_bot_api_1.default(token);
const sendTelegramMessage = (chatId, message) => {
    try {
        console.log("first");
        bot.sendMessage(chatId, message);
        console.log(`Message sent to chat ${chatId}`);
    }
    catch (error) {
        console.error(`Failed to send message to chat ${chatId}:`, error);
    }
};
exports.sendTelegramMessage = sendTelegramMessage;
