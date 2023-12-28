import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchMissions, joinMission, leaveMission } from '../redux/mission/missionsSlice';
import '../styles/mission.css';

const Mission = () => {
  const [isDesktop, setDesktop] = useState(window.innerWidth < 620);

  const updateMedia = () => {
    setDesktop(window.innerWidth < 620);
  };

  useEffect(() => {
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  });
  const dispatch = useDispatch();
  const missions = useSelector((store) => store.missions.missions);

  useEffect(() => {
    if (missions.length === 0) {
      dispatch(fetchMissions());
    }
  }, [dispatch, missions.length]);

  const handleStatus = (reserved) => {
    if (reserved) {
      return <span className="bg-info text-white p-1 rounded">Active Member</span>;
    }
    return <span className="bg-secondary text-white p-1 rounded">NOT A MEMBER</span>;
  };

  const handleButtons = (id, reserved) => {
    if (reserved) {
      return (
        <button
          className="text-danger border-2 border-danger"
          type="button"
          onClick={() => dispatch(leaveMission({ id }))}
        >
          Leave Mission
        </button>
      );
    }
    return (
      <button
        className="text-secondary border-2"
        type="button"
        onClick={() => dispatch(joinMission({ id }))}
      >
        Join Mission
      </button>
    );
  };

  const mission = missions.map((item) => (
    <tr key={item.id}>
      <td className="fw-bold">{ item.name }</td>
      <td className="mission-desc">
        {
          isDesktop ? (
            <Link to="Mission-details">
              <p>
                { item.desc }
              </p>
            </Link>
          ) : (
            <p>
              { item.desc }
            </p>
          )
        }
      </td>
      <td className="mission-status align-middle text-center">
        {handleStatus(item.reserved)}
      </td>
      <td className="mission-btns align-middle text-center">
        {handleButtons(item.id, item.reserved)}
      </td>
    </tr>
  ));

  return (
    <section className="table-responsive-md">
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th width="150">Mission</th>
            <th>Description</th>
            <th width="150" className="table-status">Status</th>
            <th width="150" className="table-btns"> </th>
          </tr>
        </thead>
        <tbody>
          {mission}
        </tbody>
      </table>
    </section>

  );
};

export default Mission;
