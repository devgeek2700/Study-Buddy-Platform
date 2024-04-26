import React from 'react'
import highImg from '../Images/highImg.png'
import "../App.css"

function Higlight() {
  return (
    <div>
      <section id="highlights">
                <h1 class="sec-heading">Company Highlights</h1>

                <div class="slider">
                    <div class="col-6 slide-text">
                        <div>
                            <h2>Team iTechnology at IBM, Americas 2019, Los Angeles</h2>
                            <p>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.
                            </p>
                            <a href="" class="brand-btn">See More</a>
                        </div>
                    </div>
                    <div class="col-6 slide-img">
                        <img src={highImg} alt="Team Work in Los Angeles" title="Company Team Work" />
                    </div>
                </div>
            </section>
    </div>
  )
}

export default Higlight
