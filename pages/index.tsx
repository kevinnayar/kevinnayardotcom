import { useRef, MutableRefObject } from 'react'
import { NextPage, GetStaticProps } from 'next'
import { stack, projects, workHistory, contactList } from '../lib/data'
import Layout from '../components/Layout/Layout'
import Header from '../components/Header/Header'
import Content from '../components/Content/Content'
import Section from '../components/Section/Section'
import Para from '../components/Para/Para'
import CodeList from '../components/CodeList/CodeList'
import ProjectList from '../components/ProjectList/ProjectList'
import WorkHistory from '../components/WorkHistory/WorkHistory'
import ContactList from '../components/ContactList/ContactList'
import Nav from '../components/Nav/Nav'
import { ProjectType, WorkHistoryItem, ContactInfo, SectionKey } from '../types/typeDefs'

type Props = {
  stack: string[],
  projects: ProjectType[],
  workHistory: WorkHistoryItem[],
  contactList: ContactInfo[],
}

export const getStaticProps: GetStaticProps = () => {
  const props: Props = {
    stack,
    projects,
    workHistory,
    contactList,
  }

  return {
    props,
  }
}

export default function Index({ stack, projects, workHistory, contactList }: Props) {
  const bio = [
    <span>I'm a Software Engineer and a proud father to an Australian Kelpie named Jpeg.{' '}
      Professionally, I've worn many hats such as Software Engineer, Technical Architect,Manager,{' '}
      and Director. At my last few gigs, I managed technical teams at companies like{' '}
      <a href="https://www.dropbox.com/" target="_blank" >Dropbox</a>
      {' '}and <a href="https://khoros.com/" target="_blank" >Spredfast</a> (now Khoros). </span>,

    <span>Currently, I'm a Senior Software Engineer working on something pretty special at a scaleup{' '}
      called <a href="https://allstripes.com/" target="_blank" >AllStripes</a>. We're building an amazing,{' '}
      modern platform to advance rare disease research. I like writing functional fullstack Typescript.{' '}
      Here is some of the tech that I'm working and playing with these days:</span>,
    
    <span>Outside of the 9 to 5, you can catch me hosting{' '}
      <a href="http://whiskypick.com" target="_blank" >whiskey tasting events</a>, going on a run around{' '}
      {/* @ts-ignore */}
      Lady Bird Lake in downtown Austin, Texas with my beautiful <strike>girlfriend</strike>{' '}
      {/* @ts-ignore */}
      <strike>fiancé</strike> wife, or manipulating and visualizing{' '}
      <a href="https://data.world/kevinnayar" target="_blank" >datasets</a>.</span>,
  ]

  const aboutRef = useRef<null | HTMLElement>(null)
  const projectsRef = useRef<null | HTMLElement>(null)
  const workRef = useRef<null | HTMLElement>(null)
  const contactRef = useRef<null | HTMLElement>(null)

  const refs: Record<SectionKey, MutableRefObject<null | HTMLElement>> = {
    about: aboutRef,
    projects: projectsRef,
    work: workRef,
    contact: contactRef,
  }

  return (
    <main>
      <Header>
        <Nav refs={refs} />
      </Header>

      <Content>  
        <Section title="👋 hello there" ref={aboutRef}>
          <Para>{bio[0]}</Para>
          <Para>{bio[1]}</Para>
          <CodeList stack={stack} />
          <Para>{bio[2]}</Para>
        </Section>
        <Section title="side projects" ref={projectsRef}>
          <Para>
            I like building things for work and fun.
          </Para>
          <ProjectList projects={projects} />
        </Section>
        
        <Section title="work history" ref={workRef}>
          <Para>
            History is the study of all the world's crime.
          </Para>
          <WorkHistory workHistory={workHistory} />
        </Section>
        <Section title="contact me" ref={contactRef}>
          <Para>
            From time to time, I consult on large-scale fullstack Typescript codebases,{' '}
            especially ones using Node.js and React. If you'd like to work with me, give me a shout.
          </Para>
          <ContactList list={contactList} />
        </Section>
      </Content>
    </main>
  )
}

Index.getLayout = function getLayout(page: NextPage) {
  return <Layout>{page}</Layout>
}



