let openPopup = document.querySelector('.profile__elements_info-editbtn');
let popupContainer = document.querySelector('.popup');
let popupClose = document.querySelector('.popup__container_form-close');
let submitBtn = document.querySelector('.popup__container_form-submit');
let formElement = document.querySelector('.popup__container_form');
let formName = document.querySelector('.popup__container_form-name');
let formJob = document.querySelector('.popup__container_form-job');
let profileName = document.querySelector('.profile__elements_info-title');
let profileJob = document.querySelector('.profile__elements_info-subtitle');

function editPopup() {
    popupContainer.style.display = "flex";
    formName.value = profileName.textContent;
    formJob.value = profileJob.textContent;
}

function editFormClose() {
    popupContainer.style.display = "none";
}

function editFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = formName.value;
    profileJob.textContent = formJob.value;
    popupContainer.style.display = "none";
}

openPopup.addEventListener("click", editPopup);
popupClose.addEventListener("click", editFormClose);
submitBtn.addEventListener("click", editFormSubmit);
