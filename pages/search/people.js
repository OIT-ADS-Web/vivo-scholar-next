import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import App from '../../components/App'
import Paging from '../../components/Paging'
import withData from '../../lib/apollo'
import _ from 'lodash'

const PersonList = ({ 
    url: { pathname, query: { search, pageNumber } }, 
    data: { loading, error, personsFacetedSearch } }) => {

    let cb = (page) => {
       console.log(`page=${page}`)
    }

    if (error) return <h1>Error loading people.</h1>
    if (personsFacetedSearch) {

    return (
      <App>
      <div>
        
        
        <form action="/search/people" method="GET">
        
          <h2>People</h2>
          <div>Query: { search }</div>

          <div className="form-group">
            <label for="search">Search:</label>
            <input defaultValue={ search } type="text" className="form-control" key="search" name="search" placeholder="search..." ref={ search } />
          </div>
        

        <h3>page {personsFacetedSearch.page.number+1} of {personsFacetedSearch.page.totalPages} pages</h3>
        <Paging page={personsFacetedSearch.page} callback={cb}></Paging>
        
        <div className="row" key={`form-search-row`}>
        
        <div className="col-sm"> 
          <ul className="list-group">
            {personsFacetedSearch.content.map((person, index) => (
              <li className="list-group-item" key={person.id}>
                  <span className="person-name">
                    <a href={"/person/"+person.id}>{person.name}</a>
                  </span>
                </li>
            ))}
          </ul>
        </div>

        <div className="col-sm">
        {personsFacetedSearch.facets.map((facet, index) => (
            <div>
                <h3>{ facet.field }</h3>
                <ul className="list-group" key={facet.field}>
                    {facet.entries.content.map((e, index2) => (
                                        
                     <li className="list-group-item" key={`lgi-${index2}_${facet.field}`}>
                        <input
                          defaultChecked={!!facet.value==e.value} 
                          type="checkbox" 
                          name={`filters[${facet.field}]`}
                          value={e.value} />
                        {e.value} ({e.count})
                     </li>
                    ))}
                </ul>
            </div>
        ))}
        </div>

        </div>{ /*end div row */}

        </form>
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