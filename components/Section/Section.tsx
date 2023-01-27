import { useExternalLinks } from '../../hooks/useExternalLinks';
// <Link key={id} href={`/blog/${id}`}>
// </Link>

type Props = {
  html?: string
  children?: any,
}

const Section = ({ html, children }: Props) => {
  useExternalLinks();

  if (html) {
    return <div className="section" dangerouslySetInnerHTML={{ __html: html }} />;
  }

  if (children) {
    return <div className="section">{children}</div>;
  }

  return null;
};
  
export default Section;
