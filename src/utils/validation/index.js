/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

// See comments on chain and nullSafeChain to understand what is going on here.
import chain from "./chain";
import nullSafeChain from "./nullSafeChain";

import booleanValidator from "./booleanValidator";
import callbackValidator from "./callbackValidator";
import createArrayOfValidator from "./createArrayOfValidator";
import createDefaultValidator from "./createDefaultValidator";
import createMinimumValidator from "./createMinimumValidator";
import createObjectOfValidator from "./createObjectOfValidator";
import createUniqueValidator from "./createUniqueValidator";
import domainValidator from "./domainValidator";
import integerValidator from "./integerValidator";
import nonEmptyValidator from "./nonEmptyValidator";
import numberValidator from "./numberValidator";
import regexpValidator from "./regexpValidator";
import requiredValidator from "./requiredValidator";
import stringValidator from "./stringValidator";

// The base validator does no validation and just returns the value unchanged
const base = value => value;

// The 'default' and 'required' methods are available after any data-type method
// Don't use the nullSafeChain because they need to handle the null or undefined case
base.default = function _default(defaultValue) {
  return chain(this, createDefaultValidator(defaultValue));
};
base.required = function required() {
  return chain(this, requiredValidator);
};

// helper validators
const domain = function domain() {
  return nullSafeChain(this, domainValidator);
};
const minimumInteger = function minimumInteger(minValue) {
  return nullSafeChain(this, createMinimumValidator("an integer", minValue));
};
const minimumNumber = function minimumNumber(minValue) {
  return nullSafeChain(this, createMinimumValidator("a number", minValue));
};
const integer = function integer() {
  return nullSafeChain(this, integerValidator, { minimum: minimumInteger });
};
const nonEmpty = function nonEmpty() {
  return nullSafeChain(this, nonEmptyValidator);
};
const regexp = function regexp() {
  return nullSafeChain(this, regexpValidator);
};
const unique = function createUnique() {
  return nullSafeChain(this, createUniqueValidator());
};

// data-type validators.  These are the first functions that are called to create a validator.
const arrayOf = function arrayOf(elementValidator) {
  return nullSafeChain(this, createArrayOfValidator(elementValidator));
};
const boolean = function boolean() {
  return nullSafeChain(this, booleanValidator);
};
const callback = function callback() {
  return nullSafeChain(this, callbackValidator);
};
const number = function number() {
  return nullSafeChain(this, numberValidator, {
    minimum: minimumNumber,
    integer,
    unique
  });
};
const objectOf = function objectOf(schema) {
  return nullSafeChain(this, createObjectOfValidator(schema));
};
const string = function string() {
  return nullSafeChain(this, stringValidator, {
    regexp,
    domain,
    nonEmpty,
    unique
  });
};

const boundArrayOf = arrayOf.bind(base);
const boundBoolean = boolean.bind(base);
const boundCallback = callback.bind(base);
const boundNumber = number.bind(base);
const boundObjectOf = objectOf.bind(base);
const boundString = string.bind(base);

export {
  boundArrayOf as arrayOf,
  boundBoolean as boolean,
  boundCallback as callback,
  boundNumber as number,
  boundObjectOf as objectOf,
  boundString as string
};
