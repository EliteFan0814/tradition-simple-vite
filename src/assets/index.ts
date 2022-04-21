let fpcrun = '范培超'
let syqName = '宋艺青'
function init() {
  console.log(fpcrun)
  console.log(syqName)
}
// valStr 确保是一个字符串类型
const limitToNumberStr = function (valStr: string) {
  let tempValue = valStr.toString()
  console.log(
    tempValue
      .replace(/[^0-9.]/g, '')
      .replace('.', '#*')
      .replace(/\./g, '')
      .replace('#*', '.')
  )
  return tempValue
    .replace(/[^0-9.]/g, '')
    .replace('.', '#*')
    .replace(/\./g, '')
    .replace('#*', '.')
}
limitToNumberStr('sdfe23vf3gr')
init()
export {}
