export const secondaryTextItalic = {
  color: '#808080',
  fontSize: '85%',
  fontStyle: 'italic'
}

export const dropdownStyle = {
  fontSize: 'inherit',
  border: '1px solid black',
  cursor: 'pointer'
}

export const textButtonStyle = {
  fontSize: 'inherit',
  border: '1px solid black',
  borderRadius: '0.25em',
  cursor: 'pointer',
  minWidth: '6em',
  lineHeight: '1.5em',
  padding: '0.1em 0.5em'
}

export const secondaryTextButtonStyle = {
  ...secondaryTextItalic,
  ...textButtonStyle,
  fontStyle: '',
  background: '#ececec',
  border: `1px solid ${secondaryTextItalic.color}`,
  padding: '0.1em 0.5em 0.25em 0.5em'
}

export const textInputStyle = {
  fontSize: 'inherit',
  border: '1px solid black',
  borderRadius: '0.25em',
  lineHeight: '1.5em'
}

export const highlightColor = '#ffc266'
