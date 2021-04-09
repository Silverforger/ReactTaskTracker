import PropTypes from 'prop-types'
import Button from './Button'
import { useLocation } from 'react-router-dom'

const Header = ({ title, onAdd, toggleAdd }) => {
    const location = useLocation()

    return (
        <header className='headerAll'>
            <h1 className='chigi'>{ title }</h1>
            {location.pathname === '/' && <Button color={!toggleAdd ? 'green' : 'red'} onClick = {onAdd} text={!toggleAdd ? 'Add' : 'Close'}/>}
        </header>
    )
}

Header.defaultProps = {
    title: 'Task Tracker',
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

// CSS in JS, use in line like <h1 style={headingStyle}>
// const headingStyle = {
//     color: 'red',
//     backgroundColor: 'black',
// }

export default Header
