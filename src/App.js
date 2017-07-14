import React, {PropTypes} from 'react'
import logo from './logo.svg'
import Header from './components/Header'
import './App.css'

const App = props => {
    return (
        <div className="App">
            {
            props.location.pathname !== '/login'
                ? <Header />
                : ''
            }
            <section className="App-body">
                {props.children}
            </section>
        </div>
    )
}

App.propTypes = {
    children: PropTypes.node
}

export default App
