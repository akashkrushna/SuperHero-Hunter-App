// To display if no characters found in the Favourite page
const noFavChar = document.getElementById('noFavChar');

// Looping over all the elements found in local storage
if (localStorage.length != 0) {
  for (let i = 0; i < localStorage.length; i++) {
     // set iteration key name
    const key = localStorage.key(i);

     // use key name to retrieve the corresponding value
    const value = localStorage.getItem(key);

    const publicKey = '7f598ebb806e01137831d225697da4ac';
    const privateKey = '05a4e394d4c55f1dce0f201bc62db2de268c4be6';
    const ts = Date.now().toString();
    const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();
    const charById = `http://gateway.marvel.com/v1/public/characters/${value}?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
    favChar(charById);
    
  }
} else {
  noFavChar.style.display = 'block';
}

// Calling api to fetch data of all characters in LocalStorage
async function favChar(charById){
  const res = await fetch(charById)
  const data = await res.json()
  renderFavChar(data.data.results)
  removeSeletedChar()
}

// Rendering all the characters present in localStorage
function renderFavChar(data){
  const ul = document.getElementById('ul')
  const li = document.createElement('li')
  li.className = "char"
  li.innerHTML = 
  `
              <div class="img">
                  <img class="charImg" src="${data[0].thumbnail.path}.jpg" alt="Not Found">
              </div>
              <div class="content">
                  <p class="name">${data[0].name}</p>
                  <button class="delBtn"name="${data[0].name}"><i class="fa-solid fa-trash "></i></button>
              </div>
  `
  ul.append(li);

  // Hide the "Oops! No Favourite in your List" message if characters are present
  noFavChar.style.display = 'none';

  
}

// Removing the selected character
function removeSeletedChar(){
  const delBtn = document.querySelectorAll('.delBtn')
  delBtn.forEach((data)=>{
      console.log(data)
      data.addEventListener('click',function(){
          localStorage.removeItem(data.name)
          //location.reload()
          data.parentElement.parentElement.remove(); // Remove the character element from the DOM
          if (ul.childElementCount === 0) {
              noFavChar.style.display = 'block'; // Show the message if no characters are left
          }
      })
  })
}