export const truncateText = (str = "",limit) => {
    if(str.length < limit){
        return str;
    }else{
        return str.substring(0, limit) + "..."
    }
}