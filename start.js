const WebSocket = require('ws');
const fs = require('fs');
const OBSWebSocket = require('obs-websocket-js').default;
const obs = new OBSWebSocket();
const CHAT_SOURCE_NAME = '12用ストリームキット';
// const websocket = new WebSocket('ws://localhost:4455');

obs.connect('ws://localhost:4455')
		.then(() => {
			console.log('Success!');


			obs.call('GetSceneItemList', { 'sceneName': '群像劇昼' })
					.then(data => {
						// Get the scene item that you're interested in.
						const targetItem = data.sceneItems.find(item => item.sourceName === CHAT_SOURCE_NAME);

						// Make sure the target item was found in the scene.
						if(targetItem) {

							// Call another method and provide the necessary sceneItemId
							console.log("aaaaaaa")
							return obs.call('SetSceneItemProperties', {
								'sceneItemId': targetItem.itemId,
								'customCSS' : "aaaa",
								// other parameters...
							}
							);


						}

						else {
							console.log('ERR: The source was not found in the scene')
						}
					})
					.catch(err => {
						console.error('ERR:', err);
					});
		})
		.catch(err => { // Promise convention dictates you have a catch on every chain.
			console.log(err);
		});
