import React, { createContext, useReducer, useContext } from 'react';

const Context = createContext({});

const initialState = {
  filter: {
    hemisphere: 'northern',
    type: ['bug', 'fish'],
    caught: false,
    today: false,
  },
  sort: 'caught',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'update-filter':
      return {
        ...state,
        filter: {
          ...state.filter,
          ...action.update,
        },
      };
    case 'update-sort':
      return {
        ...state,
        sort: action.update,
      };
    case 'load':
      return {
        ...initialState,
        ...action.state,
      };
    default:
      return state;
  }
};

export const ContextProvider = props => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export default function useAppContext() {
  return useContext(Context);
}

export const updateFilter = update => ({ type: 'update-filter', update });
export const updateSort = update => ({ type: 'update-sort', update });
