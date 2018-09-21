import React, { Component } from 'react';
import Loader from '../../components/Loader';
import './index.css';

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
    console.log(show)



    let showEpisodes = () => {
      const n = [];
      if (show !== null) {
        for(let i=0;i<10;i++){
          n.push(show._embedded.episodes[(Math.floor(Math.random() * show._embedded.episodes.length))].image.original);
        }
        let images = n.map((i, index) => {
          return <img key={index} alt='Show' src={i} />
          // return <img style={{maxHeight: 'calc(100vh - 100px)', maxWidth: 'calc(100vw - 1500px)'}} alt='Show' src={i} />
        });
        return images;
      }
    }

    // const randomNumbers = [];
    // while(randomNumbers.length < 10){
    //     console.log(show._embedded.episodes.length)
    // 	let x = Math.floor(Math.random() * show._embedded.episodes.length);
    // 	if (!randomNumbers.includes(x)) {
    // 		randomNumbers.push(x);
    // 	}
    // }
    //
    // let showEpisodes = () => {
    //   const n = [];
    //   if (show !== null) {
    //     for(let i=0;i<=randomNumbers.length;i++){
    //       n.push(show._embedded.episodes[randomNumbers[i]].image.original);
    //     }
    //     let images = n.map((i) => {
    //       return <img alt='Show' src={i} />
    //       // return <img style={{maxHeight: 'calc(100vh - 100px)', maxWidth: 'calc(100vw - 1500px)'}} alt='Show' src={i} />
    //     });
    //     return images;
    //   }
    // }

    return (
      <div>
        { show === null && <Loader /> }
        {
          show !== null
          &&
          <div className='main-container' style={{display: 'flex'}} >
            <img className='poster' alt='Show' src={show.image.original} />
            <div className='grid-container' >
              <div className='tv-series-container'>
                <h1>{show.name}</h1>
                <p>Premiered - {show.premiered}</p>
                <p>Rating - {show.rating.average}</p>
                <p>Episodes - {show._embedded.episodes.length}</p>
                <div dangerouslySetInnerHTML={{__html: show.summary}} />
              </div>
              {showEpisodes()}
            </div>
          </div>
        }
      </div>
    )
  }
}

export default SingleSeries;
