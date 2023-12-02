export const initialState = {
    openModal: false,
    clearCartModal: false,
    modalData: [],
    isTransformed: false,
};
export const reducer = (state, action) => {
    switch (action.type) {
        case "setOpenModal":
            return {
                ...state,
                openModal: action.payload,
            };
        case "setClearCartModal":
            return {
                ...state,
                clearCartModal: action.payload,
            };

        case "setModalData":
            return {
                ...state,
                modalData: [action.payload],
            };
        case "setIsTransformed":
            return {
                ...state,
                isTransformed: action.payload,
            };
        case "incrementQuantity":
            return {
                ...state,
                modalData: [
                    {
                        ...state.modalData[0],
                        totalPrice: (state.modalData[0]?.selectedOption?.length > 0 ? state.modalData[0]?.selectedOption?.[0]?.price : state.modalData[0].price ) * (state.modalData[0].quantity + 1),
                        quantity: state.modalData[0].quantity + 1,
                    },
                ],
            };
        case "decrementQuantity":
            return {
                ...state,
                modalData: [
                    {
                        ...state.modalData[0],
                        totalPrice:
                            (state.modalData[0]?.selectedOption?.length > 0 ? state.modalData[0]?.selectedOption?.[0]?.price : state.modalData[0].price ) * (state.modalData[0].quantity - 1),
                        quantity: state.modalData[0].quantity - 1,
                    },
                ],
            };
        default:
            return state;
    }
};
export const ACTION = {
    incrementQuantity: "incrementQuantity",
    decrementQuantity: "decrementQuantity",
    setModalData: "setModalData",
    setOpenModal: "setOpenModal",
    setClearCartModal: "setClearCartModal",
    setIsTransformed: "setIsTransformed",
};
