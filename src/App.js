import './App.css';
import AppMenu from "./AppMenu";
import AppRoute from "./AppRoute";
import AppHeader from './AppHeader';

function App() {
  return (
    <div className="d-flex flex-column vh-100">
      <AppHeader/>
      <div className="flex-grow-1 container-fluid">
        <div className="row h-100">
          <div className="col-md-6 col-lg-4 p-3 bg-dark">
            <div className=" h-100 d-flex flex-column">
              <div className="flex-grow-1" style={{height:"0px", overflowY:"auto", overflowX:"hidden"}}>
                <AppMenu/>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-8 p-3">
            <div className=" h-100 d-flex flex-column">
              <div className="flex-grow-1 overflow-auto pr-3" style={{height:"0px"}}>
                <AppRoute/>              
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>      
  );
}

export default App;

