import { useState } from 'react';

import Reaction from './Reaction';
import './ReactionApp.css';

interface ReactionData {
  emoji: string;
  position: { x: number; y: number };
}

const emojis = ['😊', '😂', '😍', '😎', '🥳', '😜'];

const ReactionApp: React.FC = () => {
  const [reactions, setReactions] = useState<ReactionData[]>([]);

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    const newReaction: ReactionData = {
      emoji: randomEmoji,
      position: {
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      },
    };
    setReactions([...reactions, newReaction]);
  };

  return (
    <div className="reaction-app" onContextMenu={handleRightClick}>
      {reactions.map((reaction, index) => (
        <Reaction
          key={`reaction-${reaction.emoji + index}`}
          emoji={reaction.emoji}
          position={reaction.position}
          id={`reaction-${index}`}
        />
      ))}
    </div>
  );
};

export default ReactionApp;
