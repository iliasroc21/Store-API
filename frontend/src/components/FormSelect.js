
const FormSelect = ({ name ,list ,  label ,defaultValue , size}) => {
  return (
    <div className="form-control">
      <label  htmlFor={name} className="label">
        <span className="label-text" >{label}</span>
      </label>
      <select className={`form-select ${size}`} id ={name} name={name} defaultValue={defaultValue}>
        {list.map((item)=>{
            return (
                <option key={item} value={item}>{item}</option>
            ); 
        })}

      </select>
    </div>
  )
}

export default FormSelect
