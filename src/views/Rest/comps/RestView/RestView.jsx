import { useEffect, useState } from "react";
import RestCard from "../RestCard/RestCard";
import Maintenance from "./components/Maintenance/Maintenance";
import Menu from "./components/Menu/Menu";
import axios from "axios";
import "./restView.css";

function RestView({ restaurant }) {
  const [isLoading, setIsLoading] = useState(false);
  const [landmarks, setLandmarks] = useState([]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    try {
      const fetchData = () => {
        setIsLoading(true);
        axios
          .get(
            `http://localhost:3001/getlandmarks?restaurantId=${restaurant.id}`
          )
          .then((response) => {
            setLandmarks(response.data);
          })
          .catch((err) => {
            console.log(err.message); /// error handler
          })
          .finally(() => {
            setIsLoading(false);
          });
      };

      !landmarks.length ? fetchData() : null;
    } catch (error) {
      console.error("Error fetching projects:", error.message);
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
