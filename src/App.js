import { useEffect, useState } from 'react';
import './App.scss';
import Cell from './components/Cell/Cell';
import { possibleWin } from './constants';

const boardInitialState = { 'X': [], 'O': [] };

function App() {
  const [type, switchType] = useState('X');
  const [board, setBoard] = useState(boardInitialState);
  const [winner, setWinner] = useState(false);
  const [replay, setReplay] = useState(false);
  const [winnerCells, setWinnerCells] = useState([]);

  useEffect(() => {
    let temp = possibleWin.map(i => board[type === 'X' ? 'O' : 'X'].filter(val => i.includes(val)))
    temp.map(i => {
      if (i.length === 3) {
        setWinner(true)
        setWinnerCells(i)
      }
    })
  }, [board])

  const onClick = (type, index) => {
    if (replay) {
      setReplay(false)
    }
    switchType(type === 'X' ? 'O' : 'X');
    setBoard({ ...board, [type]: [...board[type], index] });
  }

  const replayGame = () => {
    switchType('X')
    setWinner(false)
    setWinnerCells([])
    setBoard(boardInitialState)
    setReplay(true)
  }

  return (
    <>
      <div className='grid'>
        {Array.from({ length: 9 }).map((e, index) =>
          <Cell replay={replay} winner={winner} winnerCell={winnerCells.includes(index)}
            key={index} onClick={onClick} type={type} index={index} />)}
      </div>
      <div>{!winner ? `Turno de ${type}` : `Ganador ${type === 'O' ? 'X' : 'O'}`}</div>
      <button onClick={replayGame}>Replay</button>
    </>
  );
}

export default App;
