import { useState } from "react";
import { Button, InputField, Title } from "../../../../../../components";
import axios from "axios";
import useFormData from "../../../../../../customHooks/useFormData";
import { useALert } from "../../../../../../ContextAPI/AlertContext.jsx";

function NewMaintenanceForm({
  setShowNewMaintenanceModal,
  restaurantId,
  fetchData,
}) {
  const { formData, handleChange } = useFormData({
    impact: "",
    startDate: "",
    endDate: "",
    maintenancePrice: "",
    comments: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { showAlert } = useALert();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isLoading) return;
    if(!validateForm()) return;

    try {
      setIsLoading(true);
      const server_ = "https://restaurantchain-server.onrender.com";
      axios
        .post(
          `${server_}/addmaintenanceinfo/${restaurantId}`,
          formData
        )
        .then((response) => {
          showAlert("success", `Maintenance was created successfully`);
          setShowNewMaintenanceModal(false);
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

  function validateForm() {
    // validate price
    const validatePrice = () => {
      const price = formData.maintenancePrice;
      return price < 0;
    }

    // validate date
    const validateDateRange = () => {
      const startDateObj = new Date(formData.startDate);
      const endDateObj = new Date(formData.endDate);

      return endDateObj < startDateObj;
    };

    if(validatePrice()) {
      showAlert("danger", "Maintenance price can not be lower than zero");
      return false;
    }

    if(validateDateRange()) {
      showAlert("danger", "End date can't be before start date");
      return false;
    }

    return true;
  }

  return (
    <>
      <div className="form-header">
        <Title text="Add New Maintenance Info" />
      </div>

      <form onSubmit={handleSubmit} className="new-maintenance-info-form">
        <label htmlFor="impact" className="input-label">
          Select impact:
          <select
            id="impact"
            name="impact"
            className="input-field-component"
            value={formData.impact}
            onChange={handleChange}
            style={{ width: "250px" }}
            required
          >
            <option value="">Select...</option>
            <option value="normal operations">Normal Operations</option>
            <option value="partial shutdown">Partial Shutdown</option>
            <option value="complete shutdown">Complete Shutdown</option>
          </select>
        </label>

        <InputField
          type="number"
          name="maintenancePrice"
          label="Price"
          value={formData.maintenancePrice}
          handler={handleChange}
          isRequired={true}
          width="250px"
        />

        <InputField
          type="date"
          name="startDate"
          label="Start Date"
          value={formData.startDate}
          handler={handleChange}
          isRequired={true}
          width="250px"
        />

        <InputField
          type="date"
          name="endDate"
          label="End Date"
          value={formData.endDate}
          handler={handleChange}
          isRequired={true}
          width="250px"
        />

        <textarea
          type="text"
          name="comments"
          placeholder="Additional Comments"
          value={formData.comments}
          onChange={handleChange}
          maxLength='400'
        />

        <Button type="submit" text="Add Info" isLoading={isLoading} />
      </form>
    </>
  );
}

export default NewMaintenanceForm;
