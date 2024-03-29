import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import SearchModal from "../../Search/SearchModal";
import { useHistory } from "react-router-dom";

import { getSpots } from "../../../store/spot";
import "./AllSpots.css";
let otherSrc =
  "https://a0.muscache.com/im/pictures/prohost-api/Hosting-21426276/original/7cceab2c-f3f2-4ed6-86b4-79bb32746dc0.jpeg?im_w=1200";

const AllSpots = () => {
  const dispatch = useDispatch();
  let location = useLocation();
  const [newSrc, setNewSrc] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchContent, setSearchContent] = useState("");
  const history = useHistory();

  const spots = useSelector((state) => {
    if (state.spots) {
      return Object.values(state.spots);
      // } else {
      //   return []
    }
  });

  const handleSubmitSearchTerm = async (searchTerm) => {
    const response = await dispatch(getSpots("searchTerm", searchTerm))
      .then(setShowSearchModal(false))
      // .then(<Redirect to=`/spots?maxPrice=${maxPrice}`/>)
      .then(history.push(`/spots?searchTerm=${searchTerm}`));
  };

  const handleSubmitNew = async (oneDay) => {
    const response = await dispatch(getSpots("age", oneDay))
      .then(setShowSearchModal(false))
      // .then(<Redirect to=`/spots?maxPrice=${maxPrice}`/>)
      .then(history.push(`/spots?age=${oneDay}`));
  };

  // useEffect(() => {
  //   if (!showMenu) return;
  //   const closeMenu = () => {
  //     setShowMenu(false);
  //   };
  //   document.addEventListener('click', closeMenu);
  //   return () => document.removeEventListener("click", closeMenu);
  // }, [showMenu]);

  useEffect(() => {
    let newThing = location.search.split("=");
    const category = newThing[0].slice(1);
    const filter = newThing[1];
    dispatch(getSpots(category, filter));
  }, [dispatch]);

  const nonFunctional = async (e) => {
    e.preventDefault();
    alert("This feature is not yet developed");
  };

  const reRun = async () => {
    dispatch(getSpots());
    // alert('This spot has no image')
  };

  //console.log(new Date())

  return (
    <div className="HomePage">
      <div className="HomeNavBar">
        <button
          onClick={() => {
            handleSubmitSearchTerm("view");
          }}
        >
          <i className="material-symbols-outlined">landscape</i>
          <div>View</div>
        </button>

        <button
          onClick={() => {
            handleSubmitSearchTerm("games");
          }}
        >
          <i className="material-symbols-outlined">sports_tennis</i>
          <div>Games</div>
        </button>

        <button
          onClick={() => {
            handleSubmitSearchTerm("fire pit");
          }}
        >
          <i className="material-symbols-outlined">local_fire_department</i>
          <div>Fire pit</div>
        </button>

        <button
          onClick={() => {
            handleSubmitSearchTerm("beach");
          }}
        >
          <i className="material-symbols-outlined">beach_access</i>
          <div>Beach</div>
        </button>

        <button
          onClick={() => {
            handleSubmitSearchTerm("skiing");
          }}
        >
          <i className="material-symbols-outlined">downhill_skiing</i>
          <div>Skiing</div>
        </button>

        <button
          onClick={() => {
            handleSubmitSearchTerm("kitchen");
          }}
        >
          <i className="material-symbols-outlined">cooking</i>
          <div>Kitchen</div>
        </button>

        <button
          onClick={() => {
            handleSubmitSearchTerm("hiking");
          }}
        >
          <i className="material-symbols-outlined">hiking</i>
          <div>Hiking</div>
        </button>

        <button
          onClick={() => {
            handleSubmitSearchTerm("pet friendly");
          }}
        >
          <i className="material-symbols-outlined">pets</i>
          <div>Pet Friendly</div>
        </button>

        <button
          onClick={() => {
            handleSubmitSearchTerm("wildlife");
          }}
        >
          <i className="material-symbols-outlined">emoji_nature</i>
          <div>Wildlife</div>
        </button>

        <button
          onClick={() => {
            handleSubmitSearchTerm("fireplace");
          }}
        >
          <i className="material-symbols-outlined">fireplace</i>
          <div>Fireplace</div>
        </button>

        <button
          onClick={() => {
            handleSubmitSearchTerm("woods");
          }}
        >
          <i className="material-symbols-outlined">forest</i>
          <div>In the Woods</div>
        </button>

        <button
          onClick={() => {
            handleSubmitSearchTerm("water");
          }}
        >
          <i className="material-symbols-outlined">kayaking</i>
          <div>Water Front</div>
        </button>
        <button
          onClick={() => {
            handleSubmitNew("oneDay");
          }}
        >
          <i className="material-symbols-outlined">key</i>
          <div>New</div>
        </button>

        {/* <button onClick={nonFunctional}>
            <i className="fa-solid fa-person-hiking"></i>X</button>
            <button onClick={nonFunctional}>
            <i className="material-symbols-outlined">tune</i>X</button>
            <button onClick={nonFunctional}>
            <i className="material-symbols-outlined">tune</i>X</button> */}
      </div>

      <div className="HomeList">
        <div>
          {spots.length === 0 && (
            <div>
              <h1>No homes available</h1>
            </div>
          )}
        </div>

        {spots.map(
          ({
            id,
            name,
            previewImage,
            city,
            state,
            description,
            price,
            avgRating,
          }) => (
            <div className="AllSpotsImages" key={id}>
              <NavLink to={`/spots/${id}`}>
                <div>
                  <img
                    src={previewImage}
                    alt={name}
                    onError={(e) => {
                      //  reRun()
                      if (e.target.src !== otherSrc) {
                        setNewSrc(otherSrc);
                        e.target.src = otherSrc;
                      }
                    }}
                  />
                </div>
                <div className="SpaceBetween">
                  <div className="greyText nowrapAllSpots" id="CityState">
                    {city}, {state}
                  </div>
                  <div>
                    <i className="material-symbols-outlined">star </i>
                    {avgRating}
                  </div>
                </div>
                <div className="greyText nowrapAllSpots">{name}</div>
                <div className="greyText">Apr 3-8</div>
                <div className="justNextToEachOther">
                  {" "}
                  <div className="bold">${price}</div> night
                </div>
              </NavLink>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default AllSpots;
