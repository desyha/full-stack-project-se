import { Link } from "react-router-dom";
import "./footer.scss";

function Footer(){
  return (
    <section className="footer">
      <img className="footerChild" alt="" src="/rectangle-5.svg" />
      <div className="decisionMaker">
        <div className="contactUs">Contact Us</div>
      </div>
      <div className="outputTransformer">
        <div className="delayer">
          <img
            className="faceIcon"
            loading="lazy"
            alt=""
            src="/iconFacebook.png"
          />
          <img
            className="emailIcon"
            loading="lazy"
            alt=""
            src="/iconEmail.png"
          />
          <img
            className="twitIcon"
            loading="lazy"
            alt=""
            src="/iconTwitter.png"
          />
        </div>
      </div>
      <div
        className="copyright2024"
      ><Link to={`https://github.com/desyha/full-stack-project-se/blob/0b25d8365ebb21bae29da64aa07bcf683d140db3/OBENG/client/README.md`}>Credits</Link></div>
    </section>
  );
};

export default Footer;
