import React, { Component } from 'react';
import Loader from '../../components/Loader'

class SingleSeries extends Component {
  state = {
    show: null
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    fetch(`http://api.tvmaze.com/shows/${id}?embed=episodes`)
      .then(response => response.json())
      .then(json => this.setState({ show: json }));
  }

  render() {
    const { show } = this.state;
    console.log(show);

    const randomNum = (min, episodes ) => {
    var n = [];
    for(let i=0;i<6;i++){
    n.push(Math.floor(Math.random() * episodes) + min);
    return n;
    console.log(n)
    }
    }

    return (
      <div>
        { show === null && <Loader /> }
        {
          show !== null
          &&
          <div style={{display: 'grid', gridTemplateColumns: 'auto auto auto'}} >
            <img style={{height: 'calc(100vh - 100px)'}} alt='Show' src={show.image.original} />
            <div>
              <h1>{show.name}</h1>
              <p>Premiered - {show.premiered}</p>
              <p>Rating - {show.rating.average}</p>
              <p>Episodes - {show._embedded.episodes.length}</p>
              <div dangerouslySetInnerHTML={{__html: show.summary}} />
              <h2>{Math.floor((Math.random() * show._embedded.episodes.length))}</h2>
            </div>
            <img style={{maxHeight: 'calc(100vh - 100px)', maxWidth: 'calc(100vw - 1500px)'}} alt='Show' src={show._embedded.episodes[8].image.original} />
          </div>
        }
      </div>
    )
    console.log(show._embedded.episodes.length);
  }
}

export default SingleSeries;
