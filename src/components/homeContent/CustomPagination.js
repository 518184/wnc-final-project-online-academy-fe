import React from 'react'
import { Pagination } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CustomPagination({ postsPerPage, totalPage, paginate, currentPage }) {
    const pageNumbers = [];
    for(let i = 1; i <= Math.ceil(totalPage / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <Pagination>
               {pageNumbers.map(number => number === currentPage ? (
                   <Pagination.Item active key={number} onClick={() => paginate(number)}>
                       {number}
                   </Pagination.Item>
               ) : (
                    <Pagination.Item key={number} onClick={() => paginate(number)}>
                        {number}
                    </Pagination.Item>
                )
               )} 
            </Pagination>
        </nav>
    )
}
