document.addEventListener('DOMContentLoaded',main());

function main()
{
	console.log("JS loaded.");
	var xhr= new XMLHttpRequest();
	xhr.open("GET","https://www.reddit.com/.json",false);
	xhr.send();
	console.log(xhr.status);
	if(xhr.status===200)
	{
		var response= JSON.parse(xhr.response);
		console.log(response.data.children);
		var children=response.data.children;
		
		document.addEventListener('DOMContentLoaded',function(){
			var template=document.getElementById('content').innerHTML;
			var render=Mustache.to_html(template,{title:children[0].data.title,
				url:children[0].data.url});
			document.getElementById("content").innerHTML=render;
			console.log(document);
		});
	}
}

window.addEventListener('click',function(e){
  			if(e.target.href!==undefined){
    		chrome.tabs.create({url:e.target.href})
  	}

});

