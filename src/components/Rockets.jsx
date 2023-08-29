import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { getAPI } from '../redux/rocketsSlice';

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
            id={item.id}
            name={item.name}
            description={item.description}
            images={item.flickr_images}
          />
        ))}
      </div>
    );
  }

  return <div>{error}</div>;
};

const Rocket = (props) => {
  const
    {
      id, name, description, images,
    } = props;

  return (
    <div className="rocketC" key={id}>
      <img className="rocketImg" src={images[1]} alt={name} />
      <div className="contentC">
        <h4 className="rocketName">{name}</h4>
        <div className="rocketDesc">{description}</div>
      </div>
    </div>
  );
};

Rocket.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default RocketList;
