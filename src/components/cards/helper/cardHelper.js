export const addToWishlistHandler = (
  item,
  reduxDispatch,
  toast,
  t,
  addFavoriteMutation,
  setIsWishlisted,
  not_logged_in_message,
  addWishList
) => {
  return (e) => {
    e.stopPropagation();
    let token = undefined;
    if (typeof window !== "undefined") {
      token = localStorage.getItem("token");
    }
    if (token) {
      addFavoriteMutation(item?.id, {
        onSuccess: (response) => {
          if (response) {
            reduxDispatch(addWishList(item));
            setIsWishlisted(true);
            toast.success(response?.message);
          }
        },
        onError: (error) => {
          toast.error(error.response.data.message);
        },
      });
    } else toast.error(t(not_logged_in_message));
  };
};
