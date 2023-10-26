// -------------------fetching buttons and sections------------

let user_id_input=document.querySelector("#user_id");
let search_btn=document.querySelector("#search_btn");
let user_container=document.querySelector(".user_container");


// ---------- search user by  their github id---------------

search_btn.addEventListener("click",()=>{
    
    if(user_id_input.value==""){
        alert("enter github id");
    }
    else{
        findUser(user_id_input.value);
    }
})


// function to find user ------------------->

function findUser(userID){

 let promise=new Promise(async (resolve,reject)=>{
    let response= await fetch("https://api.github.com/users/"+userID);
    let user= await response.json();
    console.log(user);
       if(user.message=="Not Found"){
        reject();
        
       }else{
        resolve(user)
       }
        
    
     
 })
 promise.then((user)=>{
    displayUser(user);
 }).catch((error)=>{
    console.log(error);
    user_container.innerHTML='<p>user not found</p>'
 })

}


function displayUser(user){
    let username= (user.login==null)?" -":user.login;
    let name= (user.name==null)?" -":user.name;
    let twitter_id= (user.twitter_username==null)?" -":user.twitter_username;
    let location= (user.location==null)?" - ":user.location;
    let website= (user.company==null)?" -":user.company;
    let container=document.createElement("div");
    container.innerHTML=`<div class="user_detail">
    <div class="user_profile">
        <img src="${user["avatar_url"]}" alt="" class="profile_pic">
        <div class="userID_container">
            <div class="font_bold">${name}</div>
            <div class="font_bold"><a href="https://github.com/${username}">@${username}</a></div>
        </div>

    </div>
    <div class="joining_date font_bold">
    joined :
    ${user.created_at}
    </div>
  </div>
  <div class="user_bio">
  <p class="font_bold">Bio</p>
  ${user.bio}

  </div>
  <div class="extra_detail">
    <div><span class="font_bold">repos </span> <br> ${user.public_repos}</div>
    <div><span class="font_bold">follower  </span><br>  ${user.followers}</div>
    <div><span class="font_bold"> following  </span><br>  ${user.following}</div>
  </div>

  <div class="social_media">
  <div>
    <div><i class="fa fa-location-arrow" aria-hidden="true"></i> ${location} </div>
    <div><i class="fa fa-link" aria-hidden="true"></i> ${website} </div>
  </div>
  <div>
    <div><i class="fa fa-twitter-square" aria-hidden="true"></i> ${twitter_id} </div>
  </div>
</div>`


  user_container.innerHTML=container.innerHTML;


}