import "./Footer.css";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <p className="mb-0"
        >
          © {new Date().getFullYear()} ShopEase. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;