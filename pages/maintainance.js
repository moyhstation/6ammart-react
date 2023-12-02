import React from 'react';
import PropTypes from 'prop-types';
import {CustomStackFullWidth} from "../src/styled-components/CustomStyles.style";
import {Container, Stack, Typography} from "@mui/material";
import FiveHundred from "../src/components/errors-svg/FiveHundred";
import {useTranslation} from "react-i18next";
import maintainance from '../public/static/maintenance.png'
import CustomImageContainer from "../src/components/CustomImageContainer";
import MetaData from "../src/pages/meta-data";
const Maintainance = props => {
    const { t } = useTranslation();
    return (
        <Container
            maxWidth="lg"
            sx={{
                mt:  "9rem",
                mb: { xs: "72px", md: "0" },
            }}
        >
            <MetaData title={t('Maintenance mode')} />
            <CustomStackFullWidth
                justifyContent="center"
                alignItems="center"
                spacing={4}
            >
                <Stack maxWidth="600px" width="100%" spacing={2} padding="1rem">
                    <CustomImageContainer
                        width="100%"
                        height="100%"
                        objectfit="cover"
                        src={maintainance.src}
                    />
                   <Stack>
                       <Typography align="center" variant="h3" color='primary.main'>
                           {t("We are under maintenance.")}
                       </Typography>
                       <Typography align="center" variant="h5">
                           {t("We will be back very soon.")}
                       </Typography>
                   </Stack>
                </Stack>
            </CustomStackFullWidth>
        </Container>
    );
};

Maintainance.propTypes = {
    
};

export default Maintainance;