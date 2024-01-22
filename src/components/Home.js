import React, { useEffect, useState } from "react";
import PieChart from "./PieChart";
import moment from "moment";

export default function Home(props) {
  const [date, setDate] = useState({
    start_date: moment().format("YYYY-MM-D"),
    end_date: moment().format("YYYY-MM-D"),
  });
  const [expenses, setExpenses] = useState({
    expenses: [],
    loading: false,
  });

  function handleChange(e) {
    console.log(e.target);
    setDate({
      ...date,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch(
      `${process.env.REACT_APP_API_BASE_URL}/categories/sync_data?user_id=${props.user.id}&start_date=${date.start_date}&end_date=${date.end_date}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setExpenses({
          expenses: data.data.expenses,
          loading: false,
        });
        localStorage.setItem(
          "categories",
          JSON.stringify(data.data.categories)
        );
        localStorage.setItem("banks", JSON.stringify(data.data.banks));
        localStorage.setItem(
          "category_wise_data",
          JSON.stringify(data.data.category_wise_data)
        );
        localStorage.setItem(
          "bank_wise_data",
          JSON.stringify(data.data.bank_wise_data)
        );
      });
  }
console.log(expenses.expenses.length === 0 ? "hhh" : "hh")
  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_API_BASE_URL}/categories/sync_data?user_id=${props.user.id}&start_date=${date.start_date}&end_date=${date.end_date}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setExpenses({
          expenses: data.data.expenses,
          loading: false,
        });
        localStorage.setItem(
          "categories",
          JSON.stringify(data.data.categories)
        );
        localStorage.setItem("banks", JSON.stringify(data.data.banks));
        localStorage.setItem(
          "category_wise_data",
          JSON.stringify(data.data.category_wise_data)
        );
        localStorage.setItem(
          "bank_wise_data",
          JSON.stringify(data.data.bank_wise_data)
        );
      });
  }, []);

  return (
    <div className="user-card">
      <div>
        <h2 className="text-center">Your Expenses</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-3">
            <label htmlFor="start_date" className="form-label">
              From
            </label>
            <input
              type="date"
              name="start_date"
              onChange={handleChange}
              defaultValue={date.start_date}
              className="form-control"
              id="start_date"
            />
          </div>
          <div className="col-3">
            <label htmlFor="end_date" className="form-label">
              To
            </label>
            <input
              type="date"
              name="end_date"
              onChange={handleChange}
              value={date.end_date}
              className="form-control"
              id="end_date"
            />
          </div>
          <div className="mt-4 pt-2 col-3">
          <button type="submit" className="btn btn-success">
              Submit
            </button>
          </div>
        </div>
      </form>
      <div className="row">
        <div className="col-6">
          <PieChart value={"Category"} />
        </div>
        <div className="col-6">
          <PieChart value={"Bank"} />
        </div>
      </div>
      <hr />
      {props.user != null && (
        <div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Date</th>
                <th scope="col">Amount</th>
                <th scope="col">Bank</th>
                <th scope="col">Category</th>
              </tr>
            </thead>
            <tbody>
              {expenses.expenses.length !== 0 ? (expenses.expenses.map((element) => {
                return (
                  <tr key={element.id}>
                    <th scope="row">{element.id}</th>
                    <td>
                      {element.date}
                      <p className="opacity-75">{element.description}</p>
                    </td>
                    <td>₹ {element.amount}</td>
                    <td>{element.bank_name}</td>
                    <td>{element.category_name}</td>
                  </tr>
                );
              })) : <tr className="text-center"><td colSpan={5}>No Data</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
