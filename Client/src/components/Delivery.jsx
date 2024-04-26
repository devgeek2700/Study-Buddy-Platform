import React from "react";
import "../App.css";
import abtimg from "../Images/abtus.png"

function Delivery() {
  return (
    <div>
      <section id="delivery">
        <h1 class="sec-heading">Know Us More...</h1>
        <div class="col-5 delivery-img">
          <img
            src={abtimg}
            alt="Productivity Delivering Experience"
            title="Delivering Experience Since 2009"
          />
        </div>
        <div class="col-7">
          <h2>Empowering Minds, Transforming Education</h2>
          <p>
            At Learnify, we're dedicated to revolutionizing
            education by providing accessible, interactive, and personalized
            learning experiences for students of all ages and backgrounds. Our
            platform is designed to empower learners, foster collaboration, and
            cultivate a lifelong passion for knowledge.
          </p>
          <div class="btn-footer">
            <a href="" class="brand-btn">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Delivery;
