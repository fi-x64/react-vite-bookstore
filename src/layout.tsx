import { Outlet } from 'react-router-dom'

function App() {
  return (
    <>
      <div>
        Hello World
        <Outlet />
      </div>
    </>
  )
}

export default App
