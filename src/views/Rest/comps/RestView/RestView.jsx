import { useEffect, useState } from "react";
import RestCard from "../RestCard/RestCard";
import Maintenance from "./components/Maintenance/Maintenance";
import Menu from "./components/Menu/Menu";
import axios from "axios";
import { useALert } from "../../../../ContextAPI/AlertContext";
import "./restView.css";

function RestView({ restaurant }) {
  const [landmarks, setLandmarks] = useState([]);
  const { showAlert } = useALert();

  useEffect(() => {
    const source = axios.CancelToken.source();
    try {
      const server_ = "https://restaurantchain-server.onrender.com";
      const fetchData = () => {
        axios
          .get(`${server_}/getlandmarks/${restaurant.id}`)
          .then((response) => {
            setLandmarks(response.data);
          })
          .catch(() => {
            showAlert("fail", `Something Went Wrong`);
          });
      };

      !landmarks.length ? fetchData() : null;
    } catch (error) {
      showAlert("fail", `Something Went Wrong`);
    }

    return () => {
      source.cancel("request is canceled");
    };
  }, []);

  return (
    <section className="rest-view">
      <div className="restaurant-details">
        <RestCard restaurant={restaurant} landmarks={landmarks} />
      </div>
      <Menu restaurantId={restaurant.id} />
      <Maintenance restaurantId={restaurant.id} />
    </section>
  );
}

export default RestView;
