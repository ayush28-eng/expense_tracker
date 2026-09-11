import { useEffect, useState } from "react";
import { Navbar } from "./components/Navbar";
import { Card } from "./components/Card";
import { Expenseform } from "./components/Expenseform";
import { ExpenseChart } from "./components/Expensechart";
import { TransactionList } from "./components/Transactionlist";
import { Budget } from "./components/Budget";

function App() {
  const [transactions, setTransactions] = useState([]);

  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );

  const [budget, setBudget] = useState(0);

  useEffect(() => {
    fetch("http://localhost:5000/api/transactions")
      .then((res) => res.json())
      .then((data) => {
        setTransactions(data);
      })
      .catch((error) => {
        console.log("Failed to fetch transactions:", error);
      });
  }, []);

  useEffect(() => {
    const savedBudget = localStorage.getItem(
      `monthlyBudget-${selectedMonth}`
    );

    setBudget(savedBudget ? Number(savedBudget) : 0);
  }, [selectedMonth]);

  function handleBudgetChange(newBudget) {
    setBudget(newBudget);

    localStorage.setItem(
      `monthlyBudget-${selectedMonth}`,
      newBudget
    );
  }

  function addTransaction(transaction) {
    setTransactions((prev) => [transaction, ...prev]);
  }

  function deleteTransaction(id) {
    setTransactions((prev) =>
      prev.filter((item) => item._id !== id)
    );
  }

  function updateTransaction(updatedTransaction) {
    setTransactions((prev) =>
      prev.map((item) =>
        item._id === updatedTransaction._id
          ? updatedTransaction
          : item
      )
    );
  }

  const income = transactions
    .filter((item) => item.type === "income")
    .reduce(
      (total, item) => total + Number(item.amount),
      0
    );

  const expenses = transactions
    .filter((item) => item.type === "expense")
    .reduce(
      (total, item) => total + Number(item.amount),
      0
    );

  const balance = income - expenses;

  const monthlyExpenses = transactions
    .filter((item) => {
      if (item.type !== "expense") {
        return false;
      }

      const date = new Date(
        item.date || item.createdAt
      );

      const month = date.toISOString().slice(0, 7);

      return month === selectedMonth;
    })
    .reduce(
      (total, item) => total + Number(item.amount),
      0
    );

  return (
    <div className="min-h-screen bg-gray-50">

      <Navbar />

      <main className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6">

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
            Expense Tracker
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Log transactions and see where your money goes.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

          <Card
            title="Income"
            amount={income}
            type="income"
          />

          <Card
            title="Expenses"
            amount={expenses}
            type="expense"
          />

          <Card
            title="Balance"
            amount={balance}
            type="balance"
          />

        </div>

        <div className="mt-4">
          <Budget
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
            budget={budget}
            onBudgetChange={handleBudgetChange}
            monthlyExpenses={monthlyExpenses}
          />
        </div>

        <div className="mt-4">
          <ExpenseChart
            budget={budget}
            monthlyExpenses={monthlyExpenses}
            selectedMonth={selectedMonth}
          />
        </div>

        <div className="mt-4">
          <Expenseform
            onAddTransaction={addTransaction}
          />
        </div>

        <div className="mt-4">
          <TransactionList
            transactions={transactions}
            onDelete={deleteTransaction}
            onUpdate={updateTransaction}
          />
        </div>

      </main>

    </div>
  );
}

export default App;