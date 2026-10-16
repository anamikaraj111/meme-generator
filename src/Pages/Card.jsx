import { useNavigate } from 'react-router-dom';
import React from 'react';
const Card=(props)=>{
    const navigate=useNavigate();
    return(
        <>
        <div className='cards'>
            <img src= {props.img}/>
            <h3> {props.title}</h3>
            <button onClick={() => navigate(`/edit?url=${encodeURIComponent(props.img)}`)}> Edit </button>
        </div>
        </>
    )
}
export default Card;