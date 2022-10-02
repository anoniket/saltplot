import "./App.css";
import MainEditor from "./components/MainEditor";

function App() {
  return (
    <div className="mainParent">
      <div className="navParent">
        <div className="logoParent">
          <img alt="mainLogo" src="./logoMain.svg" />
        </div>
        <div className="appTitle">Data</div>
      </div>
      <div className="editorParent">
        <h1>John Doe Interview</h1>
        <MainEditor />
      </div>
    </div>
  );
}

export default App;
