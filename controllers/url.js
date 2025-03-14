import shortid from "shortid";
import { Url } from "../models/Url.js";

export const shorturl = async (req, res) => {
	const longURL = req.body.url;
	const shortCode = shortid.generate();
	const shortURL = `http://localhost:3000/${shortCode}`;

	const newURL = new Url({ shortCode: shortCode, longUrl: req.body.url });
	await newURL.save();

	console.log(newURL);

	res.render("index.ejs", { shortURL });
};

export const getOriginalUrl = async (req, res) => {
	const shortCode = req.params.shortUrl;
	console.log("in original", shortCode);
	const longUrl = await Url.findOne({ shortCode });

	// res.json({ longUrl });

	res.redirect(longUrl.longUrl);
};
