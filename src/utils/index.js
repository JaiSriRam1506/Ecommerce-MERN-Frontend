export const shortenText=(text,n)=>{
    if(text && text.length && text.length>n){
        const shotendText=text.substring(0,n).concat("...");
        return shotendText;
    }
    return text;
}
export const validateEmail=(email)=>{
    return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

// Calculate average Product rating
export function calculateAverageRating(ratings) {
    if (!Array.isArray(ratings) || ratings.length === 0) {
      return 0; // Return 0 if the ratings array is empty or not an array
    }
  
    var totalStars = 0;
    for (var i = 0; i < ratings.length; i++) {
      var rating = ratings[i];
      if (rating.hasOwnProperty("star")) {
        totalStars += rating.star;
      }
    }
  
    return totalStars / ratings.length;
  }

  export const getQuantityById=(products,_id)=>{
    //console.log(products)
    products.map((product)=> {
      //console.log(product,_id)
      return product._id===_id?product.cartQuantity:0
    })
  }

  export function getCartQuantityById(products, id) {
    //console.log(products.length)
    for (let i = 0; i < products.length; i++) {
      
      if (products[i]._id === id) {
        //console.log(products[i]._id,products[i].cartQuantity,id)
        return products[i].cartQuantity;
      }
    }
    return 0; // If the _id is not found, return 0 or any default value
  }

  export const extractCartQuantity_Id=(products)=>{
    return products.map((product,index)=>{
     return {
        _id:product._id,
        cartQuantity:product.cartQuantity
      }
    })
  }