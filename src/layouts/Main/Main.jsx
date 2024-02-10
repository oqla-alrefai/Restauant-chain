import { Footer, SideBar } from "../components";
import "./main.css";

function MainLayout(props) {
  const { children } = props;

  return (
    <div className="main-layout">
      <SideBar />
      <main className="main-content">{children}</main>
      <Footer />
    </div>
  );
}

export default MainLayout;
