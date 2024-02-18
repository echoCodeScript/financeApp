// Import necessary modules
import express from "express"; // Import the Express.js framework
import bodyParser from "body-parser"; // Import middleware for parsing request bodies
import mongoose from "mongoose"; // Import Mongoose ODM for MongoDB interaction
import cors from "cors"; // Import middleware for handling Cross-Origin Resource Sharing (CORS)
import helmet from "helmet"; // Import middleware for security headers
import dotenv from "dotenv"; // Import module for loading environment variables from a .env file
import morgan from "morgan"; // Import middleware for logging HTTP requests
import kpiRoutes from "./routes/kpi.js";
import KPI from "./models/KPI.js";
import { kpis, products, transactions } from "./data/data.js";
import productRoutes from "./routes/product.js";
import Product from "./models/Product.js";
import Transaction from "./models/Transaction.js"
import transactionRoutes from "./routes/transaction.js"

// Load environment variables from .env file
dotenv.config();

// Create an Express.js application instance
const app = express();

// Configure middleware for parsing JSON request bodies
app.use(express.json());

// Apply Helmet security middleware for various security headers
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); // Specifically set Cross-Origin Resource Policy (CORP) header

// Apply Morgan middleware for logging HTTP requests in a common format
app.use(morgan("common"));

// Configure alternative body parsing middleware for URL-encoded forms
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Enable CORS middleware to allow requests from different origins
app.use(cors());

app.use("/kpi", kpiRoutes);
app.use("/product", productRoutes);
app.use("/transaction", transactionRoutes);

// mongoose setup
const PORT = process.env.PORT;
mongoose
  .connect(process.env.MONGO_URL)
  .then(async () => {
    app.listen(PORT, () => console.log(`Server is running on Port ${PORT}✨`));
    //for testing and developing phase.
    //insert for the first time and comment it so that there will be no dupicacy,
  // await mongoose.connection.db.dropDatabase();
    // KPI.insertMany(kpis);
    // Product.insertMany(products);
    // Transaction.insertMany(transactions);
  })
  .catch((error) => console.log(`${error} did not connect`));
