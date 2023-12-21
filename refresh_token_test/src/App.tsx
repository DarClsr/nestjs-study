import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';
function App() {
  const [a,setA]=useState('a')
  const [b,setB]=useState('b')

  const login=async ()=>{
    
  }

  const fetch=async ()=>{
    const {data:aData}=await axios.get("http://localhost:3000/aaa")
    const {data:bData}=await axios.get("http://localhost:3000/bbb")

    setA((aData))
    setB((bData))

    console.log({
      aData,
      bData
    })
  }

  useEffect(()=>{
    fetch()
  },[])
  return (
    <div className="App">
      <header className="App-header">
        <p>
          {a}
        </p>
        <p>
          {b}
        </p>
        
      </header>
    </div>
  );
}

export default App;
