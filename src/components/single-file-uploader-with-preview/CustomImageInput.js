import React from 'react';

// eslint-disable-next-line react/display-name
const CustomImageInput = React.forwardRef((props,ref)=>{
    const {imageChangeHandler} = props
    return (
        <input
            ref={ref}
            id="file"
            name="file"
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => {
                imageChangeHandler?.(e);
            }}
        />
    );
});

export default CustomImageInput;