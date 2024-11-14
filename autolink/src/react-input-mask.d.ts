// react-input-mask.d.ts
declare module 'react-input-mask' {
    import { Component } from 'react';
    import { TextFieldProps } from '@mui/material';
  
    export interface InputMaskProps extends Partial<TextFieldProps> {
      mask: string;
      value?: string;
      onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
      [key: string]: any;
    }
  
    export default class InputMask extends Component<InputMaskProps> {}
  }
  