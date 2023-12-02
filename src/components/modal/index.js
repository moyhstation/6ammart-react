import { Dialog } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
const CustomModal = (props) => {
	const { openModal, handleClose, disableAutoFocus, children } = props;
	const handleCloseModal = (event, reason) => {
		if (reason && reason == "backdropClick") {
			if (disableAutoFocus) {
				return;
			} else {
				handleClose?.();
			}
		} else {
			handleClose?.();
		}
	};

	return (
		<Dialog open={openModal} onClose={handleCloseModal}>
			{children}
		</Dialog>
	);
};

CustomModal.propTypes = {
	openModal: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
};

export default CustomModal;
