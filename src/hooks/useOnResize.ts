import { useEffect } from 'react';

const useOnResize = (callback: () => void) => {
  useEffect(() => {
    window.addEventListener('resize', callback);
    return () => window.removeEventListener('resize', callback);
  }, [callback]);
};

export default useOnResize;
