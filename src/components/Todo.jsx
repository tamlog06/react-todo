import React from 'react';

export default function Todo (props) {

  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
          <p onClick={() => props.changeEdit(props.id, props.name)}>
            {props.name}
          </p>
        </div>
        <div className="btn-group">
          <button type="button" className="btn" onClick={() => props.toggleTaskCompleted(props.id)}>
            完了
          </button>
          <button
            type="button"
            className="btn btn__danger"
            onClick={() => props.deleteTask(props.id)}
          >
            Delete <span className="visually-hidden">{props.name}</span>
          </button>
        </div>
    </div>
  );

  return <li className="todo">{viewTemplate}</li>;
}