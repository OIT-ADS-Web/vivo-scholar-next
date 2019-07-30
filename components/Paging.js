
import helper from '../lib/paging'
import _ from 'lodash'

import Link from "next/link"
//import { printIntrospectionSchema } from 'graphql';


const PagingPanel = ({page: {totalPages, number, size, totalElements}, callback}) => {       
    if (totalPages == 0) {
      return ( <div></div> )
    }

    // trying to make a way for parent components to 
    // generate the link (with possibly more parameters - particularly search)
    const logPage = (page) => console.debug(page)
    let cb = callback || logPage
    // changing 0 based to 1 based
    const currentPage = number + 1
 
    const page = (pageNumber, active) => {
      let key = `pageLinkTo_${pageNumber}`

      cb(pageNumber)

      if(active) {
        return (
         <li key={key} className="page-item active">
           <a className="page-link">{pageNumber}</a>
         </li>
        )
      } else {
         return (
          <li key={key} className="page-item">
            <span>
              <a className="page-link" href={"?pageNumber="+(pageNumber -1)}>{pageNumber}</a>
            </span>
          </li>
        )
      }
    }

    let pageMap = helper.pageArrays(totalPages - 1, currentPage)
    // pageMap is an array set of arrays
    // more/less links are returned as ['+', 16] or ['-'] (means no number)
    //
    // so example might be [['+', 1][16...30]['+', 31]]
 
    let [previous, current, next] = pageMap
    //console.log(pageMap)
    
    let flip = (x, direction) => {
      if(x[0] == '+') {
        let pageNumber = x[1]

        let desc = (
           <a className="page-link" href={"?pageNumber="+(pageNumber -1)}>
              <span aria-hidden="true">&laquo;</span> Previous
            </a>)
        if (direction == 'forward') {
          desc = (
            <a className="page-link" href={"?pageNumber="+(pageNumber -1)}>Next <span aria-hidden="true">&raquo;</span></a>)
        }
        let key = `pageLinkTo_${pageNumber}`
        return (<li key={key}><span>{desc}</span></li>) 
      }
    }

    let pages = _.map(current, (x) => {
       let active = (x == currentPage) ? true : false
       return page(x, active)
    })

    let backward = flip(previous, 'backward') 
    let forward = flip(next, 'forward') 

    const paging = () => {
      
      return (
          <ul className="pagination">
            {backward}
            {pages}
            {forward}
          </ul>
      )
    } 
    const pageList = paging()   
    return (
        pageList
    )
  
}

export default PagingPanel
