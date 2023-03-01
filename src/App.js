import axios from "axios";
import React, { useState } from "react";

import "./App.css";

function App() {
  const [formValue, setFormValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let result;
    try {
      result = await axios.get("http://localhost:5000/search", {
        params: {
          search_expression: formValue,
        },
      });
    } catch (error) {
      console.error("Something go wrong" + error);
    }
    if (result.data.foods.total_results === "0") {
      alert("Found nothing");
      setSearchResult([]);
      return;
    }

    setSearchResult(result.data.foods.food);

    console.log(searchResult);
  };

  const handleChange = (e) => {
    setFormValue(e.target.value);
  };

  const renderResult = () => {
    if (searchResult.length > 0 && searchResult[0].food_name) {
      return searchResult.map((e, i) => {
        return (
          <tr key={e.food_id}>
            <th scope='row'>{i + 1}</th>
            <td>{e.food_name}</td>
            <td>{e.food_description}</td>
            <td>
              <button className='btn btn-info'>
                <a
                  href={e.food_url}
                  target='_blank'
                  rel='noopener noreferrer'
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  More info
                </a>
              </button>
            </td>
          </tr>
        );
      });
    }
  };

  return (
    <div className='App container my-5'>
      <form className='mb-5' onSubmit={handleSubmit}>
        <div class='input-group '>
          <input
            type='text'
            className='form-control bg-light border-0 '
            placeholder='Search for...'
            onChange={handleChange}
          />
          <div className='input-group-append'>
            <button className='btn btn-primary' onClick={handleSubmit} type='button'>
              Search
            </button>
          </div>
        </div>
      </form>

      {/* Result Table */}
      <table class='table'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Name</th>
            <th scope='col'>Quick fact</th>
            <th scope='col'>Check Nutrion in detail</th>
          </tr>
        </thead>
        <tbody>{renderResult()}</tbody>
      </table>
    </div>
  );
}

export default App;
