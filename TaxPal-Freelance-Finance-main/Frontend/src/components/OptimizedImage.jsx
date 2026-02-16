/**
 * Optimized image component with lazy loading and placeholder.
 * Use for images that need performance optimization.
 */
export default function OptimizedImage({
  src,
  alt,
  className = '',
  loading = 'lazy',
  ...props
}) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      decoding="async"
      {...props}
    />
  );
}
