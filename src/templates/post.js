import React from 'react';
import moment from 'moment-strftime';
import { graphql } from 'gatsby';
import * as PropTypes from 'prop-types';
import _ from 'lodash';

import { Layout } from '../components/index';
import { withPrefix, Link, markdownify } from '../utils';
import BlogPostCategories from '../components/BlogPostCategories';


export const query = graphql`
  query PostQuery($sanityId: String!) {
    sanityPost(_id: { eq: $sanityId }) {
      title
      date
      author {
        link
        first_name
        last_name
      }
      content
      tags
      image_alt
      image {
        asset {
          url
        }
      }
      categories {
        ...PostCategoryFragment
      }
    }
  }
`;

export default class Post extends React.Component {
    renderPostImage(post) {
        const imageUrl = _.get(post, 'image.asset.url');
        if (!imageUrl) {
            return null;
        }
        const imageAlt = _.get(post, 'image_alt');
        return (
            <div className="post__image">
                <img src={imageUrl} alt={imageAlt} />
            </div>
        );
    }

    renderPostHeader(post) {
        const categories = _.get(post, 'categories');
        const title = _.get(post, 'title');
        const date = this.renderPostDate(post);
        const author = this.renderPostAuthor(post);
        return (
            <header className="post__header">
                <BlogPostCategories categories={categories} container_class="post__meta" />
                {title && <h1 className="post__title">{title}</h1>}
                {(date || author) && (
                    <div className="post__meta">
                        {date}
                        {author}
                    </div>
                )}
            </header>
        );
    }

    renderPostDate(post) {
        const date = _.get(post, 'date');
        if (!date) {
            return null;
        }
        const dateTimeAttr = moment(date).strftime('%Y-%m-%d %H:%M');
        const dateStr = moment(date).strftime('%B %d, %Y');
        return (
            <span>
                On <time dateTime={dateTimeAttr}>{dateStr}</time>
            </span>
        );
    }

    renderPostAuthor(post) {
        const author = _.get(post, 'author');
        if (!author) {
            return null;
        }
        const firstName = _.get(author, 'first_name', '');
        const lastName = _.get(author, 'last_name', '');
        const fullName = _.trim(`${firstName} ${lastName}`);
        if (_.isEmpty(fullName)) {
            return null;
        }
        if (author.link) {
            return (
                <span>
                    {' by '}
                    <Link to={withPrefix(author.link)}>{fullName}</Link>
                </span>
            );
        } else {
            return <span>{` by ${fullName}`}</span>;
        }
    }

    renderPostContent(post) {
        const content = _.get(post, 'content');
        if (_.isEmpty(content)) {
            return null;
        }
        return <div className="post__copy">{markdownify(post.content)}</div>;
    }

    renderPostTags(post) {
        const tags = _.get(post, 'tags');
        if (_.isEmpty(tags)) {
            return null;
        }
        return (
            <footer className="post__footer">
                {_.map(tags, (tag, idx) => (
                    <span key={idx}>{tag}</span>
                ))}
            </footer>
        );
    }

    render() {
        const post = _.get(this.props, 'data.sanityPost');
        return (
            <Layout page={post} path={this.props.path}>
                <article className="post">
                    <div className="container container--md">
                        {this.renderPostImage(post)}
                        {this.renderPostHeader(post)}
                        {this.renderPostContent(post)}
                        {this.renderPostTags(post)}
                    </div>
                </article>
            </Layout>
        );
    }
}

Post.propTypes = {
    path: PropTypes.string,
    data: PropTypes.shape({
        sanityPost: PropTypes.object
    })
};
