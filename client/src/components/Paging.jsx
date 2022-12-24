import React from "react";

export default function Paging({dogPerPage, allDogs, paging}) {
    const pageNumbers=[];

    for (let i=1; i<Math.ceil(allDogs/dogPerPage); i++) {
        pageNumbers.push(i);
    }


    return (
        <nav>
            <ul>
                {
                    pageNumbers && pageNumbers.map(n => (
                        <li key={n}>
                            <button onClick={() => paging(n)}>
                                {n}
                            </button>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}