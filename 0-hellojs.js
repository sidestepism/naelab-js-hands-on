// hello-js
console.log('Hello World');

// f(関数オブジェクト) を引数として受け取り2回コールする
function doTwice(f){
	f();
	f();
}

doTwice(function(){ console.log('大切なメッセージ') });