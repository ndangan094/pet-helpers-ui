// @ts-ignore
const BREAKPOINT = {
    mobileS: "320px",
    mobileM: "375px",
    mobileL: "425px",
    tablet: "769px",
    laptop: "1025px",
    laptopL: "1440px",
    laptopXL: "1920px",
    desktop: "2560px",
    desktopL: "5000px",
};

const DEFAULT_DEVICE = {
    mobileS: `(min-width: ${BREAKPOINT.mobileS})`,
    mobileM: `(min-width: ${BREAKPOINT.mobileM})`,
    mobileL: `(min-width: ${BREAKPOINT.mobileL})`,
    tablet: `(min-width: ${BREAKPOINT.tablet})`,
    laptop: `(min-width: ${BREAKPOINT.laptop})`,
    laptopL: `(min-width: ${BREAKPOINT.laptopL})`,
    laptopXL: `(min-width: ${BREAKPOINT.laptopXL})`,
    desktop: `(min-width: ${BREAKPOINT.desktop})`,
    desktopL: `(min-width: ${BREAKPOINT.desktopL})`,
};

const BREAKPOINT_DEFAULT = {
    mobileS: 320,
    mobileM: 375,
    mobileL: 425,
    tablet: 769,
    laptop: 1024,
    laptopL: 1440,
    laptopXL: 1920,
    desktop: 2560,
};

export {BREAKPOINT,BREAKPOINT_DEFAULT,DEFAULT_DEVICE}