const fs = require('fs');
const files = ['a1Lessons.ts', 'a2Lessons.ts', 'b1Lessons.ts', 'b2Lessons.ts', 'c1Lessons.ts'];
let total = 0;
for (const f of files) {
  const content = fs.readFileSync('./src/data/courses/' + f, 'utf8');
  const ids = Array.from(content.matchAll(/id:\s*['"]([^'"]+)['"]/g), m => m[1]);
  console.log(f, ids.length, ids.slice(0, 3));
  total += ids.length;
}
console.log('Total topics:', total);
