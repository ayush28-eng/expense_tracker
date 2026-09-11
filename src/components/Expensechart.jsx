import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function ExpenseChart({
  budget,
  monthlyExpenses,
  selectedMonth,
}) {
  const remaining = Math.max(
    budget - monthlyExpenses,
    0
  );

  const percentageUsed =
    budget > 0
      ? Math.min(
          (monthlyExpenses / budget) * 100,
          100
        )
      : 0;

  const formattedMonth = new Date(
    `${selectedMonth}-01T00:00:00`
  ).toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });

  const chartData = [
    {
      name: "Spent",
      value: monthlyExpenses,
    },
    {
      name: "Remaining",
      value: remaining,
    },
  ];

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">

      <div className="mb-4">
        <h3 className="font-semibold text-gray-900">
          Budget Overview
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          {formattedMonth} spending
        </p>
      </div>

      {budget <= 0 ? (
        <div className="flex h-64 items-center justify-center rounded-lg border border-dashed border-gray-200">
          <div className="text-center">

            <p className="text-sm font-medium text-gray-500">
              No budget set
            </p>

            <p className="mt-1 text-xs text-gray-400">
              Set a monthly budget to see usage.
            </p>

          </div>
        </div>
      ) : (
        <>
          <div className="relative h-64 w-full">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <PieChart>

                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius="58%"
                  outerRadius="75%"
                  paddingAngle={2}
                  stroke="none"
                >
                  <Cell fill="#ef4444" />
                  <Cell fill="#e5e7eb" />
                </Pie>

                <Tooltip
                  formatter={(value, name) => [
                    `₹${Number(value).toLocaleString(
                      "en-IN"
                    )}`,
                    name,
                  ]}
                />

              </PieChart>
            </ResponsiveContainer>

            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">

              <div className="text-center">

                <p className="text-xs text-gray-400">
                  Used
                </p>

                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(percentageUsed)}%
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  ₹{monthlyExpenses.toLocaleString(
                    "en-IN"
                  )}
                </p>

              </div>

            </div>

          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">

            <div className="rounded-lg bg-red-50 p-3">

              <p className="text-sm text-gray-500">
                🔴 Spent
              </p>

              <p className="mt-2 font-semibold text-red-600">
                ₹{monthlyExpenses.toLocaleString(
                  "en-IN"
                )}
              </p>

            </div>

            <div className="rounded-lg bg-gray-50 p-3">

              <p className="text-sm text-gray-500">
                ⚪ Remaining
              </p>

              <p className="mt-2 font-semibold text-green-600">
                ₹{remaining.toLocaleString(
                  "en-IN"
                )}
              </p>

            </div>

          </div>

          <p className="mt-3 text-center text-xs text-gray-400">
            Monthly budget: ₹
            {budget.toLocaleString("en-IN")}
          </p>
        </>
      )}

    </div>
  );
}