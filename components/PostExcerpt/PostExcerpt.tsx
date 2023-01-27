import Link from 'next/link';
import { ContentItem } from '../../lib/api';

type Props = {
  post: ContentItem,
};

const PostExcerpt = ({ post: { id, html, metadata } }: Props) => {
  if (html) {
    return (
      <div className="post-excerpt">
        <div dangerouslySetInnerHTML={{ __html: html }} />
        <Link href={`/blog/${id}`}>Contnue Reading</Link>
      </div>
    );
  }

  return null;
};

export default PostExcerpt;