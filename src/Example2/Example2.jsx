import React,{useState} from "react";
import useDebounceHook from './useDebounceHook';

const Example2 = () => {
    const [search, setSearch] = useState("");

    const handleChange= async(e) => {
        setSearch(e.target.value);
        debouncedFetchApi(e.target.value);
    }

    const debouncedFetchApi = useDebounceHook((value) => {
        fetchData(value);
      }, 1000);

    const fetchData = async(Searchvalue) => {
        let str = {
            code: 'utf-8',
            q: Searchvalue,
        };
        const res = await fetch(`https://suggest.taobao.com/sug?${new URLSearchParams(str).toString()}`);  
        const { result } = await res.json();
        console.log('result',result);
        return result;
    }

 return ( 
    <>
        <h3>Common Search </h3>
        <input type="text" value={search} onChange={handleChange} />
    </>
 )
};

export default Example2;