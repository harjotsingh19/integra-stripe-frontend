import {useEffect, useState} from 'react';

const useDebounce = (func: any, delay: number) => {
    const [debouncedFunc, setDebouncedFunc] = useState(func);

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedFunc(() => func);
        }, delay);

        return () => clearTimeout(timerId);
    }, [func, delay]);

    return debouncedFunc;
};

export default useDebounce;
