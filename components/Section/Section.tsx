type Props = {
  content: string
}

const Section = ({ content }: Props) => (
  <div
    className="section"
    dangerouslySetInnerHTML={{ __html: content }}
  />
);

export default Section;
