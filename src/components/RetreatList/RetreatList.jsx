import './RetreatList.css';
import PropTypes from 'prop-types';

const RetreatList = ({ retreats }) => {
  return (
    <div className="retreat-list">
      {retreats.map(retreat => (
        <div key={retreat.id} className="retreat-card">
          <img src={retreat.image} alt={retreat.title} />
          <div className="retreat-details">
            <h3>{retreat.title}</h3>
            <p>{retreat.description}</p>
            <p>Date: {new Date(retreat.date * 1000).toDateString()}</p>
            <p>Location: {retreat.location}</p>
            <p>Price: ${retreat.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

RetreatList.propTypes = {
  retreats: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.number.isRequired,
    location: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    condition: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
  })).isRequired,
};

export default RetreatList;
