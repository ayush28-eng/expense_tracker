import { useState } from "react";

export function TransactionList({ transactions, onDelete, onUpdate }) {
  const [editingId, setEditingId] = useState(null);

  const [editType, setEditType] = useState("expense");
  const [editAmount, setEditAmount] = useState("");
  const [editCategory, setEditCategory] = useState("Food");
  const [editNote, setEditNote] = useState("");

  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  function startEdit(item) {
    setEditingId(item._id);
    setEditType(item.type);
    setEditAmount(item.amount);
    setEditCategory(item.category);
    setEditNote(item.note || "");
  }

  function cancelEdit() {
    setEditingId(null);
    setEditAmount("");
    setEditNote("");
  }

  async function saveEdit(id) {
    if (!editAmount || Number(editAmount) <= 0) {
      return;
    }

    const updatedTransaction = {
      type: editType,
      amount: Number(editAmount),
      category: editCategory,
      note: editNote,
    };

    try {
      const response = await fetch(
        `http://localhost:5000/api/transactions/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTransaction),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update transaction"
        );
      }

      onUpdate(data);
      setEditingId(null);
    } catch (error) {
      console.log("Update error:", error.message);
    }
  }

  async function handleDelete(id) {
    onDelete(id);

    try {
      const response = await fetch(
        `http://localhost:5000/api/transactions/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete transaction");
      }
    } catch (error) {
      console.log("Delete error:", error.message);
    }
  }

  function formatDate(date) {
    if (!date) return "No date";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  const filteredTransactions = transactions.filter((item) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      item.category.toLowerCase().includes(searchText) ||
      (item.note || "").toLowerCase().includes(searchText);

    const matchesType =
      filterType === "all" || item.type === filterType;

    const matchesCategory =
      filterCategory === "all" ||
      item.category === filterCategory;

    return matchesSearch && matchesType && matchesCategory;
  });

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">

      {/* Header */}
      <div className="mb-5">
        <h3 className="font-semibold text-gray-900">
          Transaction History
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Search and manage your transactions
        </p>
      </div>

      {/* Search */}
      <div className="mb-3">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search category or note..."
          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
        />
      </div>

      {/* Filters */}
      <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2">

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
        >
          <option value="all">All Categories</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Shopping">Shopping</option>
          <option value="Bills">Bills</option>
          <option value="Other">Other</option>
        </select>

      </div>

      {/* Transaction Count */}
      <div className="mb-3">
        <p className="text-xs text-gray-400">
          Showing {filteredTransactions.length} of{" "}
          {transactions.length} transactions
        </p>
      </div>

      {/* Transactions */}
      {filteredTransactions.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-200 py-10 text-center">
          <p className="text-sm font-medium text-gray-500">
            No transactions found
          </p>

          <p className="mt-1 text-xs text-gray-400">
            Try changing your search or filters.
          </p>
        </div>
      ) : (
        <div className="space-y-3">

          {filteredTransactions.map((item) => (

            <div
              key={item._id}
              className="rounded-lg border border-gray-100 p-3 transition hover:border-gray-200 hover:shadow-sm sm:p-4"
            >

              {/* Edit Mode */}
              {editingId === item._id ? (

                <div className="space-y-3">

                  {/* Type */}
                  <div className="grid grid-cols-2 gap-2">

                    <button
                      type="button"
                      onClick={() => setEditType("expense")}
                      className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                        editType === "expense"
                          ? "bg-red-500 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      Expense
                    </button>

                    <button
                      type="button"
                      onClick={() => setEditType("income")}
                      className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                        editType === "income"
                          ? "bg-green-500 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      Income
                    </button>

                  </div>

                  {/* Amount */}
                  <input
                    type="number"
                    value={editAmount}
                    onChange={(e) =>
                      setEditAmount(e.target.value)
                    }
                    placeholder="Amount"
                    min="0"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-gray-500"
                  />

                  {/* Category */}
                  <select
                    value={editCategory}
                    onChange={(e) =>
                      setEditCategory(e.target.value)
                    }
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 outline-none focus:border-gray-500"
                  >
                    <option>Food</option>
                    <option>Travel</option>
                    <option>Shopping</option>
                    <option>Bills</option>
                    <option>Other</option>
                  </select>

                  {/* Note */}
                  <input
                    type="text"
                    value={editNote}
                    onChange={(e) =>
                      setEditNote(e.target.value)
                    }
                    placeholder="Note"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-gray-500"
                  />

                  {/* Edit Buttons */}
                  <div className="flex gap-2">

                    <button
                      onClick={() => saveEdit(item._id)}
                      className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-800"
                    >
                      Save
                    </button>

                    <button
                      onClick={cancelEdit}
                      className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-200"
                    >
                      Cancel
                    </button>

                  </div>

                </div>

              ) : (

                /* Normal Mode */
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                  {/* Left */}
                  <div className="min-w-0">

                    <div className="flex items-center gap-2">

                      <span
                        className={`h-2 w-2 rounded-full ${
                          item.type === "income"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      />

                      <p className="font-semibold text-gray-900">
                        {item.category}
                      </p>

                    </div>

                    <p className="mt-1 truncate text-sm text-gray-500">
                      {item.note || "No note"}
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      {formatDate(item.date || item.createdAt)}
                    </p>

                  </div>

                  {/* Right */}
                  <div className="flex flex-wrap items-center gap-2 sm:justify-end">

                    <p
                      className={`mr-1 font-semibold ${
                        item.type === "income"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {item.type === "income"
                        ? "+"
                        : "-"}
                      ₹
                      {Number(item.amount).toLocaleString(
                        "en-IN"
                      )}
                    </p>

                    <button
                      onClick={() => startEdit(item)}
                      className="rounded-md bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-600 transition hover:bg-blue-100 hover:text-blue-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(item._id)}
                      className="rounded-md bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-600 transition hover:bg-red-100 hover:text-red-600"
                    >
                      Delete
                    </button>

                  </div>

                </div>

              )}

            </div>

          ))}

        </div>
      )}

    </div>
  );
}