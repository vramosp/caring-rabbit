/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require('path');
const _ = require('lodash');
const { BLOG_URL_PREFIX } = require('./src/consts');

exports.createPages = ({ actions, graphql }) => {
    const { createPage } = actions;
    const pageFields = `
    edges {
      node {
        _id
        _type
        slug {
          current
        }
      }
    }
    `;
    return graphql(`
    {
      allSanityPage { ${pageFields} }
      allSanityPost { ${pageFields} }
      allSanityAdvanced { ${pageFields} }
    }
    `).then((result) => {
        if (result.errors) {
            return Promise.reject(result.errors);
        }

        const pageNodes = _.concat(
            _.map(result.data.allSanityPage.edges, ({ node }) => node),
            _.map(result.data.allSanityPost.edges, ({ node }) => node),
            _.map(result.data.allSanityAdvanced.edges, ({ node }) => node)
        );

        pageNodes.forEach((node) => {
            const modelName = node._type;
            const sanityId = node._id;
            const component = path.resolve(`./src/templates/${modelName}.js`);
            const slug = (modelName === 'post' ? `/${BLOG_URL_PREFIX}/` : '/') + _.trim(node.slug.current, '/');

            // if slug is not defined, don't create a page
            if (!slug) {
                console.error(
                    `Error: page of type "${modelName}" and contentful id "${sanityId}" does not have a "slug" field, page will not be created`
                );
                return;
            }

            const page = {
                path: slug,
                component: component,
                context: {
                    sanityId: sanityId
                }
            };

            createPage(page);
        });
    });
};
