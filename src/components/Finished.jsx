import React from 'react';

export default function Finished(props) {

  return (
    <li className="todo">
      <div className="stack-small">
        <div className="c-cb">
          <p className="todo-label" htmlFor={props.id}>
            {props.name}
          </p>
        </div>
      </div>
    </li>
  );
}