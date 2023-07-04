import React from 'react'
import Stellar from '../../assets/Stellar Journey.svg';
import Hands from '../../assets/hands-image.svg'
import Button from '../button/Button';
import './MainIntro.css'

export default function MainIntro() {
    return (
        <section className="main-intro">
            <div className="images">
                <img className="logo" src={Stellar} alt="Stellar Journey logo" />
                <img className="hands" src={Hands} alt="Hands holding some stars" />
            </div>
            <div className="text">
                <h1>Clow Tarot</h1>
                <p className='texto1'>Bienvenidos a nuestro reino astral, donde el pasado, el presente y el futuro 
                    se unen en una danza cósmica llena de significado y posibilidades.
                    ¡Prepárense para un viaje asombroso hacia la profundidad de sus almas y el conocimiento de su propio ser!</p>
            </div>
            <Button/>
        </section>
    )

}