var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var app = express();
app.use(morgan('combined'));

var config = {
  user:'srinithya-vutukuru',
  database: 'srinithya-vutukuru',
  host: 'db.imad.hasura-app.io',
  port: '5432',
  password: process.env.DB_PASSWORD
};


var articles={
     'article-one':{
      title:'article-one | nithya',
      heading:'Article One',
      date:'dec 10,2016',
      content:`  
                <p>
                    this is my first webpage.
                </p>`
      
        
    },
    'article-two':{
      title:'article-two | nithya',
      heading:'Article two',
      date:'dec 10,2016',
      content:`  
                <p>
                    this is my second webpage.
                </p>`
      
        
    },
    'article-three':{
      title:'article-three | nithya',
      heading:'Article three',
      date:'dec 10,2016',
      content:`  
                <p>
                    this is my third webpage.
                </p>`
      
        
    }
};
var counters={
  
  title :'counters | nithya',
  heading:'Counters',
  date:'dec 27,2016'
  
    
};
var nam={
  
  title :'names | nithya',
  heading:'names',
 };
function createComments(data){
    var title=data.title;
    var heading=data.heading;
    var content=data.content;
    var html_comments=`
    <html>
        <head>
            <title>
                ${title}
            </title> 
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
           <link href="/ui/style.css" rel="stylesheet" />
        </head>
        
        <body>
		<div class = "container">
		    <div class="right big bold">
						<a href="/">HOME</a> 
					</div>
		
				<div class="content">
					
					
					<h3 class="center text-big bold">
						${heading}
					</h3>
					
					<div >
					comments are :
					<hr/>
					<ul>
					  ${content}
					</ul>	
					</div>
				</div>
			</body>
        </div>
    </html>`;
    return html_comments;
}
function createTemplate(data){
    var date=data.date;
    var title=data.title;
    var heading=data.heading;
    var content=data.content;
    var htmlTemplate=`
    <html>
        <head>
            <title>
                ${title}
            </title> 
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
           <link href="/ui/style.css" rel="stylesheet" />
        </head>
        
        <body>
		<div class = "container">
			<div class="center">
				<img id='madi' src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTrQfNoqk1HpN8-Mly0r03xY5Cl0v1WFGQ67wraKbKEsillvj0uqQ" class="img-big"/>
			</div>
			<hr/>
				<div class="content">
					<div class="center big bold">
						<a href="/">HOME</a> 
					</div>
					<hr/>
					<h3 class="center text-big bold">
						${heading}
					</h3>
					<div class="center text-big bold">
						${date}
					</div>
				
					<div class="center text-big bold">
					 
					  ${content}
						
					</div>
				</div>
			</body>
        </div>
    </html>
    `;
    return htmlTemplate;
}

app.get('/', function (req, res) {
    console.log("nithya");
    
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
var pool = new Pool(config);
app.get('/test-db',function(req,res){
    //make a request 
    //return a response from results
    pool.query('SELECT * FROM test',function(req,res){
        if(err){
            res.status500.send(err.toString());
        }else{
            res.send(JSON.stringify(result));
        }
    });
});
var counter=0;
app.get('/counter', function (req, res) {
  counter += 1;
  res.send(counter.toString());
});


var paras = [];
app.get('/paras', function (req, res) {//URL:/paras?para=bkxbk
  //get the name from request
  var para= req.query.para;
  paras.push(para);
  //json converts objects into strings and vice versa
  res.send(JSON.stringify(paras));
});
var names = [];
app.get('/submit-name', function (req, res) {//URL:/paras?para=bkxbk
  //get the name from request
  var name= req.query.name;
  names.push(name);
  //json converts objects into strings and vice versa
  res.send(JSON.stringify(names));
});
var list = '';
var i=0;
app.get('/submitcomments', function (req, res) {//URL:/subit-name?name=bkxbk
  //get the name from request
  while(i<paras.length)
  {
  list +='<li>' +paras[i] + '</li>' + '<hr/>';
  i++;
  }
  nam.content=list;
  res.send(createComments(nam));
});
var count=0;
app.get('/counters', function (req, res) {
    count+=1;
   counters.content='this website is viewd '+counter +' times';
   res.send(createTemplate(counters));
});
app.get('/:articleName', function (req, res) {
    var articleName=req.params.articleName;
   res.send(createTemplate(articles[articleName]));
});


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});
app.get('/ui/comments.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'comments.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
