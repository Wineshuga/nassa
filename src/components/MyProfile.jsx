import { useSelector } from 'react-redux';

const MyProfile = () => {
  const { missions } = useSelector((store) => store.missions);
  return (
    <div className="container d-flex">
      <section className="">
        <h3>My Missions</h3>
        <ul className="list-group">
          {missions.filter((item) => item.reserved)
            .map((item) => (
              <li
                key={item.id}
                className="list-group-item p-4"
              >
                {item.name}
              </li>
            ))}
        </ul>
      </section>
    </div>
  );
};

export default MyProfile;
