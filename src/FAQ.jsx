import { useState } from 'react'
import Answer from './Answer'

const styles = {
}

export default props => {
    const { questions } = props
    const [ visible, setVisible ] = useState(-1)

    return <div styles={styles}>
        {questions.map((q, idx) => <div>
            <h4 onClick={() => {console.log(idx);setVisible(idx)}}><strong>{q.title}</strong></h4>
            {idx === visible && <Answer summary={q.summary} />}
        </div>)}
    </div>
}