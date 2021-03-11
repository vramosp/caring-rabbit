import React from 'react';
import { graphql } from 'gatsby';
import * as PropTypes from 'prop-types';
import _ from 'lodash';

import { classNames, withPrefix } from '../utils';
import SectionActions from './SectionActions';


export const query = graphql`
  fragment HeroSectionFragment on SanityHeroSection {
    _type
    title
    subtitle
    actions {
      ...ActionFragment
    }
    align
    image_alt
    image_position
    image {
      asset {
        url
      }
    }
    has_background
    background {
      background_color
      background_image_opacity
      background_image_size
      background_image_repeat
      background_image {
        asset {
          url
        }
      }
    }
  }
`;

export default class HeroSection extends React.Component {
    renderBackgroundImage(section) {
        const hasBackground = _.get(section, 'has_background');
        const backgroundImageUrl = _.get(section, 'background_image.asset.url');
        if (!hasBackground || !backgroundImageUrl) {
            return null;
        }
        const background = _.get(section, 'background');
        const backgroundOpacityPct = _.get(background, 'background_image_opacity', 100);
        const backgroundOpacity = backgroundOpacityPct * 0.01;
        const backgroundSize = _.get(background, 'background_image_size', 'cover');
        const backgroundRepeat = _.get(background, 'background_image_repeat', 'no-repeat');
        return (
            <div
                className="bg-image__image"
                style={{
                    backgroundImage: `url('${withPrefix(backgroundImageUrl)}')`,
                    opacity: backgroundOpacity,
                    backgroundSize: backgroundSize,
                    backgroundRepeat: backgroundRepeat
                }}
            />
        );
    }

    renderImage(section) {
        const imageUrl = _.has(section, 'image.asset.url');
        if (_.isEmpty(imageUrl)) {
            return null;
        }
        const imagePosition = _.get(section, 'image_position');
        const imageAlt = _.get(section, 'image_alt');
        return (
            <div
                className={classNames('cell', 'section__media', { 'section__media--right': imagePosition === 'right' })}
            >
                <img src={withPrefix(imageUrl)} alt={imageAlt} />
            </div>
        );
    }

    render() {
        const section = _.get(this.props, 'section');
        const align = _.get(section, 'align');
        const title = _.get(section, 'title');
        const subtitle = _.get(section, 'subtitle');
        const actions = _.get(section, 'actions');
        const hasBackground = _.get(section, 'has_background');
        const background = _.get(section, 'background', null);
        const backgroundColor = _.get(background, 'background_color', 'white');
        const classes = classNames('section', 'hero', {
            'bg-image': hasBackground && _.has(background, 'background_image'),
            'inverse bg-blue': hasBackground && backgroundColor === 'blue',
            'bg-gray': hasBackground && backgroundColor === 'gray',
            'section--padding': hasBackground || _.has(section, 'image')
        });
        return (
            <section className={classes}>
                {this.renderBackgroundImage(section)}
                <div className="container container--lg">
                    <div
                        className={classNames('flex', 'flex--middle', 'flex--center', 'flex--col-2', {
                            'align-center': align === 'center',
                            'align-right': align === 'right'
                        })}
                    >
                        {this.renderImage(section)}
                        <div className="cell section__body">
                            {!_.isEmpty(title) && <h1 className="section__title">{title}</h1>}
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

HeroSection.propTypes = {
    section: PropTypes.object
};
