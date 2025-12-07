import { NAV_LINKS } from "#constants"

const NavBar = () => {
  return (
    <nav>
      <div>
        <img src="/images/logo.svg" alt="macos style portfolio logo" />
        <p className="font-semibold">Nischal's Portfolio</p>

        <ul>
          {NAV_LINKS.map(({ id, name }: { id: number; name: string }) => (
            <li key={id}>{name}</li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default NavBar
