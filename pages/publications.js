import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import App from '../components/App'
import Paging from '../components/Paging'
import withData from '../lib/apollo'
import _ from 'lodash'

const PublicationList = ({ url: { pathname }, data: { loading, error, documentsPaged } }) => {
  if (error) return <h1>Error loading documents.</h1>
  if (documentsPaged) {
    let cb = (page) => {
        console.log(`page=${page}`)
    }

    const pages = []
    const array =  _.range(0, parseInt(documentsPaged.page.totalPages))

    for (const [index, value] of array.entries()) {
      var attr = "page-item"
      if (value === parseInt(documentsPaged.page.number)) {
        attr = "page-item active"
      }
      pages.push(<li className={attr} key={index}><a className="page-link" href={"?pageNumber="+value}>{value+1}</a></li>)
    }

    return (
      <App>
      <div>
        <h2>Publications</h2>
        <h3>page {documentsPaged.page.number+1} of {documentsPaged.page.totalPages} pages</h3>
        <Paging page={documentsPaged.page} callback={cb}></Paging>
        <ul>
          {documentsPaged.content.map((pub, index) => (
            <li key={pub.id}>
                <div>
                  <a href={"/publication/"+pub.id}>{pub.title}</a>
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
 
    
const allPublications = gql`
query($pageNumber: Int = 0) {
    documentsPaged(paging: {
        pageNumber: $pageNumber, pageSize: 100,
        sort:{ 
          orders: [{direction: ASC, property:"title"}]
        }
    })
      {
      content {
        id
        title
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


export default withData(graphql(allPublications, {
  options: ({ url: { query: { pageNumber } } }) => ({ 
      variables: { 
        pageNumber
    } 
  })
})(PublicationList))


