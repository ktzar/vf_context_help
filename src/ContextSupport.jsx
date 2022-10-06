import { useEffect, useState } from 'react'
import Answer from './Answer'
import { containerStyles, buttonStyles, contentStyles } from './ContextSupport.styles'

const mappings = [
    {
        regexp: /broadband/,
        query: 'router'
    }
]



let sessionId = ''
const sessionGetterPromise = fetch('https://vodafoneuk.nanorep.co/~vodafoneuk/api/widget/v1/hello?internal=true&url=https%3A%2F%2Fsupport.vodafone.co.uk%2F%3Fusertype%3DConsumer&configId=903094272&kb=1393509392&nostats=false&context=usertype%3AConsumer&widgetType=embed')
    .then(d => d.json())
    .then(d => sessionId = d.sessionId)

export default (props) => {
    const [ opened, setOpened ] = useState(false)
    const [ questions, setQuestions ] = useState([])

    const fetchHelp = async (term) => {
        await sessionGetterPromise
        fetch(`https://vodafoneuk.nanorep.co/~vodafoneuk/api/kb/v1/search?sid=${sessionId}&text=${term}`)
            .then(res => res.json())
            .then(data => setQuestions(data.answers))
    }

    useEffect(() => {
        for (let mapping of mappings) {
            if (document.location.href.match(mapping.regexp)) {
                fetchHelp(mapping.query)
                break
            }
        }
    }, [])

    const toggleOpen = () => {
        setOpened(!opened)
    }

    const extraStyles = opened
        ? { right: '200px'}
        : { right: 'px'}

    return <div style={{...extraStyles, ...containerStyles}}>
        <button onClick={toggleOpen} style={buttonStyles}>
                Hello from Source:web
            </button>
        {opened && <div style={contentStyles}>
            {questions.map(q => <Answer answer={q}/>)}
            </div>}
    </div>}