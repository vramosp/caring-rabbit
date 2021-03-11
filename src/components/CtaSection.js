import React from 'react';
import { graphql } from 'gatsby';
import * as PropTypes from 'prop-types';
import _ from 'lodash';

import { classNames } from '../utils';
import SectionActions from './SectionActions';


export const query = graphql`
  fragment CTASectionFragment on SanityCtaSection {
    _type
    title
    subtitle
    has_background
    background_color
    actions {
      ...ActionFragment
    }
  }
`;

export default class CtaSection extends React.Component {
    render() {
        const section = _.get(this.props, 'section');
        const title = _.get(section, 'title');
        const subtitle = _.get(section, 'subtitle');
        const actions = _.get(section, 'actions');
        const hasBackground = _.get(section, 'has_background');
        const backgroundColor = _.get(section, 'background_color');
        return (
            <section className="section section--cta">
                <div className="container container--lg">
                    <div
                        className={classNames('section__body', 'align-center', {
                            'inverse bg-blue': hasBackground && backgroundColor === 'blue',
                            'bg-gray': hasBackground && backgroundColor === 'gray'
                        })}
                    >
                        <div className="container container--md">
                            {!_.isEmpty(title) && <h2 className="section__title">{title}</h2>}
                            {!_.isEmpty(subtitle) && (
                                <div className="section__copy">
                                    <p>{subtitle}</p>
                                </div>
                            )}
                            {!_.isEmpty(actions) && (
                                <div className="section__actions btn-group">
                                    <SectionActions actions={actions} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

CtaSection.propTypes = {
    section: PropTypes.object
};
