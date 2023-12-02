export const handleVariationChoices = (
    e,
    option,
    choiceIndex,
    isRequired,
    choiceType,
    selectedOptions,
    setSelectedOptions,
    setTotalPrice,
    setVarPrice,
    quantity
) => {
    //choice type 'on' === 'required, here this logic is for optional selections
    if (isRequired === 'off') {
        //check based on choice type single select or multiselect
        if (choiceType === 'single') {
            if (e.target.checked) {
                if (selectedOptions.length > 0) {
                    const isExist = selectedOptions.find(
                        (item) => item.label === option.label
                    )
                    if (isExist) {
                        const newSelectedOptions = selectedOptions.filter(
                            (sOption) => sOption.label !== isExist.label
                        )
                        setSelectedOptions(newSelectedOptions)
                        setTotalPrice(
                            (prevState) =>
                                prevState -
                                Number.parseInt(option.optionPrice) * quantity
                        )
                        setVarPrice(
                            (prevPrice) =>
                                prevPrice -
                                Number.parseInt(option.optionPrice) * quantity
                        )
                    } else {

                        const isItemExistFromSameVariation =
                            selectedOptions.find(
                                (item) => item.choiceIndex === choiceIndex
                            )
                        if (isItemExistFromSameVariation) {
                            const newObjs = selectedOptions.map((item) => {
                                if (item.choiceIndex === choiceIndex) {
                                    return {
                                        choiceIndex: choiceIndex,
                                        ...option,
                                        isSelected: true,
                                        type: 'optional',
                                    }
                                } else {
                                    return item
                                }
                            })
                            setSelectedOptions(newObjs)
                            //changing total price by removing previous ones price and adding new selection options price
                            setTotalPrice(
                                (prevState) =>
                                    prevState -
                                    Number.parseInt(
                                        isItemExistFromSameVariation.optionPrice
                                    ) *
                                        quantity +
                                    Number.parseInt(option.optionPrice) *
                                        quantity
                            )
                            setVarPrice(
                                (prevPrice) =>
                                    prevPrice -
                                    Number.parseInt(
                                        isItemExistFromSameVariation.optionPrice
                                    ) *
                                        quantity +
                                    Number.parseInt(option.optionPrice) *
                                        quantity
                            )
                        } else {
                            const newObj = {
                                choiceIndex: choiceIndex,
                                ...option,
                                isSelected: true,
                                type: 'optional',
                            }
                            selectedOptions.push(newObj)
                            setSelectedOptions(selectedOptions)
                            setTotalPrice(
                                (prevState) =>
                                    prevState +
                                    Number.parseInt(option.optionPrice) *
                                        quantity
                            )
                            setVarPrice(
                                (prevPrice) =>
                                    prevPrice +
                                    Number.parseInt(option.optionPrice) *
                                        quantity
                            )
                        }
                    }
                } else {

                    const newObj = {
                        choiceIndex: choiceIndex,
                        ...option,
                        isSelected: true,
                        type: 'optional',
                    }
                    selectedOptions.push(newObj)
                    setSelectedOptions(selectedOptions)
                    setTotalPrice(
                        (prevState) =>
                            prevState +
                            Number.parseInt(option.optionPrice) * quantity
                    )
                    setVarPrice(
                        (prevPrice) =>
                            prevPrice +
                            Number.parseInt(option.optionPrice) * quantity
                    )
                }
            } else {
                const filtered = selectedOptions.filter(
                    (item) => item.label !== option.label
                )
                setSelectedOptions(filtered)
                setTotalPrice(
                    (prevState) =>
                        prevState -
                        Number.parseInt(option.optionPrice) * quantity
                )
                setVarPrice(
                    (prevPrice) =>
                        prevPrice -
                        Number.parseInt(option.optionPrice) * quantity
                )
            }
        } else {
            //for multiple optional variation selection
            if (e.target.checked) {
                selectedOptions.push({
                    choiceIndex: choiceIndex,
                    ...option,
                    isSelected: true,
                    type: 'optional',
                })
                setTotalPrice(
                    (prevState) =>
                        prevState +
                        Number.parseInt(option.optionPrice) * quantity
                )
                setVarPrice(
                    (prevPrice) =>
                        prevPrice +
                        Number.parseInt(option.optionPrice) * quantity
                )
            } else {
                const filtered = selectedOptions.filter(
                    (item) => item.label !== option.label
                )
                setSelectedOptions(filtered)
                setTotalPrice(
                    (prevState) =>
                        prevState -
                        Number.parseInt(option.optionPrice) * quantity
                )
                setVarPrice(
                    (prevPrice) =>
                        prevPrice -
                        Number.parseInt(option.optionPrice) * quantity
                )
            }
        }

        //choice type= on, required handler
    } else {
        if (e.target.checked) {
            setSelectedOptions([
                ...selectedOptions,
                {
                    choiceIndex: choiceIndex,
                    ...option,
                    isSelected: true,
                },
            ])

            setTotalPrice(
                (prevState) =>
                    prevState + Number.parseInt(option.optionPrice) * quantity
            )
            setVarPrice(
                (prevPrice) =>
                    prevPrice + Number.parseInt(option.optionPrice) * quantity
            )
        } else {
            const filtered = selectedOptions.filter(
                (item) => item.label !== option.label
            )
            setSelectedOptions(filtered)

            setTotalPrice(
                (prevState) =>
                    prevState - Number.parseInt(option.optionPrice) * quantity
            )
            setVarPrice(
                (prevPrice) =>
                    prevPrice - Number.parseInt(option.optionPrice) * quantity
            )
        }
    }
}
