import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

declare let module: any
if (module && module.hot) {
    module.hot.accept()
}

ReactDOM.render(<App name="fishcui" age= {26}/>, document.querySelector('#root'))