import './Pagination.css';
import PropTypes from 'prop-types';

const Pagination = ({ retreatsPerPage, totalRetreats, paginate, currentPage }) => {
  const totalPages = Math.ceil(totalRetreats / retreatsPerPage);

  return (
    <div className="pagination">
      <button
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <button
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

Pagination.propTypes = {
  retreatsPerPage: PropTypes.number.isRequired,
  totalRetreats: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default Pagination;
