import "./rest.css";
import { CreateRestaurant, RestaurantCard, RestaurantView } from "./comps";
import { dummyData } from "./dummyData.js";
import { BreadCrump, DataModel } from "../../components";
import useBreadcrumb from "../../customHooks/useBreadCrump.jsx";
import { useState } from "react";

function Rest() {
  let [showAddRestaurantModal, setShowAddRestaurantModal] = useState(false);
  const [viewedRestaurant, setViewedRestaurant] = useState(null);

  // Breadcrumb setup
  const { trail, view, updateBreadcrumb, handleBack } = useBreadcrumb(
    ["Restaurants"],
    "Restaurants"
  );

  const handleRestaurantChoice = (restaurant) => {
    updateBreadcrumb(`/ ${restaurant}`);
    setViewedRestaurant(restaurant);
  };

  return (
    <>
      <section className="restaurants-page">
        <div className="restaurants-header">
          <BreadCrump trail={trail} back={handleBack} />
          {view === "Restaurants" ? (
            <span className="add-restaurant-button">
              <i
                className="ri-add-circle-fill"
                onClick={() => setShowAddRestaurantModal(true)}
              ></i>
            </span>
          ) : null}
        </div>

        {view == "Restaurants" ? (
          <div className="restaurant-list">
            {dummyData.map((ele) => (
              <RestaurantCard
                restaurant={ele}
                key={ele.id}
                handler={handleRestaurantChoice}
              />
            ))}
          </div>
        ) : (
          <></>
        )}

        {showAddRestaurantModal ? (
          <DataModel handler={setShowAddRestaurantModal}>
            <CreateRestaurant
              setShowAddRestaurantModal={setShowAddRestaurantModal}
            />
          </DataModel>
        ) : (
          <></>
        )}
      </section>
    </>
  );
}

export default Rest;
