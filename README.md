npm install apollo-boost @apollo/react-hooks graphql

apollo-boost: Package containing everything you need to set up Apollo Client
@apollo/react-hooks: React hooks based view layer integration
graphql: Also parses your GraphQL queries

```
import React from 'react';
import { render } from 'react-dom';

import { ApolloProvider } from '@apollo/react-hooks';

const App = () => (
  <ApolloProvider client={client}>
    <div>
      <h2>My first Apollo app 🚀</h2>
    </div>
  </ApolloProvider>
);

render(<App />, document.getElementById('root'));
```