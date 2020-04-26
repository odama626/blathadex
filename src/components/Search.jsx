import { useOnSubmit, useResizeListener } from 'app/hooks';
import useAllData from 'app/queryAll';
import { Image } from 'app/utils';
import classnames from 'classnames';
import { navigate } from 'gatsby';
import ChevronRight from 'images/inline/chevronRight.svg';
import CloseIcon from 'images/inline/closeButton.svg';
import SearchIcon from 'images/inline/searchButton.svg';
import debounce from 'lodash.debounce';
import orderBy from 'lodash.orderby';
import React, { useEffect, useRef, useState } from 'react';
import { FixedSizeList as List } from 'react-window';

export function search(items, query) {
  if (!query || query.length < 1) return [];

  const test = query.toLowerCase();
  return orderBy(
    items.filter(i => ~i.search.indexOf(test)),
    ['label.length', 'label']
  );
}

const SearchResult = ({ data = [], index, style }) => {
  const result = data[index];

  if (!result) return null;
  return (
    <div style={style}>
      <div
        style={{ height: '60px' }}
        className='search result'
        onClick={() => navigate(result.link)}
      >
        <Image alt={result.label} src={result.image} />
        <label>{result.label}</label>
        <ChevronRight />
      </div>
    </div>
  );
};

export default function SearchOverlay(props) {
  const { attached, initialValue, showResults } = props;
  const { searchItems } = useAllData();
  const [results, setResults] = useState([]);
  const input = useRef();
  const [resultHeight, setResultHeight] = useState(
    typeof window !== 'undefined' ? window.innerHeight - 143 : 1000
  );
  const [value, setValue] = useState(initialValue || '');

  const onChange = e => setResults(search(searchItems, e));

  const onSubmit = e => {
    const search = e.target.value;
    navigate(encodeURI(`/results?t=${search}`));
  };

  useOnSubmit(onSubmit, input);
  useResizeListener(size => {
    setResultHeight(size.height - 143);
  });

  useEffect(() => {
    if (!input.current) return;
    input.current.focus();
  }, []);

  return (
    <div className={classnames('search overlay', { attached })}>
      <div
        className='input'
        onChange={e => debounce(onChange, 50)(e.target.value)}
      >
        <SearchIcon className='input start' />
        <CloseIcon
          className='input end'
          onClick={() => (input.current.value = '')}
        />
        <input
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder='Search'
          ref={ref => (input.current = ref)}
        />
      </div>
      {showResults && value !== initialValue && (
        <List
          itemCount={results.length + 2}
          itemData={results}
          height={resultHeight}
          itemSize={63}
        >
          {SearchResult}
        </List>
      )}
    </div>
  );
}
