
 var button = document.getElementById('counter');

button.onclick = function(){
	//create a request to counter
	var request = new XMLHttpRequest();
	//capture the responce
	request.onreadystatechange = function(){
		if(request.readyState === XMLHttpRequest.DONE)
		{
			if(request.status === 200)
			{
				var counter = request.responseText;
				console.log(counter);
				var span = document.getElementById('count');
				span.innerHTML = counter.toString();
			}
		}
	};
	//make a request
	request.open('GET','/counter',true);
	request.send(null);
};
//submit name

var submit = document.getElementById('submit_button');
submit.onclick = function(){
	var request = new XMLHttpRequest();
	//capture the responce
	request.onreadystatechange = function(){
		if(request.readyState === XMLHttpRequest.DONE)
		{
			if(request.status === 200)
			{
				var names = request.responseText;
				names = JSON.parse(names);
				var list = '';
				for(var i=0;i<names.length;i++)
				{
					list += '<li>' + names[i] + '</li>';
				}
					//make a request and send the name
					//capture the response and display it as list 
	
				var ul = document.getElementById('namelist');
				ul.innerHTML = list;
			}
		}
	};
	//make a request
	var nameInput = document.getElementById('name');
	var name = nameInput.value;
	

	request.open('GET','/submit-name?name=' + name,true);
	request.send(null);
};
var subcom = document.getElementById('sub_button');
subcom.onclick = function(){
	var request = new XMLHttpRequest();
	//capture the responce
	request.onreadystatechange = function(){
		if(request.readyState === XMLHttpRequest.DONE)
		{
			if(request.status === 200)
			{
				var para = request.responseText;
				para = JSON.parse(para);
				var list1 = '';
				for(var i=0;i<para.length;i++)
				{
					list1 += '<li>' + para[i] + '</li>';
				}
					//make a request and send the name
					//capture the response and display it as list 
	
				var ul1 = document.getElementById('paragrap');
				ul1.innerHTML = list1;
			}
		}
	};
	//make a request
	var paraInput = document.getElementById('comments');
	var paras = paraInput.value;
	request.open('GET','/paras?para=' + paras,true);
	request.send(null);
	
	
};
