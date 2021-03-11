import React from 'react';
import { Helmet } from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import * as PropTypes from 'prop-types';
import _ from 'lodash';

import { withPrefix } from '../utils';
import Header from './Header';
import Footer from './Footer';
import '../sass/main.scss';


const staticGraphQLQuery = graphql`
  query ConfigQuery {
    sanityConfig {
      title
      description
      favicon {
        asset {
          url
        }
      }
      header {
        title
        logo_alt
        logo {
          asset {
            url
          }
        }
        has_nav
        nav_links {
          ...ActionFragment
        }
      }
      footer {
        has_nav
        nav_links {
          ...ActionFragment
        }
        has_social
        social_links {
          ...ActionFragment
        }
        content
        links {
          ...ActionFragment
        }
      }
    }
  }
`;

class Body extends React.Component {
    render() {
        const page = _.get(this.props, 'page');
        const config = _.get(this.props, 'config');
        const pageTitle = _.get(page, 'title');
        const title = (!_.isEmpty(pageTitle) ? `${pageTitle} | ` : '') + _.get(config, 'title');
        const pageDescription = _.get(page, 'description');
        const description = !_.isEmpty(pageDescription) ? pageDescription : _.get(config, 'description');
        const favIconUrl = _.get(config, 'favicon.asset.url');
        return (
            <React.Fragment>
                <Helmet>
                    <title>{title}</title>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width, initialScale=1.0" />
                    <meta name="description" content={description} />
                    {favIconUrl && <link rel="icon" href={withPrefix(favIconUrl)} />}
                </Helmet>
                <div id="site-wrap" className="site">
                    <Header {...this.props} />
                    <main id="content" className="site-content">
                        {this.props.children}
                    </main>
                    <Footer {...this.props} />
                </div>
            </React.Fragment>
        );
    }
}

Body.propTypes = {
    page: PropTypes.object,
    config: PropTypes.object,
    children: PropTypes.array
};

export default function Layout(props) {
    return <StaticQuery query={staticGraphQLQuery} render={(data) => <Body {...props} config={data.sanityConfig} />} />;
}
