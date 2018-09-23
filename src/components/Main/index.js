import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Series from '../../containers/Series';
import SingleSeries from '../../containers/SingleSeries';


class Main extends React.Component {

  render() {
    return (
      <Switch>
        <Route exact path="/" component={Series} />
        <Route path='/series/:id' id='id' component={SingleSeries}/>
      </Switch>
    )
  }
}
export default Main;
