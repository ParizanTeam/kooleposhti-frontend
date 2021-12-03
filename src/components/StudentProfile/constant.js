import albaloo from '../../assets/images/StudentProfile/ProHello.gif';

export const setThemeColor=(theme)=>{
    console.log("theme",theme)
    themeProps.primaryColor=theme.primaryColor;
    themeProps.secondaryColor=theme.secondaryColor;
    themeProps.welcomeImage=theme.welcomeImage;


}

export const themeProps={
    primaryColor:"#ff1493",
    secondaryColor:"#ffc0cb",
    welcomeImage: albaloo 
};

export const colorMap={
    "Pink":{
        primaryColor:"pink",
        secondaryColor:"#d3e0ff",
        welcomeImage: albaloo 
    
    },
    "Blue":{
        primaryColor:"blue",
        secondaryColor:"#d3e0ff",
        welcomeImage: albaloo 
    
    },
    "Purple":{
        primaryColor:"purple",
        secondaryColor:"#d3e0ff",
        welcomeImage: albaloo 
    
    }
}