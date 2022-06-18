import { ContactInfo } from '../../types/typeDefs'

const ContactList = ({ list }: { list: ContactInfo[] }) => (
  <div className="contact-list">
    {list.map(({ href, title }) => (
      <a className="contact-list__item" target="_blank" key={title} href={href}>{title}</a>
    ))}
  </div>
)

export default ContactList