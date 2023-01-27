import { NextPage } from 'next';
import Link from 'next/link';
// import { GetServerSidePropsContext, NextPage } from 'next';
// import { getBlogPostById, ContentItem } from '../../lib/api';

import Layout from '../../components/Layout/Layout';
import Section from '../../components/Section/Section';

// type Props = {
//   post: ContentItem,
// }

// const BlogPost = ({ post: { html } }: Props) => (
const BlogPost = () => (
  <>
    <Section>
      <h3>Nuthin{"'"} go see here... Go back to the <Link href="/">home page</Link>.</h3>
    </Section>
    {/* <Section html={html} /> */}
  </>
);

BlogPost.getLayout = function getLayout(page: NextPage) {
  return <Layout>{page}</Layout>;
};

// export const getServerSideProps = async (context: GetServerSidePropsContext) => {
//   const { query } = context;
//   let post = await getBlogPostById(query.id as string);
//   if (!post) {
//     post = {
//       id: '',
//       markdown: '',
//       html:  `<p>A blog post for this page doesn't exist.</p>`,
//       metadata: {
//         title: '',
//       },
//     };
//   }

//   return {
//     props: {
//       post,
//     },
//   };
// };

export default BlogPost;

