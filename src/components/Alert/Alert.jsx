import Title from "../Title/Title";
import { useEffect } from "react";
import { useALert } from "../../ContextAPI/AlertContext";
import "./alert.css";

const Alert = () => {
  const {alertState, closeAlert} = useALert();
  const { active, type, message } = alertState;

  let titleText = "";
  let icon = "";
  let backGroundColor = "";

  switch (type) {
    case "success":
      titleText = "Success!";
      backGroundColor = "#2DD284";
      icon = <i className="ri-checkbox-circle-line"></i>;
      break;
    case "fail":
      titleText = "Sorry...";
      icon = <i className="ri-close-circle-line"></i>;
      backGroundColor = "#D85261";
      break;
    case "danger":
      titleText = "Be careful...";
      icon = <i className="ri-alert-line"></i>;
      backGroundColor = "#FADA5E";
      break;
    case "tip":
      titleText = "Quick tip!";
      icon = <i className="ri-information-line"></i>;
      backGroundColor = "#88CEF7";
      break;
    case "reminder":
      titleText = "Quick reminder!";
      icon = <i className="ri-question-line"></i>;
      backGroundColor = "#779ECB";
      break;
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      closeAlert();
    }, 6000);

    return () => clearTimeout(timeoutId);
  }, [active]);

  return active ? (
    <div
      className={`alert-container show${active}`}
      style={{ backgroundColor: backGroundColor }}
    >
      <div className="alert-icon-container">
        <span>{icon}</span>
      </div>
      <div className="alert-content">
        <Title text={titleText} level={4} />
        <p>{message}</p>
        <i
          className="ri-close-line alert-close-button"
          onClick={() => closeAlert()}
          style={{ color: `${backGroundColor}` }}
        ></i>
      </div>
    </div>
  ) : null;
};

export default Alert;
