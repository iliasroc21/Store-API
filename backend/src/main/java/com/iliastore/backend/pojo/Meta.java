package com.iliastore.backend.pojo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class Meta {
    private Pagination pagination ; 
    private String[] companies ;
    private String[] categories ;
}
