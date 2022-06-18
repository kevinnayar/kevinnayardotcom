import Image from 'next/image'
import { WithKids } from '../../types/typeDefs'

const Header = ({ children }: WithKids) => (
  <header className="header">
    <div className="header__image">
      <Image
        src="/images/profile.png"
        alt="avatar"
        width="120"
        height="120"
      />
    </div>
    <h1 className="header__title gradient-text">Kevin Nayar</h1>
    <p className="header__content">Software Engineer</p>
    {children}
  </header>
)

export default Header
