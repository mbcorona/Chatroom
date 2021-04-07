describe('chat', () => {
    let ioMock = {
        lastEmitted: null,
        lastEmittedMessage: null,
        emit: function (e, data) {
            this.lastEmitted = e;
            this.lastEmittedMessage = data;
        }
    }
    let chat = require('../../services/chat/chat.service')(ioMock);
    let chatData = require('../../data/chat/chat.data');
    let stockQuoteService = require('../../services/stock_quote/stock_quote.service');

    it('Should be able to send message', async () => {
        let user = {
            username: 'user_test'
        };
        let text = "my test txt";

        spyOn(chatData, "add").and.returnValue({ username: user.username, text: text });

        let result = await chat.sendMessage(user, text);
        expect(result.username).toBe(user.username);
        expect(result.text).toBe(text);

        expect(ioMock.lastEmitted).toBe('chatroom');
        expect(ioMock.lastEmittedMessage.username).toBe(user.username);
        expect(ioMock.lastEmittedMessage.text).toBe(text);
    });

    it('Should be able to request a quote', async () => {
        let user = {
            username: 'user_test'
        };
        let text = "/stock=aapl.us";

        let quoteResult = "AAPL.US quote is $10.00 per share";

        spyOn(stockQuoteService, "getQuote").and.returnValue(quoteResult);

        await chat.sendMessage(user, text);
        expect(ioMock.lastEmitted).toBe('chatroom');
        expect(ioMock.lastEmittedMessage.username).toBe("BOT");
        expect(ioMock.lastEmittedMessage.text).toBe(quoteResult);
    });
})