export const focusEnd = (e: React.FocusEvent<HTMLInputElement>,setErrorMessage:Function): void => {
    if (e.target.value === '' && e.target.classList.contains('registration__name-input')) {
        setErrorMessage('Поле имя пользователя должно быть заполнено')
    } else if (e.target.value === '' && e.target.classList.contains('registration__password-input')) {
        setErrorMessage('Поле пароль должно быть заполнено')
    }
  }