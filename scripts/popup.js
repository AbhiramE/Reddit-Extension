document.addEventListener('DOMContentLoaded',main());



function main()
{
	console.log("JS loaded.");
	var xhr= new XMLHttpRequest();
	xhr.open("GET","https://www.reddit.com/.json",false);
	xhr.send();
	if(xhr.status===200)
	{
		var response= JSON.parse(xhr.response);
		console.log(response.data.children);
		var children=response.data.children;
		
		document.addEventListener('DOMContentLoaded',function(){
			
			xhrTemplate=new XMLHttpRequest();
			xhrTemplate.open("GET","templates/list.html",false);
			xhrTemplate.send();
			var template=xhrTemplate.response;

			var json={	"item":[
								{"url":children[0].data.url,"title":children[0].data.title,
								"score":children[0].data.score,"subreddit":children[0].data.subreddit,
								"comments":children[0].data.permalink},
								{"url":children[1].data.url,"title":children[1].data.title,
								"score":children[1].data.score,"subreddit":children[1].data.subreddit,
								"comments":children[1].data.permalink},
								{"url":children[2].data.url,"title":children[2].data.title,
								"score":children[2].data.score,"subreddit":children[2].data.subreddit,
								"comments":children[2].data.permalink},
								{"url":children[3].data.url,"title":children[3].data.title,
								"score":children[3].data.score,"subreddit":children[3].data.subreddit,
								"comments":children[3].data.permalink},
								{"url":children[4].data.url,"title":children[4].data.title,
								"score":children[4].data.score,"subreddit":children[4].data.subreddit,
								"comments":children[4].data.permalink}
						]};
			var render=Mustache.to_html(template,json);
			document.getElementById("items").innerHTML=render;
		});
	}
}

window.addEventListener('click',function(e){
			if(e.id=="comments"){
				console.log("Fi")
				//chrome.tabs.create({url:"reddit.com"+e.target.href})
			}
  			else if(e.target.href!==undefined){
    			chrome.tabs.create({url:e.target.href})}
});