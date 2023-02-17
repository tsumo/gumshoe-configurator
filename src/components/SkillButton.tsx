type Props = { onClick: VoidFunction; text: string };

export const SkillButton = ({ onClick, text }: Props) => (
  <button onClick={onClick}>{text}</button>
);
