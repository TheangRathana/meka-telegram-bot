
import TelegramBot from 'node-telegram-bot-api';

const token = "7359754931:AAH8JX7X-C8uzGXKArY3_12lEVNbrWQ2UKE";

const bot = new TelegramBot(token);

export const sendTelegramMessage = (chatId: number, message: string) => {
    try {
        console.log("first")
        bot.sendMessage(chatId, message);
        console.log(`Message sent to chat ${chatId}`);
    } catch (error) {
        console.error(`Failed to send message to chat ${chatId}:`, error);
    }
};

