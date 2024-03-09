import TagManager from 'react-gtm-module';

const GTM_ID = 'GTM-MF2PDDZ';

export const initGTM = () => {
  TagManager.initialize({ gtmId: GTM_ID });
};