import { useRef, useCallback, useEffect } from 'react';

const useDebounceHook = (fn , delay=1000 ) => {

    const timeout = useRef();
    /**
        typeof fn => function   
        value => {
            fetchData(value);
        }
     **/
    const memorizedFn = useRef(fn);
    
    // ...args = value
    const debouncedFuction = useCallback( (...args) => {
        const later = () => {
            timeout.current = null;
          };

        if (timeout.current) {
            clearTimeout(timeout.current);
        }

        if (!timeout.current) {
            memorizedFn.current(...args);
        }
        timeout.current = setTimeout(later, delay);

    },[delay]);

    return debouncedFuction;
}
export default useDebounceHook;