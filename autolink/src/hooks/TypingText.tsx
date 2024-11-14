import React, { useEffect, useState } from 'react';

interface TypingTextProps {
  text: string;
  typingSpeed?: number;
  loopDelay?: number;
  
}

const TypingText: React.FC<TypingTextProps> = ({
  text,
  typingSpeed = 100,
  loopDelay = 2000,
  
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, typingSpeed);
      return () => clearTimeout(timeout);
    } else {
      const resetTimeout = setTimeout(() => {
        setDisplayedText('');
        setIndex(0);
      }, loopDelay);
      return () => clearTimeout(resetTimeout);
    }
  }, [index, text, typingSpeed, loopDelay]);

  return <span >{displayedText}</span>;
};

export default TypingText;
