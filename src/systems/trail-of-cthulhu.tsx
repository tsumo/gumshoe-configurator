import { Skill, SystemSkills } from "./types";

const academic = [
  { en: "Anthropology", ru: "Антропология" },
  { en: "Archeology", ru: "Археология" },
  { en: "Architecture", ru: "Архитектура" },
  { en: "Biology", ru: "Биология" },
  { en: "Accounting", ru: "Бухгалтерское дело" },
  { en: "Geology", ru: "Геология" },
  { en: "History", ru: "История" },
  { en: "Art History", ru: "История искусств" },
  { en: "Library Use", ru: "Книжные изыскания" },
  { en: "Cryptography", ru: "Криптография" },
  { en: "Medicine", ru: "Медицина" },
  { en: "Cthulhu Mythos", ru: "Мифология Ктулху" },
  { en: "Occult", ru: "Оккультизм" },
  { en: "Theology", ru: "Теология" },
  { en: "Physics", ru: "Физика" },
  { en: "Law", ru: "Юриспруденция" },
  { en: "Languages", ru: "Языки" },
] satisfies Skill[];

const interpersonal = [
  { en: "Bureaucracy", ru: "Бюрократия" },
  { en: "Interrogation", ru: "Допрос" },
  { en: "Intimidation", ru: "Запугивание" },
  { en: "Oral History", ru: "Изустная история" },
  { en: "Flattery", ru: "Лесть" },
  { en: "Cop Talk", ru: "Полицейский жаргон" },
  { en: "Assess Honesty", ru: "Проницательность" },
  { en: "Status", ru: "Статус" },
  { en: "Streetwise", ru: "Уличное чутьё" },
  { en: "Reassurence", ru: "Успокаивание" },
] satisfies Skill[];

const technical = [
  { en: "Astronomy", ru: "Астрономия" },
  { en: "Locksmith", ru: "Взлом" },
  { en: "Outdoorsman", ru: "Естествознание" },
  { en: "Art", ru: "Искусство" },
  { en: "Craft", ru: "Ремесло" },
  { en: "Evidence Collection", ru: "Сбор улик" },
  { en: "Forensics", ru: "Судмедэкспертиза" },
  { en: "Pharmacy", ru: "Фармацевтика" },
  { en: "Photography", ru: "Фотография" },
  { en: "Chemistry", ru: "Химия" },
] satisfies Skill[];

const general = [
  { en: "Sanity", ru: "Рассудок", freePoints: 4 },
  { en: "Stability", ru: "Самообладание", freePoints: 1 },
  { en: "Health", ru: "Здоровье", freePoints: 1 },
  { en: "Athletics", ru: "Атлетика" },
  { en: "Conceal", ru: "Притворство" },
  { en: "Disguise", ru: "Маскировка" },
  { en: "Driving", ru: "Вождение" },
  { en: "Electrical Repair", ru: "Электротехника" },
  { en: "Explosives", ru: "Взрывотехника" },
  { en: "Filch", ru: "Воровство" },
  { en: "Firearms", ru: "Стрельба" },
  { en: "First Aid", ru: "Первая помощь" },
  { en: "Fleeing", ru: "Бегство" },
  { en: "Hypnosis", ru: "Гипноз" },
  { en: "Mechanical Repair", ru: "Механика" },
  { en: "Piloting", ru: "Пилотирование" },
  { en: "Preparedness", ru: "Предусмотрительность" },
  { en: "Psychoanalysis", ru: "Психоанализ" },
  { en: "Riding", ru: "Верховая езда" },
  { en: "Scuffling", ru: "Драка" },
  { en: "Sense Trouble", ru: "Бдительность" },
  { en: "Shadowing", ru: "Слежка" },
  { en: "Stealth", ru: "Скрытность" },
  { en: "Weapons", ru: "Фехтование" },
  { en: "Magic", ru: "Магия" },
] satisfies Skill[];

export const trailOfCthulhu = {
  general: {
    name: { en: "General", ru: "Общие" },
    skills: general,
  },
  investigative: {
    name: { en: "Investigative", ru: "Исследовательские" },
    branches: [
      {
        name: { en: "Academic", ru: "Научные" },
        skills: academic,
      },
      {
        name: { en: "Interpersonal", ru: "Межличностные" },
        skills: interpersonal,
      },
      {
        name: { en: "Technical", ru: "Прикладные" },
        skills: technical,
      },
    ],
  },
  generalPoints: { available: 65, used: 0 },
  investigativePoints: {
    playersToPoints: { 2: 24, 3: 18, "4plus": 16 },
    available: 24,
    used: 0,
  },
} satisfies SystemSkills;
