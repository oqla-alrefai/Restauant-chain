import { menuItems } from "./menuItems.js";
import { DataModel, Title } from "../../../../../../components";
import { useState } from "react";
import AddMenuItemForm from "./AddMenuItemForm.jsx";
import "./menu.css";

function Menu({ restaurantId }) {
  let [showAddMenuItemModal, setShowAddMenuItemModal] = useState(false);

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
      <div className="menu-items-container">
        {menuItems.map((item) => (
          <div className="menu-item" key={item.id}>
            <span>{item.menuItem}</span>
            <span>{item.servingTime}</span>
          </div>
        ))}
      </div>

      {showAddMenuItemModal ? (
        <DataModel handler={setShowAddMenuItemModal}>
          <AddMenuItemForm setShowAddMenuItemModal/>
        </DataModel>
      ) : (
        <></>
      )}
    </section>
  );
}

export default Menu;
