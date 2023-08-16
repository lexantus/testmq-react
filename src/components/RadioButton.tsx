import { ComponentProps } from "react";

type RadioButtonProps = Omit<ComponentProps<"input">, "type"> & {
  label: string;
};

function RadioButton(props: RadioButtonProps) {
  return (
    <div className="radio-button">
      <input {...props} type="radio" />
      <label htmlFor={props.id}>{props.label}</label>
    </div>
  );
}

export default RadioButton;
