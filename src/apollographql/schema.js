export default `

type Profile {
    id: Int
    email: String
    first_name: String
    last_name: String
    avatar: String
}

input ProfileInput {
   id: Int
   email: String
   first_name: String
   last_name: String
   avatar: String
}

type Query {
   profile(profileId: Int!): Profile
}

type Mutation {
   updateProfile(profileId: Int!): Profile
   profilecache(profile: ProfileInput): Boolean
}


schema {
    query: Query
    mutation: Mutation
  }
`