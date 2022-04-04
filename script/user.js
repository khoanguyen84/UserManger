class User{
    constructor(userId, membername, avatar, mobile, email, status){
        this.userId = userId;
        this.avatar = avatar;
        this.membername = membername;
        this.mobile = mobile;
        this.email = email;
        this.status = status;
    }
}
const user_key = "user_data";
const status_key = "status_data";

let users = [];
let statusList = [];

function initStatusList(){
    if(getLocalStorage(status_key) == null){
        statusList = [
            "Active",
            "Inactive",
            "Draft"
        ]
        setLocalStorage(status_key, statusList)
    }
    else{
        statusList = getLocalStorage(status_key);
    }
}

function renderStatusList(element){
    let htmls = statusList.map(function(status){
        return `<option value="${status}">${status}</option>`
    });
    document.querySelector(element).innerHTML = htmls.join("");
}
function initUsers(){
    if(getLocalStorage(user_key) == null){
        users = [
            new User(1, "Phúc", "https://i.pravatar.cc/150?img=1", "0935123456", "phuc@gmail.com", "active"),
            new User(2, "Phước", "https://i.pravatar.cc/150?img=2", "0935123456", "phuoc@gmail.com", "inactive"),
            new User(3, "Phôn", "https://i.pravatar.cc/150?img=3", "0935123456", "phon@gmail.com", "active"),
            new User(4, "Nhật Anh", "https://i.pravatar.cc/150?img=4", "0935123456", "nhatanh@gmail.com", "active"),
            new User(5, "Thiện", "https://i.pravatar.cc/150?img=5", "0935123456", "thien@gmail.com", "active"),
        ]
        setLocalStorage(user_key, users)
    }
    else{
        users = getLocalStorage(user_key);
    }
}

function setLocalStorage(key, data){
    localStorage.setItem(key, JSON.stringify(data))
}

function getLocalStorage(key){
    return JSON.parse(localStorage.getItem(key))
}

function renderUser(){
    let htmls = users.map(function(user){
        return `
            <tr id="tr_${user.userId}">
                <td class='text-center'><input type="checkbox"></td>
                <td id="avatar_${user.userId}">
                    <img class="img-sm" src="${user.avatar}" alt="">
                </td>
                <td id="membername_${user.userId}">${user.membername}</td>
                <td id="mobile_${user.userId}">${user.mobile}</td>
                <td id="email_${user.userId}">${user.email}</td>
                <td id="tdStatus_${user.userId}">${user.status}</td>
                <td id="operation_${user.userId}" class='text-center'>
                   <a class="icon" href='javascript:;' title="Modify User" onclick="getUser(${user.userId})">
                        <i class="fas fa-edit"></i>
                   </a> 
                   <a class="icon d-none" href='javascript:;' title="Save User" onclick="updateUser(${user.userId})">
                        <i class="fas fa-save"></i>
                   </a> 
                   <a class="icon d-none" href='javascript:;' title="Cancel" onclick="cancelUpdate(${user.userId})">
                        <i class="fas fa-times"></i>
                   </a> 
                   <a class="icon" href='javascript:;' title="Remove User" onclick="removeUser(${user.userId})">
                        <i class="fas fa-trash"></i>
                   </a> 
                </td>
            </tr>
        `
    })
    document.querySelector('#tbUsers').innerHTML = htmls.join("")
}

function createUser(){
    let membername = document.querySelector("#membername").value;
    let avatar = document.querySelector("#avatar").value;
    let mobile = document.querySelector("#mobile").value;
    let email = document.querySelector("#email").value;
    let status = document.querySelector("#status").value;
    let userId = findLastestUserId() + 1;

    let user = new User(userId, membername, avatar, mobile, email, status);
    users.push(user);
    setLocalStorage(user_key, users)
    clearForm();
    renderUser();
    // let tr = document.createElement("tr"); 
    // tr.id = `tr_${user.userId}`;
    // tr.innerHTML = `
    //     <td class='text-center'><input type="checkbox"></td>
    //     <td id="avatar_${user.userId}">
    //         <img class="img-sm" src="${user.avatar}" alt="">
    //     </td>
    //     <td id="membername_${user.userId}">${user.membername}</td>
    //     <td id="mobile_${user.userId}">${user.mobile}</td>
    //     <td id="email_${user.userId}">${user.email}</td>
    //     <td id="tdStatus_${user.userId}">${user.status}</td>
    //     <td id="operation_${user.userId}" class='text-center'>
    //         <a class="icon" href='javascript:;' title="Modify User" onclick="getUser(${user.userId})">
    //                 <i class="fas fa-edit"></i>
    //         </a> 
    //         <a class="icon d-none" href='javascript:;' title="Save User" onclick="updateUser(${user.userId})">
    //                 <i class="fas fa-save"></i>
    //         </a> 
    //         <a class="icon d-none" href='javascript:;' title="Cancel" onclick="cancelUpdate(${user.userId})">
    //                 <i class="fas fa-times"></i>
    //         </a> 
    //         <a class="icon" href='javascript:;' title="Remove User" onclick="removeUser(${user.userId})">
    //                 <i class="fas fa-trash"></i>
    //         </a> 
    //     </td>`
    // console.log(tr)
    // let table = document.querySelector("#tbUsers");
    // table.insertBefore(tr, table.firstChild);
}

function findLastestUserId(){
    let userList = [...users];
    userList.sort(function(user1, user2){
        return user2.userId - user1.userId;
    })
    return userList[0].userId;
}

function clearForm(){
    document.querySelector("#membername").value = "";
    document.querySelector("#avatar").value = "";
    document.querySelector("#mobile").value = "";
    document.querySelector("#email").value = "";
    document.querySelector("#status").value = "active";
}

function removeUser(userId){
    let confirmed = window.confirm("Are you sure to remove this user?");
    if(confirmed){
        // 1. xóa trong mảng users
        // let index = users.findIndex(function(user){
        //     return user.userId == userId
        // })
        // if(index != -1)
        //     users.splice(index, 1)
        users = users.filter(function(user){
            return user.userId != userId
        })
        // 2. update lại localstorage
        setLocalStorage(user_key, users)
        // 3
        // cách 1. render lại bảng
        // renderUser();
        // cách 2. xóa dòng chưa userId
        document.querySelector(`#tr_${userId}`).remove();
    }
}
function getUser(userId){
    let user = users.find(function(user){
        return user.userId == userId
    });
    document.querySelector(`#avatar_${userId}`).innerHTML = `<input type="url" value='${user.avatar}' class="form-control-sm">`
    document.querySelector(`#membername_${userId}`).innerHTML = `<input type="text" value='${user.membername}' class="form-control-sm">`
    document.querySelector(`#mobile_${userId}`).innerHTML = `<input type="tel" value='${user.mobile}' class="form-control-sm">`
    document.querySelector(`#email_${userId}`).innerHTML = `<input type="email" value='${user.email}' class="form-control-sm">`
    let status = document.querySelector(`#tdStatus_${userId}`);
    status.innerHTML = `<select name="status_${userId}" id="status_${userId}" class="form-control-sm"></select>`
    renderStatusList(`#status_${userId}`);

    document.querySelector(`#operation_${userId}`).children[0].classList.add('d-none');
    document.querySelector(`#operation_${userId}`).children[1].classList.remove('d-none');
    document.querySelector(`#operation_${userId}`).children[2].classList.remove('d-none');
}

function cancelUpdate(userId){
    let user = users.find(function(user){
        return user.userId == userId
    });
    document.querySelector(`#avatar_${userId}`).innerHTML = `<img class="img-sm" src="${user.avatar}" alt="">`
    document.querySelector(`#membername_${userId}`).innerHTML = user.membername;
    document.querySelector(`#mobile_${userId}`).innerHTML = user.mobile;
    document.querySelector(`#email_${userId}`).innerHTML = user.email;
    document.querySelector(`#tdStatus_${userId}`).innerHTML = user.status;

    document.querySelector(`#operation_${userId}`).children[0].classList.remove('d-none');
    document.querySelector(`#operation_${userId}`).children[1].classList.add('d-none');
    document.querySelector(`#operation_${userId}`).children[2].classList.add('d-none');
}

function updateUser(userId){
    let user = users.find(function(user){
        return user.userId == userId
    });
    user.avatar = document.querySelector(`#avatar_${userId}>input`).value;
    user.membername = document.querySelector(`#membername_${userId}>input`).value;
    user.mobile = document.querySelector(`#mobile_${userId}>input`).value;
    user.email = document.querySelector(`#email_${userId}>input`).value;
    user.status = document.querySelector(`#status_${userId}`).value;
    setLocalStorage(user_key);

    document.querySelector(`#avatar_${userId}`).innerHTML = `<img class="img-sm" src="${user.avatar}" alt="">`
    document.querySelector(`#membername_${userId}`).innerHTML = user.membername;
    document.querySelector(`#mobile_${userId}`).innerHTML = user.mobile;
    document.querySelector(`#email_${userId}`).innerHTML = user.email;
    document.querySelector(`#tdStatus_${userId}`).innerHTML = user.status;

    document.querySelector(`#operation_${userId}`).children[0].classList.remove('d-none');
    document.querySelector(`#operation_${userId}`).children[1].classList.add('d-none');
    document.querySelector(`#operation_${userId}`).children[2].classList.add('d-none');
}
function ready(){
    initUsers();
    initStatusList();
    renderStatusList("#status");
    renderUser();
}

ready();
