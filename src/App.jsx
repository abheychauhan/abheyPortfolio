import Menu from "./components/Menu";
import Canvas from "./Canvas";
import Home from "./components/Home";
import LocomotiveScroll from 'locomotive-scroll';



function App() {


  return (
    <div className="bg-[#FF861A] w-full overflow-x-hidden">
      <Menu/>
      <Canvas/>
      <Home/>

    </div>
  );
}

export default App;