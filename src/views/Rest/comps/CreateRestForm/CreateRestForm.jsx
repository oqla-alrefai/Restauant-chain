import { useState } from "react";
import { Button, InputField, Title } from "../../../../components";
import axios from "axios";
import useFormData from "../../../../customHooks/useFormData";
import { Select } from "antd";
import { landmarks } from "./landMarks.js";
import "./createRestForm.css";
import { useALert } from "../../../../ContextAPI/AlertContext.jsx";

function createRestForm({ setShowAddRestaurantModal, fetchData }) {
  const { formData, handleChange } = useFormData({
    restaurantName: "",
    phoneNumber: "",
    startTime: "",
    closeTime: "",
    streetName: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [landmarksList, setLandmarksList] = useState([]);
  const { showAlert } = useALert();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    try {
      const requestBody = {
        ...formData,
        landmarks: landmarksList,
      };

      const server_ = "https://restaurantchain-server.onrender.com";
      setIsLoading(true);
      axios
        .post(`${server_}/addnewrestaurant`, requestBody)
        .then((response) => {
          showAlert("success", `Restaurant was added successfully`);
          setShowAddRestaurantModal(false);
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

  // handle landmark selection
  const handleLandmarkSelection = (value, options) => {
    console.log(value, options);
    let newList = options.map((option) => option.value);
    setLandmarksList(newList);
    console.log(landmarksList);
  };

  function validateForm() {
    // Phone Number validator
    const validatePhoneNumber = () => {
      const numberPattern = /^\+?[0-9\s]{1,14}$/;

      return numberPattern.test(formData.phoneNumber);
    };

    // Time validator
    const validateTime = () => {
      const [startHour, startMinute] = formData.startTime
        .split(":")
        .map(Number);
      const [endHour, endMinute] = formData.closeTime.split(":").map(Number);

      const startTimeInMinutes = startHour * 60 + startMinute;
      const endTimeInMinutes = endHour * 60 + endMinute;

      return endTimeInMinutes >= startTimeInMinutes;
    };

    if (!validatePhoneNumber()) {
      showAlert("danger", `Please inter a valid phone number!`);
      return false;
    }
    if (!validateTime()) {
      showAlert(
        "danger",
        `close Time can't be before or equal to the opening Time`
      );
      return false;
    }

    return true;
  }

  return (
    <>
      <div className="form-header">
        <Title text="Add New Restaurant" />
      </div>

      <form className="create-restaurant-form" onSubmit={handleSubmit}>
        <div className="restaurant-form-organizer">
          <div className="labels-container">
            <label htmlFor="restaurantName" className="input-label">
              Restaurant Name
            </label>
            <label htmlFor="phoneNumber" className="input-label">
              Phone Number
            </label>
            <label htmlFor="startTime" className="input-label">
              Opening Hours
            </label>
            <label htmlFor="streetName" className="input-label">
              Street Name
            </label>
            <label htmlFor="landmarks" className="input-label">
              Nearby Landmarks
            </label>
          </div>
          <div className="input-fields-container">
            <InputField
              type="text"
              name="restaurantName"
              value={formData.restaurantName}
              handler={handleChange}
              isRequired={true}
              max_length="30"
            />

            <InputField
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              handler={handleChange}
              isRequired={true}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <InputField
                type="time"
                name="startTime"
                value={formData.startTime}
                handler={handleChange}
                isRequired={true}
                width="170px"
              />

              <InputField
                type="time"
                name="closeTime"
                label="to:"
                value={formData.closeTime}
                handler={handleChange}
                isRequired={true}
                width="170px"
              />
            </div>

            <InputField
              type="text"
              name="streetName"
              value={formData.streetName}
              handler={handleChange}
              isRequired
              max_length="50"
            />

            <Select
              mode="multiple"
              className="select-search-field overflowed-select"
              size="small"
              allowClear
              onChange={handleLandmarkSelection}
              style={{
                width: "400px",
                height: "2.7em",
                margin: '0.5em 1em'
              }}
            >
              {landmarks.map(({ name, id }) => (
                <Select.Option value={name} key={id}>
                  <span>{name}</span>
                </Select.Option>
              ))}
            </Select>
          </div>
        </div>
        <Button
          type="submit"
          text="Create Restaurant"
          isLoading={isLoading}
          backgroundColor="#171F39"
        />
      </form>
    </>
  );
}

export default createRestForm;
