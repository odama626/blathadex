import useAllData from 'app/queryAll';
import { Image } from 'app/utils';
import SearchOverlay, { search } from 'components/Search';
import { navigate } from 'gatsby';
import React, { useMemo } from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';

const SearchResultsPage = props => {
  const query = Object.fromEntries(
    props.location.search
      .slice(1)
      .split('&')
      .map(pair => pair.split('='))
  );
  const { searchItems } = useAllData();
  const t = query.t;

  const results = useMemo(() => search(searchItems, t), [t, searchItems]);

  return (
    <Layout>
      <SEO title={`Search Results`} />
      <SearchOverlay showResults attached initialValue={query.t || ''} />
      <section style={{ marginTop: 'calc(60px + 1.45rem)' }}>
        <h2>
          Search Results for <span>{query.t}</span>
        </h2>
        <div className='grid'>
          {results.map(result => (
            <div
              key={result.label}
              className='critter block'
              onClick={() => navigate(result.link)}
            >
              <Image alt={result.label} src={result.image} />
              {/* <label>{result.label}</label> */}
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default SearchResultsPage;
