import React, {useState} from 'react';
import {CustomStackFullWidth} from "../../../styled-components/CustomStyles.style";
import CutleryIcon from "./CutleryIcon";
import {Stack} from "@mui/system";
import {Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import {CustomSwitch} from "../../header/NavBar.style";

const Cutlery = props => {
    const {isChecked, handleChange} = props
    const [checked, setChecked] = useState(isChecked)
    const {t} = useTranslation()
    const handleChangeInner = (event)=>{
        setChecked(event.target.checked)
        handleChange?.( event.target.checked)
    }
    return (
        <CustomStackFullWidth direction='row' alignItems='center' justifyContent='space-between' p='5px' spacing={.5}>
            <CustomStackFullWidth direction='row' alignItems='center' spacing={2}>
                <CutleryIcon/>
                <Stack alignItems='flex-start' spacing={.5}>
                    <Typography color='primary' fontWeight='bold'>{t('Add Cutlery')}</Typography>
                    <Typography color='text.secondary'
                                variant='body2'>{t('Dont have a cutlery? Restaurant will provide you.')}</Typography>
                </Stack>
            </CustomStackFullWidth>
            <CustomSwitch
                checked={checked}
                onChange={handleChangeInner}
                noimage='true'
            />
        </CustomStackFullWidth>
    );
};

Cutlery.propTypes = {};

export default Cutlery;