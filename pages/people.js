import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import App from '../components/App'
import withData from '../lib/apollo'

const PersonList = ({ url: { pathname }, data: { loading, error, personsPaged } }) => {
  if (error) return <h1>Error loading people.</h1>
  if (personsPaged) {
    return (
      <div>
        <h2>People</h2>
        <h3>page {personsPaged.page.number} of {personsPaged.page.totalPages} pages</h3>
        <ul>
          {personsPaged.content.map((person, index) => (
            <li key={person.id}>
                <div>
                  <a href={"/person/"+person.id}>{person.name}</a>
                </div>
              </li>
          ))}
        </ul>
      </div>
    )
  }
  return <div>Loading...</div>
}
 
    
const allPeople = gql`
query personList($pageNumber: Int = 0) {
    personsPaged(paging: {
        pageNumber: $pageNumber, pageSize: 100,
        sort:{ 
          orders: [{direction: ASC, property:"name"}]
        }
    })
      {
      content {
        id
        name
        thumbnail
      }
      page {
        totalElements
        totalPages
        number
        size
      }
    }
}
`


export default withData(graphql(allPeople, {
  options: ({ url: { query: { pageNumber } } }) => ({ 
      variables: { 
        pageNumber
    } 
  })
})(PersonList))


