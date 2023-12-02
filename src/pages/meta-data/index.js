import React from "react";
import Head from "next/head";

const MetaData = ({
  title,
  description,
  keywords,
  ogImage,
  ogType,
  pathName,
}) => {
  return (
    <Head>
      <title>{title}</title>
      {/*<meta name="description" content={description} />*/}

      {/*<!-- Google / Search Engine Tags -->*/}
      <meta itemProp="name" content={title} />
      <meta itemProp="description" content={description} />
      <meta itemProp="image" content={ogImage} />
      <meta property="og:type" content="website" />

      {/*<!-- Facebook Meta Tags -->*/}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:type" content="image/jpg" />
      <meta property="og:image:width" content="1080" />
      <meta property="og:image:height" content="608" />
      <meta property="og:url" content={pathName} />
      <meta property="og:type" content="website" />

      {/*<!-- Twitter Meta Tags -->*/}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
};

export default MetaData;
