// express を使った静的なサーバのサンプル

// express ライブラリを読み込み
var express = require("express");

// アプリケーションオブジェクトを作成
var app = express();

// ポートを定義 (PORT という環境変数があったらそれを使う)
var port = process.env.PORT || 8000;

app.use(express.static(__dirname + '/public'));

app.listen(port);
console.log("Server running at http://localhost:" + port);
