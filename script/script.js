const initialCards = [
    {
        name: "Yosemite Valley",
        link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
    },
    {
        name: "Lake Louise",
        link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
    },
    {
        name: "Bald Mountains",
        link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
    },
    {
        name: "Latemar",
        link: "https://code.s3.yandex.net/web-code/latemar.jpg"
    },
    {
        name: "Vanoise National Park",
        link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
    },
    {
        name: "Lago di Braies",
        link: "https://code.s3.yandex.net/web-code/lago.jpg"
    }
];

const galleryContainer = document.querySelector('.gallery__container');

initialCards.forEach((card) => {
    renderCard(card);
})

let openProfilePopup = document.querySelector('.profile__editbtn');
let popupProfileContainer = document.querySelector('.popup_profile');
let popupProfileClose = popupProfileContainer.querySelector('.popup__close');
let formElementProfile = popupProfileContainer.querySelector('.popup__form');
let formNameProfile = popupProfileContainer.querySelector('.popup__text_type_name');
let formJobProfile = popupProfileContainer.querySelector('.popup__text_type_job');
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle');

openProfilePopup.addEventListener('click', function () { openPopup(popupProfileContainer) });
popupProfileClose.addEventListener('click', function () { closePopup(popupProfileContainer) });
formElementProfile.addEventListener("submit", submitProfileForm);

let openPlacePopup = document.querySelector('.profile__addbtn');
let popupPlaceContainer = document.querySelector('.popup_place');
let popupPlaceClose = popupPlaceContainer.querySelector('.popup__close');
let formElementPlace = popupPlaceContainer.querySelector('.popup__form');
let formTitlePlace = popupPlaceContainer.querySelector('.popup__text_type_title');
let formLinkPlace = popupPlaceContainer.querySelector('.popup__text_type_link');

openPlacePopup.addEventListener('click', function () { openPopup(popupPlaceContainer) });
popupPlaceClose.addEventListener('click', function () { closePopup(popupPlaceContainer) });
formElementPlace.addEventListener("submit", submitPlaceForm);

let placeList = galleryContainer.querySelectorAll('.gallery__item');
let placeLikeBtnArray = galleryContainer.querySelectorAll('.gallery__heart');
let placeImageArray = galleryContainer.querySelectorAll('.gallery__image');
let placeTextArray = galleryContainer.querySelectorAll('.gallery__text');
let placeTrashArray = galleryContainer.querySelectorAll('.gallery__trash');
let popupImageContainer = document.querySelector('.popup-image');
let popupImageCloseBtn = popupImageContainer.querySelector('.popup-image__close');
let popupImageText = popupImageContainer.querySelector('.popup-image__text');
let popupImageImage = popupImageContainer.querySelector('.popup-image__image');

popupImageCloseBtn.addEventListener("click", closePopupImage);

function openPopup(popup) {
    popup.classList.add("popup_opened");
    formNameProfile.value = profileName.textContent;
    formJobProfile.value = profileJob.textContent;
}

function closePopup(popup) {
    popup.classList.toggle("popup_opened");
}

function submitProfileForm(evt) {
    evt.preventDefault();
    profileName.textContent = formNameProfile.value;
    profileJob.textContent = formJobProfile.value;
    closePopup(popupProfileContainer);
}

function submitPlaceForm(evt) {
    evt.preventDefault();
    const card = ({
        name: formTitlePlace.value,
        link: formLinkPlace.value
    });
    renderCard(card);
    closePopup(popupPlaceContainer);
    formElementPlace.reset();
}

function closePopupImage() {
    popupImageContainer.classList.toggle("popup-image_opened");
}

function renderCard(card) {
    const cardElement = createCard(card);
    galleryContainer.prepend(cardElement);
}

function createCard(card) {
    const listItem = document.createElement("li");
    listItem.className = "gallery__item";
    listItem.innerHTML += "<img class='gallery__image' src='" + card.link + "'" + "alt= Photo of " + card.name + "'" + "/><button class= 'gallery__trash' type='button'></button><div class='gallery__info'><h2 class='gallery__text'>" + card.name + "</h2><button class='gallery__heart' type='button'></button></div>";
    let newHeart = listItem.querySelector('.gallery__heart');
    newHeart.addEventListener("click", function clickLike() {
        newHeart.classList.toggle("gallery__heart_clicked");
    });
    let newTrash = listItem.querySelector('.gallery__trash');
    newTrash.addEventListener("click", function deletePlace() {
        galleryContainer.removeChild(listItem);
    });
    let newImage = listItem.querySelector('.gallery__image');
    let newText = listItem.querySelector('.gallery__text');
    newImage.addEventListener("click", function openImagePopup() {
        popupImageImage.setAttribute("style", "background-image: url(" + newImage.src + ")");
        popupImageText.textContent = newText.textContent;
        popupImageContainer.classList.toggle("popup-image_opened");
    });
    return listItem;
}