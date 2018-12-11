var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var path = require('path');
var spawn = require('child_process').spawn;
var omx = require('omxcontrol');
var play = false;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });

 socket.on("video", function(data){

    /*if( data.action === "play"){
    var id = data.video_id,
         url = "http://www.youtube.com/watch?v="+id;

    var runShell = new run_shell('youtube-dl',['-o','%(id)s.%(ext)s','-f','/18/22',url],
        function (me, buffer) {
            me.stdout += buffer.toString();
            socket.emit("loading",{output: me.stdout});
            console.log(me.stdout);
         },
        function () {
            //child = spawn('omxplayer',[id+'.mp4']);
            omx.start(id+'.mp4');
        });
    }*/


    if( !play ){
        omx.start('At the Hospital _ Funny Clip _ Mr. Bean Official-OoI57NeMwCc.mkv');
        play = true;
    } else {
        omx.quit();
	play = false;    
    }
    console.log('data:' + data);

 });

});

 //Run and pipe shell script output
 function run_shell(cmd, args, cb, end) {
    var spawn = require('child_process').spawn,
        child = spawn(cmd, args),
        me = this;
    child.stdout.on('data', function (buffer) { cb(me, buffer); });
    child.stdout.on('end', end);
 }

http.listen(port, function(){
  console.log('listening on *:' + port);
});
