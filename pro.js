// get total
let title = document.getElementById(`title`);
let price = document.getElementById(`price`);
let taxes = document.getElementById(`taxes`);
let ads = document.getElementById(`ads`);
let discount = document.getElementById(`discount`);
let count = document.getElementById(`count`);
let category = document.getElementById(`category`);
let create = document.getElementById(`create`);
let tol = document.getElementById(`tol`);
const total = (eo) => {
  if (price.value != ``) {
    let res = (+price.value + +taxes.value + +ads.value) - +discount.value;
    tol.style.backgroundColor = `#040`;
    tol.innerHTML = res;
  } else {
    tol.innerHTML = ``;
    tol.style.backgroundColor = `red`;
  }
};
// create pro
let datapro;
if (localStorage.product != null) {
  datapro = JSON.parse(localStorage.product);
} else {
  datapro = [];
}
create.addEventListener(`click`, (eo) => {
  newpro = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: tol.innerHTML,
    count:count.value,
    category:category.value,
  };
  cleardata()
  showData()
  if (newpro.count>1) {
    for (let q = 0; q < newpro.count; q++) {
      datapro.push(newpro);
    }
  } else {
    datapro.push(newpro);

  }
  localStorage.setItem(`product`, JSON.stringify(datapro));
});
// save local
// clear input
const cleardata = (eo) => {
  title.value = ``;
  price.value = ``;
  taxes.value = ``;
  ads.value = ``;
  discount.value = ``;
  tol.innerHTML=``;
  count.value = ``;
  category.value = ``;
}
// read
const showData = (eo) => {
  let table=``
  for (let i = 0; i < datapro.length; i++) {
    table+=`    <tr>
    <th scope="row">${i}</th>
    <td>${datapro[i].title}</td>
    <td>${datapro[i].price}</td>
    <td>${datapro[i].taxes}</td>
    <td>${datapro[i].ads}</td>
    <td>${datapro[i].discount}</td>
    <td>${datapro[i].total}</td>
    <td>${datapro[i].category}</td>
    <td><button onclick="update(${i})" class="btn btn-success">update</button></td>
    <td><button onclick="delet(${i})" class="btn btn-danger">delete</button></td>
</tr>`   

  }
document.getElementById(`tbody`).innerHTML= table;
let btnDel=document.getElementById(`btndel`)
if (datapro.length > 0) {
  btnDel.innerHTML=`
  <button onclick="dAll()" class="btn btn-danger">delete All(${datapro.length})</button>
`
} else {
  btnDel.innerHTML=``;
}
}
showData()
// count
// delete all
const dAll = (eo) => {
  datapro.splice(0)
  localStorage.clear()
  showData()

}
// delete
const delet = (i) => {
datapro.splice(i,1)
localStorage.product=JSON.stringify(datapro)
showData()
}
// update
const update = (i) => {
title.value=datapro[i].title
price.value=datapro[i].price
taxes.value=datapro[i].taxes
ads.value=datapro[i].ads
discount.value=datapro[i].discount
total()
tol.value=datapro[i].tol
count.value=datapro[i].count
category.value=datapro[i].category
create.innerHTML=`update`
scroll({
  top:0,
  behavior:`smooth`
})
datapro.splice(i,1)
localStorage.product=JSON.stringify(datapro)
showData()
}
// search
let searchMood =`title`;
let search = document.getElementById(`search`)
const getmooodsc = (id) => {
  if (id===`sctitle`) {
   searchMood =`title`
   search.focus()
   search.placeholder=`search by title`
  } else {
   searchMood =`category`
   search.focus()
   search.placeholder=`search by category`
  }
  
}
const searchdata = (value) => {
  let table=``;
  if (searchMood==`title`) {
    for (let i = 0; i < datapro.length; i++) {
      if (datapro[i].title.includes(value)) {
        table+=`    <tr>
        <th scope="row">${i}</th>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>
        <td><button onclick="update(${i})" class="btn btn-success">update</button></td>
        <td><button onclick="delet(${i})" class="btn btn-danger">delete</button></td>
    </tr>`   
    document.getElementById(`tbody`).innerHTML= table;

      } else {

      }
      
    }
  } else {
    for (let i = 0; i < datapro.length; i++) {
      if (datapro[i].category.includes(value)) {
        table+=`    <tr>
        <th scope="row">${i}</th>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>
        <td><button onclick="update(${i})" class="btn btn-success">update</button></td>
        <td><button onclick="delet(${i})" class="btn btn-danger">delete</button></td>
    </tr>`   
    document.getElementById(`tbody`).innerHTML= table;

      } else {

      }
      
    }
  }
  document.getElementById(`tbody`).innerHTML= table;

}
// clean data
