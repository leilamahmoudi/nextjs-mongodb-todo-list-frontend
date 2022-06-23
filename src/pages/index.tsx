import Toolbar from "../components/Toolbar";

export default function Home() {
  return (
    <div className="page-container">
      <Toolbar />
      <div className="home-main">
        <video autoPlay loop muted className="video">
          <source src="/production.mp4" type="video/mp4" />
        </video>
        <div className="home-overlay"></div>
        <div className="home-text">
          <h1>amazing todo list app</h1>
          <h3>Next Js-Express-MongoDB</h3>
        </div>
      </div>
    </div>
  );
}
