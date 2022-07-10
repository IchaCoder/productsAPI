const express = require("express");
const app = express();
require("dotenv").config();
const notFound = require("./middleware/not-found");
const productsRouter = require("./routes/products");
require("express-async-errors");
const errorHandlerMiddleware = require("./middleware/error-handler");
const connectDB = require("./db/connect");

app.use(express.json());

app.get("/", (req, res) => {
	res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>');
});

app.use("/api/v1/products", productsRouter);
app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

// const start = () => {
// 	app.listen(port, () => {
// 		console.log(`Server listening on port ${port}`);
// 	});
// };
const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		app.listen(port, () => {
			console.log(`Server listening on port ${port}`);
		});
	} catch (error) {
		console.log(error);
	}
};

start();
