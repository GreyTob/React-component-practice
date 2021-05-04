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
