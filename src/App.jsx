import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header/Header';
import Banner from './components/Banner/Banner';
import Controls from './components/Controls/Controls';
import RetreatList from './components/RetreatList/RetreatList';
import Pagination from './components/Pagination/Pagination';
import Footer from './components/Footer/Footer';
import './App.css';
import NoResults from './components/NoResults/NoResults';

const App = () => {
  const [retreats, setRetreats] = useState([]);
  const [filteredRetreats, setFilteredRetreats] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [retreatsPerPage] = useState(3);

  useEffect(() => {
    const fetchRetreats = async () => {
      try {
        const response = await axios.get('https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats');
        setRetreats(response.data);
        setFilteredRetreats(response.data);
      } catch (error) {
        console.error('Error fetching the retreats', error);
      }
    };

    fetchRetreats();
  }, []);

  const filterRetreats = (type, date) => {
    let filtered = retreats;

    if (type !== 'All') {
      filtered = filtered.filter(retreat => retreat.type === type);
    }

    if (date) {
      const [year, month] = date.split('-');
      filtered = filtered.filter(retreat => {
        const retreatDate = new Date(retreat.date * 1000);
        return retreatDate.getFullYear() === parseInt(year) && retreatDate.getMonth() + 1 === parseInt(month);
      });
    }

    setFilteredRetreats(filtered);
    setCurrentPage(1);
  };

  const searchRetreats = (searchTerm) => {
    const filtered = retreats.filter(retreat =>
      retreat.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredRetreats(filtered);
    setCurrentPage(1);
  };

  const indexOfLastRetreat = currentPage * retreatsPerPage;
  const indexOfFirstRetreat = indexOfLastRetreat - retreatsPerPage;
  const currentRetreats = filteredRetreats.slice(indexOfFirstRetreat, indexOfLastRetreat);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  
  return (
    <div className="app">
      <Header />

      <div className='main-content'>
        <Banner />
        <Controls onFilter={filterRetreats} onSearch={searchRetreats} />
        {currentRetreats.length > 0 ? (
          <>
            <RetreatList retreats={currentRetreats} />
            <Pagination
              retreatsPerPage={retreatsPerPage}
              totalRetreats={filteredRetreats.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </>
        ) : (
          <NoResults />
        )}
      </div>

      <Footer />
    </div>
  );
};

export default App;
