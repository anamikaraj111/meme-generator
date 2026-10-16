 import {Route,Routes} from 'react-router-dom'
 import Homepage from './Pages/Homepage';
 import Edit from './Pages/Edit';
const App=()=>{
  return(
    <>
    <h1 className='heading'> Memes Generator </h1>
    <Routes>
       <Route path="/" element={<Homepage/>}/>
       <Route path="/edit" element={<Edit/>} />
    </Routes>
    
    </>
  )
}
export default App;