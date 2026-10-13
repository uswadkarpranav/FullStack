
function formatMoney(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2
  }).format(amount);
}

function ExpenseAnalysis({ expenses }) {
  const total = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const categoryTotals = expenses.reduce((result, expense) => {
    result[expense.category] =
      (result[expense.category] || 0) + expense.amount;

    return result;
  }, {});

  const highestCategory = Object.entries(categoryTotals)
    .sort((a, b) => b[1] - a[1])[0];

  return (
    <section className="analysis">
      <div className="summary-card">
        <p>Total Expenses</p>
        <h2>{formatMoney(total)}</h2>
      </div>

      <div className="summary-card">
        <p>Number of Expenses</p>
        <h2>{expenses.length}</h2>
      </div>

      <div className="summary-card">
        <p>Highest Spending Category</p>
        <h2 className="category-heading">
          {highestCategory ? highestCategory[0] : "—"}
        </h2>
        <p>
          {highestCategory
            ? formatMoney(highestCategory[1])
            : "No expenses yet"}
        </p>
      </div>

      <section className="panel category-panel">
        <h2>Category-wise Analysis</h2>

        {Object.keys(categoryTotals).length === 0 ? (
          <p className="empty">Add expenses to see your analysis.</p>
        ) : (
          Object.entries(categoryTotals)
            .sort((a, b) => b[1] - a[1])
            .map(([category, amount]) => {
              const percentage = total > 0
                ? (amount / total) * 100
                : 0;

              return (
                <div className="category-row" key={category}>
                  <div className="category-info">
                    <span>{category}</span>
                    <strong>{formatMoney(amount)}</strong>
                  </div>

                  <div className="progress-track">
                    <div
                      className="progress-fill"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>

                  <small>{percentage.toFixed(1)}% of total</small>
                </div>
              );
            })
        )}
      </section>
    </section>
  );
}

export default ExpenseAnalysis;
