import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import Layout from './containers/Layout/Layout'
import useStateWithLocalStorage from "./utils/hooks/useStateWithLocalStorage";
import BasketContext from "./context/basketContext";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";

function App() {
    const [basket, setBasket] = useStateWithLocalStorage("savedProducts");
    const basketContext = {basket, setBasket};

    return (
        <BasketContext.Provider value={basketContext}>
            <Layout/>
        </BasketContext.Provider>
    );
}
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to SignUp() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
