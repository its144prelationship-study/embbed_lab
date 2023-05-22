import Home1 from './assets/Home1.png';
import Home2 from './assets/Home2.png';
import Home3 from './assets/Home3.png';
import MainComp from './MainComp';
import App from './App';

function Home() {
  const date = new Date();
  let hrnow = Number(date.getHours());
//   hrnow = 20;
  let HomeStyle = {
    backgroundImage: hrnow >= 5 && hrnow < 12 ? `url(${Home1})` : hrnow >= 12 && hrnow < 19 ? `url(${Home2})` : `url(${Home3})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh', 
    width: '100wh',
    margin: -8,
  };
  return (
    <div style={HomeStyle}>
      <MainComp />
      <App />
    </div>
  );
}

export default Home
