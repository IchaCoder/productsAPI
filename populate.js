const Product = require("./models/product");
const jsonData = require("./products.json");
require("dotenv").config();
const connectDB = require("./db/connect");

const Populate = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		await Product.deleteMany();
		await Product.create(jsonData);
		console.log("Successful!!!");
		process.exit(0);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

Populate();
