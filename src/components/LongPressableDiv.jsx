import { useCallback, useRef } from 'react';

export const useLongPressable = ({ onClick, onLongPress, time = 750 }) => {
  const timer = useRef(null);
  const longPressed = useRef(false);

  const handleButtonPress = useCallback(() => {
    longPressed.current = false;
    timer.current = setTimeout(() => {
      onLongPress && onLongPress();
      longPressed.current = true;
    }, time);
  }, [time, onLongPress]);

  const handleButtonRelease = useCallback(() => {
    clearTimeout(timer.current);
  }, []);

  const handleOnClick = useCallback(
    e => {
      if (!longPressed.current) {
        onClick(e);
      } else {
        e.stopPropagation();
        e.preventDefault();
      }
    },
    [onClick]
  );

  const onLongPressImplemented = !!onLongPress;
  const handleContextMenu = useCallback(
    e => {
      if (onLongPressImplemented) {
        e.preventDefault();
      }
    },
    [onLongPressImplemented]
  );

  return {
    onTouchStart: handleButtonPress,
    onTouchEnd: handleButtonRelease,
    onMouseDown: handleButtonPress,
    onMouseUp: handleButtonRelease,
    onMouseLeave: handleButtonRelease,
    onClick: handleOnClick,
    onContextMenu: handleContextMenu,
  };
};
