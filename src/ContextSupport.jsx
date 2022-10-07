import { useEffect, useState } from 'react';
import FAQ from './FAQ'
import {
	containerStyles,
	buttonStyles,
	contentStyles
} from './styles/ContextSupport.styles';

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

const mappings = [
	{
		regexp: /\/mobile-broadband-deals/,
		query: 'tethering'
	},
	{
		regexp: /\/checkout/,
		query: 'first bill'
	},
	{
		regexp: /\/pay-monthly-contracts/,
		query: 'pay monthly'
	},
	{
		regexp: /\/best-sim-only-deals/,
		query: 'simo'
	},
	{
		regexp: /full-fibre/,
		query: 'speed'
	},
	{
		regexp: /\/smart-watches-and-wearables/,
		query: 'watch'
	},
	{
		regexp: /\/broadband/,
		query: 'router'
	},
	{
		regexp: /basket/,
		query: async () => {
            const basketId = getCookie('basketId')
            return fetch('https://www.vodafone.co.uk/basket/api/basket/v2/basket/' + basketId)
                .then(d => d.json())
                .then(basket => {
                    const hasBroadband = basket?.packages.some(p => p.planType.toLowerCase().includes('broadband'))
                    const hasBingo = basket?.packages.some(p => p.planType.toLowerCase().includes('bingo'))
                    console.log({basket, hasBingo, hasBroadband})

                    if (hasBroadband) return 'installation'
                    if (hasBingo) return 'activate sim'

                })

        } 
	},
];

let sessionId = '';
const sessionGetterPromise = fetch(
	'https://vodafoneuk.nanorep.co/~vodafoneuk/api/widget/v1/hello?internal=true&url=https%3A%2F%2Fsupport.vodafone.co.uk%2F%3Fusertype%3DConsumer&configId=903094272&kb=1393509392&nostats=false&context=usertype%3AConsumer&widgetType=embed'
)
	.then((d) => d.json())
	.then((d) => (sessionId = d.sessionId));

export default (props) => {
	const [opened, setOpened] = useState(false);
	const [questions, setQuestions] = useState([]);

	const fetchHelp = async (term) => {
		await sessionGetterPromise;
		fetch(
			`https://vodafoneuk.nanorep.co/~vodafoneuk/api/kb/v1/search?sid=${sessionId}&text=${term}`
		)
			.then((res) => res.json())
			.then((data) => setQuestions(data.answers));
	};

	useEffect(() => {
        async function fetchMappings () {
            for (let mapping of mappings) {
                if (document.location.href.match(mapping.regexp)) {
                    if (typeof mapping.query === 'function') {
                        const term = await mapping.query()
                        fetchHelp(term);
                    } else {
                        fetchHelp(mapping.query);
                    }
                    break;
                }
            }
        }
        fetchMappings()
	}, []);

	const toggleOpen = () => {
		setOpened(!opened);
	};

	const extraStyles = opened ? { left: '500px' } : { left: '0px' };
    const symbol = opened ? '⌃': '⌄'

	return (
		<div style={{ ...extraStyles, ...containerStyles }}>

            <div style={{padding: '10px 20px'}}>
                <button onClick={toggleOpen} style={buttonStyles}>
                Ask me anything {symbol}
                </button>
            </div>
			<div style={{}}>
                <div style={{...contentStyles}}>
                    <FAQ questions={questions} />
                </div>
			</div>
		</div>
	);
};
