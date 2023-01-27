import { NextPage } from 'next';
import Link from 'next/link';
// import { getFeaturedBlogPosts, ContentItem } from '../../lib/api';

import Layout from '../../components/Layout/Layout';
import Section from '../../components/Section/Section';
// import PostExcerpt from '../../components/PostExcerpt/PostExcerpt';

// type Props = {
//   posts: Record<string, ContentItem>,
// }

// const BlogIndex = ({ posts }: Props) => (
const BlogIndex = () => (
  <Section>
    <h3>Nuthin{"'"} go see here... Go back to the <Link href="/">home page</Link>.</h3>
    {/* {Object.values(posts).slice(0, 10).map((post) => (  
      <PostExcerpt key={post.id} post={post} />
    ))} */}
  </Section>
);

BlogIndex.getLayout = function getLayout(page: NextPage) {
  return <Layout>{page}</Layout>;
};

// export const getStaticProps = async () => {
//   const posts = await getFeaturedBlogPosts();
//   return {
//     props: {
//       posts,
//     },
//   };
// };

export default BlogIndex;


