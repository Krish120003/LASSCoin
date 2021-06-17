import { useState } from "react";

export default function TextColumnGroup(props) {
  return (
    <div>
      <h4>L$ {props.value ? props.value.toFixed(6) : ""}</h4>
      <p>{props.title}</p>
    </div>
  );
}
