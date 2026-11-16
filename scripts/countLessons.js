const fs = require('fs');
// Let's count lessons that have lessonNumber defined or check TOPICS
const files = ['a1Lessons.ts', 'a2Lessons.ts', 'b1Lessons.ts', 'b2Lessons.ts', 'c1Lessons.ts'];
for (const f of files) {
  const content = fs.readFileSync('./src/data/courses/' + f, 'utf8');
  const lessons = content.split('lessonNumber:').length - 1;
  console.log(f, 'has lessonNumber count:', lessons);
}
