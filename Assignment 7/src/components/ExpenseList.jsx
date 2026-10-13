
function formatMoney(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2
  }).format(amount);
}

function ExpenseList({ expenses, onDeleteExpense }) {
  const sortedExpenses = [...expenses].sort(
    (a, b) => b.date.localeCompare(a.date)
  );

  return (
    <section className="panel">
      <div className="list-heading">
        <h2>Recent Expenses</h2>
        <span>{expenses.length} records</span>
      </div>

      {sortedExpenses.length === 0 ? (
        <p className="empty">
          No expenses recorded yet. Add your first expense above.
        </p>
      ) : (
        <div className="expense-list">
          {sortedExpenses.map((expense) => (
            <article className="expense-item" key={expense.id}>
              <div className="expense-icon">
                {expense.category === "Food" ? "🍽️" :
                 expense.category === "Travel" ? "🚌" :
                 expense.category === "Shopping" ? "🛍️" :
                 expense.category === "Education" ? "📚" :
                 expense.category === "Entertainment" ? "🎬" :
                 expense.category === "Health" ? "💊" :
                 expense.category === "Bills" ? "🧾" : "💳"}
              </div>

              <div className="expense-description">
                <h3>{expense.title}</h3>
                <p>
                  {expense.category} · {expense.date}
                </p>
              </div>

              <div className="expense-actions">
                <strong>{formatMoney(expense.amount)}</strong>
                <button
                  type="button"
                  className="delete-button"
                  onClick={() => onDeleteExpense(expense.id)}
                  aria-label={`Delete ${expense.title}`}
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default ExpenseList;
