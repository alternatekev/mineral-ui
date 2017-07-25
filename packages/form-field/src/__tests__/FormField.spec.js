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
import { shallow } from 'enzyme';
import FormField from '../FormField';
import examples from '../__demo__/examples';
import testDemoExamples from '../../../../utils/test/testDemoExamples';

function renderFormField() {
  return shallow(<FormField label="Sample">children</FormField>);
}

describe('FormField', () => {
  it('renders', () => {
    const FormField = renderFormField();

    expect(FormField.exists()).toEqual(true);
  });

  testDemoExamples(examples);
});
