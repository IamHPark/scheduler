import React from "react";

const Status = (props) => {
  return(
    <main className="appointment__card appointment__card--status">
      <img src="images/status.png" alt="Loading" className="appointment__status-image"/>
      <h1 className="text--semi-bold">{props.message}</h1>
    </main>
  )
}

export default Status;