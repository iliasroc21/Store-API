
const FormCheckbox = ({label , name, size,defaultValue}) => {
  return (
    <div className="form-control">
     <label  htmlFor={name} className="label">
        <span className="label-text" >{label}</span>
        
      </label>
      <input type="checkbox" name={name} id={name} defaultChecked={defaultValue} 
      className={`form-checkbox ${size}`}/>
      
    </div>
  )
}

export default FormCheckbox
