import "../styles/globals.css";
import "semantic-ui-css/semantic.min.css";
import SideBar from "../component/SideBar.js";
import "../styles/sideBar.css";
import "../styles/table.css";

function MyApp({ Component, pageProps }) {
  return (
    <div style={{ display: "flex" }}>
      <SideBar />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
