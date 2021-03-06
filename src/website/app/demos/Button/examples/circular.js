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
import { createStyledComponent } from '../../../../../utils';
import Button from '../../../../../Button';
import IconCloud from '../../../../../Icon/IconCloud';

const DemoLayout = createStyledComponent('div', {
  '& > button': {
    marginRight: '0.5rem'
  }
});

export default {
  id: 'circular',
  title: 'Circular Buttons',
  description:
    'Buttons can be made circular. Such Buttons should not have any text.',
  scope: { Button, IconCloud, DemoLayout },
  source: `
    () => {
      const icon = <IconCloud />;

      return (
        <DemoLayout>
          <Button iconStart={icon} circular aria-label="Cloud" />
          {/* primary */}
          <Button iconStart={icon} circular primary aria-label="Cloud" />
          {/* minimal */}
          <Button iconStart={icon} circular minimal aria-label="Cloud" />
          {/* small */}
          <Button iconStart={icon} circular size="small" aria-label="Cloud" />
          {/* large */}
          <Button iconStart={icon} circular size="medium" aria-label="Cloud" />
          {/* jumbo */}
          <Button iconStart={icon} circular size="jumbo" aria-label="Cloud" />
        </DemoLayout>
      );
    }`
};
