import { render } from '@testing-library/react';
import { BsTypeH1 } from 'react-icons/bs';
import {useLoaderData , useLocation , useNavigate} from 'react-router-dom'; 

const ComplexPaginationContainer = () => {
  const {meta} = useLoaderData(); 
  const {page ,pageCount } = meta.pagination ; 
  const {search , pathname} = useLocation();
  const navigate= useNavigate();
  
  const handlePageChange =(pageNumber)=>{
    const searchParams = new URLSearchParams(search);
    searchParams.set('page' , pageNumber );
    navigate(`${pathname}?${searchParams.toString()}`);

  }

  const addPageButton =({pageNumber ,activeClass})=>{
    return (
        <button
        key={pageNumber} className={`page-btn ${activeClass ? 'active-page-btn': ''}`}
        onClick={()=>handlePageChange(pageNumber)}>{pageNumber}</button>
    );
  }
  const renderPageButtons = ()=>{
    const pageButtons =[]; 
    pageButtons.push(addPageButton({pageNumber : 1 ,activeClass:   page === 1}))
    if(page > 2){
        pageButtons.push(<button className='page-btn' key='dots-1'>
        ...
      </button>)
    }
    if(page !== 1 && page !==pageCount){
        pageButtons.push(addPageButton({pageNumber : page  , activeclass : true}));
    }
    if(page < pageCount - 1){
        pageButtons.push(
            <button className='page-btn' key='dots-2'>
              ...
            </button>
          );
    }
    pageButtons.push(
        addPageButton({ pageNumber: pageCount, activeClass: page === pageCount })
    );
    return pageButtons ;
  }
  if (pageCount < 2) return null ;
  return (
    <div className="pagination-container">
        <div className="pagination-btns">
        <button
          className='prev-btn'
          onClick={() => {
            let prevPage = page - 1;
            if (prevPage < 1) prevPage = pageCount;
            handlePageChange(prevPage);
          }}
        >
          Prev
        </button>
        {renderPageButtons()}
        <button
          className='next-btn'
          onClick={() => {
            let nextPage = page + 1;
            if (nextPage > pageCount) nextPage = 1;
            handlePageChange(nextPage);
          }}
        >
          Next
        </button>
        </div>
      
    </div>
  )
}

export default ComplexPaginationContainer
