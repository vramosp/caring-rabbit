import React from 'react';
import _ from 'lodash';
import { graphql } from 'gatsby';

import { Link, withPrefix, classNames } from '../utils';

export const query = graphql`
    fragment ActionFragment on SanityAction {
        label
        url
        style
        new_window
        no_follow
    }
`;

export default class Action extends React.Component {
    render() {
        const action = _.get(this.props, 'action');
        const url = _.get(action, 'url', null);
        const label = _.get(action, 'label', null);
        const props = {};
        const newWindow = _.get(action, 'new_window');
        const noFollow = _.get(action, 'no_follow');
        if (newWindow) {
            props.target = '_blank';
        }
        if (newWindow || noFollow) {
            props.rel = (newWindow ? 'noopener ' : '') + (noFollow ? 'nofollow' : '');
        }
        const isButton = _.get(action, 'style') !== 'link';
        const isSecondary = _.get(action, 'style') === 'secondary';
        const classes = classNames({
            btn: isButton,
            'btn--secondary': isSecondary
        });
        return (
            <Link to={withPrefix(url)} {...props} className={classes}>
                {label}
            </Link>
        );
    }
}
