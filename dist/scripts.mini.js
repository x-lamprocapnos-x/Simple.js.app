let pokemonRepository=function(){let t=[];function e(e){"object"==typeof e&&"name"in e&&"detailsUrl"in e?t.push(e):console.log("pokemon is not correct")}function o(){return t}function n(t){pokemonRepository.loadDetails(t).then(function(){console.log(t),i(t)})}function i(t){let e=$(".modal"),o=$(".modal-body"),n=$(".modal-title");n.empty(),o.empty();let i=$("<h1>"+t.name+"</h1>"),a=$('<img class="modal-img" width= "55%">');a.attr("src",t.imageUrlFront);let l=$('<img class="modal-img" width= "45%">');l.attr("src",t.imageUrlback);let p=$("<p>Height: "+t.height+"</p>"),s=$("<p>Weight: "+t.weight+"</p>"),r=[];t.types.forEach(t=>r.push(t.type.name));let c=$("<p>pokemon type(s): "+r.join(", ")+"</p>"),d=$("<p>Can you catch me?</p>");n.append(i),o.append(a),o.append(l),o.append(p),o.append(s),o.append(c),o.append(d),e.addClass("show")}function a(){$(".modal").removeClass("show")}return $(".close").click(a),$(".close-modal-button").click(a),{add:e,getAll:o,addListItem:function t(e){let o=document.querySelector(".list-group"),i=document.createElement("li");i.classList.add("group-list-item");let a=document.createElement("button");a.innerText=e.name,a.classList.add("btn"),i.appendChild(a),o.appendChild(i),a.addEventListener("click",()=>{n(e)})},loadList:function t(){return fetch("https://pokeapi.co/api/v2/pokemon/?limit=1000").then(function(t){return t.json()}).then(function(t){t.results.forEach(function(t){e({name:t.name,detailsUrl:t.url})})}).catch(function(t){console.error(t)})},loadDetails:function t(e){return fetch(e.detailsUrl).then(function(t){return t.json()}).then(function(t){e.imageUrlFront=t.sprites.front_default,e.imageUrlback=t.sprites.back_default,e.height=t.height,e.weight=t.weight,e.types=t.types}).catch(function(t){console.error(t)})},showDetails:n,showModal:i}}();console.log(pokemonRepository.getAll()),pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(t){pokemonRepository.addListItem(t)})});