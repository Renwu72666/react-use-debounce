import { useRef, useCallback, useEffect } from 'react';

const useDebounceHook = (fn , delay=300, 
    controllerOption = { "leading": false,"trailing": true} ) => {

        
    const timeout = useRef();
    const memorizedFn = useRef(fn);
    
    // ...args = value
    const debouncedFuction = useCallback( (...args) => {
        const later = () => {
            timeout.current = null;
            if (controllerOption.trailing) {
                memorizedFn.current(...args); 
              }
          };

        if (timeout.current) {
            clearTimeout(timeout.current);
        }

        if ( controllerOption.leading && !timeout.current) {
            memorizedFn.current(...args);
        }
        timeout.current = setTimeout(later, delay);

    },[delay, controllerOption.leading , controllerOption.trailing]);

    useEffect(() => () => {
        if (timeout.current) {
            clearTimeout(timeout.current);
            memorizedFn.current = null;
            timeout.current = null;
          }
    },[]);
    return debouncedFuction;
}
export default useDebounceHook;