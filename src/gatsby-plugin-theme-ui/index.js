import wavesTheme from "gatsby-theme-waves/src/gatsby-plugin-theme-ui/index";
import blogTheme from "gatsby-theme-blog/src/gatsby-plugin-theme-ui/index";
import merge from "deepmerge";

import theme from "./theme";

export default merge.all([
    blogTheme, 
    theme, 
    wavesTheme
]);