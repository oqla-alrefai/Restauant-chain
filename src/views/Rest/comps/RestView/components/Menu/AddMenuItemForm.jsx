import { useEffect, useState } from "react";
import {
  Button,
  PageLoader,
  Title,
} from "../../../../../../components";
import axios from "axios";
import useFormData from "../../../../../../customHooks/useFormData";
import { menuItems } from "./menuItems.js";
import { useALert } from "../../../../../../ContextAPI/AlertContext.jsx";

function AddMenuItemForm({ setShowAddMenuItemModal }) {
  const { formData, handleChange } = useFormData({
    menuItem: "",
    servingTime: "",
  });
  let [menuItemsList, setMenuItemsList] = useState([]);
  const {showAlert} = useALert();
  
  const handleItemAddition = (event) => {
    event.preventDefault();
    console.log(formData);
    if (formData.menuItem == "" || formData.servingTime == "") {
      showAlert("tip", "please fill both fields!");
      return;
    }
    let newList = menuItemsList.push(formData);
    setMenuItemsList(newList);
    console.log(landmarksList);
  };
  const handleSubmit = () => {};

  return (
    <>
      <div className="form-header">
        <Title text="Add New Menu Item" />
      </div>

      <div className="form-organizer">
        <form className="add-menu-item-form">
          <label htmlFor="menuItem">
            Select a Menu Item:
            <select
              id="menuItem"
              name="menuItem"
              className="input-field-component"
              value={formData.menuItem}
              onChange={handleChange}
            >
              <option value="">Select...</option>
              {menuItems.map((menuItem) => (
                <option key={menuItem.id} value={menuItem.id}>
                  {menuItem.menuItem}
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="servingTime">
            Select a Serving Time:
            <select
              id="servingTime"
              name="servingTime"
              className="input-field-component"
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

        <div className="menu-list-display-container">
          {!menuItemsList.length ? (
            menuItemsList.map((item, idx) => (
              <span>
                {item.menuItem}, {item.servingTime}
              </span>
            ))
          ) : (
            <></>
          )}
          <button>Send List</button>
        </div>
      </div>
    </>
  );
}

export default AddMenuItemForm;
