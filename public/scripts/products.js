window.onload=()=>{
    showProducts()
}

function showProducts(){
    fetch('/admin/productos/listar')
        .then(res=>res.json())
        .then(products=>{
            let productList = document.querySelector(".product-list")
            while(productList.firstChild)
                productList.firstChild.remove()
            products.forEach((product, i)=>{
                let card = document.createElement("div")
                let img = document.createElement("img")
                let h2 = document.createElement("h2")
                let p = document.createElement("p")
                let quantity = document.createElement("h5")
                let edit = document.createElement("button")
                    edit.className = "btn btn-edit"
                    edit.textContent="Editar"
                    edit.id=product._id
                    edit.onclick=()=>{
                        location.href=`http://localhost:8081/admin/productos/${product._id}`
                    }
                let del = document.createElement("button")
                    del.className = "btn btn-delete"
                    del.textContent="Borrar"
                    del.id=product._id
                    del.onclick=()=>{
                        deleteProduct(product)
                    }
                let cfooter = document.createElement("div")
                img.src=product.images[0]
                h2.textContent=product.title
                p.textContent=product.description
                quantity.textContent="Stock: " + product.quantity + " unidades"
                card.className = "card-product"
                img.className = "card-img"
                h2.className ="title"
                cfooter.className = "card-footer"
                quantity.className = "card-featured"
                productList.appendChild(card)
                card.appendChild(img)
                card.appendChild(h2)
                card.appendChild(p)
                card.appendChild(quantity)
                card.appendChild(cfooter)
                cfooter.appendChild(edit)
                cfooter.appendChild(del)
            })
            function deleteProduct(product){
                result = confirm("¿Seguro que desea eliminar el producto?")
                if(result){
                    fetch(`/admin/productos/${product._id}`,{
                        method:'DELETE',
                        headers: {'Content-type':'Application/json'}
                    })
                    showProducts()
                }
            }
        })
}