import { forwardRef } from 'react'
import { WithKids } from '../../types/typeDefs'

type Props = WithKids & { title: string }

const Section = forwardRef<HTMLElement, Props>(({ title, children }, ref) => {
  return (
    <section ref={ref} className="section">
      <h2 className="section__title gradient-text">{title}</h2>
      <div className="section__content">{children}</div>
    </section>
  )
})

export default Section

