import "../styles/globals.css";
import "semantic-ui-css/semantic.min.css";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <h1>Luv U</h1>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
