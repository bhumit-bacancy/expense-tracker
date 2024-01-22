import React, { useDebugValue, useState } from "react";

export default function AddTransaction(props) {
  const [data, setData] = useState({
    description: "",
    category_id: "",
    date: "",
    transaction_type: "",
    bank_id: "",
    amount: "",
    user_id: props.user.id,
  });

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_BASE_URL}/expenses`, {
      method: "POST",
      body: JSON.stringify({ expense: data }),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        props.setExpenses({
          expenses: data.data,
          loading: false,
        });
        console.log(data);
        setData({
          description: "",
          category_id: "",
          date: "",
          transaction_type: "",
          bank_id: "",
          amount: "",
          user_id: props.user.id,
        });
      });
  }

  function handleChange(e) {
    console.log(e.target);
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  }

  useDebugValue(data);
  const radio_style = {
    paddingLeft: "2.5em",
    marginRight: 0,
  };
  return (
    <>
      <div className="card mt-4">
        <div className="card-body">
          <h5 className="card-title">Add Transaction</h5>
          <hr />
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="mb-3 opacity-75">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  name="description"
                  className="form-control"
                  id="description"
                  rows="4"
                  value={data.description}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row opacity-75">
              <div className="mb-3 col-6">
                <label htmlFor="category_id" className="form-label">
                  Category
                </label>
                <select
                  name="category_id"
                  value={data.category_id}
                  onChange={handleChange}
                  className="form-select"
                  id="category_id"
                >
                  <option defaultValue>Select category</option>
                  {JSON.parse(localStorage.getItem("categories")).map(
                    (elem) => {
                      return <option key={elem.id} value={parseInt(elem.id)}>{elem.name}</option>
                    }
                  )}
                </select>
              </div>
              <div className="mb-3 col-6">
                <label htmlFor="date" className="form-label">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  onChange={handleChange}
                  value={data.date}
                  className="form-control"
                  id="date"
                />
              </div>
            </div>
            <div className="row mt-3">
              <label htmlFor="transaction_type" className="form-label">
                Type
              </label>
              <div
                style={radio_style}
                className="form-check col-3 form-check-inline"
              >
                <input
                  className="form-check-input"
                  type="radio"
                  name="transaction_type"
                  id="cash"
                  defaultValue="Cash"
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="cash">
                  Cash
                </label>
              </div>
              <div
                style={radio_style}
                className="form-check col-3 form-check-inline"
              >
                <input
                  className="form-check-input"
                  type="radio"
                  name="transaction_type"
                  id="cheque"
                  defaultValue="Cheque"
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="cheque">
                  Cheque
                </label>
              </div>
              <div
                style={radio_style}
                className="form-check col-3 form-check-inline"
              >
                <input
                  className="form-check-input"
                  type="radio"
                  name="transaction_type"
                  id="credit-card"
                  defaultValue="CreditCard"
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="credit-card">
                  Credit Card
                </label>
              </div>
              <div
                style={radio_style}
                className="form-check col-3 form-check-inline"
              >
                <input
                  className="form-check-input"
                  type="radio"
                  name="transaction_type"
                  id="Transfer"
                  defaultValue="Transfer"
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="transfer">
                  Transfer
                </label>
              </div>
            </div>
            <div className="row opacity-75 mt-3">
              <div className="mb-3 col-6">
                <label htmlFor="bank_id" className="form-label">
                  Bank Name
                </label>
                <select
                  name="bank_id"
                  onChange={handleChange}
                  value={data.bank_id}
                  className="form-select"
                  id="bank_id"
                >
                  <option defaultValue>Select bank</option>
                  {JSON.parse(localStorage.getItem("banks")).map(
                    (elem) => {
                      return <option key={elem.id} value={elem.id}>{elem.name}</option>
                    }
                  )}
                </select>
              </div>
              <div className="mb-3 col-6">
                <label htmlFor="amount" className="form-label">
                  Amount
                </label>
                <input
                  type="text"
                  name="amount"
                  className="form-control"
                  placeholder="Enter amount"
                  id="amount"
                  value={data.amount}
                  onChange={handleChange}
                />
              </div>
            </div>
            <button type="submit" className="btn btn-success">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
