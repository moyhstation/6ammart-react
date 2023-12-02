import { useEffect } from "react";
import { withRouter } from "next/router";

function ScrollToTop({ router }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [router.pathname]);

  return null;
}

export default withRouter(ScrollToTop);
