declare module 'react-simple-typewriter' {
    export const Typewriter: React.FC<{
      words: string[];
      loop?: boolean | number;
      cursor?: boolean;
      cursorStyle?: string;
      typeSpeed?: number;
      deleteSpeed?: number;
      delaySpeed?: number;
    }>;
  
    export const useTypewriter: (options: {
      words: string[];
      loop?: boolean | number;
      typeSpeed?: number;
      deleteSpeed?: number;
      delaySpeed?: number;
    }) => { text: string; count: number; cursor: string };
  }
  