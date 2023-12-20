function getYear (dateString){
    if(!dateString){
        return null;
    }
    const date = new Date(dateString);
    const year = date.getFullYear();
    return year;
}
export default getYear;