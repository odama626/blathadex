import { useEffect, useRef } from 'react';
import debounce from 'lodash.debounce';

export const useCallbackRef = callback => {
  const callbackContainer = useRef();

  useEffect(() => {
    callbackContainer.current = callback;
  }, [callback]);

  return callbackContainer;
};

export const useResizeListener = callback => {
  const callbackContainer = useCallbackRef(callback);

  useEffect(() => {
    if (!window) return;

    const onResize = () => {
      callbackContainer.current({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', onResize);
    onResize();

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);
};

export const useOnSubmit = (callback, ref) => {
  const callbackContainer = useCallbackRef(callback);

  useEffect(() => {
    if (!ref) return;
    let target = ref.current;

    const onSubmit = e => {
      if (e.key.toLowerCase() === 'enter') callbackContainer.current(e);
    };

    target.addEventListener('keypress', onSubmit);

    return () => target.removeEventListener('keypress', onSubmit);
  });
};

export const useScrollListener = callback => {
  const callbackContainer = useCallbackRef(callback);

  useEffect(() => {
    if (!window) return;
    let delta = 0;
    let lastPos = window.scrollY;

    const onScroll = () => {
      delta = window.scrollY - lastPos;
      lastPos = window.scrollY;
      callbackContainer.current({ delta });
    };

    const scrollListener = debounce(onScroll, 5);

    window.addEventListener('scroll', scrollListener, false);
    return () => window.removeEventListener('scroll', scrollListener, false);
  }, []);
};
