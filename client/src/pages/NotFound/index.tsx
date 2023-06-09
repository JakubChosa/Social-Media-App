import Wrapper from "./NotFound";
import { Link } from "react-router-dom";
// import img from "../../assets/images/page-not-found.svg";

const NotFound = () => {
  return (
    <Wrapper className="full-page">
      <div>
        {/* <img src={img} alt="not found" /> */}
        <h3>Ohh! page not found</h3>
        <p>We can't seem to find the page you're looking for</p>
        <Link to="/">back home</Link>
      </div>
    </Wrapper>
  );
};
export default NotFound;
