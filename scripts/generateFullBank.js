const fs = require('fs');
const path = require('path');

// Topics list
const topics = [
  { id: 'a1-to-be', prefix: 'a1-tb', topicName: 'To Be' },
  { id: 'a1-present-simple', prefix: 'a1-ps', topicName: 'Present Simple' },
  { id: 'a1-articles', prefix: 'a1-art', topicName: 'Articles' },
  { id: 'a1-there-is-are', prefix: 'a1-th', topicName: 'There is/are' },
  { id: 'a2-past-simple', prefix: 'a2-ps', topicName: 'Past Simple' },
  { id: 'a2-past-continuous', prefix: 'a2-pc', topicName: 'Past Continuous' },
  { id: 'a2-future-plans', prefix: 'a2-fut', topicName: 'Future Plans' },
  { id: 'b1-present-perfect', prefix: 'b1-pp', topicName: 'Present Perfect' },
  { id: 'b1-conditionals', prefix: 'b1-cond', topicName: 'Conditionals' },
  { id: 'b1-phrasal-verbs', prefix: 'b1-pv', topicName: 'Phrasal Verbs' },
  { id: 'b2-passive-voice', prefix: 'b2-pv', topicName: 'Passive Voice' },
  { id: 'b2-reported-speech', prefix: 'b2-rs', topicName: 'Reported Speech' },
  { id: 'b2-mixed-conditionals', prefix: 'b2-mc', topicName: 'Mixed Conditionals' },
  { id: 'c1-inversion', prefix: 'c1-inv', topicName: 'Inversion' },
  { id: 'c1-cleft-sentences', prefix: 'c1-cl', topicName: 'Cleft Sentences' },
];

console.log('Generating full exercise bank...');
