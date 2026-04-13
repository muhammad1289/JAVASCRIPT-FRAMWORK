import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
   //let count = 0

   let [counter , setAhmed] = useState(0);

   function addvalue(){
    counter = counter + 1;
    setAhmed(counter)
    console.log(counter)
   }

   function decresevalue(){
    setAhmed(counter - 1)
    console.log(counter);
    
   }

  return (
    <>
    <h1>Counter project</h1>
    <h3>count{counter}</h3>
    <button onClick= {addvalue}>add value</button>
    <br />
    <button onClick= {decresevalue}>decrease value</button>
    </>
  )
}

export default App
