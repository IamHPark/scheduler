import { action } from "@storybook/addon-actions";
import Button from "components/Button";
import React from "react";

const Confirm = (props) => {
  return(
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">Are you sure you would like</h1>
      <section className="appointment__actions">
        <Button danger onClick={() => {console.log('cancel')}}>Cancel</Button>
        <Button danger onClick={props.confirm}>Confirm</Button>
      </section>
    </main>
  )
};

export default Confirm;