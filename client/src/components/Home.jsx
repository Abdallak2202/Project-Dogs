// dependencies
import {React, useState, useEffect, Fragment} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
// actions
import {getDogs, getTemperaments, filterByTemperament, filterByOrigin, orderByRace, orderByWeight} from "../actions";
// components
import DogCard from "./DogCard";
import SearchBar from "./SearchBar";
import Paging from "./Paging";
// import CSS


export default function Home() {
    const dispatch= useDispatch();

    const allDogs= useSelector((state) => state.dogs);
    const allTemperaments= useSelector((state) => state.temperaments);

    const [order, setOrder]= useState("");

    const [currentPage, setCurrentPage]= useState(1);

    const [dogPerPage, setDogPerPage]= useState(8);

    const indexLastDog= currentPage * dogPerPage;

    const indexFirstDog= indexLastDog-dogPerPage;

    const current= allDogs.slice(indexFirstDog, indexLastDog);

    const paging= (pageNumber) => {
        setCurrentPage(pageNumber);
    }


    function handleFilterTemperament(e) {
        dispatch(filterByTemperament(e.target.value));
    };

    function handleFilterOrigin(e) {
        dispatch(filterByOrigin(e.target.value));
    };

    function handleSort(e) {
        dispatch(orderByRace(e.target.value));
        setCurrentPage(1);
        setOrder(`Ordered ${e.target.value}`);
    };

    function handleWeightSort(e) {
        dispatch(orderByWeight(e.target.value));
        setCurrentPage(1);
        setOrder(`Ordered ${e.target.value}`);
    };


    useEffect(() => {
        dispatch(getDogs());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getTemperaments());
    }, [dispatch]);



    return (
        <div>

            <div>
                <div>
                    <select onChange={e => handleSort(e)}>
                        <option value="asc">
                            A-Z
                        </option>
                        <option value="desc">
                            Z-A
                        </option>
                    </select>

                    <select onChange={e => handleWeightSort(e)}>
                        <option value="filter by weight">
                            Filter by weight
                        </option>
                        <option value="lowest weight">
                            Lowest weight
                        </option>
                        <option value="highest weight">
                            Highest weight
                        </option>
                    </select>
                    <select onChange={e => handleFilterTemperament(e)}>
                        <option value="temperament">
                            Filter by temperament
                        </option>
                        {
                            allTemperaments && allTemperaments.map((t) => {
                                return (
                                    <option value={t}>
                                        {t}
                                    </option>
                                );
                            })
                        }
                    </select>

                    <select onChange={e => handleFilterOrigin(e)}>
                        <option value="all">
                            All
                        </option>
                        <option value="created">
                            Created
                        </option>
                        <option value="existing">
                            Existing
                        </option>
                    </select>
                </div>
                <div>
                    <SearchBar/>
                </div>
                <div>
                    <Link to={"/createDog"}>
                        <button>
                            Create New Dog
                        </button>
                    </Link>
                </div>
            </div>



            <div>



                <Paging
                dogPerPage={dogPerPage}
                allDogs={allDogs.length}
                paging={paging}
                />


                {
                    current.length!==0 ?
                    current?.map(e => {
                        return (
                            <Fragment key={e.id}>
                                <Link to={`/dogs/${e.id}`}>
                                    <DogCard
                                    id={e.id}
                                    name={e.name}
                                    image={e.image}
                                    temperaments={e.temperaments}
                                    />
                                </Link>
                            </Fragment>
                        )
                    }) :
                    <div>
                        <h2>Loading...</h2>
                    </div>
                }
                {
                    allDogs.length===0 && <p>There're not available dogs</p>
                }
            </div>
        </div>
    )
}