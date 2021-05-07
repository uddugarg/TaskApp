import React from 'react'
import Button from './Button'

const Header = ({ title, toggleAdd }) => {

    
    return (
        <header className='header'>
            <h1>{title}</h1>
            <Button color='steelblue' text='Add' onClick={toggleAdd} />
        </header>
    )
}

// const styles = {
//     color: 'blue',
//     backgroundColor: 'black'
// }

export default Header
