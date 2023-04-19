import Layout from "./Layout";
import React, { useState } from "react";
import { Stack } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router";

const styles = {
  width: "200px",
  margin: "auto",
  marginTop: "20px",
};
const pStyle = {
  color: "green",
};

export default function Game() {
  const [layout, setLayout] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const winner = calculateWinner(layout);

  const navigate = useNavigate();

  const handleClick = (i) => {
    const newLayout = [...layout];
    if (winner || newLayout[i]) {
      return;
    }
    newLayout[i] = xIsNext ? "X" : "O";
    setLayout(newLayout);
    setXIsNext(!xIsNext);
  };
  const handleRestart = () => {
    setLayout(Array(9).fill(null));
    setXIsNext(true);
  };
  const onBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <React.Fragment>
      <Layout boxes={layout} onClick={handleClick} />
      <div style={styles}>
        <p style={pStyle}>
          <h2>
            {winner
              ? "Winner: " + winner
              : "Next Player: " + (xIsNext ? "X" : "O")}
          </h2>
        </p>
      </div>
      <Stack gap={2} className="col-md-5 mx-auto">
        <Button variant="secondary" onClick={handleRestart}>
          Restart
        </Button>
        <Button variant="danger" onClick={onBack}>
          Back
        </Button>
      </Stack>
    </React.Fragment>
  );
}

export function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
