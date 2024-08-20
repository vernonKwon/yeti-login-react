import './App.css'
import useWindowSize from './hooks/useWindowSize'
import './style/home.scss'
// import { isMobile } from 'react-device-detect'

import SignIn from './components/SignIn'

// eslint-disable-next-line @typescript-eslint/naming-convention
function App() {
  const { height } = useWindowSize()
  return (
    <>
      <div className="home" style={{ height }}>
        <div className="content">
          <SignIn
            checkLogin={(user: string, pass: string) =>
              user === 'user' && pass === 'password'
            }
          />
        </div>
      </div>
    </>
  )
}

export default App
