import { Provider } from 'react-redux'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import store from './store'
import Huya from './views/huya/Huya'
import HuyaRoom from './views/huya/HuyaRoom'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/huya/:id">
            <HuyaRoom></HuyaRoom>
          </Route>
          <Route path="/huya">
            <Huya></Huya>
          </Route>
          <Route path="/" exact>
            <Redirect to="/huya"></Redirect>
          </Route>
        </Switch>
      </Router>
    </Provider>
  )
}

export default App
