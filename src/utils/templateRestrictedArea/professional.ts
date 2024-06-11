import { DPI } from "../constants";

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

export const addAreaToProfessionalLetters = (store: Store, barcodeSrc: string): void => {
    const page = store.pages[0];
    const position = [0.6, 0.84];
    const position1 = [0.63, 1.71];

    const elements: Element[] = [
        {
            id: 'figure-2',
            type: 'figure',
            name: '',
            opacity: 1,
            visible: true,
            selectable: false,
            removable: false,
            alwaysOnTop: true,
            showInExport: true,
            x: 0.63 * DPI,
            y: 0.5 * DPI,
            width: 3.25 * DPI,
            height: 0.875 * DPI,
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
            contentEditable: false,
            styleEditable: false,
            subType: 'rect',
            fill: 'white',
            dash: [],
            strokeWidth: 0,
            stroke: '#0c0c0c',
            cornerRadius: 0,
        },
        {
            id: 'figure-3',
            type: 'figure',
            name: '',
            opacity: 1,
            visible: true,
            selectable: false,
            removable: false,
            alwaysOnTop: true,
            showInExport: true,
            x: 0.63 * DPI,
            y: 1.71 * DPI,
            width: 4 * DPI,
            height: 1 * DPI,
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
            contentEditable: false,
            styleEditable: false,
            subType: 'rect',
            fill: 'white',
            dash: [],
            strokeWidth: 0,
            stroke: '#0c0c0c',
            cornerRadius: 0,
        },
        {
            id: 'return-address',
            type: 'text',
            name: '',
            opacity: 1,
            visible: true,
            selectable: false,
            removable: false,
            alwaysOnTop: true,
            showInExport: true,
            x: position[0] * DPI + 10,
            y: position[1] * DPI - 10,
            width: 200,
            height: 18,
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
            contentEditable: false,
            styleEditable: false,
            text: 'YOUR RETURN ADDRESS \nWILL AUTOMATICALLY \nBE PRINTED IN THIS \nPOSITION',
            placeholder: '',
            fontSize: 12,
            fontFamily: 'Roboto',
            fontStyle: 'normal',
            fontWeight: 'normal',
            textDecoration: '',
            fill: 'black',
            align: 'start',
            verticalAlign: 'top',
            strokeWidth: 0,
            stroke: 'black',
            lineHeight: 1.2,
            letterSpacing: 0,
            backgroundEnabled: false,
            backgroundColor: '#7ED321',
            backgroundOpacity: 1,
            backgroundCornerRadius: 0.5,
            backgroundPadding: 0.5,
        },
        {
            id: 'barcode',
            type: 'image',
            name: '',
            opacity: 1,
            visible: true,
            selectable: false,
            removable: false,
            alwaysOnTop: true,
            showInExport: true,
            x: position1[0] * DPI + 10,
            y: position1[1] * DPI + 70,
            width: 215,
            height: 12,
            rotation: 0,
            animations: [],
            blurEnabled: false,
            brightnessEnabled: false,
            brightness: 0,
            sepiaEnabled: false,
            grayscaleEnabled: false,
            shadowEnabled: false,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowOpacity: 1,
            draggable: false,
            resizable: false,
            contentEditable: false,
            styleEditable: false,
            src: barcodeSrc,
            cropX: 0,
            cropY: 0,
            cropWidth: 1,
            cropHeight: 1,
            cornerRadius: 0,
            flipX: false,
            flipY: false,
            clipSrc: '',
            borderSize: 0,
            keepRatio: false,
        },
        {
            id: 'recipient-address',
            type: 'text',
            name: '',
            opacity: 1,
            visible: true,
            selectable: false,
            removable: false,
            alwaysOnTop: true,
            showInExport: true,
            x: position1[0] * DPI + 10,
            y: position1[1] * DPI + 10,
            width: 165,
            height: 21,
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
            contentEditable: false,
            styleEditable: false,
            text: 'RECIPIENT ADDRESS \nWILL AUTOMATICALLY \nBE PRINTED IN THIS \nPOSITION',
            placeholder: '',
            fontSize: 12,
            fontFamily: 'Roboto',
            fontStyle: 'normal',
            fontWeight: 'normal',
            textDecoration: '',
            fill: 'black',
            align: 'start',
            verticalAlign: 'top',
            strokeWidth: 0,
            stroke: 'black',
            lineHeight: 1.2,
            letterSpacing: 0,
            backgroundEnabled: false,
            backgroundColor: '#7ED321',
            backgroundOpacity: 1,
            backgroundCornerRadius: 0.5,
            backgroundPadding: 0.5,
        },
        {
            id: 'sequence',
            type: 'text',
            name: '',
            opacity: 1,
            visible: true,
            selectable: false,
            removable: false,
            alwaysOnTop: true,
            showInExport: true,
            x: position1[0] * DPI + 280,
            y: position1[1] * DPI + 64,
            width: 111,
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
            contentEditable: false,
            styleEditable: false,
            text: `Sequence`,
            placeholder: '',
            fontSize: 8,
            fontFamily: 'Roboto',
            fontStyle: 'normal',
            fontWeight: 'normal',
            textDecoration: '',
            fill: 'black',
            align: 'center',
            verticalAlign: 'top',
            strokeWidth: 0,
            stroke: 'black',
            lineHeight: 1.2,
            letterSpacing: 0,
            backgroundEnabled: false,
            backgroundColor: '#7ED321',
            backgroundOpacity: 1,
            backgroundCornerRadius: 0.5,
            backgroundPadding: 0.5,
        },
        {
            id: 'contId',
            type: 'text',
            name: '',
            opacity: 1,
            visible: true,
            selectable: false,
            removable: false,
            alwaysOnTop: true,
            showInExport: true,
            x: position1[0] * DPI + 280,
            y: position1[1] * DPI + 74,
            width: 111,
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
            contentEditable: false,
            styleEditable: false,
            text: `Cont ID`,
            placeholder: '',
            fontSize: 8,
            fontFamily: 'Roboto',
            fontStyle: 'normal',
            fontWeight: 'normal',
            textDecoration: '',
            fill: 'black',
            align: 'center',
            verticalAlign: 'top',
            strokeWidth: 0,
            stroke: 'black',
            lineHeight: 1.2,
            letterSpacing: 0,
            backgroundEnabled: false,
            backgroundColor: '#7ED321',
            backgroundOpacity: 1,
            backgroundCornerRadius: 0.5,
            backgroundPadding: 0.5,
        }
    ];

    elements.forEach(element => page.addElement(element));
    store.history.clear();
};
