import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Series from '../../containers/Series';
import SingleSeries from '../../containers/SingleSeries';


class Main extends React.Component {

  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Series} />
          <Route path='/series/:id' id='id' component={SingleSeries}/>
        </Switch>
      </HashRouter>
    )
  }
}
export default Main;
