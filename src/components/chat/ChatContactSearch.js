/* eslint-disable react-hooks/exhaustive-deps */
import { Stack } from "@mui/material";
import React from "react";

import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import { t } from "i18next";
import { Search, StyledInputBase } from "../custom-search/CustomSearch.style";

const ChatContactSearch = ({
	searchValue,
	setSearchValue,
	handleSearch,
	isLoading,
	handleReset,
	searchSubmitHandler,
}) => {
	const onChangeHandler = (e) => {
		e.preventDefault();
		handleSearch(e.target.value);
	};
	return (
		<Stack padding=".4rem">
			<form onSubmit={(e) => searchSubmitHandler(e)}>
				<Search type2="true">
					<StyledInputBase
						fullWidth
						label={t("Search")}
						placeholder={t("Search")}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<SearchIcon fontSize="small" />
								</InputAdornment>
							),
						}}
						value={searchValue}
						onChange={(e) => onChangeHandler(e)}
					/>
				</Search>
			</form>
		</Stack>
	);
};

ChatContactSearch.propTypes = {};

export default ChatContactSearch;
