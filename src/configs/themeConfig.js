// You can customize the template with the help of this file

//Template config options
const themeConfig = {
  app: {
    appName: "سامانه جامع اطلاعات کسب و کار",
    appLogoImage: require("@src/assets/images/logo/logo.svg").default
  },
  layout: {
    isRTL: true,
    skin: "semi-dark", // light, dark, bordered, semi-dark
    type: "vertical", // vertical, horizontal
    contentWidth: "full", // full, boxed
    menu: {
      isHidden: false,
      isCollapsed: false
    },
    navbar: {
      // ? For horizontal menu, navbar type will work for navMenu type
      type: "sticky", // static , sticky , floating, hidden
      backgroundColor: "white" // BS color options [primary, success, etc]
    },
    footer: {
      type: "static" // static, sticky, hidden
    },
    customizer: false,
    scrollTop: false, // Enable scroll to top button
    toastPosition: "top-right" // top-left, top-center, top-right, bottom-left, bottom-center, bottom-right
  }
}

export default themeConfig
