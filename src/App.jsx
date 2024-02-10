import "./App.css";
import { Alert } from "./components";
import MainLayout from "./layouts/Main/Main";
import { Restaurants } from "./views";

function App() {
  return (
    <>
      <MainLayout>
        <Restaurants />
      </MainLayout>
      <Alert />
    </>
  );
}

export default App;
