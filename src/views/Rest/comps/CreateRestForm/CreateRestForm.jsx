import { useEffect, useState } from "react";
import { Button, InputField, PageLoader, Title } from "../../../../components";
import axios from "axios";
import useFormData from "../../../../customHooks/useFormData";
import { Select } from "antd";
import { landmarks } from "./landMarks.js";

import "./createRestForm.css";

function createRestForm({ setShowAddRestaurantModal }) {
  const { formData, handleChange } = useFormData({
    restaurantName: "",
    restaurantId: null,
    phoneNumber: "",
    openingHours: "",
    streetName: "",
    nearbyLandmarks: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [managerId, setManagerId] = useState(null);
  const [landmarksList, setLandmarksList] = useState([]);

  // get available project managers
  //   useEffect(() => {
  //     const source = axios.CancelToken.source();

  //     axios
  //       .get("https://projectshub.onrender.com/user/role?role=projectManager")
  //       .then((response) => {
  //         setManagers(response.data);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });

  //     return () => {
  //       source.cancel("Request canceled");
  //     };
  //   }, []);

  const handleSubmit = (event) => {
    // event.preventDefault();
    // formData.projectManagerId = managerId;
    // if (isLoading) return;
    // try {
    //   setIsLoading(true);
    //   axios
    //     .post("https://projectshub.onrender.com/project", formData)
    //     .then((response) => {
    //       dispatch(
    //         setShowAlert({
    //           active: true,
    //           type: "success",
    //           message: `${response.data.project.projectName} project was Created Successfully`,
    //         })
    //       );
    //       setShowCreateProjectModal(false);
    //       fetchData()
    //     })
    //     .finally(() => {
    //       setIsLoading(false);
    //     });
    // } catch (error) {
    //   console.log("add user catch error", error);
    // }
  };

  // handle landmark selection
  const handleLandmarkSelection = (value, options) => {
    let newList = options.map((option) => option.value);
    setLandmarksList(newList);
    console.log(landmarksList);
  };

  return (
    <>
        <div className="form-header">
          <Title text="Add New Restaurant" />
        </div>

        {/* {!managers.length ? (
          <PageLoader scale="0.9" top="30%" left="46%" />
        ) : (
        )} */}
        <form className="create-restaurant-form" onSubmit={handleSubmit}>
          <InputField
            type="text"
            name="restaurantName"
            label="Restaurant Name "
            value={formData.restaurantName}
            handler={handleChange}
            isRequired={true}
          />

          <InputField
            type="text"
            name="phoneNumber"
            label="Phone Number "
            value={formData.phoneNumber}
            handler={handleChange}
            isRequired={true}
          />
          <div style={{ display: "flex" }}>
            <InputField
              type="time"
              name="startDate"
              label="Opening Hours from:"
              value={formData.startDate}
              handler={handleChange}
              isRequired={true}
              width="170px"
            />

            <InputField
              type="time"
              name="endDate"
              label="to:"
              value={formData.endDate}
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
          />

          <div style={{ display: "flex" }}>
            <label htmlFor="landmarks" className="input-label" />
            Nearby Landmarks
            <Select
              placeholder="Team Members"
              mode="multiple"
              className="select-search-field overflowed-select"
              size="large"
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
