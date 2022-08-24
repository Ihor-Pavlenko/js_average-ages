'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of person's death by 100: Math.ceil(person.died / 100)
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */

// const people = require('./people');

function calculateMenAverageAge(people, century) {
  const sorted = century
    ? people.filter(a => a.sex === 'm' && century === Math.ceil(a.died / 100))
    : people.filter(a => a.sex === 'm');

  const average = sorted.reduce((prev, b) => {
    return prev + (b.died - b.born);
  }, 0);

  return average / sorted.length;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find someone who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const sorted = withChildren
    ? people.filter(a => a.sex === 'f' && people.some(b => a.name === b.mother))
    : people.filter(a => a.sex === 'f');

  const average = sorted.reduce((prev, b) => {
    return prev + (b.died - b.born);
  }, 0);

  return average / sorted.length;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a child and his or her
 * mother in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for sons and their mothers.
 *child.mother
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people.filter((child) => onlyWithSon
    ? child.sex === 'm' && child.mother : child.mother);
  const diff = children.map(child => {
    const mother = people.find(woman => woman.name === child.mother);

    return mother
      ? child.born - mother.born : null;
  });

  const filteredDiff = diff.filter(item => item);

  return filteredDiff.reduce((a, b) => a + b, 0) / filteredDiff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
