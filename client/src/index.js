import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// Redux
import reducer from './rdReducer';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const reduxStore = createStore(
	reducer,
	{
        currentPage: "GAME_PROCESS"
    },
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
	<Provider store={ reduxStore }>
		<App />
	</Provider>,
	document.getElementById('root'));
serviceWorker.unregister();
