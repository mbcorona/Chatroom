module.exports = function (io) {
    const chatData = require('../../data/chat/chat.data');
    const stockQuoteService = require('../stock_quote/stock_quote.service');

    function sortChat(a, b) {
        if (a.date < b.date) return -1;
        return 1;
    }

    function getChat() {
        let chat = chatData.get();
        return chat.sort(sortChat).slice(0, 50);
    }

    async function botQuote(code) {
        let quote = await stockQuoteService.getQuote(code);
        io.emit('chatroom', { username: 'BOT', text: quote.toString() });
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