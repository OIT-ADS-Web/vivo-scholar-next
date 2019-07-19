import Head from 'next/head'

const App = ({ children }) => (
  <div>
    <Head>
      <title>Vivo Scholar</title>
    </Head>
    {children}
  </div>
)

export default App
