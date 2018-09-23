import React from 'react';
import './index.css';
import { Link } from 'react-router-dom';

const SeriesListItem = ({ series }) => (
  <li>
    <Link to={`/series/${series.show.id}`}>
      {series.show.name}
    </Link>
  </li>
)
const SeriesList = (props) => {
//   const li = document.querySelector('ul.series-list li');
  const input = document.querySelector('input');
  let ul = document.querySelector('ul.series-list');
// console.log(ul)
  if (input !== null && ul !== null) {
    ul.classList.toggle("toggle");
    // ul = document.querySelector('ul.series-list');
    console.log(ul)
    input.value = null;
    ul.parentNode.removeChild(ul)
    // console.log(input.value)
    // ul = document.querySelector('ul.series-list');
    // console.log(ul)
  }

  return  (
    <div>
    {
      input !== null
      &&
      <ul className='series-list'>
        {props.list.map(series => (
          <SeriesListItem series={series} key={series.show.id} />
        ))}
      </ul>
    }
    </div>
  )
}

export default SeriesList;
