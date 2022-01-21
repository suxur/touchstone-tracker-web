import { Classes, Routes } from '@/types';

export const routes: Record<Routes, string> = {
  CODEX_MONSTERS: 'codex/monsters',
  CODEX_SPELLS: 'codex/spells',
  CODEX_ENCOUNTERS: 'codex/encounters',
  CODEX_CHARACTERS: 'codex/characters',
  ENCOUNTER: 'e',
  ENCOUNTER_LOOKUP: 'e/lookup',
  USER: 'user',
};

export const COMBATANT_CHARACTER = 'character';
export const COMBATANT_MONSTER = 'monster';

export const RACES = ['aarakocra', 'dragonborn', 'dwarf', 'elf', 'genasi', 'goliath', 'half-elf', 'half-orc', 'halfling', 'human', 'kenku', 'tiefling', 'aasimar'];
export const CLASSES: Classes[] = ['artificer', 'barbarian', 'bard', 'cleric', 'druid', 'fighter', 'monk', 'paladin', 'ranger', 'rogue', 'sorcerer', 'warlock', 'wizard'];

export const ABILITIES = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];
export const ALIGNMENTS = ['lawful good', 'lawful neutral', 'lawful evil', 'neutral good', 'neutral', 'neutral evil', 'chaotic good', 'chaotic neutral', 'chaotic evil'];
export const SIZES = ['tiny', 'small', 'medium', 'large', 'huge', 'gargantuan'];
export const SKILLS = ['acrobatics', 'animal handling', 'arcana', 'athletics', 'deception', 'history', 'insight', 'intimidation', 'investigation', 'medicine', 'nature', 'perception', 'performance', 'persuasion', 'religion', 'sleight of hand', 'stealth', 'survival'];
