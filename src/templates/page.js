import React from 'react';
import { graphql } from 'gatsby';
import * as PropTypes from 'prop-types';
import _ from 'lodash';

import { Layout } from '../components/index';
import { markdownify } from '../utils';


export const query = graphql`
  query PageQuery($sanityId: String!) {
    sanityPage(_id: { eq: $sanityId }) {
      title
      content
    }
  }
`;

export default class Page extends React.Component {
    render() {
        const page = _.get(this.props, 'data.sanityPage');
        const title = _.get(page, 'title');
        const content = _.get(page, 'content');
        return (
            <Layout page={page} path={this.props.path}>
                <article className="page">
                    <div className="container container--md">
                        {!_.isEmpty(title) && (
                            <header className="page__header">
                                <h1 className="page__title">{title}</h1>
                            </header>
                        )}
                        {!_.isEmpty(content) && <div className="page__copy">{markdownify(content)}</div>}
                    </div>
                </article>
            </Layout>
        );
    }
}

Page.propTypes = {
    path: PropTypes.string,
    data: PropTypes.shape({
        sanityPage: PropTypes.object
    })
};
