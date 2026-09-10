import { Navbar } from "./components/Navbar";
import { Card } from "./components/Card";
import { Expenseform } from "./components/Expenseform";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      
      <Navbar />

      <main className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6">

        {/* Heading */}
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
            Expense tracker
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Log transactions and see where your money goes.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          
          <Card
            title="Income"
            amount="0"
            type="income"
          />

          <Card
            title="Expenses"
            amount="0"
            type="expense"
          />

          <Card
            title="Balance"
            amount="0"
            type="balance"
          />

        </div>

        {/* Form */}
        <div className="mt-4">
          <Expenseform />
        </div>

        {/* Chart Section */}
        <div className="mt-4 flex min-h-[120px] items-center justify-center rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">
            No expenses to chart yet.
          </p>
        </div>

        {/* Transactions */}
        <div className="mt-4 flex min-h-[120px] items-center justify-center rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">
            No transactions yet. Add your first one above.
          </p>
        </div>

      </main>

    </div>
  );
}

export default App;