export function stripscript(s) {
  var pattern = new RegExp(
    "[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—|{ }【】‘；：”“'。，、？]"
  );
  var rs = "";
  for (var i = 0; i < s.length; i++) {
    rs = rs + s.substr(i, 1).replace(pattern, "");
  }
  return rs;
}
const email = /^([a-zA-Z]|[0-9])(\w)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
export function validateEmail(val) {
  return email.test(val)
}
export const validatePassword = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/

export function validate_password(val) {
  return validatePassword.test(val)
}

export const validateCode = /^[a-z0-9]{6}$/
