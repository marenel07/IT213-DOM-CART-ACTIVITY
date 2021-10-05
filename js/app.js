//Variables
 const courses = document.querySelector('#courses-list'),
       shoppingCartContent = document.querySelector('#cart-content tbody'),
       clearCartBtn = document.querySelector('#clear-cart');



//Event Listeners

loadEventListeners();

function loadEventListeners() {
    //When a new course is added

    courses.addEventListener('click', buyCourse);

    //When the remove button is clicked
    shoppingCartContent.addEventListener('click', removeCourse);

    //Clear Cart Btn
    clearCartBtn.addEventListener('click', clearCart);


}



//Function

function buyCourse(e) {
    e.preventDefault();
    
    //Use delegation to find the course that was added
    if(e.target.classList.contains('add-to-cart')) {
        //Read the course values
        const course = e.target.parentElement.parentElement;

        //read the values
        getCourseInfo(course);
    }

}

//Read the Html information of the selected course
function getCourseInfo(course) {
    //Create an object with course data
    const courseInfo = {
        image: course.querySelector('img').src,
        title: course.querySelector('h4').textContent,
        price: course.querySelector('.price span').textContent,
        id: course.querySelector('a').getAttribute('data-id')
    }
    //console.log(courseInfo);
    //Insert into the shopping cart
    addIntoCart(courseInfo);
}
//Display the selected course into the shopping cart

function addIntoCart(course) {
    // create a tr
    const row = document.createElement('tr');

    //Build the template
    row.innerHTML = `
             <tr>
                 <td>
                     <img src="${course.image}" width=100>
                 </td>
                 <td>${course.title}</td>
                 <td>${course.price}</td>
                 <td>
                    <a href="#" class="remove" data-id="${course.id}">X</a>
                 </td>


             </tr>
    
    `;
    //Add into the shopping cart 
    shoppingCartContent.appendChild(row);

    //Add course into storage
    saveIntoStorage(course);
}

//Add the courses into the local storage

function saveIntoStorage(course) {
    let courses = getCoursesFromStorage();

    // add the course into the array
    courses.push(course);

    // Since storage only saves strings, we need to convert JSON into string
    localStorage.setItem('courses', JSON.stringify(courses) );

}
//Get the contents from storage
function getCoursesFromStorage() {

    let courses;

    //If something exist on storage then we get the value, otherwise create an empty array
    if(localStorage.getItem('courses') === null) {
        courses = [];
    } else {
        courses = JSON.parse(localStorage.getItem('course') );
    }
    return courses;
}

//Remove course from the DOM
function removeCourse(e) {

    if(e.target.classList.contains('remove')) {
        e.target.parentElement.parentElement.remove();
    }

}
//Clears the shopping cart
function clearCart() {
    //shoppingCartContent.innerHTML = '';

    while(shoppingCartContent.firstChild) {
        shoppingCartContent.removeChild(shoppingCartContent.firstChild);

    }

}



