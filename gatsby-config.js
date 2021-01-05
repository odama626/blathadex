const path = require('path');

module.exports = {
  siteMetadata: {
    title: `Blathadex`,
    description: `A field guide to island life`,
    author: `Adam Sparks`,
  },
  plugins: [
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-optional-chaining`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sqip`,
    { resolve: `gatsby-plugin-webpack-bundle-analyzer`, options: { analyzerPort: 8001 } },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        data: '@import "app/variables.scss";',
        includePaths: ['src'],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: `${__dirname}/src/data`,
      },
    },
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /images\/inline/,
        },
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-81658884-6',
        head: true,
      },
    },
    {
      resolve: 'gatsby-plugin-alias-imports',
      options: {
        alias: {
          app: path.resolve(__dirname, 'src/app'),
          components: path.resolve(__dirname, 'src/components'),
          pages: path.resolve(__dirname, 'src/pages'),
          templates: path.resolve(__dirname, 'src/templates'),
          images: path.resolve(__dirname, 'src/images'),
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Blathadex`,
        short_name: `Blathadex`,
        start_url: `/`,
        background_color: `#5382DE`,
        theme_color: `#5382DE`,
        display: `standalone`,
        icon: `src/images/BlathadexLogo.svg`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    { resolve: `gatsby-plugin-offline`, options: { precachePages: ['/', '/critters/*'] } },
  ],
};
