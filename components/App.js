import Head from 'next/head'

const App = ({ children }) => (
  <div>
    <Head>
      <title>Vivo Scholar</title>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous" />
    </Head>

    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">              
              <a class="nav-link" href="/">Home <span class="sr-only">(current)</span>
            </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/people">People</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/publications">Publications</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/about">About</a>
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
