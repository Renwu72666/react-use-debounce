import React,{useState} from "react";

const Example1 = () => {
    const [search, setSearch] = useState("");

    const handleChange= async(e) => {
        setSearch(e.target.value);
        console.log(await fetchData(e.target.value));
    }

    const fetchData = async(Searchvalue) => {
        let str = {
            code: 'utf-8',
            q: Searchvalue,
        };
        const res = await fetch(`https://suggest.taobao.com/sug?${new URLSearchParams(str).toString()}`);  
        const { result } = await res.json();
        return result;
    }

 return ( 
    <>
        <h3>Common Search </h3>
        <input type="text" value={search} onChange={handleChange} />
    </>
 )
};

export default Example1;