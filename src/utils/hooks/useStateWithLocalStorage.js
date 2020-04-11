import {useState} from 'react';

const useStateWithLocalStorage = localStorageKey => {

    const [value, setValue] = useState( JSON.parse(localStorage.getItem(localStorageKey)) || []);
    console.log('1111111', value)
    const setValueEndStore = (card) => {
        const cardJson = JSON.stringify(card);
        localStorage.setItem(localStorageKey, cardJson);
        setValue(card)
    };


    return [value, setValueEndStore];
};

export default useStateWithLocalStorage;