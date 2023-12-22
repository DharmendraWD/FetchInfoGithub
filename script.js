let main = document.querySelector('.main');
let person = document.querySelector('.person_Data .person_name');
let person_profile = document.querySelector('.person_Data img');
let person_Data = document.querySelector('.person_Data');
let profile_container = document.querySelector('.profile-container');
let personidCreateAt = document.querySelector('.person_Data .date');
let data;

let url = "https://api.github.com/users/";
const accessToken = "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";

            // When click on search 
            main.children[0].children[1].addEventListener('click', ()=>{
                check()
            });

            main.children[0].children[0].addEventListener('keypress', function(event) {
        //    when clicked on enter then do search using api 
            if (event.key === 'Enter') {
                  check()
                // Prevent the default behavior of the Enter key (form submission)
                event.preventDefault();
            }
        });
            // function to fetch user's name, img, date created and show
            function check(){
                let searchValue = main.children[0].children[0].value;
                // Clear previous search results
  console.clear();
if(!searchValue==""){
    let myPromise = fetch(url + searchValue, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  .then(response => {
    if (!response.ok) {
      if (response.status === 404) {
        console.log('User not found');
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    }
    return response.json();
  })
  .then(responseData => {
    user_NameImgCreatedDate(responseData)
    // cloning array to use out of this scope 
    data = {...responseData};
  })
  .catch(error => {
    console.error('Error:', error.message);
  });
  person_Data.classList.remove('dNone');
}
else{
    console.log("Enter User Id First");
}

}



 
// If there is no any value in search bos then remove previous profile
main.children[0].children[0].addEventListener('input', ()=>{
    // if(searchValue.length<=4){
let search = document.querySelector('#search')
let searchValue = search.value;
  if(searchValue.length<=4){
    person_Data.classList.add('dNone');
    profile_container.classList.add('dNone');
  }
})
// function which contains FUll Name, Image, Created Date 
function user_NameImgCreatedDate(responseData){
    // if any user has not full name then show github userName istead 
if(!responseData.name == null){
    person.innerText=responseData.name;
}
else{
    person.innerText=responseData.login;  
}
person_profile.src=responseData.avatar_url;
let createdProfileDate = responseData.created_at.substring(0, 10)
personidCreateAt.textContent=createdProfileDate;
}

// When click on user searched profile 
person_Data.addEventListener('click', function(){
// if search box value is null or less than 3 letters 

    let profile_header = document.querySelector('.profile-header');
    let profile_actions = document.querySelector('.profile-actions');
    person_Data.classList.add('dNone');
    profile_container.classList.remove('dNone');
 // Changing data from api 
 profile_header.children[0].src= data.avatar_url;    //Github Image
            profile_header.children[1].textContent=data.name;   //Github name
            profile_header.children[2].textContent=data.login;  //Github userName
            profile_header.children[3].textContent=data.bio;    //Github Bio
            profile_header.children[4].children[0].children[0].textContent=data.followers   //Github Followers
            profile_header.children[4].children[1].children[0].textContent=data.following   //Github Following
         
           //Ghub Addess
           if(data.location !== null){
            profile_header.children[5].children[0].children[1].textContent=data.location; 
        }
        else{
            profile_header.children[5].children[0].children[1].textContent="Not Given"; 
        }

           if(data.email !== null){
            profile_header.children[5].children[1].children[1].textContent=data.email;
        }
        else{
            profile_header.children[5].children[1].children[1].textContent='Not Given';
           }
        //    Repo 
               profile_header.children[5].children[2].children[1].textContent=data.public_repos;

               let cratedYMD = data.created_at.substring(0, 10)
               profile_header.children[5].children[3].children[1].textContent=cratedYMD;
           
// Changing person Href Link 
// UserId 
profile_header.children[2].href = data.html_url; 
// Followers 
profile_header.children[4].children[0].href=data.html_url+'?tab=followers';
// Following 
profile_header.children[4].children[1].href=data.html_url+'?tab=following';
// Reop 
profile_header.children[5].children[2].children[0].href=data.html_url+'?tab=repositories';
// Follow 
profile_actions.children[0].href=data.html_url;
})
   
