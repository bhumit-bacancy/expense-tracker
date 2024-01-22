import React, { useState } from "react";
import AddTransaction from "./AddTransaction";
import RecentTransaction from "./RecentTransaction";

export default function TrackExpense(props) {
  const [expenses, setExpenses] = useState({
    expenses: [],
    loading: false,
  });
  return (
    <>
      <div className="text-center">
        <h3>Track Expense</h3>
      </div>
      <div className="row">
        <div style={{ width: "50%" }}>
          <AddTransaction
            user={props.user}
            expenses={expenses}
            setExpenses={setExpenses}
          />
        </div>
        <div style={{ width: "50%" }}>
          <RecentTransaction
            user={props.user}
            expenses={expenses}
            setExpenses={setExpenses}
          />
        </div>
      </div>
    </>
  );
}
