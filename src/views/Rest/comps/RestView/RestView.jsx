import RestCard from "../RestCard/RestCard";
import Maintenance from "./components/Maintenance/Maintenance";
import Menu from "./components/Menu/Menu";
import "./restView.css";

function RestView({ restaurant }) {

  return <section className="rest-view">
    <div className="restaurant-details">
      <RestCard restaurant={restaurant} />
    </div>
    <Menu restaurantId={restaurant.id} />
    <Maintenance restaurantId={restaurant.id} />
  </section>;
}

export default RestView;
