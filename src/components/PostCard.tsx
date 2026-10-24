import Link from 'next/link';
import type { Post } from '@/lib/posts';
import { fmtDate } from '@/lib/posts';
import { categoryName } from '@/lib/site';

export default function PostCard({ post }: { post: Post }) {
  return (
    <article className="post-card">
      <Link href={`/posts/${post.slug}/`}>
        {post.hero ? <img src={post.hero} alt={post.heroAlt || post.title} loading="lazy" decoding="async" /> : null}
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
