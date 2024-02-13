import './Reaction.css';

interface ReactionProps {
  id: string;
  emoji: string;
  position: { x: number; y: number };
}

const Reaction = ({ emoji, id, position }: ReactionProps) => {
  const style: React.CSSProperties = {
    left: `${position.x}%`,
    top: `${position.y}%`,
  };

  return (
    <div id={id} className="reaction" style={style}>
      <span className="emoji">{emoji}</span>
    </div>
  );
};

export default Reaction;
