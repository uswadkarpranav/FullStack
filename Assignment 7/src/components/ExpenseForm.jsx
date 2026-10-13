
import { useState } from "react";

function ExpenseForm({ onAddExpense }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState(
    new Date().toISOString().slice(0, 10)
  );

  function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim() || Number(amount) <= 0 || !date) {
      return;
    }

    onAddExpense({
      id: crypto.randomUUID(),
      title: title.trim(),
      amount: Number(amount),
      category,
      date
    });

    setTitle("");
    setAmount("");
    setCategory("Food");
    setDate(new Date().toISOString().slice(0, 10));
  }

  return (
    <section className="panel">
      <h2>Add New Expense</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Expense Name</label>
        <input
          id="title"
          type="text"
          placeholder="e.g. Lunch, Bus Ticket"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label htmlFor="amount">Amount (₹)</label>
        <input
          id="amount"
          type="number"
          min="0.01"
          step="0.01"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Food</option>
          <option>Travel</option>
          <option>Shopping</option>
          <option>Education</option>
          <option>Entertainment</option>
          <option>Bills</option>
          <option>Health</option>
          <option>Other</option>
        </select>

        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <button type="submit">+ Add Expense</button>
      </form>
    </section>
  );
}

export default ExpenseForm;
