import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import App from '../components/App'
import withData from '../lib/apollo'

const Person = ({ url: { pathname }, data: { loading, error, person } }) => {
  if (error) return <h1>Error loading the person.</h1>

  if (person) {

    var positions = []
    var publications = []
    
    if (person.positions != null) {
      for (const [index, value] of person.positions.entries()) {
        positions.push(<div className="position row"><span className="position-type">{value.type}</span></div>)
      }
    }

    if (person.selectedPublications != null) {
      for (const [index, value] of person.selectedPublications.entries()) {
        publications.push(<li className="list-group-item"><span className="publication-title">{value.title}</span></li>)
      }
    }

    var image = ""
    if (person.thumbnail != null) {
      image = <img width="160" src={"http://openvivo.org"+person.thumbnail} />
    }

    return (
      <App>
        <div className="row">
            <div className="col-sm"> 
                <section className="image">
                   <div>
                      { image }
                   </div>
                </section>
            </div>
            <div className="col-sm">  
              <h2>{ person.name }</h2>
            </div>
            <div className="col-sm"> 
               { positions }
            </div>
        </div>

        <h3>Publications</h3>
        <section className="publication-list">

          <ul className="list-group">
             { publications }
          </ul>
        </section>


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
