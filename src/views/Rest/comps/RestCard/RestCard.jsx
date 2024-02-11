import "./restCard.css";

function RestCard({ restaurant, handler }) {
  const {
    restaurantName,
    phoneNumber,
    streetName,
    openingHours,
    nearbyLandmarks,
  } = restaurant;

  return (
    <>
      <div
        className="restaurant-card"
        onClick={handler ? () => handler(restaurant) : null}
      >
        <p>
          <i className="ri-home-office-fill"></i>
          <span>{restaurantName}</span>
        </p>
        <p>
          <i className="ri-phone-fill"></i>
          <span>{phoneNumber}</span>
        </p>
        <p>
          <i className="ri-map-pin-2-fill"></i>
          <span>{streetName}</span>
        </p>
        <p>
          <i className="ri-timer-2-fill"></i>
          <span>
            {openingHours.start} - {openingHours.end}
          </span>
        </p>
        <p>
          <i className="ri-map-2-line"></i>
          {nearbyLandmarks.map((mark, idx) => (
            <span key={idx}>{mark}, </span>
          ))}
        </p>
      </div>
    </>
  );
}

export default RestCard;
