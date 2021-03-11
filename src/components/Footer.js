import React from 'react';
import _ from 'lodash';

import Action from './Action';
import { markdownify } from '../utils';


export default class Footer extends React.Component {
    renderNav(footer) {
        const hasNav = _.get(footer, 'has_nav');
        const navLinks = _.get(footer, 'nav_links');
        const hasSocial = _.get(footer, 'has_social');
        const socialLinks = _.get(footer, 'social_links');
        if (!hasNav && !hasSocial) {
            return null;
        }
        return (
            <div className="site-footer__nav">
                {hasNav && !_.isEmpty(navLinks) && (
                    <ul className="site-footer__menu menu">
                        {_.map(navLinks, (action, idx) => (
                            <li key={idx}>
                                <Action action={action} />
                            </li>
                        ))}
                    </ul>
                )}
                {hasSocial && !_.isEmpty(socialLinks) && (
                    <ul className="site-footer__social menu">
                        {_.map(socialLinks, (action, idx) => (
                            <li key={idx}>
                                <Action action={action} />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        );
    }

    renderLinks(footer) {
        const links = _.get(footer, 'links');
        if (_.isEmpty(links)) {
            return null;
        }
        return _.map(links, (action, idx) => <Action key={idx} action={action} />);
    }

    render() {
        const footer = _.get(this.props, 'config.footer');
        const content = _.get(footer, 'content');
        return (
            <footer className="site-footer">
                <div className="container container--lg">
                    {this.renderNav(footer)}
                    <div className="site-footer__copyright">
                        {!_.isEmpty(content) && <span>{markdownify(content)}</span>}
                        {this.renderLinks(footer)}
                    </div>
                </div>
            </footer>
        );
    }
}
