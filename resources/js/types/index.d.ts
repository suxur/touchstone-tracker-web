import { Dispatch, SetStateAction } from 'react';

type VoidFn<T = unknown> = (param?: T) => void;
type SetAction<T> = Dispatch<SetStateAction<T>>

// TODO: need to confirm type
type ResponseErrors = Record<string, string>;

type Routes =
  | 'CODEX_MONSTERS'
  | 'CODEX_ENCOUNTERS'
  | 'CODEX_SPELLS'
  | 'CODEX_CHARACTERS'
  | 'ENCOUNTER'
  | 'ENCOUNTER_LOOKUP'
  | 'USER';

export type Classes =
  | 'artificer'
  | 'barbarian'
  | 'bard'
  | 'cleric'
  | 'druid'
  | 'fighter'
  | 'monk'
  | 'paladin'
  | 'ranger'
  | 'rogue'
  | 'sorcerer'
  | 'warlock'
  | 'wizard';

export type InertiaSharedProps<T = Record<string, unknown>> = T & {
  jetstream: {
    canCreateTeams: boolean;
    canManageTwoFactorAuthentication: boolean;
    canUpdatePassword: boolean;
    canUpdateProfileInformation: boolean;
    flash: any;
    hasAccountDeletionFeatures: boolean;
    hasApiFeatures: boolean;
    hasTeamFeatures: boolean;
    hasTermsAndPrivacyPolicyFeature: boolean;
    managesProfilePhotos: boolean;
  };
  user: User & {
    all_teams?: Team[];
    current_team?: Team;
  };
  errorBags: any;
  errors: any;
};

export interface Pagination<T> {
  current_page: number;
  data: T[],
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  next_page_url: string | null
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface StatBlockPermissions {
  canManageStatBlocks: boolean;
}

export interface CharacterPermissions {
  canManageCharacters: boolean;
}

export interface MonsterPermissions {
  canManageMonsters: boolean;
}

export interface JetstreamTeamPermissions {
  canAddTeamMembers: boolean;
  canDeleteTeam: boolean;
  canRemoveTeamMembers: boolean;
  canUpdateTeam: boolean;
}

export interface Action {
  id: number;
  stat_block_id: number;
  name: string;
  description: string;
  attack_bonus: number;
  damage_dice: string;
  damage_bonus: number;
  sort: number;
  is_reaction: boolean;
  is_special: boolean;
  is_legendary: boolean;
}

export interface Combatant {
  id: number;
  encounter_id: number;
  stat_block: StatBlock | null;
  name: string;
  type: 'monster' | 'character';
  hit_point_maximum: number;
  current_hit_points: number;
  temporary_hit_points: number;
  initiative: number;
  armor_class: number;
  action: boolean;
  bonus_action: boolean;
  reaction: boolean;
  death_save_success: number;
  death_save_failure: number;
  is_hidden: boolean;
  order: number;
}

export interface Encounter {
  id: number;
  combatants: Combatant[];
  user_id: number | null;
  slug: string;
  round: number;
  monster_hp_status: number;
  character_hp_status: number;
  active_index: number;
  is_active: boolean;
  started_at: string;
}

export interface Role {
  key: string;
  name: string;
  permissions: string[];
  description: string;
}

export interface TeamInvitation {
  id: number;
  team_id: number;
  email: string;
  role: Nullable<string>;
  created_at: DateTime;
  updated_at: DateTime;
}

export interface ApiToken {
  id: number;
  name: string;
  abilities: string[];
  last_used_ago: Nullable<DateTime>;
  created_at: DateTime;
  updated_at: DateTime;
}

export interface Session {
  id: number;
  ip_address: string;
  is_current_device: boolean;
  agent: {
    is_desktop: boolean;
    platform: string;
    browser: string;
  };
  last_active: DateTime;
}

export type StatBlockType = 'monster' | 'character';

// Codex
export interface CodexMonster {
  id: number;
  name: string;
}

export interface CodexCharacter {
  id: number;
  name: string;
  class: Classes;
}

export interface CodexSpell {
  id: number;
  name: string;
}

export interface CodexEncounter {
  id: number;
  slug: string;
  created_at_diff: string;
}

export interface StatBlock {
  id: number;
  user_id: number | null;
  team_id: number | null;
  name: string;
  size: string | null;
  stat_block_type: StatBlockType
  type: string | null;
  subtype: string | null;
  alignment: string | null;
  armor_class: number;
  hit_points: number;
  hit_dice: string | null;
  speed: string | null;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  strength_save: number | null;
  dexterity_save: number | null;
  constitution_save: number | null;
  intelligence_save: number | null;
  wisdom_save: number | null;
  charisma_save: number | null;
  acrobatics: number | null;
  animal_handling: number | null;
  arcana: number | null;
  athletics: number | null;
  deception: number | null;
  history: number | null;
  insight: number | null;
  intimidation: number | null;
  investigation: number | null;
  medicine: number | null;
  nature: number | null;
  perception: number | null;
  performance: number | null;
  persuasion: number | null;
  religion: number | null;
  sleight_of_hand: number | null;
  stealth: number | null;
  survival: number | null;
  damage_immunities: string | null;
  damage_resistances: string | null;
  damage_vulnerabilities: string | null;
  condition_immunities: string | null;
  senses: string | null;
  languages: string | null;
  challenge_rating: string | null;
  legendary_description: string | null;
  speed_json: string | null;
  armor_description: string | null;
  collection: string | null;
  created_at: string | null;
  updated_at: string | null;
  experience_points: string | null;
  initiative: number;
  strength_modifier: string | null;
  dexterity_modifier: string | null;
  constitution_modifier: string | null;
  intelligence_modifier: string | null;
  wisdom_modifier: string | null;
  charisma_modifier: string | null;
  actions: Action[];
  legendary_actions: Action[];
  reactions: Action[];
  special_abilities: Action[];
}

export interface Membership {
  user_id: number,
  team_id: number,
  role: string,
  created_at: string;
  updated_at: string;
}

export interface Team {
  id: number;
  user_id: number;
  name: string;
  personal_team: boolean;
  created_at: string;
  updated_at: string;
  membership: Membership;
  owner: User;
  users: User[];
  team_invitations: TeamInvitation[];
}

export interface User {
  id: number;
  name: string;
  email: string;
  current_team_id: number;
  created_at: string;
  updated_at: string;
  teams: Team[];
  profile_photo_path: Nullable<string>;
  profile_photo_url: string;
  membership: Membership;
}

export interface Spell {
  id: number;
  name: string;
  description: string;
  higher_level: string;
  page: string;
  range: string;
  components: string;
  material: string;
  duration: string;
  casting_time: string;
  level: string;
  level_int: number;
  school: string;
  class: string;
  archetype: string;
  circles: string;
  domains: string;
  oaths: string;
  patrons: string;
  is_ritual: boolean;
  requires_concentration: boolean;
}
