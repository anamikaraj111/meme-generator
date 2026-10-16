import React, { useState } from 'react';
import Text from '../Components/Text';
import { useSearchParams } from 'react-router-dom';
const Edit=()=>{
    const [params] = useSearchParams();
    const [count, setCount] = useState(0);
    const imageUrl = params.get('url');

    const addText = () => setCount((currentCount) => currentCount + 1);
    return(
        <>
        <div>
        <div>
            {imageUrl && <img src={imageUrl} alt="Selected meme" className='imgs' />}
            {
                Array.from({ length: count }, (_, index) => <Text key={index} />)
            }
        </div>
        <button className='button'
        onClick={addText}
        
        >  Add Text </button>
        </div>
        </>
    )
}
export default Edit;