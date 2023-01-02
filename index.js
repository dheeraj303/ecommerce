const cartitems=document.querySelector('#cart-item');


const parentcontainer=document.getElementById("ecomcontainer");
parentcontainer.addEventListener('click',(e)=>{
    
    if(e.target.classList.contains('add-to-cart')){
        const id=e.target.parentNode.parentNode.parentNode.id;
        const name=document.querySelector(`#${id} h3`).innerText;
        const img_src=document.querySelector(`#${id} img`).src;
        const price=e.target.parentNode.parentNode.firstElementChild.firstElementChild.innerText;
        let total_cart_price=document.querySelector('#total_cart_value').innerText;
        if (document.querySelector(`#in-cart-${id}`)){
            alert('This item is already added to the cart');
            return;
        }
        const childcart=`<tr id="cart-${id}">
        <td><img src="${img_src}" width="20px"></td>
        <td class="price">${price}</td>
        <td><button>REMOVE</button></td>
        </tr>`;
        cartitems.innerHTML+=childcart;
        total_cart_price = parseFloat(total_cart_price) + parseFloat(price)
        total_cart_price = total_cart_price.toFixed(2)
        document.querySelector('#total_cart_value').innerText = `${total_cart_price}`;
        const container = document.getElementById('container');
        const notification = document.createElement('div');
        notification.classList.add('notification');
        notification.innerHTML = `<h4>Your Product : <span>${name}</span> is added to the cart<h4>`;
        container.appendChild(notification);
        setTimeout(()=>{
            notification.remove();
        },2500)
    
    }

    if(e.target.classList.contains('showcart')){
        document.getElementById('cart').style.display='block';
    }
    if(e.target.classList.contains('closecart')){
        document.getElementById('cart').style.display='none';
    }
    if(e.target.innerText=='PURCHASE'){
        if(document.querySelector('#total_cart_value').innerText=='0'){
            alert('You have Nothing in Cart , Add some products to purchase !');
            return
        }
        
        alert('Thanks for the purchase')
        cartitems.innerHTML = ""
        // document.querySelector('.cart-number').innerText = 0
        document.querySelector('#total_cart_value').innerText = `0`;
    }
    if(e.target.innerText=='REMOVE'){
        // alert("aaya");
        let total_cart_price = document.querySelector('#total_cart_value').innerText;
        total_cart_price = parseFloat(total_cart_price).toFixed(2) - parseFloat( document.querySelector(`#${e.target.parentNode.parentNode.id} .price`).innerText).toFixed(2) ;
        // document.querySelector('.cart-number').innerText = parseInt(document.querySelector('.cart-number').innerText)-1
        document.querySelector('#total_cart_value').innerText = `${total_cart_price.toFixed(2)}`
        e.target.parentNode.parentNode.remove()
       
        // console.log();
    }
})

window.addEventListener('DOMContentLoaded',getproducts);

async function getproducts(){
    try{
        let response=await axios.get('http://localhost:3000/productsfromapi')
        for (let i = 0; i < response.data.length; i++){
            viewuser(response.data[i]);
        }   
        }
        catch(err){
            console.log(err)
        };
}

function viewuser(data){
        const childhtml=`<div class="col-6">
        <div class="card" id="${data.title}"  style="width: 18rem;">
            <h3 class="text-center">${data.title}</h3>
            <img src="${data.imageUrl}" class="card-img-top" alt="...">
            <div class="card-body">
              
              <span>$<span>${data.price}</span></span>
            <div style="float:right">
             <button class="add-to-cart btn btn-primary">Add to Cart</button>
            </div>
        </div>
          </div>
    </div>`;
    const parentnode=document.querySelector('.products');
    parentnode.innerHTML=parentnode.innerHTML+childhtml;
}