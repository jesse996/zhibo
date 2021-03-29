import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import Huya from './views/Huya'
import HuyaRoom from './views/HuyaRoom'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/huya/:id">
          <HuyaRoom></HuyaRoom>
        </Route>
        <Route path="/huya">
          <Huya></Huya>
        </Route>
      </Switch>
    </Router>
  )
}

export default App
