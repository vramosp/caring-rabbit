import React from 'react';
import _ from 'lodash';

import { Link, withPrefix } from '../utils';
import { graphql } from 'gatsby';


export const query = graphql`
  fragment PostCategoryFragment on SanityCategory {
    _id
    title
    link
  }
`;

export default class BlogPostCategories extends React.Component {
    renderCategories(categories) {
        const categoryLength = _.size(categories);
        return _.map(categories, (category, idx) => {
            if (category.link) {
                return (
                    <React.Fragment key={idx}>
                        <Link to={withPrefix(category.link)}>{category.title}</Link>
                        {idx < categoryLength - 1 && ', '}
                    </React.Fragment>
                );
            } else {
                return (
                    <React.Fragment key={idx}>
                        <span>{category.title}</span>
                        {idx < categoryLength - 1 && ', '}
                    </React.Fragment>
                );
            }
        });
    }

    render() {
        const categories = _.get(this.props, 'categories', null);
        const containerClass = _.get(this.props, 'container_class', null);

        if (!_.size(categories)) {
            return null;
        }

        return (
            <div className={containerClass}>
                <span>In </span>
                {this.renderCategories(categories)}
            </div>
        );
    }
}
