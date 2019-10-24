import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com'

axios.interceptors.request.use(requestConfig => {
    console.log(requestConfig);
    return requestConfig;
}, error => {
    console.log("ERROR: " + error);
    return Promise.reject(error);
}
);

axios.interceptors.response.use(responseConfig => {
    console.log("RESPONSE: " + responseConfig);
    return responseConfig;
}, error => {
    console.log("RESPONSE ERROR: " + error);
    return Promise.reject(error);
});
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
