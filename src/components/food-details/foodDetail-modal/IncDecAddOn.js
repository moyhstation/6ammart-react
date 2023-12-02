import React, {useEffect, useState} from "react";
import {ButtonGroup, Checkbox, FormControlLabel, Grid, IconButton,} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {CustomTypographyLabel} from "../../../styled-components/CustomTypographies.style";
import {getAmountWithSign} from "../../../helper-functions/CardHelpers";

const IncDecAddOn = ({
                         changeAddOns,
                         add_on,
                         selectedAddons,
                     }) => {

    const [addOn, setAddOn] = useState(
        {
            name: '',
            isChecked: '',
            quantity: 0
        }
    );

    useEffect(() => {
        if (selectedAddons?.length > 0) {
            const existedAddOn = selectedAddons?.find((item) => item?.id === add_on?.id && item?.store_id === add_on?.store_id)
            if (existedAddOn) {
                setAddOn({...existedAddOn})
            } else {
                setAddOn({...add_on, quantity: 0, isChecked: false, name: add_on?.name})
            }
        } else {
            setAddOn({...add_on, quantity: 0, isChecked: false, name: add_on?.name})
        }
    }, [add_on, selectedAddons]);
    const changeCheckedAddOn = (e) => {
        if (e.target.checked) {
            const changedObj = {...addOn, quantity: addOn?.quantity + 1, isChecked: true, name: addOn.name}
            setAddOn(changedObj)
            changeAddOns(changedObj)
        } else {
            const changedObj = {...addOn, quantity: addOn?.quantity - 1, isChecked: false, name: addOn.name}
            setAddOn(changedObj)
            changeAddOns(changedObj)
        }
    };

    const incrementAddOnQty = () => {
        const changedObj = {...addOn, quantity: addOn?.quantity + 1}
        setAddOn(changedObj)
        changeAddOns(changedObj)
    };
    const decrementAddOnQty = () => {
        const changedObj = {...addOn, quantity: addOn?.quantity - 1}
        setAddOn(changedObj)
        changeAddOns(changedObj)
    };

    return (
        <>
            {addOn && (
                <Grid container alignItems="center" justify="center">
                    <Grid item md={6} sm={5} xs={5}>
                        <FormControlLabel
                            key={addOn?.id}
                            control={
                                <Checkbox onChange={changeCheckedAddOn} checked={addOn?.isChecked}/>
                            }
                            label={
                                <CustomTypographyLabel>{addOn?.name}</CustomTypographyLabel>
                            }
                        />
                    </Grid>
                    <Grid item md={3} sm={3} xs={3} justifySelf="flex-end">
                        <CustomTypographyLabel>
                            {getAmountWithSign(addOn?.price)}
                        </CustomTypographyLabel>
                    </Grid>
                    <Grid item md={3} sm={4} xs={4} align="right">
                        <ButtonGroup
                            variant="contained"
                            aria-label="contained primary button group"
                            size="small"
                        >
                            <IconButton
                                disabled={!addOn?.isChecked || addOn?.quantity === 0}
                                aria-label="delete"
                                sx={{margin: "0", padding: "2px"}}
                                onClick={() => {
                                    decrementAddOnQty();
                                }}
                            >
                                <RemoveIcon/>
                            </IconButton>
                            <span
                                style={{
                                    marginTop: "2px",
                                    width: "8px",
                                    textAlign: "center",
                                }}
                            >
                {addOn?.quantity}
              </span>
                            <IconButton
                                disabled={!addOn?.isChecked}
                                aria-label="add"
                                sx={{margin: "0", padding: "2px"}}
                                onClick={() => incrementAddOnQty()}
                            >
                                <AddIcon/>
                            </IconButton>
                        </ButtonGroup>
                    </Grid>
                </Grid>
            )}
        </>
    );
};

export default IncDecAddOn;
