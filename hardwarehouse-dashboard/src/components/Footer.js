import React from "react";

const Footer = () => {
  return (
    <>
      <div className="container">
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <div className="col-md-4 d-flex align-items-center">
            <span className="mb-3 mb-md-0 text-muted">
              © 2022 Pranav Arora. &nbsp;
            </span>
            <span className="mb-3 mb-md-0">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/pranavarora1895/hardWareHouseInventory/blob/main/LICENSE"
              >
                View License here.
              </a>
            </span>
          </div>

          <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
            <li className="ms-3">
              <a
                className="text-muted"
                href="https://dev.to/pranavarora1895"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-dev fa-lg"></i>
              </a>
            </li>
            <li className="ms-3">
              <a
                className="text-muted"
                href="https://github.com/pranavarora1895/hardWareHouseInventory"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-github fa-lg"></i>
              </a>
            </li>
            <li className="ms-3">
              <a
                className="text-muted"
                href="https://www.linkedin.com/in/pranav-arora-354b71bb/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-linkedin fa-lg"></i>
              </a>
            </li>
            <li className="ms-3">
              <a
                className="text-muted"
                href="mailto:aurorapranav187@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-solid fa-envelope fa-lg"></i>
              </a>
            </li>
          </ul>
        </footer>
      </div>
    </>
  );
};

export default Footer;
