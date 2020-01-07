var app = require("express")();
var parser = require("body-parser");
var ejs = require("ejs");

app.use(parser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var menuItems = ["Chola Bhatura", "Idly", "Chicken"];

app.get("/", function(req, res) {
	// body...
	res.render("index", {menuItems: menuItems});
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
	menuItems.push(item);
	res.redirect("/");
	//res.send("<h1>POST request submitted</h1>");
});

app.listen(3000, process.env.IP, function() {
	// body...
	console.log("Server listening");
})