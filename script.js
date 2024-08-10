const fs = require('fs');
const OBSWebSocket = require('obs-websocket-js').default;
const obs = new OBSWebSocket();
const CHAT_SOURCE_NAME = '12用ストリームキット';
// // 編集していきたいCSSのファイルパスを指定する
// let text = fs.readFileSync("./gunzo.css", 'utf8');

obs.connect('ws://localhost:4455')
		.then(() => {
			console.log(`Success! We're connected & authenticated.`);

			var sss = obs.call('GetSceneItemId', {sceneName: '群像劇昼', sourceName: '12用ストリームキット'});
			sss.then(function(result){
				console.log(String(result)+ "sss");
			});
			obs.disconnect();


		})
		.then(data => {
		// 	data.sources.forEach(source => {
		// 		if (source.name === CHAT_SOURCE_NAME) {
		// 			console.log(source)
		// 			obs.call('SetBrowserSourceProperties', {
		// 				'source': source.name,
		// 				'css': text,
		// 			});
		// 		}
		// 	});
			obs.disconnect();
		})
		.catch(err => { // Promise convention dicates you have a catch on every chain.
			console.log(err);
		});

// You must add this handler to avoid uncaught exceptions.
obs.on('error', err => {
	console.error('socket error:', err);
});
