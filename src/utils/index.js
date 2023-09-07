export const shortenText=(text,n)=>{
    if(text.length>n){
        const shotendText=text.substring(0,n).concat("...");
        return shotendText;
    }
    return text;
}