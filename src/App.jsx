
import { useDispatch } from 'react-redux'
import './App.css'
import { useEffect, useState } from 'react';
import authservice from './appwrite/auth.js';
import {login , logout} from './Store/authSlice.js'
import { Footer, Header } from './components/index.js';
import { Outlet } from 'react-router-dom';

function App() {
  
  const[loading ,setLoading] = useState(true)
  const dispatch = useDispatch();

  useEffect(()=>{
    authservice.getCurrentUser()
    .then(userData=>{
      if(userData){
        dispatch(login({userData}))
      }else{
        dispatch(logout())
      }
    })
    .finally(()=>setLoading(false))
  },[])

  

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='h-full block'>
        <Header/>
        <main>
          {/* <Outlet */}
        </main>
        <Footer />
      </div>
    </div>
  ):(
    <div>loading...</div>
  )

}

export default App
