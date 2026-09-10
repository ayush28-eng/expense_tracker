export function Expenseform() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
      
      {/* Expense / Income buttons */}
      <div className="grid grid-cols-2 gap-2">
        
        <button className="rounded-lg bg-red-500 px-4 py-3 text-sm font-semibold text-white">
          Expense
        </button>

        <button className="rounded-lg bg-gray-100 px-4 py-3 text-sm text-gray-700 transition hover:bg-gray-200">
          Income
        </button>

      </div>

      {/* Amount + Category */}
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        
        <div>
          <label className="mb-1.5 block text-xs sm:text-sm text-gray-600">
            Amount
          </label>

          <input
            type="number"
            placeholder="0.00"
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-gray-500"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs sm:text-sm text-gray-600">
            Category
          </label>

          <select className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-gray-500">
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
        <label className="mb-1.5 block text-xs sm:text-sm text-gray-600">
          Note (optional)
        </label>

        <input
          type="text"
          placeholder="Groceries, rent, etc."
          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-gray-500"
        />
      </div>

      {/* Add button */}
      <button className="mt-4 w-full rounded-lg bg-gray-900 py-3 text-sm font-semibold text-white transition hover:bg-gray-800">
        Add transaction
      </button>

    </div>
  );
}