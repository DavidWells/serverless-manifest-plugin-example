import React from 'react'

function callApi(data) {
  return fetch(process.env.REACT_APP_MY_API_URL)
  .then((response) => response.json())
  .then((data) => {
    console.log('Success!', data)
  })
}

export default function App() {
  return (
    <div>
      <h1>My App</h1>
      <button onClick={callApi}>
        Call API
      </button>
    </div>
  )
}
