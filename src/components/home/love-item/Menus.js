import FilterListIcon from "@mui/icons-material/FilterList";
import {
	Button,
	Menu,
	MenuItem,
	styled,
	Tab,
	Tabs,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import { Stack } from "@mui/system";
import { t } from "i18next";
import React from "react";
const CustomButtonWrapper = styled(Button)(({ theme }) => ({
	height: "30px",
	minWidth: "0px",
	width: "30px",
	border: `1px solid ${theme.palette.primary.main}`,
}));
const Menus = (props) => {
	const { selectedMenuIndex, setSelectedMenuIndex, menus } = props;
	const theme = useTheme();
	const isSmall = useMediaQuery(theme.breakpoints.down("md"));
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = (index) => {
		setAnchorEl(null);
		setSelectedMenuIndex(index);
	};
	const SmallScreen = () => (
		<Stack>
			<CustomButtonWrapper onClick={handleClick} variant="outlined">
				<FilterListIcon fontSize="small" />
			</CustomButtonWrapper>
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					"aria-labelledby": "basic-button",
				}}
			>
				{menus.map((item, index) => {
					return (
						<MenuItem
							key={index}
							onClick={() => handleClose(index)}
							selected={index === selectedMenuIndex}
						>
							{t(item)}
						</MenuItem>
					);
				})}
			</Menu>
		</Stack>
	);
	const LargeScreen = () => (
		<Tabs variant="scrollable" scrollButtons="auto">
			{menus.map((item, index) => {
				return (
					<Tab
						sx={{
							cursor: "pointer",
							ml: index == 0 ? 0 : 3,
							color:
								selectedMenuIndex === index
									? "primary.main"
									: "inherit",
							transition: "all ease 0.5s",
							"&:hover": {
								color: "primary.main",
							},
						}}
						key={index}
						onClick={() => setSelectedMenuIndex(index)}
						label={t(item)}
						value={t(item)}
					/>
				);
			})}
		</Tabs>
	);
	return <div>{isSmall ? SmallScreen() : LargeScreen()}</div>;
};

Menus.propTypes = {};

export default Menus;
