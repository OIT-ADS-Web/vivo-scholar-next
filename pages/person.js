import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import App from '../components/App'
import withData from '../lib/apollo'

const Person = ({ url: { pathname }, data: { loading, error, person } }) => {
  if (error) return <h1>Error loading the person.</h1>

  if (person) {
    return (
      <App>
          <h1>{ person.name }</h1>
      </App>
    )
  }
  return <div>Loading...</div>
}


const person = gql`
query personDetails($id: String!) {
  person(id: $id) {
    id
    thumbnail
    image
    name
    keywords
    positions {
      type
    }
    selectedPublications {
      id
      title
    }
  }
}`

export default withData(graphql(person, {
  options: ({ url: { query: { id } } }) => ({ 
    variables: { 
      id 
    } 
  })
})(Person))
