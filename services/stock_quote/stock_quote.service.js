const https = require('https');
const host = "https://stooq.com";
const path = "/q/l/?s={{stock_code}}&f=sd2t2ohlcv&h&e=csv";

function getQuote(code) {
    return new Promise((resolve, reject) => {
        let url = `${host}${path.replace('{{stock_code}}', code)}`;
        https.get(url, function (resp) {
            var result = '';

            // A chunk of data has been recieved.
            resp.on('data', function (chunk) {
                result += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on('end', function () {
                result = result.split("\r\n");
                result[0] = result[0].split(",");
                result[1] = result[1].split(",");
                let symbolPos = result[0].indexOf('Symbol');
                let quotePos = result[0].indexOf('Open');
                resolve(`${result[1][symbolPos]} quote is \$${result[1][quotePos]} per share`);
            });

        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });
    });
}

module.exports = {
    getQuote: getQuote
}