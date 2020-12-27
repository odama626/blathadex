import { graphql } from 'gatsby';
import React from 'react';
import CritterPage from 'templates/CritterPage';

export default function BugPage(props) {
  const critter = props.data.crittersJson;
  const similar = props.data.allCrittersJson.nodes.filter(
    c => critter.type === c.type && c.loc === critter.loc
  );
  return <CritterPage pageContext={{ critter, similar }} />;
}

export const query = graphql`
  query($id: String) {
    crittersJson(id: { eq: $id }) {
      id
      no
      bells
      name
      etime
      etime2
      smonth
      smonth2
      stime
      stime2
      type
      size
      loc
      emonth2
      emonth
      desc
      rarity
      quote
      shadow
      image {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid_withWebp_tracedSVG
          }
        }
      }
    }
    allCrittersJson {
      nodes {
        name
        bells
        no
        type
        loc
        etime
        emonth2
        emonth
        etime2
        smonth
        smonth2
        stime
        stime2
        image {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
