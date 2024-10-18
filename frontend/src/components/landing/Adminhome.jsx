import React  from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import '../landing/Adminhome.css';
import Navbar2 from '../header/Navbar2';

function Adminhome() {
  const navigate = useNavigate();

  const component = [
    {
        title: "My Venues",
        onClick: () => {
            navigate('/api/venue')
        },
    },
    {
      title: "My Inventory",
      onClick: () => {
          navigate('/api/item')
      },
  },
  {
    title: "My Orders",
    onClick: () => {
        navigate('/api/event')
    },
},
];

  return (
    <div>
      <Header />
    <Navbar2 />
      <div className="Adminhome-container">
        <br /><br /><br /><br />
        <div className="featureCards">
          {component.map((item, index) => (
                    <div className="card" key={index} onClick={() => item.onClick && item.onClick()}>
                        <div>
                            <h2>{item.title}</h2>
                        </div>
                    </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Adminhome;
