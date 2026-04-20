import PropTypes from 'prop-types';

export default function StarRating({ rating, reviewCount, size = 'sm' }) {
  const stars = Array.from({ length: 5 }, (_, i) => {
    if (i + 1 <= Math.floor(rating)) return 'full';
    if (i < rating) return 'half';
    return 'empty';
  });

  return (
    <div className={`star-rating star-rating--${size}`}>
      <span className="stars">
        {stars.map((type, i) => (
          <span key={i} className={`star star--${type}`}>
            {type === 'full' ? '★' : type === 'half' ? '½' : '☆'}
          </span>
        ))}
      </span>
      {reviewCount !== undefined && (
        <span className="review-count">({reviewCount.toLocaleString()})</span>
      )}
    </div>
  );
}

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
  reviewCount: PropTypes.number,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};
