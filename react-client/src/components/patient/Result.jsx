import React, { useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap';

Results = (props) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState("0")
  const apiUrl = "http://localhost:5000/hospital/model";

  const fetchData = async () => {
    try {
      const response = await axios.get(apiUrl);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  setCount(props.label)

 // useEffect(() => {
    fetchData();
  //}, [count]);

  return (
    <div>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : (
        <div className="fill-window">
          <h1>Prediction for Heart symptoms Results</h1>
          <p>If results = 1,0 ---- heart disease is present</p>
          <p>If results = 0,1 ---- heart disease is not present</p>
          <br />
          <br />
          <table className="App-table">
            <tbody>
              <tr>
                <td className="App-td">
                  {data.row1 &&
                    data.row1.map((value, index) => <p key={index}>{value}</p>)}
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Results;