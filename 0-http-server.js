// シンプルなHTTPサーバのサンプル

// ライブラリを読み込む． http は組み込みライブラリ
// ドキュメントはここ: http://nodejs.jp/nodejs.org_ja/api/http.html
var http = require('http');

// サーバオブジェクトを作る．引数に無名関数を渡す．
http.createServer(function (req, res) {
	// この無名関数はリクエストが来た瞬間に呼ばれる．
	// 第1引数の req には リクエストに関するオブジェクト，
	// 第2引数の res には レスポンスに関するオブジェクトが渡される．
	res.writeHead(200, {'Content-Type': 'text/plain'});

	// レスポンスを返し，コネクションを閉じる．
	res.end('Hello World\n');
}).listen(1337, '127.0.0.1');
// 作ったサーバオブジェクトに，ポート1337でlistenさせる．

// ブラウザで http://127.0.0.1:1337/ にアクセスする．
// もしくは `telnet 127.0.0.1 1337` を実行
console.log('Server running at http://127.0.0.1:1337/');