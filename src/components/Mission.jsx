import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMissions, joinMission, leaveMission } from '../redux/mission/missionsSlice';

const Mission = () => {
  const dispatch = useDispatch();
  const missions = useSelector((store) => store.missions.missions);

  useEffect(() => {
    dispatch(fetchMissions());
  }, [dispatch]);

  const handleStatus = (reserved) => {
    if (reserved) {
      return <span>Active Member</span>;
    }
    return <span>NOT A MEMBER</span>;
  };

  const handleButtons = (id, reserved) => {
    if (reserved) {
      return (
        <button
          type="button"
          onClick={() => dispatch(leaveMission({ id }))}
        >
          Leave Mission
        </button>
      );
    }
    return (
      <button
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
      <td>{ item.desc }</td>
      <td className="align-middle text-center">
        {handleStatus(item.reserved)}
      </td>
      <td className="align-middle text-center">
        {handleButtons(item.id, item.reserved)}
      </td>
    </tr>
  ));

  return (
    <section className="m-3 mt-0 p-3 pt-0 table-responsive">
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th width="150">Mission</th>
            <th>Description</th>
            <th width="150">Status</th>
            <th width="150"> </th>
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
