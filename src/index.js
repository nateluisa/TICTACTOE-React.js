import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';


//class Square extends React.Component { // componente filho, 'controlado' tanto pelo componente pai quanto pelo state definido dentro do componente pai 
  /* constructor(props) { // construtor que inicia o estado
    super(props); // precisa sempre chamar o super em js ao definir o construtor de uma subClasse
      this.state = { // valor inicial null para iniciar privado p o componente que o definiu
        value: null,
      };
  } construtor removido pois nao sera definido estado vindo dele e sim do componente pai */ 

  //render() { // method que renderiza o element
  //  return (
  //    <button 
  //     className="square" // passou 2 props do pai para o filho (onClick e value)
  //     onClick={() => this.props.onClick()} // O pai passou onClick={() => this.handleClick(i)} para o filho, a função handleClick(i) será chamada quando o filho for clicado.
  //     >
  //      {this.props.value} 
  //    </button> // recebeu a prop do pai como valor 
  //  );
 // }
//}
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component { // componente pai
  constructor(props) { // construtor definido com array de 9 null iniciado
    super(props);
    this.state = { // state que vai definir o vencedor
      squares: Array(9).fill(null),
      xIsNext: true, // sempre que um jogador fizer uma jogada, xIsNext altera para determinar qual jogador será o próximo e o state do jogo salva
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return; // vai ignorar o click caso alguem tenha ganho ou se o filho ja estiver preenchido
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O'; // ternário que vai decidir de acordo com xIsNext
    this.setState({
      squares: squares, 
      xIsNext: !this.state.xIsNext, 
    });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      /> 
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Vencedor: ' + winner;
    } else {
      status = 'Próximo jogador: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return ( // status = bind para o próximo jogador
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

function calculateWinner(squares) {
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

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
