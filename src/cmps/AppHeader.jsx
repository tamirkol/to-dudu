import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'



export function AppHeader() {

    return (
        <header className="app-header">
            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/todo">Todos</NavLink>
            </nav>
            <div className='logo-container'><img className='logo' src={"./src/assets/img/to_dudu character.png"} /><h1 className='logo-text'>To dudu</h1></div>
        </header>
    );
}