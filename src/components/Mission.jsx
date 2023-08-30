import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMissions, joinMission } from '../redux/mission/missionsSlice';

const Mission = () => {
  const dispatch = useDispatch();
  const missions = useSelector((store) => store.missions.missions);

  useEffect(() => {
    dispatch(fetchMissions());
  }, [dispatch]);

  const mission = missions.map((item) => (
    <tr key={item.id}>
      <td className="fw-bold">{ item.name }</td>
      <td>{ item.desc }</td>
      <td className="align-middle text-center"><span>NOT A MEMBER</span></td>
      <td className="align-middle text-center">
        <button
          type="button"
          onClick={() => dispatch(joinMission({ id: item.id }))}
        >
          {' '}
          Join Mission
          {' '}

        </button>
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
