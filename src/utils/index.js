export const shortenText=(text,n)=>{
    if(text.length && text.length>n){
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