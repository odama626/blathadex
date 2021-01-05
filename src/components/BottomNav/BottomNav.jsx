import React, { useEffect, useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import debounce from 'lodash.debounce';
import { useResizeListener, useScrollListener } from 'app/hooks';

export const FAB_BUTTON = {
  BACK:
    'M33 26.672V21.8738C32.9994 21.5033 32.8891 21.1412 32.6831 20.8332C32.4771 20.5253 32.1845 20.2852 31.8422 20.1432C31.4999 20.0012 31.1233 19.9638 30.7598 20.0355C30.3962 20.1073 30.0621 20.285 29.7994 20.5463L18 32.1863L29.7994 43.8245C29.9731 43.9992 30.1797 44.1378 30.4072 44.2325C30.6347 44.3271 30.8786 44.3758 31.125 44.3758C31.3714 44.3758 31.6153 44.3271 31.8428 44.2325C32.0703 44.1378 32.2769 43.9992 32.4506 43.8245C32.6248 43.6505 32.763 43.4438 32.8573 43.2163C32.9516 42.9889 33 42.7451 33 42.4988V37.832C38.1562 37.9595 43.7906 38.8932 48 45.3113V43.4363C48 34.7495 41.4375 27.6057 33 26.672',
  SEARCH:
    'M39.7083 36.8333H38.1942L37.6575 36.3158C39.6008 34.0619 40.6688 31.1843 40.6667 28.2083C40.6667 25.7443 39.936 23.3356 38.5671 21.2869C37.1981 19.2381 35.2524 17.6413 32.9759 16.6983C30.6995 15.7554 28.1945 15.5087 25.7778 15.9894C23.3612 16.4701 21.1413 17.6566 19.399 19.399C17.6566 21.1413 16.4701 23.3612 15.9894 25.7778C15.5087 28.1945 15.7554 30.6995 16.6983 32.9759C17.6413 35.2524 19.2381 37.1981 21.2869 38.5671C23.3356 39.936 25.7443 40.6667 28.2083 40.6667C31.2942 40.6667 34.1308 39.5358 36.3158 37.6575L36.8333 38.1942V39.7083L46.4167 49.2725L49.2725 46.4167L39.7083 36.8333ZM28.2083 36.8333C23.4358 36.8333 19.5833 32.9808 19.5833 28.2083C19.5833 23.4358 23.4358 19.5833 28.2083 19.5833C32.9808 19.5833 36.8333 23.4358 36.8333 28.2083C36.8333 32.9808 32.9808 36.8333 28.2083 36.8333Z',
};

export default function BottomNav(props) {
  const {
    fabIconPath = FAB_BUTTON.BACK,
    onFabClick,
    fabPosition = 'right',
    fabRadius = 33,
    cutoutWidth = 7,
    padding = 20,
    actions,
    children,
    overhangActions,
    collapse,
  } = props;

  const [sizing, setSizing] = useState({ width: 1000 });
  const [scrollDelta, setScrollDelta] = useState(0);

  const collapsed = collapse || scrollDelta > 0;

  useResizeListener(setSizing);
  useScrollListener(({ delta }) => setScrollDelta(delta));

  const [fabXPosition, drawerXPosition] = useMemo(() => {
    switch (fabPosition) {
      default:
      case 'right':
        return [sizing.width - padding - fabRadius - cutoutWidth, padding];
      case 'left':
        return [padding + fabRadius + cutoutWidth, (padding + fabRadius + cutoutWidth) * 2];
      case 'center':
        return [sizing.width / 2 + cutoutWidth];
    }
  }, [fabPosition, sizing, cutoutWidth]);

  return (
    <nav className="bottom" data-mobile>
      <svg
        style={{ display: 'block' }}
        data-mobile
        width={sizing.width}
        height="112"
        viewBox={`0 0 ${sizing.width} 112`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <mask id="fab-slot">
            <rect width="100%" height="100%" fill="white" y="10" />
            <AnimatePresence>
              <motion.circle
                initial={false}
                animate={{ r: 40, y: collapsed ? -65 : 0 }}
                r="0"
                cx={fabXPosition}
                cy="47"
                fill="black"
              />
            </AnimatePresence>
          </mask>
          <SvgDefs />
        </defs>
        <motion.g animate={{ y: collapsed ? 65 : 0 }}>
          <motion.rect
            width={sizing.width}
            y="47"
            height="80"
            fill="var(--primary)"
            mask="url(#fab-slot)"
          />
          <foreignObject
            style={{ overflow: 'visible' }}
            x={drawerXPosition}
            y={overhangActions ? 20 : 47}
            width={sizing.width - (padding + cutoutWidth + fabRadius) * 2 - padding}
            height="80"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: scrollDelta <= 0 ? 1 : 0 }}
              exit={{ opacity: 0 }}
              className="actions"
            >
              {actions}
            </motion.div>
          </foreignObject>
        </motion.g>
        <g transform={`translate(${fabXPosition - fabRadius} 14)`}>
          <AnimatePresence>
            <motion.g
              initial={false}
              animate={{
                scale: 1,
                y: collapsed ? 79 - padding - cutoutWidth - fabRadius : 0,
              }}
              exit={{ scale: 0 }}
              whileTap={{ scale: 0.8 }}
              onClick={onFabClick}
              className="fab inset"
            >
              <circle cx="33" cy="33" r="33" filter="url(#fabshadow)" />

              <path d={fabIconPath} fill="currentColor" />
            </motion.g>
          </AnimatePresence>
        </g>
      </svg>
      {children}
    </nav>
  );
}

function SvgDefs() {
  return (
    <>
      <filter
        id="fabshadow"
        x="0"
        y="0"
        width="74"
        height="74"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="2" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
      </filter>
    </>
  );
}
