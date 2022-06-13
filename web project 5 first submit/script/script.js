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

let galleryContainer = document.querySelector('.gallery__container');

const cardElements = initialCards.map(card => {
    const listItem = document.createElement("li");
    listItem.className = "gallery__item";
    listItem.innerHTML += "<img class='gallery__image' src='" + card.link + "'" + "alt='" + card.name + "'" + "/><button class= 'gallery__trash' type='button'></button><div class='gallery__info'><h2 class='gallery__text'>" + card.name + "</h2><button class='gallery__heart' type='button'></button></div>";
    return listItem;
});

galleryContainer.append(...cardElements);

let openProfilePopup = document.querySelector('.profile__editbtn');
let popupProfileContainer = document.querySelector('.popup_profile');
let popupProfileClose = popupProfileContainer.querySelector('.popup__close');
let formElementProfile = popupProfileContainer.querySelector('.popup__form');
let formNameProfile = popupProfileContainer.querySelector('.popup__text_type_name');
let formJobProfile = popupProfileContainer.querySelector('.popup__text_type_job');
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle');

openProfilePopup.addEventListener("click", editPopupProfile);
popupProfileClose.addEventListener("click", editProfileClose);
formElementProfile.addEventListener("submit", editProfileSubmit);

let openPlacePopup = document.querySelector('.profile__addbtn');
let popupPlaceContainer = document.querySelector('.popup_place');
let popupPlaceClose = popupPlaceContainer.querySelector('.popup__close');
let formElementPlace = popupPlaceContainer.querySelector('.popup__form');
let formTitlePlace = popupPlaceContainer.querySelector('.popup__text_type_title');
let formLinkPlace = popupPlaceContainer.querySelector('.popup__text_type_link');

openPlacePopup.addEventListener("click", editPopupPlace);
popupPlaceClose.addEventListener("click", editPlaceClose);
formElementPlace.addEventListener("submit", editPlaceSubmit);

let placeList = galleryContainer.querySelectorAll('.gallery__item');
let placeLikeBtnArray = galleryContainer.querySelectorAll('.gallery__heart');
let placeImageArray = galleryContainer.querySelectorAll('.gallery__image');
let placeTextArray = galleryContainer.querySelectorAll('.gallery__text');
let placeTrashArray = galleryContainer.querySelectorAll('.gallery__trash');
let popupImageContainer = document.querySelector('.popup__image');
let popupImageCloseBtn = popupImageContainer.querySelector('.popup__image__close');
let popupImageText = popupImageContainer.querySelector('.popup__image__text');
let popupImageImage = popupImageContainer.querySelector('.popup__image__image');

popupImageCloseBtn.addEventListener("click", popupImageClose);

renderList();

function editPopupProfile() {
    popupProfileContainer.classList.add("popup_opened");
    formNameProfile.value = profileName.textContent;
    formJobProfile.value = profileJob.textContent;
}

function editProfileClose() {
    popupProfileContainer.classList.remove("popup_opened");
}

function editProfileSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = formNameProfile.value;
    profileJob.textContent = formJobProfile.value;
    editProfileClose();
}

function editPopupPlace() {
    popupPlaceContainer.classList.add("popup_opened");
}

function editPlaceClose() {
    formTitlePlace.value = '';
    formLinkPlace.value = '';
    popupPlaceContainer.classList.remove("popup_opened");
}

function editPlaceSubmit(evt) {
    evt.preventDefault();
    addPlace();
    formTitlePlace.value = '';
    formLinkPlace.value = '';
    editPlaceClose();
}

function popupImageClose() {
    popupImageContainer.classList.remove("popup__image_opened");
}

function addPlace() {
    addListItem();
    createListItem();
}

function addListItem() {
    initialCards.unshift({
        name: formTitlePlace.value,
        link: formLinkPlace.value
    });
}

function createListItem() {
    const listItem = document.createElement("li");
    listItem.className = "gallery__item";
    listItem.innerHTML += "<img class='gallery__image' src='" + initialCards[0].link + "'" + "alt='" + initialCards[0].name + "'" + "/><button class= 'gallery__trash' type='button'></button><div class='gallery__info'><h2 class='gallery__text'>" + initialCards[0].name + "</h2><button class='gallery__heart' type='button'></button></div>";
    let newHeart = listItem.querySelector('.gallery__heart');
    newHeart.addEventListener("click", function clickLike() {
        if (newHeart.classList.contains("gallery__heart_clicked")) {
            newHeart.classList.remove("gallery__heart_clicked");
        } else {
            newHeart.classList.add("gallery__heart_clicked");
        }
    });
    let newTrash = listItem.querySelector('.gallery__trash');
    newTrash.addEventListener("click", function deletePlace() {
        galleryContainer.removeChild(listItem);
    });
    let newImage = listItem.querySelector('.gallery__image');
    let newText = listItem.querySelector('.gallery__text');
    newImage.addEventListener("click", function popupImageOpen() {
        popupImageImage.setAttribute("style", "background-image: url(" + newImage.src + ")");
        popupImageText.textContent = newText.textContent;
        popupImageContainer.classList.add("popup__image_opened");
    });
    galleryContainer.prepend(listItem);
}

function renderList() {
    for (let i = 0; i < placeList.length; i++) {
        placeLikeBtnArray[i].addEventListener("click", function clickLike() {
            if (placeLikeBtnArray[i].classList.contains("gallery__heart_clicked")) {
                placeLikeBtnArray[i].classList.remove("gallery__heart_clicked");
            } else {
                placeLikeBtnArray[i].classList.add("gallery__heart_clicked");
            }
        });
        placeTrashArray[i].addEventListener("click", function deletePlace() {
            galleryContainer.removeChild(placeList[i]);
        });

        placeImageArray[i].addEventListener("click", function popupImageOpen() {
            popupImageImage.setAttribute("style", "background-image: url(" + placeImageArray[i].src + ")");
            popupImageText.textContent = placeTextArray[i].textContent;
            popupImageContainer.classList.add("popup__image_opened");
        });
    }
}