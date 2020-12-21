import DateKey from './components/DateKey';
import Last from './components/Last';
import Main from './components/Main';
import Navbar from './components/Navbar';
import Value from './components/Value';
import { BrowserRouter as Router, Route} from 'react-router-dom';

function App() {
  return (
    <div>
      <Navbar/>
      <Router>
        <Route exact path="/" component={Main} />
        <Route exact path="/last" component={Last} />
        <Route exact path="/value" component={Value} />
        <Route exact path="/date" component={DateKey} />
      </Router>
    </div>
  );
}

export default App;
