# -*- coding: utf-8 -*-
"""
Assembles all 12 category files (200 words each = 2400 words)
into src/data/vocabularyWords.json and src/data/vocabularyBank.ts.
"""

import os
import sys
import json

project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
if project_root not in sys.path:
    sys.path.insert(0, project_root)

CATEGORIES = [
    {
        "id": "daily",
        "nameUk": "Повсякдення & Дім",
        "nameEn": "Daily Life & Home",
        "emoji": "☕",
        "descriptionUk": "Розпорядок дня, оселя, базові дії, час та щоденні звички"
    },
    {
        "id": "travel",
        "nameUk": "Подорожі & Транспорт",
        "nameEn": "Travel & Transport",
        "emoji": "✈️",
        "descriptionUk": "Аеропорт, вокзал, готелі, квитки, орієнтування у місті"
    },
    {
        "id": "food",
        "nameUk": "Їжа, Напої & Ресторани",
        "nameEn": "Food & Dining",
        "emoji": "🍕",
        "descriptionUk": "Продукти, ресторанне меню, приготування страв та смаки"
    },
    {
        "id": "career",
        "nameUk": "Робота, Бізнес & Кар'єра",
        "nameEn": "Work & Business",
        "emoji": "💼",
        "descriptionUk": "Офіс, співбесіда, дедлайни, переговори, фінанси та проєкти"
    },
    {
        "id": "emotions",
        "nameUk": "Емоції & Характер",
        "nameEn": "Emotions & People",
        "emoji": "🧠",
        "descriptionUk": "Почуття, психологія, риси особистості та стосунки"
    },
    {
        "id": "tech",
        "nameUk": "Технології & IT",
        "nameEn": "Technology & Science",
        "emoji": "💻",
        "descriptionUk": "Інтернет, безпека, штучний інтелект, ґаджети та розробка"
    },
    {
        "id": "health",
        "nameUk": "Здоров'я & Тіло",
        "nameEn": "Health & Body",
        "emoji": "🏥",
        "descriptionUk": "Медицина, самопочуття, спорт, симптоми та візит до лікаря"
    },
    {
        "id": "education",
        "nameUk": "Освіта & Мова",
        "nameEn": "Education & Learning",
        "emoji": "📚",
        "descriptionUk": "Школа, університет, вивчення мови, іспити та навички"
    },
    {
        "id": "phrasal",
        "nameUk": "Фразові дієслова",
        "nameEn": "Phrasal Verbs Essentials",
        "emoji": "🚀",
        "descriptionUk": "Найважливіші фразові дієслова для щоденного вільного мовлення"
    },
    {
        "id": "idioms",
        "nameUk": "Ідіоми & Розмовна мова",
        "nameEn": "Idioms & Spoken Expressions",
        "emoji": "💬",
        "descriptionUk": "Стійкі образні вирази, метафори та жива мова носіїв"
    },
    {
        "id": "society",
        "nameUk": "Суспільство & Екологія",
        "nameEn": "Society & Environment",
        "emoji": "🌍",
        "descriptionUk": "Соціальні явища, клімат, природа, культура та право"
    },
    {
        "id": "academic",
        "nameUk": "C1 Академічна лексика & Дебати",
        "nameEn": "C1 Advanced & Discourse",
        "emoji": "🎓",
        "descriptionUk": "Високий рівень C1: академічне письмо, аргументація та науковий стиль"
    }
]

cat_ids = [c["id"] for c in CATEGORIES]

all_words = []
current_id = 1

for cid in cat_ids:
    mod = __import__(f'scripts.data.cat_{cid}', fromlist=['words'])
    words_list = mod.words
    print(f"Loading {cid}: {len(words_list)} words")
    for item in words_list:
        word, transcription, translationUk, partOfSpeech, level, category, categoryUk, exampleEn, exampleUk = item
        all_words.append({
            "id": f"vocab-{current_id}",
            "word": word,
            "transcription": transcription,
            "translationUk": translationUk,
            "partOfSpeech": partOfSpeech,
            "level": level,
            "category": category,
            "categoryUk": categoryUk,
            "exampleEn": exampleEn,
            "exampleUk": exampleUk
        })
        current_id += 1

print(f"Total vocabulary items compiled: {len(all_words)}")

# Target paths
desktop_json = r"C:\Users\user\Desktop\lingua-flow\src\data\vocabularyWords.json"
scratch_json = r"C:\Users\user\.gemini\antigravity\scratch\lingua-flow\src\data\vocabularyWords.json"

desktop_ts = r"C:\Users\user\Desktop\lingua-flow\src\data\vocabularyBank.ts"
scratch_ts = r"C:\Users\user\.gemini\antigravity\scratch\lingua-flow\src\data\vocabularyBank.ts"

# 1. Write JSON file
json_str = json.dumps(all_words, ensure_ascii=False, indent=2)
with open(desktop_json, "w", encoding="utf-8") as f:
    f.write(json_str)
print(f"Written to {desktop_json} ({os.path.getsize(desktop_json)} bytes)")

if os.path.exists(os.path.dirname(scratch_json)):
    with open(scratch_json, "w", encoding="utf-8") as f:
        f.write(json_str)

# 2. Write TS file that imports the JSON
ts_content = f"""import {{ VocabularyWord, VocabularyCategoryInfo }} from '@/types/vocabulary';
import rawWords from './vocabularyWords.json';

export const VOCABULARY_CATEGORIES: VocabularyCategoryInfo[] = {json.dumps(CATEGORIES, ensure_ascii=False, indent=2)};

export const VOCABULARY_BANK: VocabularyWord[] = (rawWords as unknown) as VocabularyWord[];
"""

with open(desktop_ts, "w", encoding="utf-8") as f:
    f.write(ts_content)
print(f"Written to {desktop_ts}")

if os.path.exists(os.path.dirname(scratch_ts)):
    with open(scratch_ts, "w", encoding="utf-8") as f:
        f.write(ts_content)
