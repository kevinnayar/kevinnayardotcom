import { useExternalLinks } from '../../hooks/useExternalLinks';

type Props = {
  className?: string;
  children: any;
};

const Section = ({ className, children }: Props) => {
  useExternalLinks();
  return <div className={`section ${className}`}>{children}</div>;
};

export default Section;
