//npm i bootstrap 
//      --> index.js --> import 'bootstrap/dist/css/bootstrap.css';

//npm i lodash

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import _ from 'lodash';

export const Pagination = () => {
    const [posts, setposts] = useState()
    const [paginatedPosts, setpaginatedPosts] = useState()
    const [currentPage, setcurrentPage] = useState(1)

    const fetchData = () => {
        axios.get("https://jsonplaceholder.typicode.com/todos").then((res) => {
            setposts(res.data);
            setpaginatedPosts(_(res.data).slice(0).take(pageSize).value())
        })
    }

    useEffect(() => {
        setposts(fetchData)
        return () => {

        }
    }, [])

    const pageSize = 10;
    const pageCount = posts ? Math.ceil(posts.length / pageSize) : 0;
    const pages = _.range(1, pageCount + 1)
    const pagination = (pageNo) => {
        setcurrentPage(pageNo);
        const startIndex = (pageNo - 1) * pageSize;
        const paginatedPost = _(posts).slice(startIndex).take(pageSize).value();
        setpaginatedPosts(paginatedPost)
    }

    return (
        <div>
            {!paginatedPosts ? ("404") : (
                <table className='table'>
                    <thead>
                        <th>ID</th>
                        <th>User ID</th>
                        <th>TITLE</th>
                        <th>STATUS</th>
                    </thead>
                    <tbody>
                        {paginatedPosts.map((post) => {
                            return (
                                <tr>
                                    <td>{post.id}</td>
                                    <td>{post.userId}</td>
                                    <td>{post.title}</td>
                                    <td>
                                        <p className={post.completed ? "btn btn-success" : "btn btn-danger"}
                                        >
                                            {post.completed ? "Completed" : "Pending"}
                                        </p>
                                    </td>
                                </tr>)
                        })}
                    </tbody>
                </table>
            )}
            <nav className='d-flex justify-content-center'>
                <ul className='pagination'>
                    {pages.map((page) => {
                        return (
                            <li className={
                                page === currentPage ? 'page-item active' : "page-item"
                            }>
                                <p className='page-link' onClick={() => pagination(page)}>
                                    {page}
                                </p>
                            </li>
                        )
                    })}

                </ul>
            </nav>
        </div>
    )
}

