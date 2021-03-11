import React from 'react';
import _ from 'lodash';

import { Link, withPrefix, classNames } from '../utils';
import Action from './Action';


export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navNarOpen: false
        };
    }

    navToggleHandler(event) {
        event.preventDefault();
        this.setState({
            navBarOpen: !this.state.navBarOpen
        });
    }

    renderLogo(header) {
        const logo = _.get(header, 'logo');
        const logoAlt = _.get(header, 'logo_alt');
        const title = _.get(header, 'title');
        if (_.isEmpty(logo)) {
            return (
                <Link className="h4 navbar__title" to={withPrefix('/')}>
                    {title}
                </Link>
            );
        } else {
            return (
                <Link className="navbar__logo" to={withPrefix('/')}>
                    <img src={withPrefix(logo)} alt={logoAlt} />
                </Link>
            );
        }
    }

    renderNavigationLinks(header, currentPath) {
        const hasNav = _.get(header, 'has_nav');
        if (!hasNav) {
            return null;
        }
        const navLinks = _.get(header, 'nav_links');
        return (
            <React.Fragment>
                <button
                    aria-label="Menu"
                    className="btn btn--icon btn--clear navbar__menu-btn js-nav-toggle"
                    onClick={(event) => this.navToggleHandler(event)}
                >
                    <svg className="icon" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 13h18c0.552 0 1-0.448 1-1s-0.448-1-1-1h-18c-0.552 0-1 0.448-1 1s0.448 1 1 1zM3 7h18c0.552 0 1-0.448 1-1s-0.448-1-1-1h-18c-0.552 0-1 0.448-1 1s0.448 1 1 1zM3 19h18c0.552 0 1-0.448 1-1s-0.448-1-1-1h-18c-0.552 0-1 0.448-1 1s0.448 1 1 1z" />
                    </svg>
                </button>
                <div className="navbar__menu">
                    <div className="navbar__scroller">
                        <div className="navbar__inner">
                            <button
                                aria-label="Close"
                                className="btn btn--icon btn--clear navbar__close-btn js-nav-toggle"
                                onClick={(event) => this.navToggleHandler(event)}
                            >
                                <svg
                                    className="icon"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M5.293 6.707l5.293 5.293-5.293 5.293c-0.391 0.391-0.391 1.024 0 1.414s1.024 0.391 1.414 0l5.293-5.293 5.293 5.293c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414l-5.293-5.293 5.293-5.293c0.391-0.391 0.391-1.024 0-1.414s-1.024-0.391-1.414 0l-5.293 5.293-5.293-5.293c-0.391-0.391-1.024-0.391-1.414 0s-0.391 1.024 0 1.414z" />
                                </svg>
                            </button>
                            <ul className="navbar__list menu">
                                {_.map(navLinks, (action, idx) => {
                                    const pageUrl = _.trim(currentPath, '/');
                                    const actionUrl = _.trim(_.get(action, 'url'), '/');
                                    const isActive = pageUrl === actionUrl;
                                    const isButton = _.get(action, 'style', null) !== 'link';
                                    return (
                                        <li
                                            key={idx}
                                            className={classNames('navbar__item', {
                                                'navbar__item--btn': isButton,
                                                'is-active': isActive
                                            })}
                                        >
                                            <Action action={action} />
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    render() {
        const header = _.get(this.props, 'config.header');
        const currentPath = _.get(this.props, 'path');
        const classes = classNames('site-header', {
            'js-nav-open': this.state.navBarOpen
        });
        return (
            <header className={classes}>
                <div className="container container--lg">
                    <nav className="navbar" aria-label="Main Navigation">
                        <Link className="sr-only" to="#content">
                            Skip to main content
                        </Link>
                        {this.renderLogo(header)}
                        {this.renderNavigationLinks(header, currentPath)}
                    </nav>
                </div>
            </header>
        );
    }
}
