import PopupPlace from './PopupPlace';

export default class PopupAvatar extends PopupPlace {
  submitForm(event) {
    const { image } = this.popupForm.elements;
    const item = {};

    item.avatar = image.value;

    const img = new Image();
    img.onload = () => this.hendlerSubmit(item, '/avatar');
    img.onerror = () => alert('Ошибка загрузки рисунка');
    img.src = item.avatar;

    event.preventDefault();
    this.popupForm.reset();
    this.close();
  }
}
