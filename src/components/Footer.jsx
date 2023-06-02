import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-auto">
      <Container fluid className="footer-bg p-5">
        <Container>
          <div className="d-flex align-items-center gap-4 gap-sm-5 justify-content-center">
            <ul className="list-unstyled d-flex flex-column gap-3 text-uppercase mb-0">
              <li>
                <Link to="/wysyłka">Wysyłka</Link>
              </li>
              <li>
                <Link to="/kontakt">Kontakt</Link>
              </li>
              <li>
                <Link to="/regulamin">Regulamin</Link>
              </li>
            </ul>

            <div className="vr"></div>

            <div>
              <div className="text-center mb-4">
                <Link to="/club">
                  <h6 className="mb-1">Zostań klubowiczem</h6>
                  <p className="fs-7 text-secondary mb-0 d-none d-md-block">
                    Otrzymaj rabat 10% oraz darmową dostawę na pierwsze zakupy.{" "}
                  </p>
                </Link>
              </div>

              <div className="text-center ">
                <Link to="/newsletter">
                  <h6 className="mb-1">Newsletter</h6>
                  <p className="fs-7 text-secondary mb-0 d-none d-md-block">
                    Zapisz się do bezpłatnego newselttera.
                  </p>
                </Link>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-center gap-5 mt-5">
            <button>
              <a href="https://www.facebook.com/" target="blank">
                <i className="bi bi-facebook text-secondary "></i>
              </a>
            </button>
            <button>
              <a href="https://www.messenger.com/" target="blank">
                <i className="bi bi-messenger text-secondary "></i>
              </a>
            </button>
            <button>
              <a href="https://www.twitter.com/" target="blank">
                <i className="bi bi-twitter text-secondary "></i>
              </a>
            </button>

            <button>
              <a href="https://www.youtube.com/" target="blank">
                <i className="bi bi-youtube text-secondary "></i>
              </a>
            </button>
          </div>
        </Container>
      </Container>
    </footer>
  );
}
