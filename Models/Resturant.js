class Restaurant{
    id;
    openTime;
    closeTime;
    image;
    constructor(name,isOrderOnline,mainDishId){
        this.name=name;
        this.isOrderOnline=isOrderOnline;
        this.mainDishId=mainDishId;

    }
}

module.exports = Restaurant;