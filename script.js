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
    let container=document.createElement("div");
    container.innerHTML=`<div class="user_detail">
    <div class="user_profile">
        <img src="${user["avatar_url"]}" alt="" class="profile_pic">
        <div class="userID_container">
            <div>${user.name}</div>
            <div>@${user.login}</div>
        </div>

    </div>
    <div class="joining_date">
    ${user.created_at}
    </div>
  </div>
  <div class="user_bio">
  ${user.bio}

  </div>
  <div class="extra_detail">
    <div>repose <br>  ${user.public_repos}</div>
    <div>follower <br>  ${user.followers}</div>
    <div> following <br>  ${user.following}</div>
  </div>

  <div class="social_media">
    <div><div>li</div> <div></div></div>
    <div>leetcode hackerrank</div>

  </div>`


  user_container.innerHTML=container.innerHTML;


}