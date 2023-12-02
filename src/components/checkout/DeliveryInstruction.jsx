import React, { useState } from 'react'
import { CustomStackFullWidth } from '../../styled-components/CustomStyles.style'
import { Button, FormControl, FormControlLabel, Radio, RadioGroup, Stack, TextField, Typography, alpha, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const DeliveryInstruction = (props) => {

    const {
        setOpenModal,
        deliveryInstruction,
        setCustomerInstruction,
        customNote,
        setCustomNote,
        selectedInstruction,
        setSelectedInstruction
    } = props;

    const { t } = useTranslation();
    const theme = useTheme();
    const [error, setError] = useState(false);
    const handleRadioChange = (event) => {
        setSelectedInstruction(event.target.value);
    };
    const handleCustomNote = (e) => {
        const text = e.target.value;
        if (text.length < 266) {
            setCustomNote(text)
            setError(false)
        } else {
            setError(true)
        }
    }
    const applyInstruction = () => {
        if (selectedInstruction) {
            if (customNote !== "") {
                setCustomerInstruction(`${selectedInstruction} ( ${customNote} )`);
            } else {
                setCustomerInstruction(`${selectedInstruction}`);
            }
        }
        else {
            setCustomerInstruction(`${customNote}`);
        }
        setOpenModal(false)
    }

    return (
        <CustomStackFullWidth
            justifyContent="center"
            padding={{ xs: "30px 20px", sm: "45px 60px" }}
            gap="10px"
            minWidth={{ xs: "345px", md: "450px" }}
        >
            {deliveryInstruction?.data.length > 0 ?
                <>
                    <Typography fontSize={{ xs: "14px", sm: "16px", md: "18px" }} fontWeight={600} variant="h6">{t("Choose Delivery Instructions")}</Typography>
                    <Stack padding="0 10px">
                        <FormControl component="fieldset">
                            <RadioGroup value={selectedInstruction} onChange={handleRadioChange}>
                                {deliveryInstruction?.data.map((instruction) => (
                                    <Stack padding="5px 0px" key={instruction.id}>
                                        <FormControlLabel
                                            value={instruction.instruction}
                                            control={<Radio />}
                                            label={instruction.instruction}
                                            sx={{
                                                border: `1px solid ${alpha(theme.palette.neutral[500], 0.3)}`,
                                                borderRadius: "5px",
                                                paddingBlock: "5px",
                                                marginRight: "-11px"
                                            }}
                                        />
                                    </Stack>
                                ))}
                            </RadioGroup>
                        </FormControl>
                    </Stack>
                </>
                : null

            }
            <Typography
                fontSize={{ xs: "14px", sm: "16px", md: "18px" }}
                fontWeight={600} variant="h6"
            >
                {deliveryInstruction?.data?.length > 0 ? t("Or Add Custom Note") : t("Add Custom Note")}
            </Typography>
            <TextField
                rows={4}
                multiline
                value={customNote}
                fullWidth
                placeholder='Please maintain the hygine'
                id="custom_note"
                name="custom_note"
                onChange={handleCustomNote}
            />
            {error &&
                <Stack flexDirection="row" alignItems="center" gap="5px">
                    <ErrorOutlineIcon fontSize='10px' color="error" />
                    <Typography color={theme.palette.error.main}>{t("Note must not be grater than 191 characters")}</Typography>
                </Stack>
            }
            <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={applyInstruction}
            >
                {t("Apply")}
            </Button>
        </CustomStackFullWidth>
    )
}

export default DeliveryInstruction