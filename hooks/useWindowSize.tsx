import { useEffect, useState } from 'react';
import { Dimensions } from '../types/types';

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState<Dimensions | undefined>(undefined);

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}
