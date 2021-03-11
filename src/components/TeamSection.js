import React from 'react';
import { graphql } from 'gatsby';
import * as PropTypes from 'prop-types';
import _ from 'lodash';

import { withPrefix, markdownify } from '../utils';


export const query = graphql`
  fragment TeamSectionFragment on SanityTeamSection {
    _type
    title
    team {
      link
      first_name
      last_name
      bio
      photo_alt
      photo {
        asset {
          url
        }
      }
    }
  }
`;

export default class TeamSection extends React.Component {
    renderTeam(section) {
        const team = _.get(section, 'team');
        return _.map(team, (person, idx) => {
            const photoUrl = _.get(person, 'photo.asset.url');
            const photoAlt = _.get(person, 'photo_alt');
            const firstName = _.get(person, 'first_name', '');
            const lastName = _.get(person, 'last_name', '');
            const fullName = _.trim(`${firstName} ${lastName}`);
            const bio = _.get(person, 'bio');
            return (
                <div key={idx} className="cell">
                    <div className="card team-member">
                        {!_.isEmpty(photoUrl) && (
                            <figure className="card__media card__media--bottom">
                                <img src={withPrefix(photoUrl)} alt={photoAlt} />
                            </figure>
                        )}
                        <div className="card__body">
                            {!_.isEmpty(fullName) && (
                                <header className="card__header">
                                    <h3 className="h4 card__title">{fullName}</h3>
                                </header>
                            )}
                            {!_.isEmpty(bio) && <div className="card__copy">{markdownify(bio)}</div>}
                        </div>
                    </div>
                </div>
            );
        });
    }

    render() {
        const section = _.get(this.props, 'section');
        const title = _.get(section, 'title');
        return (
            <section className="section section--team">
                {!_.isEmpty(title) && (
                    <div className="container container--md align-center">
                        <h2 className="section__title">{title}</h2>
                    </div>
                )}
                <div className="container container--lg">
                    <div className="flex flex--col-3">{this.renderTeam(section)}</div>
                </div>
            </section>
        );
    }
}

TeamSection.propTypes = {
    section: PropTypes.object
};
