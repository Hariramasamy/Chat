var express = require('express');

var app = express();

var server = require('http').createServer(app);

var io = require('socket.io')(server);

app.get('/', function(req, res, next) {

	res.sendFile(__dirname + '/public/login.html');

});

app.get('/index',function(req,res,next){
	console.log(__dirname);
	res.sendFile(__dirname+'/public/index.html');
});

app.use(express.static('public'));

app.set('view cache', false);


io.on('connection', function(client) {

	console.log('Client connected');

	client.on('join', function(data) {

		console.log(data);

	});

	client.on('messages', function(data){
		console.log(data);
		client.emit('thread', data);

		client.broadcast.emit('thread', data);

	});

	client.on('userNamePwd',function(data){

		if(data['userName']=='hari' && data['password']=='manichat'){
			console.log('Login Success');
			var data = 'login_success';
			client.emit('success',data);
			client.broadcast.emit('success',data);
		}else{
			console.log('Login Failure');
			var data = 'login_failure';
			client.emit('failure',data);
			client.broadcast.emit('failure',data);
		}

	});

});

server.listen(7777);