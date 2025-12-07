import { navIcons, navLinks } from "#constants"
import dayjs from "dayjs"
const NavBar = () => {
  return (
    <nav>
      <div>
        <img src="/images/logo.svg" alt="macos style portfolio logo" />
        <p className="font-medium">Nischal's Portfolio</p>

        <ul>
          {navLinks.map(({ id, name }) => (
            <li key={id}>
              <p>{name}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Side icons and date */}
      <div>
        <ul>
          {navIcons.map(({ id, img }) => (
            <li key={id}>
              <img src={img} alt={`icon-${id}`} className="icon-hover" />
            </li>
          ))}
        </ul>
        <time>{dayjs().format("ddd D MMM h:mm A")}</time>
      </div>
    </nav>
  )
}

export default NavBar
