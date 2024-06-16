import { sendTelegramMessage } from "../../fn/telegrapBot/sendTelegramMessage"

const UserResolver = {

    Mutation: {
        send: async (_root: undefined) => {
            try {
                console.log("first")
                sendTelegramMessage(-1002216061059, "New customer request the quotation")
                return "Sucxc"
            } catch (error) {
                return error
            }
        }
    }
}

export default UserResolver