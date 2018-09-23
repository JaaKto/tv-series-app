import React from 'react';
import './index.sass';
import { Link } from 'react-router-dom';

const SeriesListItem = ({ series }) => (
  <li>
    <Link to={`/series/${series.show.id}`}>
      {series.show.name}
    </Link>
  </li>
)
const SeriesList = (props) => {
  const input = document.querySelector('input');
  let ul = document.querySelector('ul.series-list');
  if (input !== null && ul !== null) {
    input.value = null;
    ul.parentNode.removeChild(ul)
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
