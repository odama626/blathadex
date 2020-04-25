import React, { useEffect, useMemo } from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Icon from '../images/inline/Icon404.svg';
import { Link } from 'gatsby';
import { trackCustomEvent } from 'gatsby-plugin-google-analytics';
import SearchOverlay, { search } from 'components/Search';
import useAllData from 'app/queryAll';
import { navigate } from 'gatsby';
import { Image } from 'app/utils';
import ChevronRight from 'images/inline/chevronRight.svg';

const SearchResultsPage = props => {
  const query = Object.fromEntries(
    props.location.search
      .slice(1)
      .split('&')
      .map(pair => pair.split('='))
  );
  console.log({ props });
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
