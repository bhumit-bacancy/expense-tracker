import React, { useEffect, useState } from "react";

export default function RecentTransaction(props) {
  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_API_BASE_URL}/expenses?user_id=${props.user.id}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        props.setExpenses({
          expenses: data.data,
          loading: false,
        });
      });
  }, []);

  return (
    <>
      <div className="card mt-4">
        <div className="card-body">
          <h5 className="card-title">Recent Transactions</h5>
          <hr />
          <table className="table">
            <tbody>
              {props.expenses.expenses.slice(0, 5).map((element) => {
                return (
                  <tr key={element.id}>
                    <td>
                      {element.date}
                      <p className="opacity-75">{element.description}</p>
                    </td>
                    <td>₹ {element.amount}</td>
                    <td>{element.bank_name}</td>
                    <td>{element.category_name}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
