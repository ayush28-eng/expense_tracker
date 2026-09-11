export function Budget({
  selectedMonth,
  setSelectedMonth,
  budget,
  onBudgetChange,
  monthlyExpenses,
}) {
  const remaining = budget - monthlyExpenses;

  const percentage =
    budget > 0
      ? Math.min((monthlyExpenses / budget) * 100, 100)
      : 0;

  const formattedMonth = new Date(
    `${selectedMonth}-01T00:00:00`
  ).toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });

  function handleSubmit(e) {
    e.preventDefault();

    const amount = Number(e.target.budget.value);

    if (!amount || amount <= 0) {
      return;
    }

    onBudgetChange(amount);

    e.target.reset();
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">

      <div className="mb-5">
        <h3 className="font-semibold text-gray-900">
          Monthly Budget
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Set your budget for each month
        </p>
      </div>

      {/* Month */}
      <div className="mb-4">
        <label className="mb-1.5 block text-sm font-medium text-gray-600">
          Select Month
        </label>

        <input
          type="month"
          value={selectedMonth}
          onChange={(e) =>
            setSelectedMonth(e.target.value)
          }
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 outline-none focus:border-gray-500"
        />
      </div>

      {/* Budget */}
      <form
        onSubmit={handleSubmit}
        className="flex gap-2"
      >
        <input
          name="budget"
          type="number"
          min="1"
          placeholder={`Budget for ${formattedMonth}`}
          className="min-w-0 flex-1 rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-gray-500"
        />

        <button
          type="submit"
          className="rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-gray-800"
        >
          Set
        </button>
      </form>

      {budget > 0 && (
        <div className="mt-5">

          <div className="mb-4 text-center">
            <p className="text-sm font-medium text-gray-700">
              {formattedMonth}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">

            <div>
              <p className="text-xs text-gray-500">
                Budget
              </p>

              <p className="mt-1 font-semibold text-gray-900">
                ₹{budget.toLocaleString("en-IN")}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Spent
              </p>

              <p className="mt-1 font-semibold text-red-600">
                ₹{monthlyExpenses.toLocaleString("en-IN")}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Remaining
              </p>

              <p
                className={`mt-1 font-semibold ${
                  remaining >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                ₹{remaining.toLocaleString("en-IN")}
              </p>
            </div>

          </div>

          <div className="mt-5">

            <div className="mb-1 flex justify-between text-xs text-gray-500">
              <span>Budget used</span>

              <span>
                {Math.round(percentage)}%
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-gray-100">

              <div
                className={`h-full rounded-full ${
                  percentage >= 100
                    ? "bg-red-500"
                    : "bg-gray-900"
                }`}
                style={{
                  width: `${percentage}%`,
                }}
              />

            </div>

          </div>

          {remaining < 0 && (
            <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
              ⚠️ You have exceeded your monthly budget.
            </p>
          )}

        </div>
      )}

    </div>
  );
}