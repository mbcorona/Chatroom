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
            io.emit('chatroom', { username: 'BOT', text: quote.toString() });
        } catch (error) {
            io.emit('chatroom', { username: 'BOT', text: `There was an eror getting your quote: ${code}`});
        }
    }
    
    function sendMessage(user, text) {
        if (text.startsWith('/stock=')) {
            return botQuote(text.replace('/stock=', ''));
        }
        let message = {
            username: user.username,
            text: text
        }
        chatData.add(message);
        io.emit('chatroom', message);
    }

    return {
        getChat: getChat,
        sendMessage: sendMessage
    }
}