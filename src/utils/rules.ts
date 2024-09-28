export const requiredCheck = (val: unknown) => {
  if (typeof val === 'number') {
    if (val || val === 0) return false
    else return 'This field is required'
  } else if (val) return false
  else return 'This field is required'
}
