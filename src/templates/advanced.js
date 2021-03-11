import React from 'react';
import { graphql } from 'gatsby';
import * as PropTypes from 'prop-types';
import _ from 'lodash';

import components, { Layout } from '../components/index';


export const query = graphql`
  query AdvancedQuery($sanityId: String!) {
    sanityAdvanced(_id: { eq: $sanityId }) {
      title
      sections {
        ... on SanityHeroSection {
          ...HeroSectionFragment
        }
        ... on SanityTeamSection {
          ...TeamSectionFragment
        }
        ... on SanityCtaSection {
          ...CTASectionFragment
        }
        ... on SanityContactSection {
          _type
        }
        ... on SanityContentSection {
          ...ContentSectionFragment
        }
        ... on SanityBlogFeedSection {
          ...BlogFeedSectionFragment
        }
        ... on SanityFeaturesSection {
          ...FeaturesSectionFragment
        }
      }
    }
  }
`;

export default class Advanced extends React.Component {
    render() {
        const advancedPage = _.get(this.props, 'data.sanityAdvanced');
        const sections = _.get(advancedPage, 'sections');
        return (
            <Layout page={advancedPage} path={this.props.path}>
                {_.map(sections, (section, idx) => {
                    const sectionType = _.get(section, '_type');
                    if (_.isEmpty(sectionType)) {
                        console.error(`section at index ${idx} of page ${this.props.path} does not have a type`);
                        return null;
                    }
                    const component = _.upperFirst(_.camelCase(sectionType));
                    const Component = components[component];
                    if (!Component) {
                        console.error(
                            `section at index ${idx} of type '${sectionType}' of page ${this.props.path} does not have a matching React component`
                        );
                        return null;
                    }
                    return <Component key={idx} section={section} />;
                })}
            </Layout>
        );
    }
}

Advanced.propTypes = {
    path: PropTypes.string,
    data: PropTypes.shape({
        sanityAdvanced: PropTypes.object
    })
};
