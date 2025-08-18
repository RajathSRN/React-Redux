import React from 'react';
import Tasks from './components/Tasks/Tasks';
import store from './store';
import { Provider } from 'react-redux';

function App(props) {
    return (
        <Provider store={store}>
            <Tasks />
        </Provider>
    );
}

export default App;
