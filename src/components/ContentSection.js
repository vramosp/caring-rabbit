import React from 'react';
import { graphql } from 'gatsby';
import * as PropTypes from 'prop-types';
import _ from 'lodash';

import { markdownify } from '../utils';


export const query = graphql`
  fragment ContentSectionFragment on SanityContentSection {
    _type
    title
    content
  }
`;

export default class ContentSection extends React.Component {
    render() {
        const section = _.get(this.props, 'section');
        const title = _.get(section, 'title');
        const content = _.get(section, 'content');
        return (
            <section className="section">
                <div className="container container--md">
                    {!_.isEmpty(title) && <h2 className="section__title align-center">{title}</h2>}
                    {!_.isEmpty(content) && <div className="section__copy">{markdownify(content)}</div>}
                </div>
            </section>
        );
    }
}

ContentSection.propTypes = {
    section: PropTypes.object
};
