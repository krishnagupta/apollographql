import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const GET_PROFILE = gql`
  query($profileId: Int!) {
    profile(profileId: $profileId) {
      id
      email
      first_name
      last_name
      avatar
    }
  }
`;

const UPDATE_PROFILE_CACHE = gql`
  mutation($profile: ProfileInput!){
    profilecache(profile: $profile) @client
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_PROFILE, {
    variables: {
      profileId: 2
    }
  })
  const [profilecache] = useMutation(UPDATE_PROFILE_CACHE);

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  return (
    <div>
      {JSON.stringify(data)}
      <button type="button" onClick={() => profilecache({ variables: { profile: data.profile }})}>Update Profile</button>
    </div>
  )
}

export default App
