import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import { ToastContainer} from 'react-toastify';
import './commons/auth'
import Router from './Router'
import store from './store'

// 引入CSS
import 'react-toastify/dist/ReactToastify.css';
import './css/app.scss';
import './css/style.scss';

const app=(
    <Provider store={store}>
        <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnVisibilityChange/>
        <Router/>
    </Provider>
)


ReactDOM.render(app, document.getElementById('root'));

