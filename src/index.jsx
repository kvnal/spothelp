export async function run(event, context) {
	console.log('oncreate event triggered '+JSON.stringify(context));
	// console.log('Hello World!'+JSON.stringify(event));
	
}

import Resolver from '@forge/resolver';
import { storage } from '@forge/api';
const resolver = new Resolver();

// /rest/agile/1.0/board
// /wiki/rest/api/content/
// /wiki/rest/api/content/1048851
// /wiki/rest/api/content/1048851?expand=body.dynamic


resolver.define('test', async (req) => {
    const data = req.context;
    console.log("data from front end > "+JSON.stringify(req))
    return "🔴 Hello from the backend.";
});

export const handler = resolver.getDefinitions();

// import ForgeUI, { render, QueuePage, Fragment, Text } from '@forge/ui';

// const App = () => {
//     return (
//         <Fragment>
//             <Text>Hello world!</Text>
//         </Fragment>
//     );
// };

// export const run = render(
//     <QueuePage>
//         <App />
//     </QueuePage>
// );
