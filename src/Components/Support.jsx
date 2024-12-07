import React from "react";
import "./Support.css";
import supportside from "../images/supportside.png";
function Support() {
  return (
    <div className="support-container">
      <div className="support">
        <div className="support-left-panel">
          <img src={supportside} alt="Support" className="support-image" />
        </div>
        <div className="support-right-panel">
          <h2 className="text-white">Contact Support</h2>
          <form className="support-form">
            <label htmlFor="support-email">Email</label>
            <input
              type="email"
              id="support-email"
              name="email"
              placeholder="Enter your email"
            />
            <label htmlFor="support-message">Message</label>
            <textarea
              id="support-message"
              name="message"
              placeholder="Enter your message"
            ></textarea>
            <button type="submit" className="support-btn">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Support;
