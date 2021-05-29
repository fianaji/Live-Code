$(document).ready(function () {
    getUsers();
    getListCategory();
});
const getUsers=()=>{
    $.ajax({
        type: "GET",
        url: "https://mybook-order.herokuapp.com/books",
        success: function (response) {
            //console.log(response.data[0].type_book);
            if(response.success){
                response.data.forEach((buku,i) => {
                    const content=`<tr>
                    <th>${i+1}</th>
                    <td>${buku.name}</td>
                    <td>${buku.type_book.name}</td>
                    <td><button class="btn btn-danger" onclick="deleteUser(${buku.id})">Delete</button></td>
                </tr>`;
                $("#data-buku").append(content);
                });
            }
        }
    });
}
const deleteUser=(id)=>{
    const payload={id:id};
    $.ajax({
        type: "DELETE",
        url: "https://mybook-order.herokuapp.com/books",
        data: JSON.stringify(payload),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (response) {
            console.log(response);
            if(response.success){
                $("#data-buku").html("");
                getUsers();
            }                
        }
    });
}

const addUser=(id)=>
{
    const payload={
        name:"buku",
        type_book:{
            name:"ensiklopedi"
        }
    };
    $.ajax({
        type: "POST",
        url: "https://mybook-order.herokuapp.com/books",
        data: JSON.stringify(payload),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (response) {
            console.log(response);
            if(response.success){
                $("#data-buku").html("");
                getUsers();
            }                
        }
    });
}
$("#form-add").submit(function (e) {
    e.preventDefault();
    const payload = {
        name: $("#name").val(),
        type_books_id: $("#kategori").val()
    }
    $(".progress").show()
    $("#modal-add").modal("hide")
    $.ajax({
        type: "POST",
        url: "https://mybook-order.herokuapp.com/books",
        data: JSON.stringify(payload),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response.success) {
                getListBook()
                Swal.fire({
                    title: "Berhasil!",
                    text: response.message,
                    icon: "success"
                })
                $("#name").val("")
                $("#kategori").val("")
            }
            else {
                $("#modal-add").modal("show")
                Swal.fire({
                    title: "Gagal!",
                    text: response.message,
                    icon: "error"
                })
            }
        },
        done: (res) => {
            $(".progress").hide()
        },
        error: (response) => {
            $("#modal-add").modal("show")
            Swal.fire({
                title: "Gagal!",
                text: response.statusText,
                icon: "error"
            })
        }
    });
});