class PopupEdit extends PopupPlace {
  // Обработчик нажатия кнопки для открытия popup
  hendlerPopupOpen() {
    this.popupForm.querySelector('.popup__button').setAttribute('disabled', true);
    this.clearErrorLabel();
    this.popupForm.querySelector('.popup__input_type_name-edit').value = document.querySelector(
      '.user-info__name'
    ).textContent;
    this.popupForm.querySelector('.popup__input_type_job').value = document.querySelector(
      '.user-info__job'
    ).textContent;
    this.open();
  }

  // Обработчик нажатия кнопки для редактирования профиля
  submitForm(event) {
    const { person, job } = this.popupForm.elements;
    const item = {};
    [item.name, item.about] = [person.value, job.value];

    this.hendlerSubmit(item, '');

    event.preventDefault();
    this.close();
  }
}
