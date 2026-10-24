import { webpSrcSet } from '@/lib/img';

type Props = { src: string; alt: string; width: number; height: number; sizes?: string; priority?: boolean; className?: string; max?: number };

/** WebP(여러 폭) + JPG 대체 이미지 */
export default function Pic({ src, alt, width, height, sizes = '(max-width: 760px) 100vw, 760px', priority, className, max }: Props) {
  const set = webpSrcSet(src, max);
  const img = (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      {...(priority ? { fetchPriority: 'high' as const } : {})}
    />
  );
  if (!set) return img;
  return (
    <picture>
      <source type="image/webp" srcSet={set} sizes={sizes} />
      {img}
    </picture>
  );
}
