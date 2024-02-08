import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CustomPopover from "./CustomPopover";
import { CustomButton } from "./index";

const CustomButtonComponent = props => {
    const { landingPageData, title, t, urls } = props
    const customButtonRef = useRef(null);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <>
            <CustomButton
                ref={customButtonRef}
                variant="contained"
                onClick={(e) => handleClick(e)}
            >
                {title}
                {open === true ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </CustomButton>
            {
                open &&
                <CustomPopover
                    t={t}
                    urls={urls}
                    openPopover={open}
                    anchorEl={anchorEl}
                    handleClose={() => setAnchorEl(null)}
                    landingPageData={landingPageData}
                    width={`${customButtonRef?.current?.offsetWidth}px`}
                />
            }
        </>
    );
};

CustomButtonComponent.propTypes = {

};

export default CustomButtonComponent;