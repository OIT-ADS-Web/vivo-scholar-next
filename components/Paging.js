
import helper from '../lib/paging'
import _ from 'lodash'

/*
    page {
      totalPages
      number
      size
      totalElements
    }
*/
const PAGE_ROWS = 100 // page-by

const PagingPanel = ({page: {totalPages, number, size, totalElements}}) => {       
    
    const remainder = totalPages % PAGE_ROWS
    
    if (remainder) {
      totalPages +=1
    }

    if (totalPages == 0) {
      return ( <div></div> )
    }

    // changing 0 based to 1 based
    const currentPage = number + 1
 
    const page = (pageNumber, active) => {
      let key = `pageLinkTo_${pageNumber}`

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
    console.log(pageMap)
    
    let flip = (x, direction) => {
      if(x[0] == '+') {
        let pageNumber = x[1]

        let desc = (<span><span aria-hidden="true">&laquo;</span> Previous</span>)
        if (direction == 'forward') {
          desc = (<span>Next <span aria-hidden="true">&raquo;</span></span>)
        }
        let key = `pageLinkTo_${pageNumber}`
        return (<li key={key}><a href="#" onClick={(e) => this.handlePage(e, pageNumber)}>{desc}</a></li>) 
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
