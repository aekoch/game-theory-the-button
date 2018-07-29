var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

var mythology_aliases = ["angel", "banshee", "barghest", "basilisk", "chimera", "changeling",  "demon", "drake", "dragon",
"dwarf", "djinn", "dryad", "elf", "eagle", "fairy", "faun", "gargoyle", "gnome", "goblin", "gremlin", "harpie", "hydra", "kobold",
"mermaid", "merman", "minotaur", "phoenix", "pegasus", "pixie", "poltergeist", "sphinx", "sylph", "troll", "unicorn",
"valkyrie", "vampire", "werewolf", "wyrm"];

var anonymous_user_aliases = {};

app.get('/', function(req, res){
	//res.send("<h1>Hello world</h1>");
	res.sendFile(__dirname + '/index.html');
});

app.get("/button/", function(req, res){
	res.sendFile(__dirname + '/button.html');
});


io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('chat message', function(data){
    console.log('message: ' + JSON.stringify(data));
	var user_id = data.id;
	if(!anonymous_user_aliases[user_id]){
		anonymous_user_aliases[user_id] = mythology_aliases[user_id % mythology_aliases.length];
	}
	data.id = "anonymous " + anonymous_user_aliases[user_id];
	console.log('emitting: ' + JSON.stringify(data));
	io.emit('chat message', data);
  });
  socket.on('disconnect', function(){
	  console.log('user disconnected');
  });
});

http.listen(port, function(){
  console.log('listening on *:3000');
});