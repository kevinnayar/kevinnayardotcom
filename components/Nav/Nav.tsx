import { MutableRefObject } from 'react'
import { SectionKey } from "../../types/typeDefs"

const NavItem = ({ name, onClick }: { name: string, onClick: () => void }) => (
  <div className="nav__item" onClick={onClick}>{name}</div>
)

type Props = {
  refs: Record<SectionKey, MutableRefObject<null | HTMLElement>>
}

const Nav = ({ refs }: Props) => {
  const { about, projects, work, contact } = refs

  const onClick = (ref: MutableRefObject<HTMLElement | null>) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const keyToFnMap = {
    about: () => onClick(about),
    projects: () => onClick(projects),
    work: () => onClick(work),
    contact: () => onClick(contact),
  }

  return (
    <nav className="nav">
      {Object.entries(keyToFnMap).map(([name, fn]) => (
        <NavItem key={name} name={name} onClick={fn} />
      ))}
    </nav>
  )
}

export default Nav