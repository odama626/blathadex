/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

import React, { useEffect, useLayoutEffect } from 'react';
import useAppContext, { ContextProvider } from './src/app/context';
import { loadLocally, saveLocally } from './src/app/utils';

// document.body.dataset.theme = 'dark';

const LocalStorageWrapper = ({ children }) => {
  const [state, dispatch] = useAppContext();

  useLayoutEffect(() => {
    let load = loadLocally('pedia-state');
    if (load) dispatch({ type: 'load', state: load });
  }, [dispatch]);

  useEffect(() => {
    saveLocally('pedia-state', state);
  }, [state]);

  return children;
};

export const wrapRootElement = ({ element }) => {
  return (
    <ContextProvider>
      <div >
        <LocalStorageWrapper>{element}</LocalStorageWrapper>
      </div>
    </ContextProvider>
  );
};
