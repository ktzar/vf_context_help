export default props => {
    const { title, summary } = props.answer
    function createMarkup() {
        return {__html: summary};
    }

    return <div>
        <h3>{title}</h3>
        <p dangerouslySetInnerHTML={createMarkup()}></p>
    </div>

}