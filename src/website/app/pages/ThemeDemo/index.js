import React from 'react';
import { StickyContainer, Sticky } from 'react-sticky';
import range from 'lodash/range';
import { readableColor } from 'polished';
import {
  createStyledComponent,
  createTheme,
  mineralTheme
} from '../../../../utils';
import Heading from '../../Heading';
import Paragraph from '../../Paragraph';
import GuidelinePage from '../../GuidelinePage';
import ThemeProvider from '../../../../ThemeProvider';
import Button from '../../../../Button';
import _Card, { CardBlock, CardTitle } from '../../../../Card';
import Dropdown from '../../../../Dropdown';
import IconBatteryCharging50 from '../../../../Icon/IconBatteryCharging50';
import IconQuestionAnswer from '../../../../Icon/IconQuestionAnswer';
import IconDirectionsBoat from '../../../../Icon/IconDirectionsBoat';
import IconSpa from '../../../../Icon/IconSpa';
import IconShoppingCart from '../../../../Icon/IconShoppingCart';
import Link from '../../../../Link';
import Menu, { MenuItem as _MenuItem, MenuDivider } from '../../../../Menu';
import Sidebar from './Sidebar';

const dropdownData = [
  {
    title: 'Menu Title',
    items: [
      { text: 'Menu Item', endIcon: <IconSpa /> },
      { text: 'Menu Item' },
      { text: 'With icon', iconStart: <IconShoppingCart /> },
      { text: 'Menu Item' }
    ]
  }
];

const transitionEffect = '1500ms cubic-bezier(0.23, 1, 0.32, 1)';

const styles = {
  card: ({ theme }) => ({
    margin: `${theme.space_stack_xxl} 0`
  }),
  demoLayout: ({ theme }) => ({
    display: 'flex',
    // transitions must be applied to the hierarchy differently due to the way
    // Chrome and FF propogate transitions to children differently.
    '& svg': {
      transition: `fill ${transitionEffect}`
    },
    '& a': {
      transition: `color ${transitionEffect}`
    },
    '& button': {
      transition: `color ${transitionEffect}, background-color ${transitionEffect}`,
      marginRight: theme.space_inline_md,
      marginBottom: theme.space_stack_md
    },
    '@media(max-width: 45em)': {
      flexDirection: 'column'
    }
  }),
  leftColumn: ({ theme }) => ({
    flex: '1 1 auto',
    marginRight: theme.space_inline_md
  }),
  middleColumn: ({ theme }) => ({
    width: '20rem',
    display: 'flex',
    '& > div': {
      marginRight: theme.space_inline_md
    }
  }),
  rightColumn: ({ theme }) => ({
    width: '20rem',
    minWidth: '20rem',
    '@media(max-width: 45em)': {
      borderTop: `1px solid ${theme.color_gray_30}`,
      top: 'auto',
      maxWidth: '100%',
      width: '100vw',
      zIndex: 101, // So it's on top of the popover

      '& > div > div:nth-child(2)': {
        // The Sticky HOC receives styles inline, so we have to
        // override them here since we want different behavior on mobile
        position: 'fixed',
        bottom: 0,
        top: 'auto !important',
        left: '0 !important',
        width: '100vw !important',
        maxWidth: '100%'
      }
    }
  }),
  hue: ({ theme, color }) => ({
    backgroundColor: color,
    color: readableColor(color),
    margin: 0,
    padding: theme.space_inset_md,
    transition: `color ${transitionEffect}, background-color ${transitionEffect}`
  }),
  icon: ({ theme }) => ({
    fill: theme.color_text_primary
  }),
  lede: ({ theme }) => ({
    fontSize: theme.fontSize_h3,
    marginBottom: theme.space_stack_xxl
  }),
  menuContainer: ({ theme }) => ({
    backgroundColor: theme.color_text_disabled,
    padding: theme.space_inset_lg,
    margin: `${theme.space_stack_xxl} 0`,
    maxWidth: '15rem',
    '& > div': {
      backgroundColor: 'white'
    }
  }),
  menuItem: {
    '& svg': {
      transition: `fill ${transitionEffect}`
    }
  },
  paragraph: ({ theme }) => ({
    margin: `${theme.space_stack_xxl} 0`
  })
};

const Card = createStyledComponent(_Card, styles.card);
const DemoLayout = createStyledComponent(StickyContainer, styles.demoLayout);
const LeftColumn = createStyledComponent('div', styles.leftColumn);
const MiddleColumn = createStyledComponent('div', styles.middleColumn);
const RightColumn = createStyledComponent('div', styles.rightColumn);
const Hue = createStyledComponent(Paragraph, styles.hue);
const Icon1 = createStyledComponent(IconBatteryCharging50, styles.icon);
const Icon2 = createStyledComponent(IconQuestionAnswer, styles.icon);
const Icon3 = createStyledComponent(IconDirectionsBoat, styles.icon);
const InlineText = createStyledComponent(Paragraph, styles.paragraph);
const Lede = createStyledComponent('p', styles.lede);
const MenuContainer = createStyledComponent('div', styles.menuContainer);
const MenuItem = createStyledComponent(_MenuItem, styles.menuItem);

export default class ThemeDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { theme: mineralTheme, activeColor: 'blue' };
  }

  handleThemeChange = color => {
    this.setState({ theme: createTheme(color), activeColor: color });
  };

  render() {
    const { activeColor, theme } = this.state;

    return (
      <GuidelinePage>
        <Heading level={1}>Theme Playground</Heading>
        <Lede>
          Mineral UI themes are composed of a main color ramp and the base gray
          ramp. Every theme uses the base gray ramp. Choose from the main theme
          colors on the right to see how components are affected.
        </Lede>
        <ThemeProvider theme={theme}>
          <DemoLayout>
            <LeftColumn>
              <Button primary>Primary Button</Button>
              <Button>Regular Button</Button>
              <Button minimal>Minimal Button</Button>
              <Card>
                <CardTitle subtitle="Card subtitle here">Card Title</CardTitle>
                <CardBlock>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  mattis pretium massa.{' '}
                  <Link href="https://mineral-ui.com">Aliquam</Link> erat
                  volutpat. Nulla facilisi. Donec vulputate interdum
                  sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                </CardBlock>
              </Card>
              <Button iconEnd={<IconSpa />}>Button With Icon</Button>
              <Button
                size="jumbo"
                circular
                iconStart={<IconBatteryCharging50 />}
              />
              <Button size="jumbo" iconStart={<IconShoppingCart />} />
              <Dropdown data={dropdownData} isOpen={true}>
                <Button>Always Open Dropdown</Button>
              </Dropdown>
              <InlineText variant="prose">
                A link to <Link href="http://example.com">example.com</Link>.
              </InlineText>
              <Icon2 size="5em" />
              <Icon1 size="5em" />
              <Icon3 size="5em" />
              <MenuContainer>
                <Menu>
                  <MenuItem iconStart={<IconSpa />} iconEnd={<IconSpa />}>
                    With icons
                  </MenuItem>
                  <MenuItem variant="success">Success</MenuItem>
                  <MenuItem variant="warning">Warning</MenuItem>
                  <MenuDivider />
                  <MenuItem variant="danger">Danger</MenuItem>
                </Menu>
              </MenuContainer>
            </LeftColumn>
            <MiddleColumn>
              <div>
                <Paragraph variant="ui">Main theme color</Paragraph>
                {range(10, 110, 10).map(index => {
                  const color = theme[`color_theme_${index}`];
                  return (
                    <Hue key={`hue_${index}`} color={color} variant="mouse">
                      {`theme_${index}`}
                      <br />
                      {color}
                    </Hue>
                  );
                })}
              </div>
              <div>
                <Paragraph variant="ui">Theme gray</Paragraph>
                {range(10, 110, 10).map(index => {
                  const color = theme[`color_gray_${index}`];
                  return (
                    <Hue key={`hue_${index}`} color={color} variant="mouse">
                      {`gray_${index}`}
                      <br />
                      {color}
                    </Hue>
                  );
                })}
              </div>
            </MiddleColumn>
            <RightColumn>
              <Sticky>
                {({ style }) => {
                  return (
                    <Sidebar
                      style={style}
                      onChangeTheme={this.handleThemeChange}
                      activeColor={activeColor}
                    />
                  );
                }}
              </Sticky>
            </RightColumn>
          </DemoLayout>
        </ThemeProvider>
      </GuidelinePage>
    );
  }
}
