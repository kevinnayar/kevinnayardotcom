import Link from 'next/link';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';

const Header = () => (
  <header className="header">
    <h1>Kevin Nayar</h1>
    <p>Software Engineer</p>
    <ThemeSwitcher />
    <Link
      className="link-to-code"
      target="_blank"
      href="https://github.com/kevinnayar/kevinnayardotcom/tree/main/components/SvgEffect"
    >
      How did I make this background? &rarr;
    </Link>
  </header>
);

export default Header;
