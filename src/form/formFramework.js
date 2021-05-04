//будем создавать функцию для control  QuizCreator

export function createControl(config, validation) {
  return {
    ...config, //оператор spread раззавернет переданыне в фунцию config
    validation,
    valid: !validation, //что бы изначальное значение было false
    touched: false,
    value: '',
  }
}

//валидация input (пример в Auth.js)
export function validate(value, validation = null) {
  if (!validation) {
    return true
  }

  let isValid = true

  if (validation.required) {
    isValid = value.trim() && isValid
  }

  return isValid
}

//общая вадилация формы создания вопросов
export function validateForm(formControls) {
  let isFormValid = true

  for (let control in formControls) {
    //свойство hasOwnProperty чтобы не заходить в прототир объекта formControls
    if (formControls.hasOwnProperty(control)) {
      isFormValid = formControls[control].valid && isFormValid
    }
  }

  return isFormValid
}
