import s from "./styles.module.css";

type Props = { onClick: VoidFunction; text: string };

export const Button = ({ onClick, text }: Props) => (
  <button onClick={onClick} className={s.button}>
    {text}
  </button>
);
