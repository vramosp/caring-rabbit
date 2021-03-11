import React from 'react';
import moment from 'moment-strftime';
import { graphql, StaticQuery } from 'gatsby';
import * as PropTypes from 'prop-types';
import _ from 'lodash';

import { Link, withPrefix } from '../utils';
import BlogPostCategories from './BlogPostCategories';
import { BLOG_URL_PREFIX } from '../consts';


export const query = graphql`
  fragment BlogFeedSectionFragment on SanityBlogFeedSection {
    _type
    title
    show_recent
    recent_count
    author {
      _id
      link
      first_name
      last_name
    }
    category {
      ...PostCategoryFragment
    }
  }
`;

const staticPostGraphQLQuery = graphql`
  query PostsQuery {
    allSanityPost {
      edges {
        node {
          title
          date
          excerpt
          slug {
            current
          }
          tags
          image_alt
          image {
            asset {
              url
            }
          }
          author {
            _id
            link
            first_name
            last_name
          }
          categories {
            ...PostCategoryFragment
          }
        }
      }
    }
  }
`;

export default class BlogFeedSection extends React.Component {
    renderPosts(section, posts) {
        const showRecent = _.get(section, 'show_recent');
        const recentCount = _.get(section, 'recent_count', 5);
        posts = _.orderBy(posts, 'date', 'desc');
        if (showRecent) {
            posts = _.take(posts, recentCount);
        }
        return _.map(posts, (post, idx) => {
            return <React.Fragment key={idx}>{this.renderBlogFeedItemFilter(section, post)}</React.Fragment>;
        });
    }

    renderBlogFeedItemFilter(section, post) {
        const sectionAuthor = _.get(section, 'author');
        const sectionCategory = _.get(section, 'category');
        if (sectionAuthor) {
            const postAuthor = _.get(post, 'author');
            if (postAuthor._id === sectionAuthor._id) {
                return this.renderBlogFeedItem(section, post);
            }
        } else if (sectionCategory) {
            const postCategories = _.get(post, 'categories');
            const category = _.find(postCategories, { _id: sectionCategory._id });
            if (category) {
                return this.renderBlogFeedItem(section, post);
            }
        } else {
            return this.renderBlogFeedItem(section, post);
        }
        return null;
    }

    renderBlogFeedItem(section, post) {
        const sectionTitle = _.get(section, 'title');
        const postTitle = _.get(post, 'title');
        const date = _.get(post, 'date');
        const excerpt = _.get(post, 'excerpt');
        const author = _.get(post, 'author');
        const firstName = _.get(author, 'first_name', '');
        const lastName = _.get(author, 'last_name', '');
        const fullName = _.trim(`${firstName} ${lastName}`);
        const imageUrl = _.get(post, 'image.asset.url');
        const imageAlt = _.get(post, 'image_alt');
        const postUrl = `/${BLOG_URL_PREFIX}/` + _.trim(_.get(post, 'slug.current'), '/');
        const categories = _.get(post, 'categories');
        return (
            <article className="cell">
                <div className="card">
                    {!_.isEmpty(imageUrl) && (
                        <Link className="card__media card__media--top" to={withPrefix(postUrl)}>
                            <img src={withPrefix(imageUrl)} alt={imageAlt} />
                        </Link>
                    )}
                    <div className="card__body">
                        <header className="card__header">
                            {!_.isEmpty(categories) && (
                                <BlogPostCategories categories={categories} container_class={'card__meta'} />
                            )}
                            {!_.isEmpty(sectionTitle) ? (
                                <h3 className="h4 card__title">
                                    <Link to={withPrefix(postUrl)}>{postTitle}</Link>
                                </h3>
                            ) : (
                                <h2 className="h4 card__title">
                                    <Link to={withPrefix(postUrl)}>{postTitle}</Link>
                                </h2>
                            )}
                        </header>
                        {!_.isEmpty(excerpt) && (
                            <div className="card__copy">
                                <p>{excerpt}</p>
                            </div>
                        )}
                        <footer className="card__footer">
                            <span>
                                {'On '}
                                <time dateTime={moment(date).strftime('%Y-%m-%d %H:%M')}>
                                    {moment(date).strftime('%B %d, %Y')}
                                </time>
                            </span>
                            {!_.isEmpty(author) &&
                                !_.isEmpty(fullName) &&
                                (author.link ? (
                                    <span>
                                        {' '}
                                        by <Link to={withPrefix(author.link)}>{fullName}</Link>
                                    </span>
                                ) : (
                                    <span> by {fullName}</span>
                                ))}
                        </footer>
                    </div>
                </div>
            </article>
        );
    }

    render() {
        const section = _.get(this.props, 'section');
        const title = _.get(section, 'title');
        return (
            <StaticQuery
                query={staticPostGraphQLQuery}
                render={(data) => (
                    <section className="section section--posts">
                        {!_.isEmpty(title) && (
                            <div className="container container--md align-center">
                                <h2 className="section__title">{title}</h2>
                            </div>
                        )}
                        <div className="container container--lg">
                            <div className="flex flex--col-3">
                                {this.renderPosts(section, _.map(data.allSanityPost.edges, ({ node }) => node))}
                            </div>
                        </div>
                    </section>
                )}
            />
        );
    }
}

BlogFeedSection.propTypes = {
    section: PropTypes.object
};
