import AppName from "./component/AppName";
import ToDo from "./component/ToDo";
import Item1 from "./component/item1";
import Item2 from "./component/item2";
import './App.css';


function App (){
  return( 
<div class="container text-center">
  <AppName></AppName>
  <ToDo></ToDo>
  <Item1></Item1>
  <Item2></Item2>
  </div>
  )
}
 export default App;