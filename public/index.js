let array = [];


fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(json => {
        console.log('Fetched products:', json);
        array = json;
        showProds(array); 
    })
    .catch(error => console.error('Error fetching products:', error));


function showProds(products) {
    let view = document.getElementById('container');
    view.className = "flex flex-wrap gap-10 bg-blue-900 p-4 justify-evenly";
    view.innerHTML = ''; 

    for (let i = 0; i < products.length; i++) {
        const card = document.createElement('div');
        card.className = "bg-white rounded-lg shadow-md p-4 w-[300px] flex flex-col items-center cursor-pointer relative pb-12";
        
        const text = document.createElement('div');
        text.className = "flex gap-6 justify-between font-bold text-lg mb-5";

        const al = document.createElement('div');
        al.className = "w-[30px] h-[30px] bg-red-500 rounded-full flex justify-center items-center";
        const number = document.createElement('h1');
        number.textContent = `${products[i].id}`;
        number.className = "text-xl";
        al.appendChild(number);
        text.appendChild(al);

        const price = document.createElement('h3');
        price.textContent = `$ ${products[i].price}`;
        text.appendChild(price);

        card.appendChild(text);

        const image = document.createElement('img');
        image.src = products[i].image;
        image.className = "h-[130px] mt-5 mb-10";
        card.appendChild(image);

        const title = document.createElement('h2');
        title.textContent = `${products[i].title}`;
        title.className = "text-lg font-bold mb-2 text-center text-blue-900";
        card.appendChild(title);

        const desc = document.createElement('h2');
        desc.textContent = `${products[i].description}`;
        desc.className = "text-sm text-gray-500 font-bold mb-2 text-center";
        card.appendChild(desc);

        const buts = document.createElement('div');
        buts.className = "flex gap-2 absolute bottom-2";

        const del = document.createElement('button');
        del.textContent = "Delete";
        del.className = "p-2 bg-red-500 rounded-xl hover:bg-red-600 text-white";
        buts.appendChild(del);
        
        del.addEventListener("click", (event) => {
   
        const productId = products[i].id;

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
        if (result.isConfirmed) {
            fetch('https://fakestoreapi.com/products/6',{
                method:"DELETE"
            })
                .then(res=>res.json())
                .then(json=> {
                    array = array.filter(product => product.id !== productId);
                    showProds(array);
                })
             

            Swal.fire({
                title: "Deleted!",
                text: "Your product has been deleted.",
                icon: "success"
            });
        }
        });
        });


        const upd = document.createElement('button');
        upd.textContent = "Update";
        upd.className = "p-2 bg-orange-500 rounded-xl hover:bg-orange-600 text-white";
        buts.appendChild(upd);
        upd.addEventListener("click", () => {
            
            
            fetch('https://fakestoreapi.com/products/7',{
                method:"PUT",
            })
                .then(res=>res.json())
                .then(json=> {
                    let tnew = prompt("Change in title", products[i].title);
                    let dnew = prompt("Change in description", products[i].description);
                    let pnew = prompt("Change in price",products[i].price);
        
                    products[i].title = tnew;
                    products[i].description = dnew;
                    products[i].price = pnew;
        
                    showProds(products);
                })
        });
        
        card.appendChild(buts);
        view.appendChild(card);
    }
}

let add = document.getElementById('add');
add.addEventListener("click", () => {
    /*const title = prompt("Enter the product title:");
    if (!title) return;

    const price = parseFloat(prompt("Enter the product price:"));

    const description = prompt("Enter the product description:");
    if (!description) return;*/
    let title = document.getElementById('title').value;
    let price = document.getElementById('price').value;
    let description = document.getElementById('description').value;
    
    fetch('https://fakestoreapi.com/products', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: array.length+1,
            title: title,
            price: price,
            description: description,
            image: 'https://i.pravatar.cc',
            category: 'electronic'
        })
    })
    .then(res => res.json())
    .then(newProduct => {
        console.log('Product added:', newProduct);
    
        array.push(newProduct);
        showProds(array);
    })
    .catch(error => console.error('Error adding product:', error));

});

let menu = document.getElementById('menu');
        let mobileMenu = document.getElementById('mobile-menu');
        let closeMenu = document.getElementById('close-menu');

        menu.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        closeMenu.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });


