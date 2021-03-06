/**
 * Copyright 2017 CA
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* @flow */
import React from 'react';
import { createStyledComponent } from '../../utils';

type Props = {
  children: React$Node,
  variant?: string
};

const Root = createStyledComponent('span', ({ theme, variant }) => {
  const backgroundColor =
    variant === 'regular'
      ? theme.color_gray_50
      : theme[`backgroundColor_${variant}`];

  const color =
    variant === 'regular' ? theme.color_text : theme[`color_text_on${variant}`];

  return {
    backgroundColor,
    borderRadius: theme.borderRadius_1,
    color,
    fontSize: theme.fontSize_mouse,
    lineHeight: theme.lineHeight_prose,
    padding: `${parseFloat(theme.space_inset_sm) / 2}em
      ${theme.space_inset_sm}`,
    textTransform: 'uppercase',
    verticalAlign: 'middle',
    whiteSpace: 'nowrap'
  };
});

export default function Label({
  children,
  variant = 'regular',
  ...restProps
}: Props) {
  const rootProps = { variant, ...restProps };

  return <Root {...rootProps}>{children}</Root>;
}
