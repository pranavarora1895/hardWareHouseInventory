import React from "react";

const Footer = () => {
  return (
    <>
      <div>
        <footer className="text-center text-lg-start bg-light">
          <div className="container d-flex justify-content-center py-5">
            <button
              type="button"
              className="btn btn-info btn-lg btn-floating mx-2"
            >
              <i className="fab fa-linkedin text-white"></i>
            </button>
            <button
              type="button"
              className="btn btn-info btn-lg btn-floating mx-2"
            >
              <i className="fab fa-dev text-white"></i>
            </button>
            <button
              type="button"
              className="btn btn-info btn-lg btn-floating mx-2"
            >
              <i className="fab fa-github text-white"></i>
            </button>
            <button
              type="button"
              className="btn btn-info btn-lg btn-floating mx-2"
            >
              <i className="fa-solid fa-envelope text-white"></i>
            </button>
          </div>

          <div
            className="text-center text-white p-3"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
          >
            © 2022 Copyright: &nbsp;
            <a
              className="text-white"
              target="_blank"
              rel="noreferrer"
              href="https://github.com/pranavarora1895/hardWareHouseInventory/blob/main/LICENSE"
            >
              Pranav Arora. View License here.
            </a>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Footer;
