var express = require('express');
var request = require('request');
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");

 apiKey = ""; // Enter your OMDb API key here. It should look somewhat like this: '44a76107'

app.get("/", function (req, res) {
    res.render("search");
});

app.get("/results", function (req, res) {
    var searchTerm = req.query.searchTerm;
    var searchURL = "http://omdbapi.com/?s=" + searchTerm + "&apikey=" + apiKey;
    request(searchURL, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var results = JSON.parse(body);
            if (results.Error) {
                res.render("notfound");
                console.log("An error occured! Details below:");
                console.log(results);
            } else {
                res.render("results", { results: results });
            }
        } else {
            res.send("Sorry! An internal error occured!");
            console.log(error);
        }
    });
});

app.get("/movieinfo", function (req, res) {
    var movieId = req.query.movieId;
    var searchURL = "http://omdbapi.com/?i=" + movieId + "&plot=full&apikey=" + apiKey;
    request(searchURL, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var movie = JSON.parse(body);
            console.log(movie);
            if (movie.Error) {
                res.render("notfound");
                console.log("An error occured! Details below:");
                console.log(results);
            } else {
                res.render("movieinfo", { movie: movie });
            }
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log("Server is online on port " + PORT);
});
