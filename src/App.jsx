import { useState } from 'react'
import './main.scss'
import { useEffect } from 'react'

function App() {
  const [doList, setDoList] = useState([
    {
      id: Date.now() * Math.random(),
      title: "Đi học",
      status: false
    }
  ])

  function addList(e) {
    e.preventDefault();
    let newDo = {
      id: Date.now() * Math.random(),
      title: e.target.title.value,
      status: true
    }
    setDoList([newDo, ...doList])
  }

  function check(doId) {
    setDoList(doList.map(doItem => {
      if(doItem.id == doId) {
        doItem.status = !doItem.status
      }
      return doItem
    }))
  }

  function deleteDo(doId) {
    setDoList(doList.filter(doItem => doItem.id != doId))
  }

  function editDo(doItem) {
    let newTitle = window.prompt("Title mới", doItem.title);
    setDoList(doList.map(doItemMap => {
      if(doItemMap.id == doItem.id) {
        doItemMap.title = newTitle;
      }
      return doItemMap
    }))
  }
  useEffect(() => {
    console.log("doList", doList)
  }, [doList])
  return (
    <>
      <h1>To Do List</h1>
      <form onSubmit={(e) => {
        addList(e)
      }}>
        <input name='title' type="text" placeholder='Công Việc Của Bạn'/>
        <button>Add</button>
      </form>
      <ul>
        {
          doList.map((doItem) => (
            <li key={doItem.id}>
              <input onChange={() => {
                check(doItem.id)
              }} type="checkbox" checked={doItem.status}/>
              <span style={{textDecoration: doItem.status ? "line-through" : ""}}>{doItem.title}</span>
              <button onClick={() => {
                deleteDo(doItem.id)
              }}>Delete</button>
              <button onClick={() => {
                editDo(doItem)
              }}>Edit</button>
            </li>
          ))
        }
      </ul>
    </>
  )
}

export default App
