import requestAPI from "./API/request";
import "./App.css";
import Banner from "./Components/Banner";
import Nav from "./Components/Nav";
import Row from "./Components/Row";

function App() {
  return (
    <div className="App">
      {/* <Nav /> */}
      <Banner />
      <Row
        title="Netflix original"
        fetchUrl={requestAPI.fetchNetflixOriginal}
        isLargeRow={true}
        style={{ marginTop: "50px" }}
      />
      <Row title="Trending now" fetchUrl={requestAPI.fetchTrending} />
      <Row title="Top Rated" fetchUrl={requestAPI.fetchTopRated} />
      <Row title="Action Movies" fetchUrl={requestAPI.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={requestAPI.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={requestAPI.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={requestAPI.fetchRomanceMovies} />
      <Row title="Documentries" fetchUrl={requestAPI.fetchDocumentries} />
    </div>
  );
}

export default App;
