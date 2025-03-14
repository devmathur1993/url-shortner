import express from "express";
import mongoose from "mongoose";
import { getOriginalUrl, shorturl } from "./controllers/url.js";

const app = express();

app.use(express.urlencoded({ extended: true })); //to get data from req.body

const port = 3000;

mongoose
	.connect(
		"mongodb+srv://devmathur420:DgV7H5LdRKjasYJu@cluster0.8foha.mongodb.net/",
		{ dbName: "urlShortner" }
	)
	.then(() => {
		console.log("database connected...");
	})
	.catch((err) => {
		console.log(err);
	});

app.get("/", (req, res) => {
	res.render("index.ejs", { shortURL: null });
});

app.post("/short", shorturl);

app.get("/:shortUrl", getOriginalUrl);

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
