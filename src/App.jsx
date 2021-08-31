import React, { useState }from "react";
import Todo from "./components/Todo";
import Finished from "./components/Finished";
import { nanoid } from "nanoid";

// オブジェクトが空かどうか
function isNotEmpty(obj) {
  return !!Object.keys(obj).length;
}

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [beforeName, setBeforeName] = useState('');
  const [editId, setId] = useState(null);

  // taskの追加
  function addTask(name){
    const newTask = { id: "todo-" + nanoid(), name: name, completed: false };
    setTasks([...tasks, newTask]);
  }

  // taskを完了する
  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map(task => {
      if (id === task.id) {
        return {...task, completed: !task.completed}
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  // taskを削除
  function deleteTask(id) {
    // 編集中に、編集中のものを削除する際の処理
    const deltask = tasks.filter(task => task.id === editId);
    if (isNotEmpty(deltask) && deltask[0].name === beforeName) {
      setBeforeName('');
      setName('');
      setId(null);
    }
    const remainingTasks = tasks.filter(task => id !== task.id);
    setTasks(remainingTasks);
  }

  // taskを編集する準備
  function changeEdit(id, beforeName) {
    setName(beforeName);
    setBeforeName(beforeName);
    setId(id);
  }

  // 実際にtaskを編集してtodoを書き換える
  function editTask(id, newName) {
    const editedTaskList = tasks.map(task => {
      if (id === task.id) {
        return {...task, name: newName}
      }
      return task;
    });
    setTasks(editedTaskList);
    setId(null);
    setBeforeName('');
  }

  // inputの中身を変える
  function handleChange(e) {
    setName(e.target.value);
  }

  // inputを保存する場合のバリデーションと各操作
  function handleSubmit(e){
    e.preventDefault();
    // 空欄
    if (!name) {
      alert("やることを入力してください");
    } 
    // 編集時に無編集
    else if (beforeName === name) {
      alert('編集項目が変更されていません');
    } 
    // 重複
    else if (activeListNames.includes(name)) {
      alert("同名の項目が存在します");
    } 
    // taskの追加
    else if (editId === null) {
      addTask(name);
      setName("");
    } 
    // taskの編集
    else {
      editTask(editId, name);
      setName("");
    }
  }

  
  // 未完了のtodoリスト
  const activeList = tasks
  .filter(task => !task.completed)
  .map(task => 
    <Todo 
      id={task.id} 
      name={task.name} 
      key={task.id} 
      toggleTaskCompleted={toggleTaskCompleted} 
      deleteTask={deleteTask}
      changeEdit={changeEdit}
    />
  );
  
  // 未完了のtodoリストの名前のリスト
  const activeListNames = tasks
  .filter(task => !task.completed)
  .map(task => task.name);
  
  // 完了済みのtaskリスト
  const completedList = tasks
  .filter(task => task.completed)
  .map(task => 
    <Finished 
      id={task.id} 
      name={task.name} 
      key={task.id} 
    />
  );
  
  // 完了済みのtaskの数
  const completedNum = completedList.length;
  
  // 完了済みのtaskを表示するかどうかの変更
  function changeShow() {
    if (completedNum === 0) {
      setShow(false);
    } else {
      setShow(!show);
    }
  }
  
  // 完了済みのtaskを表示するかどうかのボタンのメッセージ
  const message = show ? "表示しているよ" : "表示ボタン";
  
  // taskを記入するフォームのview
  const Form = (
    <form onSubmit={handleSubmit}>
    <h1 className="title-wrapper">
      Todoリスト作成
    </h1>
    <input
      type="text"
      id="new-todo-input"
      className="input input__lg"
      name="text"
      autoComplete="off"
      value={name}
      onChange={handleChange}
    />
    <button type="submit" className="btn btn__primary btn__lg">
      保存
    </button>
  </form>
  );
  
  // 完了済みtaskを表示するview
  const ShowTemplate = (
    <div className="todoapp stack-large">
      {Form}
      <h1>Todoリスト</h1>
      <ul
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {activeList}
      </ul>
      <button type="button" className="btn" onClick={() => changeShow() }>
        {message}
      </button>
      <h1>完了リスト</h1>
      <ul
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {completedList}
      </ul>
    </div>
  );
  
  // 完了済みtaskを非表示にするview
  const HideTemplate = (
    <div className="todoapp stack-large">
      {Form}
      <h1>Todoリスト</h1>
      <ul
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {activeList}
      </ul>
      <button type="button" className="btn" onClick={() => changeShow() }>
        {message}
      </button>
    </div>
  );
  
  // 5個taskを消化した場合のview
  const FinishTemplate = (
    <div>
      <h1>Bootcamp突破おめでとう!!</h1>
    </div>
  )
  
  // 場合に応じてviewを変える
  function changeTemplate(){
    if (completedNum >= 5) {
      return FinishTemplate;
    } else {
      return (show ? ShowTemplate : HideTemplate);
    }
  }
  return changeTemplate();
}