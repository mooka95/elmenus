class Token{
    expireDate;
constructor(id){
    this.id = id;
}

setExpirationDate(date){
    this.expireDate=date;
}


}
module.exports =Token;