import Head from 'next/head'

const App = ({ children }) => (
  <div>
    <Head>
      <title>Vivo Scholar</title>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous" />
    </Head>

    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active" key={`menu-home`}>              
              <a className="nav-link" href="/">Home <span class="sr-only">(current)</span>
            </a>
            </li>
            <li className="nav-item" key={`menu-people`}>
              <a className="nav-link" href="/search/people">People</a>
            </li>
            <li className="nav-item" key={`menu-pub`}>
              <a className="nav-link" href="/publications">Publications</a>
            </li>
            <li className="nav-item" key={`menu-about`}>
              <a className="nav-link" href="/about">About</a>
            </li>
          </ul>

        </div>
      </nav>

    <div className="container">
      {children}
    </div>
  </div>
)

export default App
