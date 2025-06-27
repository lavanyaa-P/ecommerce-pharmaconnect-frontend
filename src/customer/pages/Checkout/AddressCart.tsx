import { Radio } from '@mui/material';
import React from 'react';

const AddressCart = () => {
    const handleChange = (event:any) => {
        console.log(event.target.checked)
    }
    return(
        <div className='p-5 border rounded-md flex'>
            <div>
                <Radio 
                checked={true}
                onChange={handleChange}
                value=""
                name="radio-button"
                />
            </div>
            <div className='space-y-3 pt-3'>
                <h1>Lavanya</h1>
                <p>Ambavadi choke, Bengaluru, Karnataka - 530068</p>
                <p><strong>Mobile </strong> :9101234580</p>
            </div>
        </div>
    )
}

export default AddressCart