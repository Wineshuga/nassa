import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchMissions } from '../redux/mission/missionsSlice';

const Mission = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMissions());
  });
  return (
    <>
      <div>Mission</div>
    </>

  );
};

export default Mission;
