import { useState } from 'react'
import Answer from './Answer'
import Tobi from './Tobi'

const styles = {
    padding: '20px'
}

const chevronStyle = {
    position: 'absolute',
    right: '50px',
    fontSize: '40px',
    color: 'red',
    marginTop: '-13px'
}

const scrollStyles = {
    overflow: 'auto',
    height: '600px'
}

const inputStyle = {
    width: '450px',
    height: '30px',
    padding: '16px 5px',
}

const buttonStyle = {
    cursor: 'pointer',
    border: '2px solid red',
    borderRadius: '10px',
    padding: '4px 8px',
    fontSize: '20px'
}

const questionStyle = {
    boxShadow: 'rgba(0,0,0,0.16) 0px 2px 8p',
    padding: '10px 20px'
}

export default props => {
    const { questions } = props
    const [ visible, setVisible ] = useState(-1)

    return <div style={styles}>
        <h3><strong>How can we help?</strong></h3>
        <p><input style={inputStyle} type="search" placeholder="🔎 Hello, how can we help?" /></p>
        <p>★ Recommened for you</p>
        <div style={scrollStyles}>
            {questions.map((q, idx) => <div style={questionStyle} >
                <h4 style={{...buttonStyle, borderColor: idx === visible ? 'red' : 'transparent'}} onClick={() => {setVisible(visible === idx ? -1 : idx)}}><strong>{q.title}</strong><span style={chevronStyle}>›</span></h4>
                {idx === visible && <Answer summary={q.summary} />}
            </div>)}
        </div>
        <hr/>
        <Tobi/>
    </div>
}