const express = require('express');
const app = express();


const bodyParser = require('body-parser')
 app.use(bodyParser.urlencoded({ extended: false}));
 app.use(bodyParser.json());

const cors = require('cors');
 app.use(cors());
 app.use(express.static('website'));

const port = 3000;
const server = app.listen(port, listening);
//console.log(server);

function listening(){
     console.log(`hello there at ${port}`);
};

app.get('/',function(req,res){
	res.sendFile('/index.html');
})

let projectData= {};
app.post('/addData',function(req, res){
	projectData.temp=req.body.temp;
	projectData.date=req.body.date;
	projectData.feel=req.body.feel;
	projectData.name=req.body.name;
	console.log(projectData)
	res.send(projectData)
})

app.get('/getData',function(req,res){
	res.send(projectData)
	console.log(projectData)
	console.log("sent data to client")
})	




