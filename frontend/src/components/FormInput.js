
const FormInput = ({label , name , type , defaultValue ,size}) => {
  return (
    <div className="form-control">
      <label  htmlFor={name} className="label">
        <span className="label-text" >{label}</span>
      </label>
      <input id={name} className={`form-input ${size}`} type={type} name={name} defaultValue={defaultValue}  />
    </div>
  )
}

export default FormInput
