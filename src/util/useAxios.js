// https://youtu.be/IxydSMI4Qjg

import {useState, useEffect} from "react";
import defaultAxios from "axios";

export default function useAxios (options, axiosInstance = defaultAxios)  {
    if(sessionStorage.getItem("authorization"))
        axiosInstance.defaults.headers.common['Authorization'] = sessionStorage.getItem("authorization");
        
    const [state, setState] = useState({
        url: options.url,
        loading: options.fetchOnStart,
        errorCode: 0,
        errorMsg: "",
        data: null,
        headers: null         
    });

    const fetchData = () => {

        if (!state.url)
            return;
            
        axiosInstance(options).then(response => {
            setState({
                ...state,
                loading: false,
                data: response.data,
                headers: response.headers
            });
        }).catch(error => {
            setState({...state, loading: false, error: error})
        })
    };

    useEffect(fetchData, [state.loading]);

    const fetch = (url = state.url) => {
        setState({
            ...state,
            url: url,
            loading: true
        });

    };


    return {...state, fetch};
};
