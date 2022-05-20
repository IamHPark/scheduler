import { action } from "@storybook/addon-actions";
import Button from "components/Button";
import React from "react";

const Confirm = (props) => {
  return(
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">{props.message}</h1>
      <section className="appointment__actions">
        <Button danger onClick={action("onCancel")}>Cancel</Button>
        <Button danger onClick={action("onConfirm")}>Confirm</Button>
      </section>
    </main>
  )
};

export default Confirm;