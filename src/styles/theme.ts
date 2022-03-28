import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
    colors: {
        base: {
            orange01: "#ea6b21",
            orange02: "#ac4911"
        }, 
        gray: {
            50:  "#FAFAFA", 
            100: "#F5F5F5",
            200: "#EEEEEE", 
            300: "#E0E0E0", 
            400: "#BDBDBD", 
            500: "#9E9E9E", 
            600: "#757575", 
            700: "#616161", 
            800: "#424242",
            900: "#212121"
        }
    }, 
    fonts: {
        body: "Inter", 
        heading: "Inter"
    }, 
    styles: {
        global: {
            body: {
                bg: "gray.200"
            }
        }
    }
})

// BREAKPOINTS
//
//     sm : 30em = Menor que  480px
//     md : 48em = Menor que  768px
//     lg : 62em = Menor que  992px
//     xl : 80em = Menor que 1280px
//     2xl: 96em = Menor que 1516px