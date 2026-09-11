export function Card({ title, amount, type }) {
  const styles = {
    income: {
      text: "text-green-600",
      label: "Income",
    },
    expense: {
      text: "text-red-600",
      label: "Expenses",
    },
    balance: {
      text: "text-gray-900",
      label: "Balance",
    },
  };

  const style = styles[type];

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5">
      <p className="text-sm font-medium text-gray-500">
        {title}
      </p>

      <p
        className={`mt-2 break-words text-2xl font-bold sm:text-3xl ${style.text}`}
      >
        ₹{Number(amount).toLocaleString("en-IN")}
      </p>

      <p className="mt-2 text-xs text-gray-400">
        Total {style.label}
      </p>
    </div>
  );
}