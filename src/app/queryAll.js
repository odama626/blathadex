import { graphql, useStaticQuery } from 'gatsby';
import { useMemo } from 'react';
import { createCritterLink, createImgSrc, createDiyLink } from './utils';

export default function useAllData() {
  const data = useStaticQuery(graphql`
    {
      allCrittersJson {
        edges {
          node {
            bells
            name
            no
            id
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
          }
        }
      }
      allDiyJson {
        edges {
          node {
            itemSellPrice
            name
            obtainedFrom
            recipeItem
            search
            section
            size
            type
            id
            materialsNeeded {
              count
              ingredient
            }
          }
        }
      }
      allMaterialsJson {
        edges {
          node {
            bells
            fullImage
            name
            obtainedFrom
            type
          }
        }
      }
    }
  `);

  // const value =

  return useMemo(() => {
    let critters = data.allCrittersJson.edges.map(edge => edge.node);
    let recipes = data.allDiyJson.edges.map(edge => edge.node);
    let materials = data.allMaterialsJson.edges.map(edge => edge.node);

    let searchItems = [
      critters.map(critter => ({
        label: critter.name,
        search: `${critter.type}/${critter.name}`.toLowerCase(),
        link: createCritterLink(critter),
        image: createImgSrc(critter),
      })),
      materials.map(material => ({
        label: material.name,
        search: `material/${material.name}`.toLowerCase(),
        link: createDiyLink(material),
        image: createImgSrc(material, true),
      })),
      recipes.map(recipe => ({
        label: recipe.name,
        search: `${recipe.obtainedFrom}/${recipe.section}/${recipe.name}`.toLowerCase(),
        link: createDiyLink(recipe),
        image: createImgSrc(recipe, true),
      })),
    ].flat();

    return {
      critters,
      recipes,
      materials,
      searchItems,
    };
  }, [data]);
}
