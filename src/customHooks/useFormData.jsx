import { useCallback, useState } from "react";

const useFormData = (initialState) => {
  const [formData, setFormData] = useState(initialState);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }, []);

  return {
    formData,
    handleChange,
  };
};

export default useFormData;
