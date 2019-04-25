var express     = require("express"),
    app         = express(),
    request     = require("request"),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose")

mongoose.connect("mongodb://localhost/yelp_camp");

var campgroundSchema = new mongoose.Schema({
    name : String,
    image : String,
    description : String
});

var Campground = mongoose.model("Campground", campgroundSchema);

/*Campground.create({
    name:"mountain",
    image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBJO6TI2IuQBrEHBFVuqrn4ybFNGrkSviGCKxk9IJeHTy_QFOh2A",
    description : "this is a beautiful hill..."
    }, function(err, campground){
        if (err){
            console.log(err);
        }
        else{
            console.log("newly created campground...");
            console.log(campground);
        }
    }
);*/

app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if (err) {
            console.log(err);
        }
        else {
            res.render("index", {campgrounds : allCampgrounds}); 
        }
    });
});

app.post("/campgrounds", function(req, res){
    var name = req.body.name;     /*to get the data from the form*/
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name : name, image : image, description : desc};
    Campground.create(newCampground, function(err, newlyCreated){
        if (err){
            console.log(err);
        }
        else {
            res.redirect("/campgrounds");
        }
    });
});

app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});

app.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if (err){
            console.log(err);
        }
        else{
            res.render("show", {campground : foundCampground});
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server started ... ");
});