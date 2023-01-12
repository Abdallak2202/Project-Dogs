import React from "react";
import "../CSS/Paging.css"

export default function Paging({dogPerPage, allDogs, paging}) {
    const pageNumbers=[];

    for (let i=1; i<Math.ceil(allDogs/dogPerPage); i++) {
        pageNumbers.push(i);
    }


    return (
        <nav>
            <ul className="paging-P">
                {
                    pageNumbers && pageNumbers.map(n => (
                        <li key={n}>
                            <button className="button-P"
                            onClick={() => paging(n)}>
                                {n}
                            </button>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}