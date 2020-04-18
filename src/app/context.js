import React, {
  createContext,
  useReducer,
  useContext,
  useState,
  useCallback,
  useMemo,
} from 'react';

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
  console.log('action', { action });
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

const SelectedContext = createContext([]);

const SelectedContextProvider = props => {
  const [selected, setSelected] = useState([]);

  const toggle = useCallback(
    ({ id }) => {
      if (~selected.indexOf(id)) {
        setSelected(selected.filter(s => s !== id));
      } else {
        setSelected([...selected, id]);
      }
    },
    [selected]
  );

  // const value = useMemo(() => {
  //   return {
  //     selected,
  //     add:
  //   }
  // }, [ selected])

  const value = useMemo(
    () => ({ selected, toggle, clear: () => setSelected([]) }),
    [toggle, selected]
  );

  return (
    <SelectedContext.Provider value={value}>
      {props.children}
    </SelectedContext.Provider>
  );
};

export const ContextProvider = props => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={[state, dispatch]}>
      <SelectedContextProvider>{children}</SelectedContextProvider>
    </Context.Provider>
  );
};

export default function useAppContext() {
  return useContext(Context);
}

export const useSelectedContext = () => {
  return useContext(SelectedContext);
};

export const updateFilter = update => ({ type: 'update-filter', update });
export const updateSort = update => ({ type: 'update-sort', update });
