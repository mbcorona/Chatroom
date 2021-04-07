module.exports = function (io) {
    const chatData = require('../../data/chat/chat.data');
    const stockQuoteService = require('../stock_quote/stock_quote.service');

    async function getChat() {
        return await chatData.get();
    }

    async function botQuote(code) {
        let quote;
        try {
            quote = await stockQuoteService.getQuote(code);
            io.emit('chatroom', { username: 'BOT', text: quote });
        } catch (error) {
            io.emit('chatroom', { username: 'BOT', text: `There was an eror getting your quote: ${code}`});
        }
    }
    
    async function sendMessage(user, text) {
        if (text.startsWith('/stock=')) {
            return await botQuote(text.replace('/stock=', ''));
        }
        let message = {
            username: user.username,
            text: text
        }
        let chat = await chatData.add(message);
        io.emit('chatroom', message);
        return chat;
    }

    return {
        getChat: getChat,
        sendMessage: sendMessage
    }
}