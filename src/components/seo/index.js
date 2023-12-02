import Head from "next/head";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import DynamicFavicon from "../favicon/DynamicFavicon";

const SEO = ({ title, description, keywords, image, businessName,configData }) => {
  const router = useRouter();
  const { asPath } = router;

  const siteName = businessName; // Replace with your website's name
  const siteUrl = "https://www.example.com"; // Replace with your website's URL

  // Concatenate the current page URL with the site URL
  const url = `${siteUrl}${asPath}`;
  const businessLogo = configData?.base_urls?.business_logo_url;
  return (
    <>
     <DynamicFavicon configData={configData}/>
    <Head>
      
      {/* General meta tags */}
      <title>{title ? `${title} | ${siteName}` : siteName}</title>
        <meta itemProp="name" content={title} />
        <meta itemProp="description" content={description} />
        <meta itemProp="image" content={image} />
        <meta property="og:type" content="website" />

      {/* Open Graph meta tags for Facebook */}
      <meta property="og:title" content={title || siteName} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteName} />
      {image && <meta property="og:image" content={image} />}

      {/* Twitter Card meta tags */}
      <meta name="twitter:title" content={title || siteName} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:card" content="summary_large_image" />
      {image && <meta name="twitter:image" content={image} />}

      {/* Google specific meta tags */}
      <meta itemprop="name" content={title || siteName} />
      <meta itemprop="description" content={description} />
      {image && <meta itemprop="image" content={image} />}

      <link rel="canonical" href={url} />
    </Head>
    </>
   
  );
};

SEO.propTypes = {
  title: PropTypes.string,
};

export default SEO;
