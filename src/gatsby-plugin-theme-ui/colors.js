
export const colors = {
    purple60: `#663399`,
    purple30: `#D9BAE8`,
    grey90: `#232129`,
    black80: `#1B1F23`,
    white: `#fff`,
    lightWhite: `rgba(255, 255, 255, 0.86)`,
    opaqueLightYellow: `rgba(255, 229, 100, 0.2)`,
    opaqueLightWhite: `hsla(0, 0%, 100%, 0.2)`,
    lightGray: `hsla(0, 0%, 0%, 0.2)`,

    highlight: {
        background: `#011627`,
        comment: `#809393`,
        string: `#addb67`,
        var: `#d6deeb`,
        number: `#f78c6c`,
        constant: `#82aaff`,
        punctuation: `#c792ea`,
        className: `#ffc98b`,
        tag: `#ffa7c4`,
        boolean: `#ff5874`,
        property: `#80cbc4`,
        namespace: `#b2ccd6`,
        highlight: `hsla(207, 95%, 15%, 1)`
    }
};

export default {
  text: colors.grey90,
  background: colors.white,
  primary: colors.purple60,
  secondary: colors.black80,
  muted: colors.lightGray,
  highlight: colors.opaqueLightYellow,
  heading: colors.grey90,
  prism: {
    ...colors.highlight
  },
  modes: {
    dark: {
      text: colors.lightWhite,
      background: colors.grey90,
      primary: colors.purple30,
      secondary: colors.lightWhite,
      muted: colors.opaqueLightWhite,
      highlight: colors.purple60,
      heading: colors.white,
    },
  },
  styles: {
      CodeSurfer: {
            pre: {
                color: colors.highlight.property,
                backgroundColor: colors.highlight.background
            },
            code: {
                color: colors.highlight.property,
                backgroundColor: colors.highlight.background
            },
            tokens: {
                "comment cdata doctype": {
                    fontStyle: "italic",
                    color: colors.highlight.comment
                },
                "builtin changed keyword": {
                    color: colors.highlight.tag
                }, 
                "plain interpolation": {
                    color: colors.highlight.var
                },
                "class-name": {
                    color: colors.highlight.className
                },
                "function function-variable method": {
                    color: colors.highlight.constant
                },
                "punctuation operator tag": {
                    color: colors.highlight.punctuation
                },
                "deleted string attr-value char": {
                    color: colors.highlight.string
                },
                "number inserted": {
                    color: colors.highlight.number
                },
                "line-number": {
                    opacity: 0.8
                }
            },
            title: {
                backgroundColor: colors.highlight.background,
                color: colors.highlight.property
            },
            subtitle: {
                color: colors.highlight.namespace,
                backgroundColor: colors.highlight.background
            },
            unfocused: {
                opacity: 0.1
            }
      }
  }
}
