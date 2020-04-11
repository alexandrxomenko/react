import { useEffect, useState} from "react";
import axios from "axios";


const API_URL = 'http://localhost:3005';
const FETCH_INIT = 'FETCH_INIT';
const FETCH_SUCCESS = 'FETCH_SUCCESS';
const FETCH_FAILURE = 'FETCH_FAILURE';
const initialState = {
    data: [],
    isLoading: false,
    isError: false
};


export default function useDataApi(config) {
    const [state, dispatch] = useState({data: []});

    useEffect(
        () => {

            const fetchData = async () => {
                const result = await axios({
                    ...config,
                    url: `${API_URL}${config.url}`
                });
                dispatch(result.data);
            };
            fetchData();
        }, [config.url]
    );

    return state
}