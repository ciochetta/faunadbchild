const dotenv = require("dotenv");
const express = require("express");
const body_parser = require("body-parser");
const faunadb = require("faunadb");
const q = faunadb.query;

dotenv.config();

const client = new faunadb.Client({
	secret: process.env.FAUNA_KEY,
});

const app = express();

app.use(body_parser.json());

app.post("", async (req, res) => {
	const databaseName = req.body.name;

	let result = {};

	result.createDatabaseResult = await client.query(
		q.CreateDatabase({ name: databaseName })
	);

	result.createKeyResult = await client.query(
		q.CreateKey({ role: "admin", database: q.Database(databaseName) })
	);

	res.status(200).json(result);
});

app.listen(3000, () => {
	console.log("Server is on");
});
