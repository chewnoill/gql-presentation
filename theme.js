var blue = '#0af';

// example theme.js
export const theme = {
    // add a custom font
    font: '"Avenir Next", system-ui, sans-serif',
    // custom colors
    colors: {
        text: '#fff',
        background: '#111',
        blue: blue,
        link: blue,
        pre: blue,
        preBackground: '#000',
        code: blue
    },
  text:{
    heading: {
        textTransform: '',
        letterSpacing: '0.01em',
        fontWeight: 600,
      textAlign: 'center',
      maxWidth: '90%'
    },
    quote: {
        fontWeight: 600,
        fontSize: '12pt',
        paddingLeft: '10px',
        borderLeft: 'solid white 7px'
    }
  }
}

export const light = {
  ...theme,
  colors: {
    text: '#000',
    background: '#fff',
    blue: blue,
    link: blue,
    pre: blue,
    preBackground: '#000',
    code: blue
  }
}
