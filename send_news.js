var VK = require('vksdk'); 
var vk = new VK({ 
	'appId' : 'yourAppId', 
	'appSecret' : 'yourAppSecret', 
}); 
var separator = '-----------------------------------------------------------------'; 
var sendedMessages = []; 
vk.setSecureRequests(true); 
vk.setToken('token'); 
setInterval(function(){ 
	vk.request('newsfeed.get',{'filters':'post','count':10},function(res){ 
	var arrOfPosts = res.response.items; 
	arrOfPosts = arrOfPosts.filter(function(item){ 
		return item.text.includes('Требуется')&&item.text.includes('#JavaScript')||item.text.includes('требуется')&&item.text.includes('#JavaScript'); 
	}) 
	arrOfPosts.forEach(function(item){ 
		var text = item.text; 
		if(!sendedMessages.includes(text)){ 
			vk.request('messages.send',{'user_id':171561140,'message':text+'\n'+separator}) 
			sendedMessages.push(text); 
		} 
	}) 
	}) 
},60000)