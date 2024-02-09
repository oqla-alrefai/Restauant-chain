import "./App.css";
import { useALert } from "./ContextAPI/AlertContext";
import { Alert } from "./components";

function App() {
  const {type, message, active} = useALert().alertState;

  return (
    <>
      <h1>InfoGraph Task</h1>
      <Alert />
    </>
  );
}

export default App;
