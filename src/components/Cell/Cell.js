import React, { useEffect, useState } from 'react'
import './Cell.scss';

export default function Cell({ replay, winnerCell, winner, index, type, onClick }) {
  const [type_, switchType_] = useState('-');

  useEffect(() => {
    if (replay) {
      switchType_('-')
    }
  }, [replay])

  const onChange = () => {
    if (type_ === '-') {
      switchType_(type)
      onClick(type, index)
    }
  }

  return (
    <button disabled={winner} className={`cell-container ${winnerCell ? 'red' : 'black'}`} onClick={onChange}>{type_}</button>
  )
}
