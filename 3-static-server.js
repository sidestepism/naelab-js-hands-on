// express を使った静的なサーバのサンプル

var express = require("express"),
    app = express(),
	port = process.env.PORT || 8000;

app.use(express.static(__dirname + '/public'));

app.listen(port);
console.log("Server running at http://localhost:" + port);
