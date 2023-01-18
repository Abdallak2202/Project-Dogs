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
    
    /* current.map(d => {
        if (d.created) {
            console.log(d.image);
            const data= d.image;
            const buffer= Buffer.from(data.data);
            const reader= new FileReader();
            reader.readAsDataURL(d.image.data);
        }
    }) */

    /* const data = {type: 'Buffer', data: Array(466843)};
    const buffer = Buffer.from(data.data);
    const base64EncodedString = buffer.toString('base64');
    console.log(base64EncodedString); */

    // MAKE A BLOB FROM THE D.IMAGE.DATA (I think it's already a blob...)

    /* const data = new Uint8Array([1, 2, 3]);
    const blob = new Blob([data], { type: 'application/octet-stream' });
    console.log(blob) */

    // CONVERT THE BLOB OBJECT TO A BASE64 STRING (I started above, finish it)

    /* function App() {
        const [data, setData] = useState([
          { name: 'Image 1', image:  binary buffer image  },
          { name: 'Image 2', image:  binary buffer image  },
          { name: 'Image 3', image:  binary buffer image  },
        ]);
      
        const handleFile = (index) => (e) => {
          const file = e.target.files[0];
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = () => {
            const newData = [...data];
            newData[index].image = reader.result;
            setData(newData);
          };
        }; */

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