package com.iliastore.backend.pojo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class Pagination {
    private int page ; 
    private int pageSize ; 
    private int pageCount ;  
    private Long total ;    
}
