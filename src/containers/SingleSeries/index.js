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
      const randomNumbers = [];
      while(randomNumbers.length < 10){
          console.log(show._embedded.episodes.length)
        let x = Math.floor(Math.random() * show._embedded.episodes.length);
        if (!randomNumbers.includes(x)) {
          randomNumbers.push(x);
        }
      }
      const episodes = [];
      if (show !== null) {
        for(let i=0;i<randomNumbers.length;i++){
          episodes.push(show._embedded.episodes[randomNumbers[i]]);
        }
        console.log(episodes)
        let images = episodes.map((i, index) => {
          console.log(i.season + ' ' + i.number)
          console.log(i.number > 9)
          if (i.number > 9){
            return <div className='img-container' key={index}><img alt={'S0' + i.season + 'E' + i.number} src={i.image.original} /><a target="_blank" href={i.url}>{'S0'+i.season+'E'+i.number}<br/>{i.name}</a></div>
          } else if (i.number < 9){
            return <div className='img-container' key={index}><img alt={'S0' + i.season + 'E0' + i.number} src={i.image.original} /><a target="_blank" href={i.url}>{'S0'+i.season+'E0'+i.number}<br/>{i.name}</a></div>
          }
        });
        return images;
      }
    }

    return (
      <div>
        { show === null && <Loader /> }
        {
          show !== null
          &&
          <div className='main-container' >
            <img className='poster' alt='Poster' src={show.image.original} />
            <div className='grid-container'>
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
