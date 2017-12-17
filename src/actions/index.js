export const SEND_MESSAGE = 'SEND_MESSAGE';

export const sendMessage = (message) => ({
    type: SEND_MESSAGE,
    data: {
        text: message
    }
})