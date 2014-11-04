// らじへぇもどき 完成版

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
	// このfunction は，クライアントから接続があり，
	// socket.io のコネクションが貼られたときに呼び出される無名関数．

    // 接続があったのでカウンタを1つ進める．
    // この counter 変数は外のスコープを参照する．
    counter += 1;

    // ローカル変数 clientId に counter の値を記録しておく．
    // JSでは数値とブールは値渡し (コピー渡し)
    var clientId = counter;

    console.log('new client connected', clientId);

	// hello というイベントをクライアントに渡す．
	// データとして，{content: 'world', clientId: (何人目のクライアントか?)} という
	// オブジェクト (構造体, ディクショナリのようなもの, 実体はハッシュ) を渡す．
    socket.emit('hello', {
        content: 'world',
        clientId: clientId,
    });

    // say というイベントに対するリスナを記述する．
    socket.on('say', function(data){
    	console.log('say', data.content);
    	say.speak(null, data.content);

    	// ログをつけておく
    	log.push({
    		time: new Date(),
    		content: data.content,
    		clientId: clientId
    	});
    });

    socket.on('close', function() {
	    console.log('client disconnected', clientId);
    });
});

app.get('/log', function(req, res) {
	res.json(log);
});

// 静的なサーブも行う ("/index.html" へアクセスがあったら， "./public/index.html" の内容を返す)
app.use(express.static(__dirname + '/public'));

server.listen(port);
console.log("Server running at http://localhost:" + port);