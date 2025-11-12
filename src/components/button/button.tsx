import "./button.scss";

interface ButtonProps {
  text: string;
  onPress: () => void;
}

export function Button({ text, onPress }: ButtonProps) {
  return (
    <div className="button" onClick={onPress}>
      <div className="inner">{text}</div>
    </div>
  );
}
