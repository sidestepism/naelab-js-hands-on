// socket.io のサンプル
// らじへぇもどき 穴埋め版

// express ライブラリを読み込み
var express = require("express"),
    // express アプリケーションオブジェクトを作成
    app = express(),
    // ポートを定義 (PORT という環境変数があったらそれを使う)
    port = process.env.PORT || 8000,
    // アプリケーションからサーバオブジェクトを取り出す
    server = require('http').Server(app),
    // サーバオブジェクトに socket.io の処理を attach する
    io = require('socket.io')(server);

var say = require("say");

var counter = 0;
var log = [];

io.on('connection', function(socket) {
	counter += 1;
	var clientId = counter;
	
	// このfunction は，クライアントから接続があり，
	// socket.io のコネクションが貼られたときに呼び出される無名関数．
    console.log('new client connected', clientId);

	// hello というイベントをクライアントに渡す．
    socket.emit('hello', {});

    socket.on('close', function() {
	    console.log('client disconnected', clientId);
    });
});

// 静的なサーブも行う ("/index.html" へアクセスがあったら， "./public/index.html" の内容を返す)
app.use(express.static(__dirname + '/public'));

server.listen(port);
console.log("Server running at http://localhost:" + port);