import { getConvertDiscount } from '../../../utils/customFunctions'

export const handleIncrementPrice = (
    setTotalPrice,
    varPrice,
    product,
    setQuantity
) => {
    setTotalPrice(
        (prevPrice) =>
            prevPrice +
            (varPrice
                ? varPrice
                : getConvertDiscount(
                      product.discount,
                      product.discount_type,
                      product.price,
                      product.restaurant_discount
                  ))
    )

    setQuantity((prevQty) => prevQty + 1)
    // getConvertDiscount(
    //     product.discount,
    //     product.discount_type,
    //     varPrice,
    //     product.restaurant_discount
    // )
}
