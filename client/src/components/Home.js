import React from 'react';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import Comment from './Comment';

const GET_HOME = gql`
  query GetHome {
    items {
      id
      name
      comments(top: 1) {
        id
        content
        numberOfStars
      }
    }
    weather {
      temperature
      city
    }
  }
`;

const Home = () => (
  <Query query={GET_HOME}>
    {({ loading, error, data }) => {
      if (loading) return 'Loading...';
      if (error) return `Error! ${error.message}`;
      const {
        items,
        weather: { temperature, city },
      } = data;
      return (
        <>
          <aside>
            <p>{`Ceci est la température : ${temperature} à ${city}`}</p>
          </aside>
          <ul>
            {items.map(item => (
              <li key={item.id}>
                <Link to={`/items/${item.id}`}>{item.name}</Link>
                <Comment
                  id={item.comments[0].id}
                  content={item.comments[0].content}
                  numberOfStars={item.comments[0].numberOfStars}
                />
              </li>
            ))}
          </ul>
        </>
      );
    }}
  </Query>
);

export default Home;
