export function Card({ title, amount, type }) {
  return (
    <div className="flex-1 rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
      
      <p className="text-xs sm:text-sm text-gray-500">
        {title}
      </p>

      <p
        className={`mt-1 text-lg sm:text-xl font-medium ${
          type === "expense"
            ? "text-red-500"
            : type === "income"
            ? "text-blue-600"
            : "text-green-600"
        }`}
      >
        ${amount}
      </p>

    </div>
  );
}