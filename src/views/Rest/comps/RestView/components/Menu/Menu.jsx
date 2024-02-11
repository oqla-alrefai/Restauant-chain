// import { menuItems } from "./menuItems.js";
import { DataModel, PageLoader, Title } from "../../../../../../components";
import { useEffect, useState } from "react";
import AddMenuItemForm from "./AddMenuItemForm.jsx";
import "./menu.css";
import axios from "axios";

function Menu({ restaurantId }) {
  let [showAddMenuItemModal, setShowAddMenuItemModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    try {
      const fetchData = () => {
        setIsLoading(true);
        axios
          .get(`http://localhost:3001/getrestaurantmenu/${restaurantId}`)
          .then((response) => {
            setMenuItems(response.data);
          })
          .catch((err) => {
            console.log(err.message); /// error handler
          })
          .finally(() => {
            setIsLoading(false);
          });
      };

      !menuItems.length ? fetchData() : null;
    } catch (error) {
      console.error("Error fetching projects:", error.message);
    }

    return () => {
      source.cancel("request is canceled");
    };
  }, []);

  return (
    <section className="menu-container">
      <div className="menu-header">
        <Title level={3} text="Menu" />
        <span className="new-item-button">
          <i
            className="ri-menu-add-line"
            onClick={() => setShowAddMenuItemModal(true)}
          ></i>
        </span>
      </div>
      {isLoading ? (
        <PageLoader />
      ) : !menuItems.length ? (
        <Title text="You Have No Items For This Restaurants Yet" level={4} />
      ) : (
        <div className="menu-items-container">
          {menuItems.map((item) => (
            <div className="menu-item" key={item.id}>
              <span>{item.menuItem}</span>
              <span>{item.servingTime}</span>
            </div>
          ))}
        </div>
      )}

      {showAddMenuItemModal ? (
        <DataModel handler={setShowAddMenuItemModal}>
          <AddMenuItemForm setShowAddMenuItemModal />
        </DataModel>
      ) : (
        <></>
      )}
    </section>
  );
}

export default Menu;
