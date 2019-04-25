var express = require("express");
var app = express();
var request = require("request");
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine", "ejs");

var campgrounds = [
        {name:"mountain", image: "https://www.google.co.in/imgres?imgurl=https%3A%2F%2Ffm.cnbc.com%2Fapplications%2Fcnbc.com%2Fresources%2Fimg%2Feditorial%2F2012%2F08%2F03%2F48491210-most-expensive-summer-camps-cover1.600x400.jpg%3Fv%3D1346631655&imgrefurl=https%3A%2F%2Fwww.cnbc.com%2F2012%2F08%2F07%2FHigh-End-Summer-Camps.html&docid=PZyY5KX6KVgo2M&tbnid=8LNxMFlva7GyXM%3A&vet=10ahUKEwiBhN_0s4PbAhUKQ48KHdq-AAAQMwjtASgCMAI..i&w=600&h=400&bih=647&biw=1366&q=camps&ved=0ahUKEwiBhN_0s4PbAhUKQ48KHdq-AAAQMwjtASgCMAI&iact=mrc&uact=8"},
        {name:"hill", image: "https://www.google.co.in/imgres?imgurl=http%3A%2F%2Fwww.momsteam.com%2Ffiles%2Fimages%2FSummer_camp_tents.jpg&imgrefurl=http%3A%2F%2Fwww.momsteam.com%2Fhealth-safety%2Fpreventing-sexual-abuse-at-summer-camp-five-tips-for-parents&docid=aDcqvbDw_y4MVM&tbnid=w3Vbpzz982tWRM%3A&vet=10ahUKEwjDtJ691O7aAhXJpY8KHTZQBIUQMwjuASgDMAM..i&w=453&h=265&bih=647&biw=1366&q=camps&ved=0ahUKEwjDtJ691O7aAhXJpY8KHTZQBIUQMwjuASgDMAM&iact=mrc&uact=8"},
        {name:"plane", image: "https://www.google.co.in/imgres?imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fe%2Fef%2FWilderness_Adventure_Camps.jpg&imgrefurl=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3AWilderness_Adventure_Camps.jpg&docid=SmxB6A_5eDh9RM&tbnid=G4EYltGkoGFz0M%3A&vet=10ahUKEwjDtJ691O7aAhXJpY8KHTZQBIUQMwjrASgAMAA..i&w=2288&h=1712&bih=647&biw=1366&q=camps&ved=0ahUKEwjDtJ691O7aAhXJpY8KHTZQBIUQMwjrASgAMAA&iact=mrc&uact=8"},
];

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds : campgrounds});    
});

app.post("/campgrounds", function(req, res){
    var name = req.body.name;     /*to get the data from the form*/
    var image = req.body.image;
    var newCampground = {name : name, image : image};
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server started ... ");
});