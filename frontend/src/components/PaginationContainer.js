import {useLoaderData ,useNavigate , useLocation} from 'react-router-dom'; 

const PaginationContainer = () => {
  const {meta}= useLoaderData();
  const {page ,pageCount } = meta.pagination ;
  const {search , pathname} = useLocation(); 
  const navigate = useNavigate();
  
  const pages = Array.from({ length: pageCount }, (_, index) => {
    return index + 1;
  }); 
  const handlePageChange =(number)=>{
    const searchParams = new URLSearchParams(search);
    searchParams.set("page" ,number);
    navigate(`${pathname}?${searchParams.toString()}`);

  }
   
  return (
    <div className="pagination-container">
      <div className="pagination-btns">
        <button className="prev-btn"
        onClick={()=>{
          let prevPage = page- 1 ; 
          if(prevPage < 1) prevPage = pageCount ;
          handlePageChange(prevPage);
        }}>PREV</button>
        {pages.map((pageNumber)=>{
          return (
          <button key={pageNumber} className={`page-btn ${pageNumber ===page && 'active-page-btn'}`}
          onClick={()=>{
            if(pageNumber != page)handlePageChange(pageNumber)}}>{pageNumber}</button>); 
        })}
        <button className="next-btn"
         onClick={()=>{
          let nextPage = page +1 ; 
          if(nextPage > pageCount) nextPage = 1;
          handlePageChange(nextPage); 
         }}>NEXT</button>
      </div>
    </div>
  )
}

export default PaginationContainer
