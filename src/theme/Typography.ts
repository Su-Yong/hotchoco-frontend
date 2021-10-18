export type FontWeight =
  | 100
  | 200
  | 300
  | 400
  | 500
  | 600
  | 700
  | 800
  | 900
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
  | 'Thin'
  | 'Ultra Light'
  | 'Light'
  | 'Normal'
  | 'Medium'
  | 'Semi Bold'
  | 'Bold'
  | 'Bolder'
  | 'Black';

interface Typography {
  font: string;
  weight: FontWeight;
  size: number | string;
  height?: number | string;
}

export default Typography;
