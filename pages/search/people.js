import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import App from '../../components/App'
import withData from '../../lib/apollo'
import _ from 'lodash'

const PersonList = ({ 
    url: { pathname, query: { search, pageNumber } }, 
    data: { loading, error, personsFacetedSearch } }) => {
  if (error) return <h1>Error loading people.</h1>
  if (personsFacetedSearch) {

    const pages = []
    const array =  _.range(0, parseInt(personsFacetedSearch.page.totalPages))

    for (const [index, value] of array.entries()) {
      var attr = "page-item"
      if (value === parseInt(personsFacetedSearch.page.number)) {
        attr = "page-item active"
      }
      // needs to add ?search to url too - should use some kind of parameter builder
      pages.push(<li className={attr} key={index}><a className="page-link" href={"?pageNumber="+value}>{value+1}</a></li>)
    }

    return (
      <App>
      <div>
        <h2>People</h2>

        <div>Query: { search }</div>
        <form action="/search/people" method="GET">
          <div class="form-group">
            <label for="search">Search:</label>
            <input defaultValue={ search } type="text" className="form-control" key="search" name="search" placeholder="search..." ref={ search } />
          </div>
        </form>

        <h3>page {personsFacetedSearch.page.number+1} of {personsFacetedSearch.page.totalPages} pages</h3>
        <ul className="pagination">
          { pages }
        </ul>
        <ul>
          {personsFacetedSearch.content.map((person, index) => (
            <li key={person.id}>
                <div>
                  <a href={"/person/"+person.id}>{person.name}</a>
                </div>
              </li>
          ))}
        </ul>
      </div>
      </App>
    )
  }
  return <div>Loading...</div>
}


const peopleSearch = gql`
query($search: String = "*:*", $pageNumber: Int = 0)  {
    personsFacetedSearch(
      facets: [{field: "keywords"},
        {field: "researchAreas"},
        {field: "selectedPublicationVenue"},
        {field: "selectedPublicationPublisher"},
        {field: "positions"}
      ],
      filters: [],
      paging: { pageSize:100, pageNumber: $pageNumber,
          sort:{ 
            orders: [{direction: ASC, property:"name"}]
          }  
      },
      query: $search
    ) {
      content {
        id
        name
        keywords
      }
      page {
          totalElements
          totalPages
          number
          size
      }
      facets {
        field
        entries {
          content { 
            value
            count 
          }
        }
      }
    }
  }
`

export default withData(graphql(peopleSearch, {
    options: ({ url: { query: { search, pageNumber } }}) => ({ 
      variables: { 
        search,
        pageNumber
      } 
    })
})(PersonList))