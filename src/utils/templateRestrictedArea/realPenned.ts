// Define the type for the element being added
interface Element {
  id: string;
  type: string;
  name: string;
  opacity: number;
  visible: boolean;
  selectable: boolean;
  removable: boolean;
  alwaysOnTop: boolean;
  showInExport: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  animations?: any[];
  blurEnabled?: boolean;
  blurRadius?: number;
  brightnessEnabled?: boolean;
  brightness?: number;
  sepiaEnabled?: boolean;
  grayscaleEnabled?: boolean;
  shadowEnabled?: boolean;
  shadowBlur?: number;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
  shadowColor?: string;
  shadowOpacity?: number;
  draggable?: boolean;
  resizable?: boolean;
  contentEditable: boolean;
  styleEditable: boolean;
  subType?: string;
  fill?: string;
  dash?: any[];
  strokeWidth?: number;
  stroke?: string;
  cornerRadius?: number;
  text?: string;
  placeholder?: string;
  fontSize?: number;
  fontFamily?: string;
  fontStyle?: string;
  fontWeight?: string;
  textDecoration?: string;
  align?: string;
  verticalAlign?: string;
  lineHeight?: number;
  letterSpacing?: number;
  backgroundEnabled?: boolean;
  backgroundColor?: string;
  backgroundOpacity?: number;
  backgroundCornerRadius?: number;
  backgroundPadding?: number;
  src?: string;
  cropX?: number;
  cropY?: number;
  cropWidth?: number;
  cropHeight?: number;
  flipX?: boolean;
  flipY?: boolean;
  clipSrc?: string;
  borderSize?: number;
  keepRatio?: boolean;
}

// Define the type for the page
interface Page {
  addElement: (element: Element) => void;
}

// Define the type for the store
interface Store {
  width: number;
  height: number;
  pages: Page[];
  history: {
    clear: () => void;
  };
}

export const addElementsforRealPennedLetters = (store: Store): void => {
  const page = store.pages[0];

  const elements: Element[] = [
    {
      id: 'header',
      type: 'text',
      name: '',
      opacity: 1,
      visible: true,
      selectable: true,
      removable: false,
      alwaysOnTop: true,
      showInExport: true,
      x: 25,
      y: 130,
      width: 480,
      height: 40,
      rotation: 0,
      animations: [],
      blurEnabled: false,
      blurRadius: 10,
      brightnessEnabled: false,
      brightness: 0,
      sepiaEnabled: false,
      grayscaleEnabled: false,
      shadowEnabled: false,
      shadowBlur: 5,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      shadowColor: 'black',
      shadowOpacity: 1,
      draggable: false,
      resizable: false,
      contentEditable: true,
      styleEditable: false,
      text: "Hi ((C.FIRST_NAME)),",
      fontSize: 20,
      fontFamily: 'lexi Regular',
      fontStyle: 'normal',
      fontWeight: 'normal',
      textDecoration: '',
      fill: 'blue',
      align: 'start',
      verticalAlign: 'top',
      strokeWidth: 0,
      stroke: 'black',
      lineHeight: 1.75,
      letterSpacing: 0,
      backgroundEnabled: false,
      backgroundColor: '#7ED321',
      backgroundOpacity: 1,
      backgroundCornerRadius: 0.5,
      backgroundPadding: 0.5,
    },
    {
      id: 'content',
      type: 'text',
      name: '',
      opacity: 1,
      visible: true,
      selectable: true,
      removable: false,
      alwaysOnTop: true,
      showInExport: true,
      x: 25.499999994998234,
      y: 220.60449354986338,
      width: 477,
      height: 400,
      rotation: 0,
      animations: [],
      blurEnabled: false,
      blurRadius: 10,
      brightnessEnabled: false,
      brightness: 0,
      sepiaEnabled: false,
      grayscaleEnabled: false,
      shadowEnabled: false,
      shadowBlur: 5,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      shadowColor: 'black',
      shadowOpacity: 1,
      draggable: false,
      resizable: false,
      contentEditable: true,
      styleEditable: false,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In recent projects, we've focused heavily on OLC to enhance digital engagement. Real Penned Letters, is a unique initiative.\n\nAs we continue to develop OLC platforms, we remain committed to integrating elements like Real Penned Letters to enhance digital and personal communication. \n",
      fontSize: 20,
      fontFamily: 'lexi Regular',
      fontStyle: 'normal',
      fontWeight: 'normal',
      textDecoration: '',
      fill: 'blue',
      align: 'start',
      verticalAlign: 'top',
      strokeWidth: 0,
      stroke: 'black',
      lineHeight: 1.75,
      letterSpacing: 0,
      backgroundEnabled: false,
      backgroundColor: '#7ED321',
      backgroundOpacity: 1,
      backgroundCornerRadius: 0.5,
      backgroundPadding: 0.5,
    },
    {
      id: 'footer',
      type: 'text',
      name: '',
      opacity: 1,
      visible: true,
      selectable: true,
      removable: false,
      alwaysOnTop: true,
      showInExport: true,
      x: 165.49999999499846,
      y: 575.7346179851188,
      width: 335,
      height: 75,
      rotation: 0,
      animations: [],
      blurEnabled: false,
      blurRadius: 10,
      brightnessEnabled: false,
      brightness: 0,
      sepiaEnabled: false,
      grayscaleEnabled: false,
      shadowEnabled: false,
      shadowBlur: 5,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      shadowColor: 'black',
      shadowOpacity: 1,
      draggable: false,
      resizable: false,
      contentEditable: true,
      styleEditable: false,
      text: "Regards,\nYour Name",
      fontSize: 20,
      fontFamily: 'lexi Regular',
      fontStyle: 'normal',
      fontWeight: 'normal',
      textDecoration: '',
      fill: 'blue',
      align: 'start',
      verticalAlign: 'top',
      strokeWidth: 0,
      stroke: 'black',
      lineHeight: 1.75,
      letterSpacing: 0,
      backgroundEnabled: false,
      backgroundColor: '#7ED321',
      backgroundOpacity: 1,
      backgroundCornerRadius: 0.5,
      backgroundPadding: 0.5,
    },
  ]

  elements.forEach(element => page.addElement(element));
  store.history.clear();
}
