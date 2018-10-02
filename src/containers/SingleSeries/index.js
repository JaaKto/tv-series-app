import React, { Component } from 'react';
import './index.sass';
import Series from '../Series';

let carousel;
let innerCarousel;
let counter = 0;


class SingleSeries extends Component {
  constructor() {
    super();
    this.state = {
      show: null
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // Store match.params in state so we can compare when props change.
    if (prevState.props !== undefined && nextProps.match.params !== prevState.match.params) {
      return {
        id: nextProps.match.params
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params !== this.props.match.params) {
      // At this point, we're in the "commit" phase, so it's safe to load the new data.
      const { id } = this.props.match.params;
        fetch(`https://api.tvmaze.com/shows/${id}?embed=episodes`)
          .then(response => response.json())
          .then(json => this.setState({ show: json }));
    }
    //setting width of carousel by the amount od images
    carousel = document.getElementsByClassName('img-container');
    innerCarousel = document.querySelector('.inner-carousel');
    innerCarousel.style.width = (carousel.length * 40)+'vw';
  }

  // moving carousel
  previous = () => {
    if (document.body.clientWidth > 1500) {
      if (counter > 0) {
        innerCarousel.style.transform = 'translateX('+(20 - (20 * counter))+'vw)';
        counter--;
      }
    } else if (document.body.clientWidth > 900){
      if (counter > 0) {
        innerCarousel.style.transform = 'translateX('+(25 - (25 * counter))+'vw)';
        counter--;
      }
    } else {
      if (counter > 0) {
        innerCarousel.style.transform = 'translateX('+(33.33 - (33.33 * counter))+'vw)';
        counter--;
      }
    }

  }
  next = () => {
    if (document.body.clientWidth > 1500) {
      if (counter < carousel.length - 4) {
        innerCarousel.style.transform = 'translateX('+(-20 - (20 * counter))+'vw)';
        counter++;
      }
    } else if (document.body.clientWidth > 900){
      if (counter < carousel.length - 4) {
        innerCarousel.style.transform = 'translateX('+(-25 - (25 * counter))+'vw)';
        counter++;
      }
    } else {
      if (counter < carousel.length - 3) {
        innerCarousel.style.transform = 'translateX('+(-33.33 - (33.33 * counter))+'vw)';
        counter++;
      }
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    fetch(`https://api.tvmaze.com/shows/${id}?embed=episodes`)
      .then(response => response.json())
      .then(json => this.setState({ show: json }));
  }

  render() {
    const { show } = this.state;

    //picking random photos
    let showEpisodes = () => {
      const randomNumbers = [];
      while(randomNumbers.length < 20 || randomNumbers.length < show._embedded.episodes.length / 2){
        let x = Math.floor(Math.random() * show._embedded.episodes.length);
        if (!randomNumbers.includes(x)) {
          randomNumbers.push(x);
        }
      }
      const episodes = [];
      if (show !== null && show._embedded.episodes) {
        for(let i=0;i<randomNumbers.length;i++){
          episodes.push(show._embedded.episodes[randomNumbers[i]]);
        }
        let images = episodes.map((i, index) => {
          if (i.image !== null && i.number > 9){
            return <div className='img-container' key={index}><img alt={'S0' + i.season + 'E' + i.number} src={i.image.original} /><a target="_blank" href={i.url}>{'S0'+i.season+'E'+i.number}<br/>{i.name}</a></div>
          } else if (i.image !== null && i.number <= 9){
            return <div className='img-container' key={index}><img alt={'S0' + i.season + 'E0' + i.number} src={i.image.original} /><a target="_blank" href={i.url}>{'S0'+i.season+'E0'+i.number}<br/>{i.name}</a></div>
          }
        });
        return images;
      }
    }

    return (
      <div>
      <Series />
        {
          show !== null
          &&
          <div>
            <div className='main-container' >
              <div className='flex-container'>
                <img className='poster' alt='Poster' src={show.image.original} />
                <div className='tv-series-container'>
                  <img className='mobileOnlyPoster' alt='Poster' src={show.image.original} />
                  <h1>{show.name}</h1>
                  <p>Premiered - {show.premiered}</p>
                  <p>Rating - {show.rating.average}</p>
                  <p>Episodes - {show._embedded.episodes.length}</p>
                  <div dangerouslySetInnerHTML={{__html: show.summary}} />
                </div>
              </div>
              <div className='carousel-container'>
                <div className='inner-carousel'>
                  {showEpisodes()}
                </div>
                <button onClick={() => this.previous()}>-</button>
                <button onClick={() => this.next()}>+</button>
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}

export default SingleSeries;
