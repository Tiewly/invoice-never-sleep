import "../styles/globals.css";
import "semantic-ui-css/semantic.min.css";
import SideBar from "../component/SideBar";
import "../styles/sideBar.css";

function MyApp({ Component, pageProps }) {
  return (
    <div style={{ display: "flex" }}>
      <SideBar />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
