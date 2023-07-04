import React from 'react'
import './Cards.css';

export default function BoxForCards() {
  return (
    <div>
      <ul className='timeline'>
              <li className='selectedCard'>
                  <span className='textTime'>Pasado</span>
                  <div className='cardbox'></div>
              </li>
              <li className='selectedCard'>
                  <span className='textTime'>Presente</span>
                  <div className='cardbox'></div>
              </li>
              <li className='selectedCard'>
                  <span className='textTime'>Futuro</span>
                  <div className='cardbox'></div>
              </li>
      </ul>
    </div>
  )
}
