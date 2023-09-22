import {useState} from 'react';
import {formatPrice} from '../utils';
const FormRange = ({label ,name,size }) => {
    const maxPrice = 100000;
    const step = 1000;
    const [selectedPrice ,setSelectedPrice]=useState(maxPrice);
  return (
    
    <div className="form-control">
      <label  htmlFor={name} className="label">
        <span className="label-text" >{label}</span>
        <span className="label-price">{formatPrice(selectedPrice)}</span>
      </label>
      <input
        type='range'
        name={name}
        min={0}
        max={maxPrice}
        value={selectedPrice}
        onChange={(e) => setSelectedPrice(e.target.value)}
        className={`form-range ${size}`}
        step={step}
      />
      <div className="extra">
      <span className='min-price'>0</span>
        <span className='max-price'>Max : {formatPrice(maxPrice)}</span>
      </div>

    </div>
  )
}

export default FormRange
