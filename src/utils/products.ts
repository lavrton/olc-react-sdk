interface Size {
    id: string;
    size: string;
}

interface Product {
    id: string;
    productType: string;
    size: Size[];
    windowed?: boolean; // optional property
}


export const Products: Product[] = [
    {
        id: "9",
        productType: "Bi-Fold Self-Mailers",
        size: [
            {
                id: "9",
                size: "6x18"
            }
        ]
    },
    {
        id: "5",
        productType: "Personal Letters",
        size: [
            {
                id: "5",
                size: "8.5x5.5"
            }
        ]
    },
    {
        id: "13",
        productType: "Postcards",
        size: [
            {
                id: "13",
                size: "4x6"
            },
            {
                id: "15",
                size: "6x11"
            },
            {
                id: "14",
                size: "6x9"
            }
        ]
    },
    {
        id: "16",
        productType: "Real Penned Letter",
        size: [
            {
                id: "16",
                size: "8.5x5.5"
            }
        ]
    },
    {
        id: "11",
        productType: "Tri-Fold Self-Mailers",
        size: [
            {
                id: "11",
                size: "12x9"
            }
        ]
    },
    {
        id: "2",
        productType: "Professional Letters",
        size: [
            {
                id: "2",
                size: "11x8.5"
            }
        ],
        windowed: true
    },
    {
        id: "4",
        productType: "Professional Letters",
        size: [
            {
                id: "4",
                size: "11x8.5"
            }
        ],
        windowed: false
    }
];