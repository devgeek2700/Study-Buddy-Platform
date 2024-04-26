import React from 'react'
import strisimg from '../Images/strisimg.png'
import "../App.css"

function Stories() {
  return (
    <div>
      <section id="success-story">
                <h1 class="sec-heading">Our Success Stories</h1>

                <div class="slider">
                    <div class="col-6 slide-text">
                        <div>
                            <h2>World Travel Protection</h2>
                            <p>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.
                            </p>
                            <a href="" class="brand-btn">Contact Us</a>
                        </div>
                    </div>
                    <div class="col-6 slide-img">
                        <img src={strisimg} alt="World Travel App Development" title="World Travel Protection" />
                    </div>
                </div>
            </section>
    </div>
  )
}

export default Stories
