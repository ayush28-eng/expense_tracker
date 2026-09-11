import { useState } from "react";

export function Expenseform({ onAddTransaction }) {
  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [note, setNote] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!amount || Number(amount) <= 0) {
      return;
    }

    const transaction = {
      type,
      amount: Number(amount),
      category,
      note,
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/transactions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(transaction),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to add transaction"
        );
      }

      onAddTransaction(data);

      setAmount("");
      setNote("");

    } catch (error) {
      console.log("Error:", error.message);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5"
    >
      {/* Heading */}
      <div className="mb-5">
        <h3 className="font-semibold text-gray-900">
          Add Transaction
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Record your income or expense
        </p>
      </div>

      {/* Type */}
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => setType("expense")}
          className={`rounded-lg px-4 py-3 text-sm font-semibold transition ${
            type === "expense"
              ? "bg-red-500 text-white shadow-sm"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Expense
        </button>

        <button
          type="button"
          onClick={() => setType("income")}
          className={`rounded-lg px-4 py-3 text-sm font-semibold transition ${
            type === "income"
              ? "bg-green-500 text-white shadow-sm"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Income
        </button>
      </div>

      {/* Amount + Category */}
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-600">
            Amount
          </label>

          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
              ₹
            </span>

            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              min="0"
              step="0.01"
              className="w-full rounded-lg border border-gray-300 py-2.5 pl-8 pr-3 outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-600">
            Category
          </label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
          >
            <option>Food</option>
            <option>Travel</option>
            <option>Shopping</option>
            <option>Bills</option>
            <option>Other</option>
          </select>
        </div>

      </div>

      {/* Note */}
      <div className="mt-4">
        <label className="mb-1.5 block text-sm font-medium text-gray-600">
          Note
          <span className="ml-1 font-normal text-gray-400">
            (optional)
          </span>
        </label>

        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Groceries, rent, salary..."
          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="mt-4 w-full rounded-lg bg-gray-900 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-800 active:scale-[0.99]"
      >
        Add Transaction
      </button>
    </form>
  );
}