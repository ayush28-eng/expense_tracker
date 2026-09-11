import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Transaction from "./models/Transaction.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error.message);
  });

app.get("/", (req, res) => {
  res.send("Expense Tracker Backend is running!");
});

app.get("/api/transactions", async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({
      createdAt: -1,
    });

    res.json(transactions);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch transactions",
    });
  }
});

app.post("/api/transactions", async (req, res) => {
  try {
    const transaction = await Transaction.create(req.body);

    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create transaction",
      error: error.message,
    });
  }
});

app.put("/api/transactions/:id", async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    res.json(transaction);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update transaction",
      error: error.message,
    });
  }
});

app.delete("/api/transactions/:id", async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(
      req.params.id
    );

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    res.json({
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete transaction",
    });
  }
});

// Render ke liye PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});