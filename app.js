var app = require("express")();
var parser = require("body-parser");
var ejs = require("ejs");
var mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1/menu_items", { useMongoClient : true});
app.use(parser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//var menuItems = ["Chola Bhatura", "Idly", "Chicken"];

var menuSchema = new mongoose.Schema({
	name : String,
	origin : String,
	image : String
});

var Item = mongoose.model("Item", menuSchema);

/*
Item.create({
	name : "Chola Bhatura",
	origin : "India",
	image : "kjdjbav"
	},
	function(err, Item) {
		// body...
		if(!err)
		{
			console.log(Item);
			console.log("CB inserted");
		}
		else
			console.log("Error occured while POSTing");
	});
*/
app.get("/", function(req, res) {
	// body...
	console.log("GETing");
	Item.find({}, function(err, Items) {
		// body...
		console.log("finding");
		if(!err)
		{
			console.log("found");
			res.render("items", {menuItems: Items});
		}
		else
			console.log("Error occured while GETing");
	});
	//res.send("<h1>GET request submitted</h1>");
});
/*
app.get("/newItem", function(req, res) {
	// body...
	res.render("app");
});
*/

app.post("/", function(req, res){
	
	var item = req.body.item;
	var origin = req.body.origin;
	var image = req.body.image;
	Item.create({
	name : item,
	origin : origin,
	image : image
	},
	function(err, Item) {
		// body...
		if(!err)
			console.log(Item);
		else
			console.log("Error occured while POSTing");
	});
	//menuItems.push(item);
	console.log("POST request incoming for "+item);
	res.redirect("/");
	//res.send("<h1>POST request submitted</h1>");
});


app.listen(3000, process.env.IP, function() {
	// body...
	console.log("Server listening");
});