import React,{useState,useCallback} from "react";
import useDebounceHook from './useDebounceHook';

const Example2 = () => {
    const [search, setSearch] = useState("");
    const [resultObj, setResultObj] = useState([]);

    const handleClick = useDebounceHook(() => {
        console.log(resultObj)
    }, 
    1000,
    {
        "leading": true,
        "trailing": false
    });
    
    const debouncedFetchApi = useDebounceHook((value) => {
        fetchData(value)
      },
      1000,
      {
        "leading": false,
        "trailing": true
    });

    const handleChange= useCallback((e) => {
        setSearch(e.target.value);
        debouncedFetchApi(e.target.value);
    },[debouncedFetchApi])



    const fetchData = async(Searchvalue) => {
        let str = {
            code: 'utf-8',
            q: Searchvalue,
        };
        const res = await fetch(`https://suggest.taobao.com/sug?${new URLSearchParams(str).toString()}`);  
        const { result } = await res.json();
        console.log(result);
        setResultObj(result)
        return result;
    }



 return ( 
    <>
        <h3>Common Search </h3>
        <input type="text" value={search} onChange={handleChange} />
        <button onClick={handleClick}>Submit</button>
    </>
 )
};

export default Example2;