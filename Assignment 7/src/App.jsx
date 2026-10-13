
import { useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseAnalysis from "./components/ExpenseAnalysis";
import ExpenseList from "./components/ExpenseList";
import "./App.css";

function App() {
  const [expenses, setExpenses] = useState([]);

  function addExpense(expense) {
    setExpenses((previousExpenses) => [
      ...previousExpenses,
      expense
    ]);
  }

  function deleteExpense(id) {
    setExpenses((previousExpenses) =>
      previousExpenses.filter((expense) => expense.id !== id)
    );
  }

  return (
    <div className="app">
      <header className="header">
        <div>
          <p className="eyebrow">PERSONAL FINANCE</p>
          <h1>Expense Tracker</h1>
          <p>Record, monitor and analyze your daily spending.</p>
        </div>
        <div className="header-icon">₹</div>
      </header>

      <main className="container">
        <ExpenseAnalysis expenses={expenses} />

        <div className="content-grid">
          <ExpenseForm onAddExpense={addExpense} />

          <ExpenseList
            expenses={expenses}
            onDeleteExpense={deleteExpense}
          />
        </div>
      </main>

      <footer>
        Personal Expense Tracker · React Assignment 7
      </footer>
    </div>
  );
}

export default App;
