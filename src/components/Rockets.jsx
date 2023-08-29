import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles/rockets.css';
import { getAPI, reservation } from '../redux/rocketsSlice';

const RocketList = () => {
  const dispatch = useDispatch();
  const { RocketList, isLoading, error } = useSelector(
    (store) => store.rockets,
  );
  useEffect(() => {
    dispatch(getAPI());
  }, [dispatch]);
  if (isLoading === true) {
    return <div>Loading</div>;
  }
  if (isLoading === false) {
    return (
      <div data-testid="RocketList">
        {RocketList.map((item) => (
          <Rocket
            key={item.id}
            name={item.name}
            disc={
              item.reserved ? (
                <div>
                  <span className="reserved">Reserved </span>
                  {item.disc}
                </div>
              ) : (
                item.disc
              )
            }
            image={item.images}
            Reservation={item.id}
            reservationState={
              item.reserved ? (
                <button type="button" className="Cancel-Reservation">
                  Cancel Reservation
                </button>
              ) : (
                <button type="button" className="Reservation">
                  Reserve rocket
                </button>
              )
            }
          />
        ))}
      </div>
    );
  }
  return <div>{error}</div>;
};

const Rocket = (props) => {
  const dispatch = useDispatch();

  const
    {
      id, name, disc, image, Reservation, reservationState,
    } = props;
  /* eslint-disable */
  return (
    <div className="rocketC" key={id}>
      <img className="rocketImg" src={image} alt={name} />
      <div className="contentC">
        <h4 className="rocektName">{name}</h4>
        <div className="rocketDesc">{disc}</div>
        <div
          type="button"
          onClick={() => {
            dispatch(reservation(Reservation));
          }}
        >
          {reservationState}
        </div>
      </div>
    </div>
    /* eslint-enable */
  );
};

Rocket.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  disc: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  Reservation: PropTypes.number.isRequired,
  reservationState: PropTypes.number.isRequired,
};

export default RocketList;
