import PropTypes from 'prop-types';

export default function Spinner({ size = 'md', text = 'Loading...' }) {
  return (
    <div className={`spinner-wrapper spinner-wrapper--${size}`} role="status">
      <div className="spinner" />
      {text && <span className="spinner-text">{text}</span>}
    </div>
  );
}

Spinner.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  text: PropTypes.string,
};
