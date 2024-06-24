import { useState } from 'react'

import './App.css'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from './components/Footer'
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons'; // Ensure this path is correct

library.add(fas, far);

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <div className='bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]'>

      <Manager/>

        
      </div>
     
      
      
      
      <Footer />
    </>
  )
}

export default App
