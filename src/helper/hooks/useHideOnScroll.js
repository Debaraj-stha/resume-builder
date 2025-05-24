import { useEffect } from 'react';

const useHideOnScroll = (setVisible) => {
  useEffect(() => {
    const handleScroll = () => {
      setVisible(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [setVisible]);
};

export default useHideOnScroll;
