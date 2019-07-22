import Head from 'next/head'

const App = ({ children }) => (
  <div className="container">
    <Head>
      <title>Vivo Scholar</title>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous" />

    </Head>
    {children}
  </div>
)

export default App
