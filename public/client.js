// initializing socket, connection to server

         var socket = io.connect('http://localhost:7777/index');

         socket.on('connect', function(data) {

            socket.emit('join', 'Hello server from client client js');

         });

         // listener for 'thread' event, which updates messages

         socket.on('thread', function(data) {

            $('#thread').append('<div class=\"row\"><div class=\"col s4\"><div class=\"card-panel\"><span class=\"blue-text text-darken-2\">' + data + '</span></div></div></div>');

         });

         // prevents form from submitting and sends a message to server

         $('#submit').click(function(){

            var message = $('#message').val();

            var name = $('#name').val();

            $('#message').val('');

            socket.emit('messages', name +' : '+ message);

            this.reset();

            return false;

         });

         $('#message').keypress(function(event){
            var keyPressedCode = event.which;
            if(keyPressedCode == 13){

            var message = $('#message').val();

            var name = $('#name').val();

            $('#message').val('');

            socket.emit('messages', name +' : '+ message);

            this.reset();

            return false;
            }
         });