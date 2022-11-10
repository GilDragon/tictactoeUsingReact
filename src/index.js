import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

class Square extends React.Component {
    constructor(props) {
        super(props);
        //object/variable called state
        this.state = {
            clickcount: 0,
            value: this.props.num,
            goback: this.props.num,
            squarevalues: this.props.num
        }
    }


    render() {
        return (
            <button className="square"
            onClick={() => this.props.onClick()}
            >
            {this.props.num}
            </button>
        );
    }
}

class Board extends React.Component {
    constructor(props) {
        super(props); {
            this.state = {
                squarevalues: Array(9).fill(null),
                xIsNext: true,
            }
        }
    }
    handleClick(i) {
        const squares = this.state.squarevalues.slice();
        if (this.calculateWinner(this.state.squarevalues) || squares[i]) {
            return;
          }
          //if there is a winner or in a square has something return nothing
        if (this.state.xIsNext) {
            squares[i] = "X";
            this.setState({xIsNext: false});

        }
        else {
            squares[i] = "O";
            this.setState({xIsNext: true});
        }

        this.setState({squarevalues: squares}); 
    }
    renderSquare(i) {
        return <Square num={this.state.squarevalues[i]}
                onClick= {() => this.handleClick(i)}
                />;
    }
    calculateWinner(squares) {
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

    render() {
        const status1 = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        const winner = this.calculateWinner(this.state.squarevalues);

        let status;
        if (winner) {
          status = 'Winner: ' + winner;
        } else {
          status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
