import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { IconButton, Paper, styled, Typography, useTheme } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { t } from "i18next";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useAddStoreToWishlist } from "../../../../api-manage/hooks/react-query/wish-list/useAddStoreToWishLists";
import { useWishListStoreDelete } from "../../../../api-manage/hooks/react-query/wish-list/useWishListStoreDelete";
import {
	addWishListStore,
	removeWishListStore,
} from "../../../../redux/slices/wishList";
import { CustomStackFullWidth } from "../../../../styled-components/CustomStyles.style";
import { textWithEllipsis } from "../../../../styled-components/TextWithEllipsis";
import { not_logged_in_message } from "../../../../utils/toasterMessages";
import ClosedNow from "../../../closed-now";
import CustomDialogConfirm from "../../../custom-dialog/confirm/CustomDialogConfirm";
import CustomImageContainer from "../../../CustomImageContainer";
import PlaceIconComponent from "../../../PlaceIconComponent";
import RatingStar from "../../../RatingStar";
const CardWrapper = styled(Paper)(({ theme }) => ({
	padding: "2rem 1rem",
	height: "100%",
	boxShadow: "0px 5px 15px -3px rgba(0, 0, 0, 0.1)",
	cursor: "pointer",
	position: "relative",
	"&:hover": {
		boxShadow: "10px 25px 45px -3px rgba(0, 0, 0, 0.1)",
	},
}));
const ImageWrapper = styled(Box)(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	height: "80px",
	width: "80px",
	borderRadius: "50%",
	border: "3px solid",
	borderColor: theme.palette.secondary.light,
	position: "relative",
}));
export const HeartWrapper = styled(IconButton)(({ theme, top, right }) => ({
	zIndex: 1,
	width: "30px",
	height: "30px",
	boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
	position: "absolute",
	top: top,
	textAlign: "center",
	right: right,

	color: theme.palette.pink.main,
}));

const StoresInfoCard = (props) => {
	const { data, wishlistcard } = props;
	const id = data?.id ? data?.id : data?.slug;
	const { configData } = useSelector((state) => state.configData);
	const store_image_url = `${configData?.base_urls?.store_image_url}`;
	const moduleId = JSON.parse(window.localStorage.getItem("module"))?.id;

	const [openModal, setOpenModal] = React.useState(false);
	const dispatch = useDispatch();
	const [fav, setFav] = useState(false);
	const classes = textWithEllipsis();
	const theme = useTheme();
	const gray = theme.palette.neutral[400];
	const { wishLists } = useSelector((state) => state.wishList);

	let token = undefined;
	if (typeof window !== "undefined") {
		token = localStorage.getItem("token");
	}
	const { mutate: addFavoriteMutation } = useAddStoreToWishlist();
	const addToFavorite = () => {
		if (token) {
			addFavoriteMutation(id, {
				onSuccess: (response) => {
					if (response) {
						dispatch(addWishListStore(data));
						toast.success(response?.message);
					}
				},
				onError: (error) => {
					toast.error(error.response.data.message);
				},
			});
		} else toast.error(t(not_logged_in_message));
	};
	const isInList = (id) => {
		return !!wishLists?.store?.find((wishStore) => wishStore.id === id);
	};
	const onSuccessHandlerForDelete = (res) => {
		dispatch(removeWishListStore(id));
		toast.success(res.message, {
			id: "wishlist",
		});
	};
	const { mutate } = useWishListStoreDelete();
	const deleteWishlistStore = (id) => {
		mutate(id, {
			onSuccess: onSuccessHandlerForDelete,
			onError: (error) => {
				toast.error(error.response.data.message);
			},
		});
	};

	return (
		<Stack sx={{ position: "relative", height: "100%" }}>
			{wishlistcard === "true" ? (
				<HeartWrapper
					onClick={() => setOpenModal(true)}
					top="4%"
					right="5%"
				>
					<DeleteIcon style={{ color: theme.palette.error.light }} />
				</HeartWrapper>
			) : (
				<>
					{!isInList(id) && (
						<HeartWrapper onClick={addToFavorite} top="4%" right="5%">
							<FavoriteBorderIcon />
						</HeartWrapper>
					)}
					{isInList(id) && (
						<HeartWrapper
							onClick={() => deleteWishlistStore(id)}
							top="4%"
							right="5%"
						>
							<FavoriteIcon />
						</HeartWrapper>
					)}
				</>
			)}
			<Link
				href={{
					pathname: "/store/[id]",
					query: { id: `${id}`, module_id: `${moduleId}` },
				}}
			>
				<CardWrapper>
					<CustomStackFullWidth
						alignItems="center"
						justifyContent="center"
						spacing={0.5}
						sx={{ height: "100%" }}
					>
						<ImageWrapper>
							<CustomImageContainer
								src={`${store_image_url}/${data?.logo}`}
								alt={data?.name}
								height="100%"
								width="100%"
								objectFit="cover"
								borderRadius="50%"
							/>
							<ClosedNow
								active={data?.active}
								open={data?.open}
								borderRadius="50%"
							/>
						</ImageWrapper>
						<Typography
							textAlign="center"
							fontWeight="bold"
							className={classes.multiLineEllipsis}
							maxHeight="40px"
						>
							{data?.name}
						</Typography>
						<Stack
							direction="row"
							alignItems="center"
							justifyContent="center"
							spacing={0.5}
						>
							{/*getNumberWithConvertedDecimalPoint(data?.avg_rating, configData?.digit_after_decimal_point)*/}
							<Typography fontWeight="bold">
								{data?.avg_rating.toFixed(1)}
							</Typography>
							<RatingStar fontSize="16px" color="warning.dark" />
						</Stack>
						<Stack
							direction="row"
							alignItems="center"
							justifyContent="center"
							spacing={0.5}
							alignSelf={wishlistcard === "true" ? "center" : "flex-end"}
						>
							<PlaceIconComponent fontSize="20px" color={gray} />
							<Typography
								variant="body2"
								color={gray}
								className={classes.multiLineEllipsis}
							>
								{data?.address}
							</Typography>
						</Stack>
					</CustomStackFullWidth>
				</CardWrapper>
			</Link>
			<CustomDialogConfirm
				dialogTexts={t("Are you sure you want to  delete this item?")}
				open={openModal}
				onClose={() => setOpenModal(false)}
				onSuccess={() => deleteWishlistStore(id)}
			/>
		</Stack>
	);
};

StoresInfoCard.propTypes = {};

export default StoresInfoCard;
