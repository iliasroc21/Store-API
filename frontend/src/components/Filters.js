import {Form ,Link , useLoaderData} from 'react-router-dom';
import FormInput from './FormInput';
import FormSelect from './FormSelect';
import FormRange from './FormRange';
import FormCheckbox from './FormCheckbox';

const Filters = () => {
  const {meta, params}=useLoaderData();
  const {search , company , category , shipping , order ,price} = params ; 

  return (
    <Form className="filter-container">
      <FormInput label="search Product" name="search" type="search" defaultValue={search}size="small"/>
      <FormSelect label="Select Category" name="category"
      list={meta.categories}
      defaultValue={category}
      size="small"/>
      <FormSelect label="Select Comapny" name="company" list={meta.companies} 
      defaultValue={company}size="small"/>
      <FormSelect
          label='sort by'
          name='order'
          defaultValue={order}
          list={['a-z', 'z-a', 'high', 'low']}
          size='small'/>
      <FormRange label="Select Price" name="price" size="small" defaultValue={price}/>
      <FormCheckbox label='free shipping' name='shipping' size='small' defaultValue={shipping} />

      <button className="search-btn" type="submit">Search</button>
      <Link to='/products' className='reset-btn'>
        reset
      </Link>
     



    </Form>
  )
}

export default Filters
