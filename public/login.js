var socket = io.connect('http://localhost:7777');
$('#login').click(function(){
	var userName = $('#userName').val();
	var password = $('#password').val();
	var userNamePwd = {
		'userName': userName,
		'password': password
	};
	socket.emit('userNamePwd',userNamePwd);
});

socket.on('success',function(data){
	$('#chatLogin').remove();
	$('#validate').append('lock_open');
	window.open('http://localhost:7777/index','_self');
});
socket.on('failure',function(data){
	alert('failure');
});