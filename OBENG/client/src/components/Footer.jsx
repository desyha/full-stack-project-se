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
        className="copyright2023"
      >{`Copyright © 2024 OBENG. All Rights Reserved `}</div>
    </section>
  );
};

export default Footer;
