var params = {} , access_token=null;

function getData(){
	chrome.storage.local.get('access_token',function(val){
			console.log(val['access_token'])
			access_token=val['access_token'];

        if (chrome.extension.lastError) {
            console.log('An error occurred: ' + chrome.extension.lastError.message);
        }
    });
}

getData();
if(access_token==null)
{
var redditApp = {
        clientId: 'ao1fdN3bPO19mQ',
        params: 'identity,read,mysubreddits',
        redirect_uri: chrome.identity.getRedirectURL() +'popup.html',
        access_url: 'https://www.reddit.com/api/v1/access_token',
        state: Math.random().toString(36).substring(7)
    };


var options = {
	'url': 'https://www.reddit.com/api/v1/authorize?client_id='+redditApp.clientId+'&response_type=token&state='+redditApp.state+'&redirect_uri='+redditApp.redirect_uri+'&scope='+redditApp.params, 
    'interactive': true
};

console.log("Sent"+options.url)


chrome.identity.launchWebAuthFlow(
	options,function(redirect_url){
		console.log("Got"+redirect_url) 

		if (chrome.runtime.lastError) {
            console(chrome.runtime.lastError);
            return;
        }
    	
    	var regex = /([^#&=]+)=([^&]*)/g, m;
		while (m = regex.exec(redirect_url)) {
  			params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
		}

		if (params['error']=='access_denied') {
			alert('Permission required to continue')
		}else if(params['error']!=null){
			alert(params['error'])
		}

		if (params['state']==redditApp.state){
			access_token=params['access_token'];
			console.log(access_token)
		}
	});


function saveData(){
	var obj = {};
	obj['access_token']=access_token;
	chrome.storage.local.set(obj, function() {
        if (chrome.extension.lastError) {
            alert('An error occurred: ' + chrome.extension.lastError.message);
        }
    });
}

saveData();
getData();
}