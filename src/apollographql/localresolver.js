import gql from 'graphql-tag'

const GET_PROFILE = gql`
    query {
        profile @client {
            id
            email
            first_name
            last_name
            avatar
        }
  }
`;

export default {
    Mutation: {
        profilecache: (_, { profile }, { cache }) => {
        const prevState = cache.readQuery({ query: GET_PROFILE })
        const data = {
          profile: {
            ...prevState.profile,
            first_name: profile.first_name
          }
        }
        cache.writeQuery({
          query: GET_PROFILE,
          data
        })
        return true
      }
    }
}