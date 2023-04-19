import React from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router";

export default function Home() {
  const navigate = useNavigate();
  const onBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <div className="container m-auto">
      <br />
      <section id="gallery">
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-3">
              <h4>
                <b>
                  <center>Deal with Depression</center>
                </b>
              </h4>
              <div class="ratio ratio-16x9">
                <iframe
                  class="embed-responsive-item"
                  src="https://www.youtube.com/embed/eAK14VoY7C0"
                  allowfullscreen
                ></iframe>
              </div>
            </div>
            <div class="col-sm-3">
              <h4>
                <b>
                  <center>Heart Health</center>
                </b>
              </h4>
              <div class="ratio ratio-16x9">
                <iframe
                  class="embed-responsive-item"
                  src="https://www.youtube.com/embed/5TTssryrrLg"
                  allowfullscreen
                ></iframe>
              </div>
            </div>
            <div class="col-sm-3">
              <h4>
                <b>
                  <center>Power of positivity</center>
                </b>
              </h4>
              <div class="ratio ratio-16x9">
                <iframe
                  class="embed-responsive-item"
                  src="https://www.youtube.com/embed/HwLK9dBQn0g"
                  allowfullscreen
                ></iframe>
              </div>
            </div>
            <div class="col-sm-3">
              <h4>
                <b>
                  <center>Food affecting brain health</center>
                </b>
              </h4>
              <div class="ratio ratio-16x9">
                <iframe
                  class="embed-responsive-item"
                  src="https://www.youtube.com/embed/xyQY8a-ng6g"
                  allowfullscreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
      <br /> <br />
      <section id="gallery">
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-3">
              <h4>
                <b>
                  <center>Relaxing song</center>
                </b>
              </h4>
              <div class="ratio ratio-16x9">
                <iframe
                  class="embed-responsive-item"
                  src="https://www.youtube.com/embed/m2attzCq4CY"
                  allowfullscreen
                ></iframe>
              </div>
            </div>
            <div class="col-sm-3">
              <h4>
                <b>
                  <center>Funny Cartoon</center>
                </b>
              </h4>
              <div class="ratio ratio-16x9">
                <iframe
                  class="embed-responsive-item"
                  src="https://www.youtube.com/embed/Or-XHvRZFq0"
                  allowfullscreen
                ></iframe>
              </div>
            </div>
            <div class="col-sm-3">
              <h4>
                <b>
                  <center>How digestive system works</center>
                </b>
              </h4>
              <div class="ratio ratio-16x9">
                <iframe
                  class="embed-responsive-item"
                  src="https://www.youtube.com/embed/VwrsL-lCZYo"
                  allowfullscreen
                ></iframe>
              </div>
            </div>
            <div class="col-sm-3">
              <h4>
                <b>
                  <center>Heart 101</center>
                </b>
              </h4>
              <div class="ratio ratio-16x9">
                <iframe
                  class="embed-responsive-item"
                  src="https://www.youtube.com/embed/GMBSU-2GK3E"
                  allowfullscreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="buttonBack">
        <Button onClick={onBack} variant="primary" type="submit">
          Back
        </Button>
      </div>
    </div>
  );
}
