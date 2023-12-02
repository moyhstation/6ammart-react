import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CustomPopover from "./CustomPopover";
import {CustomButton} from "./index";

const CustomButtonComponent = props => {
    const { landingPageData, title, t , urls} = props
    const [openPopover, setOpenPopover] = useState({
        open:false,
        anchorEl:null
    })


    const handleButtonClick = (e) => {
        setOpenPopover({
            open: true,
            anchorEl: e.currentTarget
        })
    }
    const handlePopoverClose=()=>{
        setOpenPopover({
            open: false,
            anchorEl: null
        })

    }

    return (
       <>
           <CustomButton
               variant="contained"
               onClick={(e) => handleButtonClick?.(e)}
           >
               {title}
               {openPopover?.open === true ?  <KeyboardArrowUpIcon/> :  <KeyboardArrowDownIcon/> }
           </CustomButton>
           {
               openPopover?.open &&
               <CustomPopover openPopover={openPopover} landingPageData={landingPageData} handleClose={handlePopoverClose} t={t} urls={urls}/>
           }
       </>
    );
};

CustomButtonComponent.propTypes = {

};

export default CustomButtonComponent;