const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    pathPrefix: '/',
    siteMetadata: {},
    flags: {
        DEV_SSR: false
    },
    plugins: [
        'gatsby-plugin-react-helmet',
        'gatsby-plugin-sass',
        {
            resolve: 'gatsby-source-sanity',
            options: {
                projectId: process.env.SANITY_PROJECT_ID,
                dataset: process.env.SANITY_DATASET || 'production',
                token: process.env.SANITY_TOKEN,
                overlayDrafts: !isProd,
                watchMode: !isProd
            }
        }
    ]
};
