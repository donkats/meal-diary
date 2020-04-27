import React from 'react';

function Dateslider(props) {
  //const { isAuthenticated } = useAppContext();
  const date = props.date
  return (
      <header className="date-header">
        <div className="back">{'<'}</div>
        <h1>{date}</h1>
        <div className="next">{'>'}</div>
      </header>
  );
}

export default Dateslider;