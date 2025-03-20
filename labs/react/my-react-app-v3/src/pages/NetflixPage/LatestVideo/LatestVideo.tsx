// import React from 'react'
import { ILatestVideoProps } from '../../../modal/ILatestVideoProps';

const LatestVideo = (props: ILatestVideoProps) => { 
  // you can receive the data from parent comp via props
  console.log(props);
  // props are object
  // props are read-only

  return (
    <div className="card">
      <img
        src={props.thumbnailUrl}
        className="card-img-top"
        alt={props.title}
      />
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <p className="card-text">{props.children}</p>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">{props.views} Views</li>
        <li className="list-group-item">{props.publishedOn}</li>
      </ul>
    </div>
  );
}

export default LatestVideo