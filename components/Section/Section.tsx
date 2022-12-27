type Props = {
  html: string
}

const Section = ({ html }: Props) => (
  <div
    className="section"
    dangerouslySetInnerHTML={{ __html: html }}
  />
);

export default Section;
