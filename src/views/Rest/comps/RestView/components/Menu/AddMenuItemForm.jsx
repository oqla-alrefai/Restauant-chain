import { useState } from "react";
import { Button, Title } from "../../../../../../components";
import axios from "axios";
import useFormData from "../../../../../../customHooks/useFormData";
import { menuItems } from "./menuItems.js";
import { useALert } from "../../../../../../ContextAPI/AlertContext.jsx";
import Loader from "../../../../../../components/ButtonLoader/Loader.jsx";

function AddMenuItemForm({ setShowAddMenuItemModal, restaurantId, fetchData }) {
  const { formData, handleChange } = useFormData({
    menuItem: "",
    servingTime: "",
  });
  let [menuItemsList, setMenuItemsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { showAlert } = useALert();

  const handleItemAddition = (event) => {
    event.preventDefault();
    if (formData.menuItem == "" || formData.servingTime == "") {
      showAlert("tip", "please fill both fields!");
      return;
    }
    let newList = [...menuItemsList, formData];
    setMenuItemsList(newList);
  };

  const handleDeletion = (itemId) => {
    console.log(itemId);
    let newList = [...menuItemsList];
    newList.splice(itemId, 1);
    setMenuItemsList(newList);
  };

  const handleSubmit = () => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      const server_ = "https://restaurantchain-server.onrender.com";
      axios
        .post(`${server_}/addmenu/${restaurantId}`, menuItemsList)
        .then((response) => {
          showAlert("success", `Items were created successfully`);
          setShowAddMenuItemModal(false);
          fetchData();
        })
        .catch((e) => {
          showAlert("fail", `Something Went Wrong`);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (error) {
      showAlert("fail", `Something Went Wrong`);
    }
  };

  return (
    <>
      <div className="form-header">
        <Title text="Add New Menu Item" />
      </div>

      <div className="form-organizer">
        <form className="add-menu-item-form">
          <label htmlFor="menuItem" className="menu-input-label">
            Select a Menu Item:
            <select
              id="menuItem"
              name="menuItem"
              className="input-field-component menu-select-fields"
              value={formData.menuItem}
              onChange={handleChange}
            >
              <option value="">Select...</option>
              {menuItems.map((menuItem) => (
                <option key={menuItem.id} value={menuItem.menuItem}>
                  {menuItem.menuItem}
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="servingTime" className="menu-input-label">
            Select a Serving Time:
            <select
              id="servingTime"
              name="servingTime"
              className="input-field-component menu-select-fields"
              value={formData.servingTime}
              onChange={handleChange}
            >
              <option value="">Select...</option>
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
            </select>
          </label>
          <Button text="Add Item" handler={handleItemAddition} />
        </form>

        {menuItemsList.length ? (
          <div className="menu-list-display-container">
            {menuItemsList.map((item, idx) => (
              <span key={idx}>
                {item.menuItem} - {item.servingTime}
                <i
                  className="ri-close-line"
                  onClick={() => handleDeletion(idx)}
                />
              </span>
            ))}
            <button onClick={handleSubmit}>
              {isLoading ? <Loader /> : "Send List"}
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default AddMenuItemForm;
