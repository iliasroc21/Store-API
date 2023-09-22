import {useLoaderData} from 'react-router-dom'; 
import day from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat';
day.extend(advancedFormat);
const OrderList = () => {
  const {orders ,meta} = useLoaderData();
  console.log(orders);
     
  return (
    <div className="order-list-container">
        <h4> Total Of orders : {meta.pagination.total}</h4>
        <div className="table">
        <table >
            <thead>
              <th>Name</th>
              <th>Address</th>
              <th>Products</th>
              <th>Cost</th>
              <th className='hidden sm:block'>Date</th>

            </thead>
            <tbody>
            {orders.map((order) => {
              
              const {id ,  name, address, numItemsInCart, orderTotal, createdAt } =
                order;

              const date = day(createdAt).format('hh:mm a - MMM Do, YYYY ');
              return (
                <tr key={id}>
                  <td>{name}</td>
                  <td>{address}</td>
                  <td>{numItemsInCart}</td>
                  <td>{orderTotal}</td>
                  <td className='data'>{date}</td>
                </tr>
              );
            })}
            </tbody>


        </table>


        </div>
        
      
    </div>
  )
}

export default OrderList
