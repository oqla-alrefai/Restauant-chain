import { DataModel, PageLoader, Title } from "../../../../../../components";
import { useEffect, useState } from "react";
import axios from "axios";
import "./maintenance.css";
import { useALert } from "../../../../../../ContextAPI/AlertContext";
import NewMaintenanceForm from "./NewMaintenanceForm";

function Maintenance({ restaurantId }) {
  let [showNewMaintenanceModal, setShowNewMaintenanceModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [maintenanceInfo, setMaintenanceInfo] = useState([]);
  let [selectedAction, setSelectedAction] = useState(-1);
  const { showAlert } = useALert();

  const fetchData = () => {
    setIsLoading(true);
    axios
      .get(`http://localhost:3001/getmaintenanceinfo/${restaurantId}`)
      .then((response) => {
        setMaintenanceInfo(response.data);
      })
      .catch((err) => {
        console.log(err.message); /// error handler
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    try {
      !maintenanceInfo.length ? fetchData() : null;
    } catch (error) {
      console.error("Error fetching projects:", error.message);
    }

    return () => {
      source.cancel("request is canceled");
    };
  }, []);

  function handleActionSelection(id) {
    if (selectedAction == id) setSelectedAction(-1);
    else setSelectedAction(id);
  }

  return (
    <section className="maintenance-container">
      <div className="maintenance-header">
        <Title level={3} text="Maintenance" />
        <span className="new-item-button">
          <i
            class="ri-add-circle-line"
            onClick={() => setShowNewMaintenanceModal(true)}
          ></i>
        </span>
      </div>

      {isLoading ? (
        <PageLoader left="40%" top="30%" scale="0.7" />
      ) : !maintenanceInfo.length ? (
        <Title text="You Have No Maintenance Actions Yet" level={4} />
      ) : (
        <div className="maintenance-info-container">
          {maintenanceInfo.map((item) => (
            <div
              className="maintenance-info"
              key={item.id}
              id={item.id == selectedAction ? "selected-action" : ""}
              style={{
                backgroundColor:
                  item.impact == "Normal operations"
                    ? "#caffd5"
                    : item.impact == "Partial shutdown"
                    ? "#fffac1"
                    : "#ffe0bd",
              }}
            >
              <div
                className="action-header"
                onClick={() => handleActionSelection(item.id)}
              >
                <Title text={item.impact} level={4} />
                <span>
                  <i className="ri-arrow-down-s-line"></i>
                </span>
              </div>
              <div className="action-details">
                <span>
                  Start Date: <strong>{item.startDate.split("T")[0]}</strong>
                </span>
                <span>
                  End Date: <strong>{item.endDate.split("T")[0]}</strong>
                </span>
                <span>
                  Quota/Price: <strong>{item.maintenancePrice} $</strong>
                </span>
                <p>
                  Additional Comments: <strong>{item.comments}</strong>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {showNewMaintenanceModal ? (
        <DataModel handler={setShowNewMaintenanceModal}>
          <NewMaintenanceForm
            setShowNewMaintenanceModal={setShowNewMaintenanceModal}
            restaurantId={restaurantId}
            fetchData={fetchData}
          />
        </DataModel>
      ) : (
        <></>
      )}
    </section>
  );
}

export default Maintenance;
