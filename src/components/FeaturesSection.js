import React from 'react';
import { graphql } from 'gatsby';
import * as PropTypes from 'prop-types';
import _ from 'lodash';

import { classNames, withPrefix, markdownify } from '../utils';
import SectionActions from './SectionActions';


export const query = graphql`
  fragment FeaturesSectionFragment on SanityFeaturesSection {
    _type
    title
    features {
      title
      content
      align
      actions {
        ...ActionFragment
      }
      image_position
      image_alt
      image {
        asset {
          url
        }
      }
    }
  }
`;

export default class FeaturesSection extends React.Component {
    renderFeatures(section) {
        const features = _.get(section, 'features');
        const sectionTitle = _.get(section, 'title');
        return _.map(features, (feature, idx) => {
            const title = _.get(feature, 'title');
            const content = _.get(feature, 'content');
            const actions = _.get(feature, 'actions');
            const align = _.get(feature, 'align');
            const imagePosition = _.get(feature, 'image_position');
            const imageAlt = _.get(feature, 'image_alt');
            const imageUrl = _.get(feature, 'image.asset.url');
            return (
                <div
                    key={idx}
                    className={classNames('flex', 'flex--middle', 'flex--center', 'flex--col-2', {
                        'align-center': align === 'center',
                        'align-right': align === 'right'
                    })}
                >
                    {!_.isEmpty(imageUrl) && (
                        <div
                            className={classNames('cell', 'section__media', {
                                'section__media--right': imagePosition === 'right'
                            })}
                        >
                            <img src={withPrefix(imageUrl)} alt={imageAlt} />
                        </div>
                    )}
                    <div className="section__body cell">
                        {!_.isEmpty(title) &&
                            (_.isEmpty(sectionTitle) ? (
                                <h3 className="section__title">{title}</h3>
                            ) : (
                                <h2 className="section__title">{title}</h2>
                            ))}
                        {!_.isEmpty(content) && <div className="section__copy">{markdownify(content)}</div>}
                        {!_.isEmpty(actions) && (
                            <div className="section__actions btn-group">
                                <SectionActions actions={actions} />
                            </div>
                        )}
                    </div>
                </div>
            );
        });
    }

    render() {
        const section = _.get(this.props, 'section');
        const title = _.get(section, 'title');
        return (
            <section className="section section--features">
                {!_.isEmpty(title) && (
                    <div className="container container--md align-center">
                        <h2 className="section__title">{title}</h2>
                    </div>
                )}
                <div className="container container--lg">{this.renderFeatures(section)}</div>
            </section>
        );
    }
}

FeaturesSection.propTypes = {
    section: PropTypes.object
};
