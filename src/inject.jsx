import ReactDOM from 'react-dom'
import React from 'react'
import ContextSupport from './ContextSupport'


function init() {
    const container = document.createElement("div")
    document.body.appendChild(container)
    const el = document.createElement("input")
    el.setAttribute("type", "checkbox")
    document.body.appendChild(el)
    el.addEventListener("click", (event) => {
        console.log(event.target.checked)
    })

    ReactDOM.render(<ContextSupport />, container)
}

init()