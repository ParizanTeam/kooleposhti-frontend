import albaloo from '../../assets/images/StudentProfile/ProHello.gif';
import berry from '../../assets/images/StudentProfile/berry.png';
import stitch from '../../assets/images/StudentProfile/stitch.png'

import bgImage_pink from '../../assets/images/pink_studen_dashboard_bg.jpg';
import BtnLabel_pink from '../../assets/images/pink_label.png'

import bgImage_blue from '../../assets/images/blue_studen_dashboard_bg.jpg';
import BtnLabel_blue from '../../assets/images/blue_label.png'

import bgImage_purple from '../../assets/images/purple_studen_dashboard_bg.jpg';
import BtnLabel_purple from '../../assets/images/purple_label.png'


export const colorMap={
    "Pink":{
        primaryColor:"#ff1493",
        primaryLightColor:"rgba(255, 20, 147,0.1)",
        secondaryColor:"#ffc0cb",
        welcomeImage: albaloo,
        bgImage:bgImage_pink,
        btnLabel:BtnLabel_pink,
        label:'صورتی'
    },
    "Blue":{
        primaryColor:"#0000eb",
        primaryLightColor:"rgba(0, 0, 235,0.1)",
        secondaryColor:"#97f8ff",
        welcomeImage: stitch ,
        bgImage:bgImage_blue,
        btnLabel:BtnLabel_blue,
        label:"آبی"
    
    },
    "Purple":{
        primaryColor:"#4b0082",
        primaryLightColor:"rgba(75, 0, 130,0.2)",
        secondaryColor:"#fdc8fd",
        welcomeImage: berry ,
        bgImage:bgImage_purple,
        btnLabel:BtnLabel_purple,

        label:'بنفش'
    
    }
}