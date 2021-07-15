const path = require("path");
/* eslint-disable */ 

module.exports={
    configureWebpack: config=>{
        if(process.env.NODE_ENV === "production"){

        }else{

            return {
                
                resolve:{
                    alias:{
                        '@js':path.resolve(__dirname,"./src/assets"),
                        '@css':path.resolve(__dirname,"./src/assets/css"),
                        '@img':path.resolve(__dirname,"./src/assets/img"),
                        "@c":path.resolve(__dirname,"./src/components"),

                    }
                }
            }
        }
    },  

    css: {
        loaderOptions: {
            sass: {
              // @是src的别名
              additionalData: `
                @import "@/assets/css/base/style.scss";
              `
            }
        }
    }
}
