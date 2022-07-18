import "./index.css";
import Home from "./routes/Home";
import { Link, Route } from "wouter";

function App() {
  return (
    <div>
      <Route path="/" component={Home} />
    </div>
  );
}

export default App;
