import { React, useEffect, useState } from 'react';
import './App.scss';

const App = () => {
  const [displayedUsers, setDisplayedUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const totalUsers = 10;
  const perPage = 3;
  const totalPages = Math.ceil(totalUsers / perPage);

  const firstPrevButtonDisabled = isLoading || currentPage === 1;
  const nextLastPageButtonDisabled = isLoading || currentPage === totalPages;

  const APICall = () => {
    fetch(`https://jsonplaceholder.typicode.com/users?_page=${currentPage}&_limit=${perPage}`)
      .then((res) => res = res.json())
      .then((json) => {
        setDisplayedUsers(json);
        setIsLoading(false);
      })
      .catch(err => console.log(err, 'the err'));
  }

  useEffect(() => {
    APICall();
  }, []);

  useEffect(() => {
    APICall()
  }, [currentPage]);

  return (
    <div className="App">
      <header className="App-header">
        <table className="table">
          <thead>
            <tr>
              <td>ID</td>
              <td>Name</td>
              <td>Phone</td>
            </tr>
          </thead>

          {displayedUsers &&
            <tbody>
              {displayedUsers.map((data, key) => {
                return (
                  <tr key={key}>
                    <td>{data.id}</td>
                    <td>{data.username}</td>
                    <td>{data.phone}</td>
                  </tr>
                )
              })
              }
            </tbody>
          }
        </table>

        <div className="pagination">
          <button
            className="first-page-btn"
            onClick={() => setCurrentPage(1)}
            disabled={firstPrevButtonDisabled}
          >
            First
          </button>

          <button
            className="previous-page-btn"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={firstPrevButtonDisabled}
          >
            Prev
          </button>

          <button
            className="next-page-btn"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={nextLastPageButtonDisabled}
          >
            Next
          </button>

          <button
            className="last-page-btn"
            onClick={() => setCurrentPage(totalPages)}
            disabled={nextLastPageButtonDisabled}
          >
            Last
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
