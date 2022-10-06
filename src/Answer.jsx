export default props => {
    const { summary } = props
    function createMarkup() {
        return {__html: summary};
    }

    return <p dangerouslySetInnerHTML={createMarkup()}></p>
}