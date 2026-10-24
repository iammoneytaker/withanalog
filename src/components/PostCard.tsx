import Link from 'next/link';
import type { Post } from '@/lib/posts';
import { fmtDate } from '@/lib/posts';
import { categoryName } from '@/lib/site';
import Pic from './Pic';

export default function PostCard({ post }: { post: Post }) {
  return (
    <article className="post-card">
      <Link href={`/posts/${post.slug}/`}>
        {post.hero ? <Pic src={post.hero} alt={post.heroAlt || post.title} width={800} height={450} sizes="(max-width: 720px) 100vw, 340px" max={800} /> : null}
        <div className="post-card-body">
          <p className="post-card-cat">{categoryName(post.category)}</p>
          <h3>{post.title}</h3>
          <p className="post-card-desc">{post.description}</p>
          <p className="post-card-date">{fmtDate(post.updatedAt)}</p>
        </div>
      </Link>
    </article>
  );
}
