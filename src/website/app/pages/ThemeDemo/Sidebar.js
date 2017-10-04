import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { readableColor } from 'polished';
import { createStyledComponent, color } from '../../../../utils';
import IconKeyboardArrowDown from '../../../../Icon/IconKeyboardArrowDown';
import IconKeyboardArrowUp from '../../../../Icon/IconKeyboardArrowUp';
import Heading from '../../Heading';
import Paragraph from '../../Paragraph';

type Props = {
  activeColor: string,
  onChangeTheme: () => {},
  style: Object
};

type FadeProps = {
  children: React$Node
};

const availableThemes = [
  'magenta',
  'purple',
  'indigo',
  'blue',
  'sky',
  'teal',
  'lime',
  'orange',
  'slate',
  'dusk'
];

const styles = {
  collapseIcon: {
    cursor: 'pointer',
    position: 'absolute',
    display: 'none',
    right: 0,
    top: 0,
    '@media(max-width: 45em)': {
      display: 'block'
    }
  },
  option: ({ theme, active, readableColor, name }) => {
    const css = {
      backgroundColor: color[`${name}_60`],
      borderRadius: theme.borderRadius_1,
      color: readableColor,
      cursor: 'pointer',
      display: 'inline-block',
      height: 70,
      marginTop: 0,
      marginBottom: theme.space_stack_sm,
      overflow: 'hidden',
      padding: theme.space_inset_md,
      position: 'relative',
      transition: 'transform 600ms cubic-bezier(0.23, 1, 0.32, 1)',
      transformStyle: 'preserve-3d',
      width: `calc(50% - ${parseFloat(theme.space_inline_md) / 2}em)`,
      '&:hover': {
        transform: 'scale(1.05) rotateX(0deg) translate3d(0, 0, 0)'
      },
      '&:nth-child(odd)': {
        marginRight: theme.space_inline_md
      },
      '@media(max-width: 45em)': {
        height: 'auto'
      }
    };

    if (active) {
      css['&:after'] = {
        position: 'absolute',
        top: -15,
        right: -15,
        content: `""`,
        width: 30,
        height: 30,
        backgroundColor: 'white',
        transform: 'rotate(45deg)'
      };
    }

    return css;
  },
  optionList: ({ collapsed }) => ({
    '@media(max-width: 45em)': {
      display: collapsed ? 'none' : 'block'
    }
  }),
  root: ({ theme }) => ({
    backgroundColor: 'white',
    padding: `${theme.space_inset_md} ${theme.space_inset_md} 0`,
    perspective: '800px',
    '& .fade-enter': {
      opacity: '0.01',
      transform: 'scale(1.1) rotateX(-40deg) translate3d(0, 20px, 50px)'
    },
    '& .fade-enter.fade-enter-active': {
      opacity: 1,
      transform: 'scale(1) rotateX(0deg) translate3d(0, 0, 0)',
      transition: 'opacity 300ms ease-in, transform 300ms ease-out'
    }
  }),
  title: ({ theme }) => ({
    marginTop: 0,
    '@media(max-width: 45em)': {
      margin: `0 0 ${theme.space_stack_sm}`
    }
  })
};

const Root = createStyledComponent('div', styles.root);
const Collapsed = createStyledComponent(
  IconKeyboardArrowUp,
  styles.collapseIcon
);
const Expanded = createStyledComponent(
  IconKeyboardArrowDown,
  styles.collapseIcon
);
const OptionList = createStyledComponent(TransitionGroup, styles.optionList);
const Option = createStyledComponent(Paragraph, styles.option);
const Title = createStyledComponent(Heading, styles.title);

const Fade = ({ children, ...props }: FadeProps) => (
  <CSSTransition {...props} timeout={300} classNames="fade">
    {children}
  </CSSTransition>
);

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { collapsed: false, themes: [] };
  }

  props: Props;

  componentDidMount() {
    this.interval = setInterval(() => {
      if (this.state.themes.length === availableThemes.length) {
        clearInterval(this.interval);
      } else {
        this.setState({
          themes: [
            ...this.state.themes,
            availableThemes[this.state.themes.length]
          ]
        });
      }
    }, 50);
  }

  render() {
    const { onChangeTheme, activeColor, style } = this.props;
    const { collapsed, themes } = this.state;

    return (
      <Root style={style}>
        {collapsed ? (
          <Collapsed
            size="4em"
            onClick={() => this.setState({ collapsed: false })}
          />
        ) : (
          <Expanded
            size="4em"
            onClick={() => this.setState({ collapsed: true })}
          />
        )}
        <Title level={2}>Mineral Themes</Title>
        <OptionList collapsed={collapsed}>
          {themes.map(colorName => {
            const readable = readableColor(color[`${colorName}_60`]);

            return (
              <Fade key={colorName}>
                <Option
                  variant="mouse"
                  active={activeColor === colorName}
                  name={colorName}
                  readableColor={readable}
                  onClick={() => onChangeTheme(colorName)}>
                  {colorName}
                  <br />
                  {color[`${colorName}_60`]}
                </Option>
              </Fade>
            );
          })}
        </OptionList>
      </Root>
    );
  }
}
