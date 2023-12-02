import { getConvertDiscount } from '../../../utils/customFunctions'

export const handleDecrementPrice = (
    selectedOptions,
    product,
    totalPrice,
    quantity,
    setTotalPrice,
    varPrice,
    setVarPrice,
    setQuantity
) => {
    // let totalValueFromSelectedVariations = 0
    // if (selectedOptions.length > 0) {
    //     selectedOptions.forEach((item) => {
    //         totalValueFromSelectedVariations += Number.parseInt(
    //             item.optionPrice
    //         )
    //     })
    // }
    // const regularConvertedPrice = getConvertDiscount(
    //     product.discount,
    //     product.discount_type,
    //     product.price,
    //     product.restaurant_discount
    // )
    // const newVarPrice =
    //     totalPrice -
    //     (totalValueFromSelectedVariations + regularConvertedPrice) *
    //         (quantity - 1)
    // setTotalPrice(
    //     (prevPrice) =>
    //         prevPrice -
    //         (varPrice
    //             ? newVarPrice
    //             : getConvertDiscount(
    //                   product.discount,
    //                   product.discount_type,
    //                   product.price,
    //                   product.restaurant_discount
    //               ))
    // )
    // setVarPrice(newVarPrice)
    // setQuantity((prevQty) => prevQty - 1)
    setTotalPrice(
        (prevPrice) =>
            prevPrice -
            (varPrice
                ? varPrice
                : getConvertDiscount(
                      product.discount,
                      product.discount_type,
                      product.price,
                      product.restaurant_discount
                  ))
    )

    setQuantity((prevQty) => prevQty - 1)
}
