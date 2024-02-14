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
        <InputField
          type="text"
          name="restaurantName"
          label="Restaurant Name "
          value={formData.restaurantName}
          handler={handleChange}
          isRequired={true}
          max_length="30"
        />

        <InputField
          type="tel"
          name="phoneNumber"
          label="Phone Number "
          value={formData.phoneNumber}
          handler={handleChange}
          isRequired={true}
        />
        <div style={{ display: "flex" }}>
          <InputField
            type="time"
            name="startTime"
            label="Opening Hours from:"
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
          label="Street Name"
          value={formData.streetName}
          handler={handleChange}
          isRequired={false}
          max_length='50'
        />

        <div style={{ display: "flex", minHeight: "fit-content" }}>
          <label htmlFor="landmarks" className="input-label" />
          Nearby Landmarks
          <Select
            mode="multiple"
            className="select-search-field overflowed-select"
            size="small"
            allowClear
            onChange={handleLandmarkSelection}
          >
            {landmarks.map(({ name, id }) => (
              <Select.Option value={name} key={id}>
                <span>{name}</span>
              </Select.Option>
            ))}
          </Select>
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
