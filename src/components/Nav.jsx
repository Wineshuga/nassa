import { NavLink } from 'react-router-dom';
import '../styles/nav.css';
import 'bootstrap/dist/css/bootstrap.css';

const links = [
  { path: '/', text: 'Rockets' },
  { path: '/Mission', text: 'Mission' },
  { path: '/MyProfile', text: 'My Profile' },
];
const Nav = () => (
  <>
    <section className="nav-container">
      <div>
        <img
          className="Logo"
          src="https://spacetravellerhubcapstone.netlify.app/static/media/planet.3f6fb2742f28651730c0.png"
          alt="Logo"
          style={{ width: '50px' }}
        />
        <h3>Space Travelers&apos; Hub</h3>
      </div>
      <div>
        <ul
          className="list-unstyled m-2 p-2 d-flex flex-wrap"
        >
          {links.map((link) => (
            <li key={link.text} className="m-2">
              <NavLink
                className={({ isActive }) => (isActive ? 'active-link' : 'link')}
                to={link.path}
              >
                {link.text}
              </NavLink>
            </li>
          ))}
        </ul>

      </div>
    </section>
    <hr className="m-3 my-1 py-2" />
  </>
);

export default Nav;
