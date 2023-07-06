async function getSelectedOption(event){
    event.preventDefault();
    

    const price = event.target.price.value;
    const dish = event.target.dish.value;

    var selectElement=document.getElementById('mySelect');
    var selectedOption=selectElement.options[selectElement.selectedIndex];

    var tableNumber=selectedOption.text;


    const obj={
        price,
        dish,
        tableNumber
    };

    await createOrder(obj);
}



async function createOrder(obj){
    try{
        const response=await axios.post("https://crudcrud.com/api/b43508437a1d4363b317f1e64e81d6f9/foodOrderList",obj);
        console.log(response);
        
        showOnScreen(response.data);
    }catch(err){
        console.log(err);
    }
}



document.addEventListener("DOMContentLoaded", async(event)=>{
    try{
        const response=await axios.get("https://crudcrud.com/api/b43508437a1d4363b317f1e64e81d6f9/foodOrderList");
        console.log(response.data);
        const data=response.data;
        for(let i=0;i<data.length;i++){
            let value=data[i].tableNumber;
            let dishName=data[i].dish;
            let priceOfDish=data[i].price;
            let dataId=data[i]._id;
            showOnScreenAfterReload(value,dishName,priceOfDish,dataId);
        }
    }catch(err){
        console.log(err);
    }
})


function showOnScreenAfterReload(table,dishName,priceOfDish,dataId){
    

    if(table==='table 1'){
        const parentNode1L=document.getElementById("table_1"); 
        const childHTMLR=`<li id=${dataId}> ${priceOfDish} - ${dishName} -${table}
                      <button onclick=deleteUser('${dataId}')>Delete User</button>    
        
                      </li>`
        
        parentNode1L.innerHTML=parentNode1L.innerHTML+childHTMLR;
    }else if(table==='table 2'){
        const parentNode2L=document.getElementById("table_2"); 
        const childHTMLR=`<li id=${dataId}> ${priceOfDish} - ${dishName} -${table}
                      <button onclick=deleteUser('${dataId}')>Delete User</button>    
        
                      </li>`

        parentNode2L.innerHTML=parentNode2L.innerHTML+childHTMLR
    }else{
        const parentNode3L=document.getElementById("table_3"); 
        const childHTMLR=`<li id=${dataId}> ${priceOfDish} - ${dishName} -${table}
                      <button onclick=deleteUser('${dataId}')>Delete User</button>    
        
                      </li>`

        parentNode3L.innerHTML=parentNode3L.innerHTML+childHTMLR
    }
    
}


function showOnScreen(user,id){
    

    const selectElementP = document.getElementById("mySelect");
    const selectedOptionP = selectElementP.options[selectElementP.selectedIndex];
    const optionValue = selectedOptionP.value;
    const optionText = selectedOptionP.text;



    if(optionValue=='option1'){
        
        const parentNode1=document.getElementById("table_1"); 
        const childHTML=`<li id=${user._id}> ${user.price} - ${user.dish} -${user.tableNumber}
                      <button onclick=deleteUser('${user._id}')>Delete User</button>    
        
                      </li>`
        
        parentNode1.innerHTML=parentNode1.innerHTML+childHTML

    }else if(optionValue=='option2'){

        const parentNode2=document.getElementById("table_2"); 
        const childHTML=`<li id=${user._id}> ${user.price} - ${user.dish} -${user.tableNumber}
                      <button onclick=deleteUser('${user._id}')>Delete User</button>    
        
                      </li>`

        parentNode2.innerHTML=parentNode2.innerHTML+childHTML

    }else{

        const parentNode3=document.getElementById("table_3"); 
        const childHTML=`<li id=${user._id}> ${user.price} - ${user.dish} -${user.tableNumber}
                      <button onclick=deleteUser('${user._id}')>Delete User</button>    
        
                      </li>`

        parentNode3.innerHTML=parentNode3.innerHTML+childHTML

    }

    document.getElementById('price').value='';
    document.getElementById('dish').value='';
    document.getElementById('mySelect').value='';
 
}

async function deleteUser(userId){
    try{
        const response=await axios.delete(`https://crudcrud.com/api/b43508437a1d4363b317f1e64e81d6f9/foodOrderList/${userId}`);
        removeOrderFromScreen(userId);
    }catch(err){
        console.log(err);
    }
}


async function removeOrderFromScreen(userId){
    const removeId=userId;
    const liNode=document.getElementById(`${removeId}`);
    liNode.remove();
}