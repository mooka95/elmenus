class MainDish{

    imageURL;
    id;

    constructor(name){
      
        this.name = name;
    }
    setImageUrl(url){
        this.imageURL = url;
    }
 setId(id){
    this.id = id;
 }

}



module.exports=MainDish;
