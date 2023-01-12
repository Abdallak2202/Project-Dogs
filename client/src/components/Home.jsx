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
// CSS
import "../CSS/Home.css"


export default function Home() {
    const dispatch= useDispatch();

    const [sortDogs, setSortDogs]= useState(false);

    var allDogs= useSelector((state) => state.dogs);
    if (allDogs.length>172 && !sortDogs) {
        allDogs.sort(function (a, b) {
            if (a.name>b.name) {
                return 1;
            }
            if (b.name>a.name) {
                return -1;
            }
            return 0;
        });
        console.log("allDogs.length: ", allDogs.length);
    };

    const allTemperaments= useSelector((state) => state.temperaments);

    if (allDogs.created) {
        allDogs= [allDogs];
    };

    const [order, setOrder]= useState("");

    const [currentPage, setCurrentPage]= useState(1);

    const [dogPerPage, setDogPerPage]= useState(8);

    const [reset, setReset]= useState(0);

    const indexLastDog= currentPage * dogPerPage;

    const indexFirstDog= indexLastDog-dogPerPage;

    const current= allDogs.slice(indexFirstDog, indexLastDog);
    console.log("allDogs: ",allDogs)
    console.log("current: ",current);

    const paging= (pageNumber) => {
        setCurrentPage(pageNumber);
    }


    function handleFilterTemperament(e) {
        e.preventDefault();
        dispatch(filterByTemperament(e.target.value));
        setCurrentPage(1);
        setOrder(`Ordered ${e.target.value}`);
    };

    function handleFilterOrigin(e) {
        e.preventDefault();
        dispatch(filterByOrigin(e.target.value));
        setCurrentPage(1);
        setOrder(`Ordered ${e.target.value}`);
    };

    function handleSort(e) {
        e.preventDefault();
        setSortDogs(true);
        dispatch(orderByRace(e.target.value));
        setCurrentPage(1);
        setOrder(`Ordered ${e.target.value}`);
    };

    function handleWeightSort(e) {
        e.preventDefault();
        setSortDogs(true);
        dispatch(orderByWeight(e.target.value));
        setCurrentPage(1);
        setOrder(`Ordered ${e.target.value}`);
    };

    function handleReset() {
        setReset(reset+0.0001);
        setSortDogs(false);
        setCurrentPage(1);
    };


    useEffect(() => {
        dispatch(getDogs());
    }, [dispatch, reset]);

    useEffect(() => {
        dispatch(getTemperaments());
    }, [dispatch]);



    return (
        <div>

            <div className="nav-H">
                <div className="new-container-H">
                    <select className="select-H"
                    onChange={e => 
                    handleSort(e)}>
                        <option>
                            Set alphabetic order
                        </option>
                        <option value="asc">
                            A-Z
                        </option>
                        <option value="desc">
                            Z-A
                        </option>
                    </select>

                    <select className="select-H"
                    onChange={e => handleWeightSort(e)}>
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
                    <select className="select-H"
                    onChange={e => handleFilterTemperament(e)}>
                        <option value="temperaments">
                            Filter by temperament
                        </option>
                        {
                            allTemperaments && allTemperaments.map((t) => (
                                
                                    <option value={t}>
                                        {t}
                                    </option>
                                
                            ))
                        }
                    </select>

                    <select className="select-H"
                    onChange={e => handleFilterOrigin(e)}>
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
                        <button className="button-H">
                            Create New Dog
                        </button>
                    </Link>
                    <button className="clear-H"
                    onClick={handleReset}>
                        Clear filters
                    </button>
                </div>
            </div>



            <div className="paging-H">



                <Paging
                dogPerPage={dogPerPage}
                allDogs={allDogs.length}
                paging={paging}
                />

            </div>

            <div className="display-H">

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