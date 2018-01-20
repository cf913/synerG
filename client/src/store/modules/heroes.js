const state = {
  heroes: [
    {
      'id': 1,
      'localized_name': 'Anti-Mage',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/antimage_full.png'
    },
    {
      'id': 2,
      'localized_name': 'Axe',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/axe_full.png'
    },
    {
      'id': 3,
      'localized_name': 'Bane',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/bane_full.png'
    },
    {
      'id': 4,
      'localized_name': 'Bloodseeker',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/bloodseeker_full.png'
    },
    {
      'id': 5,
      'localized_name': 'Crystal Maiden',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/crystal_maiden_full.png'
    },
    {
      'id': 6,
      'localized_name': 'Drow Ranger',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/drow_ranger_full.png'
    },
    {
      'id': 7,
      'localized_name': 'Earthshaker',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/earthshaker_full.png'
    },
    {
      'id': 8,
      'localized_name': 'Juggernaut',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/juggernaut_full.png'
    },
    {
      'id': 9,
      'localized_name': 'Mirana',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/mirana_full.png'
    },
    {
      'id': 10,
      'localized_name': 'Morphling',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/morphling_full.png'
    },
    {
      'id': 11,
      'localized_name': 'Shadow Fiend',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/nevermore_full.png'
    },
    {
      'id': 12,
      'localized_name': 'Phantom Lancer',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/phantom_lancer_full.png'
    },
    {
      'id': 13,
      'localized_name': 'Puck',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/puck_full.png'
    },
    {
      'id': 14,
      'localized_name': 'Pudge',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/pudge_full.png'
    },
    {
      'id': 15,
      'localized_name': 'Razor',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/razor_full.png'
    },
    {
      'id': 16,
      'localized_name': 'Sand King',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/sand_king_full.png'
    },
    {
      'id': 17,
      'localized_name': 'Storm Spirit',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/storm_spirit_full.png'
    },
    {
      'id': 18,
      'localized_name': 'Sven',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/sven_full.png'
    },
    {
      'id': 19,
      'localized_name': 'Tiny',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/tiny_full.png'
    },
    {
      'id': 20,
      'localized_name': 'Vengeful Spirit',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/vengefulspirit_full.png'
    },
    {
      'id': 21,
      'localized_name': 'Windranger',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/windrunner_full.png'
    },
    {
      'id': 22,
      'localized_name': 'Zeus',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/zuus_full.png'
    },
    {
      'id': 23,
      'localized_name': 'Kunkka',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/kunkka_full.png'
    },
    {
      'id': 24,
      'localized_name': null
    },
    {
      'id': 25,
      'localized_name': 'Lina',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/lina_full.png'
    },
    {
      'id': 26,
      'localized_name': 'Lion',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/lion_full.png'
    },
    {
      'id': 27,
      'localized_name': 'Shadow Shaman',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/shadow_shaman_full.png'
    },
    {
      'id': 28,
      'localized_name': 'Slardar',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/slardar_full.png'
    },
    {
      'id': 29,
      'localized_name': 'Tidehunter',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/tidehunter_full.png'
    },
    {
      'id': 30,
      'localized_name': 'Witch Doctor',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/witch_doctor_full.png'
    },
    {
      'id': 31,
      'localized_name': 'Lich',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/lich_full.png'
    },
    {
      'id': 32,
      'localized_name': 'Riki',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/riki_full.png'
    },
    {
      'id': 33,
      'localized_name': 'Enigma',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/enigma_full.png'
    },
    {
      'id': 34,
      'localized_name': 'Tinker',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/tinker_full.png'
    },
    {
      'id': 35,
      'localized_name': 'Sniper',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/sniper_full.png'
    },
    {
      'id': 36,
      'localized_name': 'Necrophos',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/necrolyte_full.png'
    },
    {
      'id': 37,
      'localized_name': 'Warlock',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/warlock_full.png'
    },
    {
      'id': 38,
      'localized_name': 'Beastmaster',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/beastmaster_full.png'
    },
    {
      'id': 39,
      'localized_name': 'Queen of Pain',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/queenofpain_full.png'
    },
    {
      'id': 40,
      'localized_name': 'Venomancer',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/venomancer_full.png'
    },
    {
      'id': 41,
      'localized_name': 'Faceless Void',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/faceless_void_full.png'
    },
    {
      'id': 42,
      'localized_name': 'Wraith King',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/skeleton_king_full.png'
    },
    {
      'id': 43,
      'localized_name': 'Death Prophet',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/death_prophet_full.png'
    },
    {
      'id': 44,
      'localized_name': 'Phantom Assassin',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/phantom_assassin_full.png'
    },
    {
      'id': 45,
      'localized_name': 'Pugna',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/pugna_full.png'
    },
    {
      'id': 46,
      'localized_name': 'Templar Assassin',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/templar_assassin_full.png'
    },
    {
      'id': 47,
      'localized_name': 'Viper',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/viper_full.png'
    },
    {
      'id': 48,
      'localized_name': 'Luna',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/luna_full.png'
    },
    {
      'id': 49,
      'localized_name': 'Dragon Knight',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/dragon_knight_full.png'
    },
    {
      'id': 50,
      'localized_name': 'Dazzle',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/dazzle_full.png'
    },
    {
      'id': 51,
      'localized_name': 'Clockwerk',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/rattletrap_full.png'
    },
    {
      'id': 52,
      'localized_name': 'Leshrac',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/leshrac_full.png'
    },
    {
      'id': 53,
      'localized_name': 'Nature"s Prophet',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/furion_full.png'
    },
    {
      'id': 54,
      'localized_name': 'Lifestealer',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/life_stealer_full.png'
    },
    {
      'id': 55,
      'localized_name': 'Dark Seer',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/dark_seer_full.png'
    },
    {
      'id': 56,
      'localized_name': 'Clinkz',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/clinkz_full.png'
    },
    {
      'id': 57,
      'localized_name': 'Omniknight',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/omniknight_full.png'
    },
    {
      'id': 58,
      'localized_name': 'Enchantress',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/enchantress_full.png'
    },
    {
      'id': 59,
      'localized_name': 'Huskar',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/huskar_full.png'
    },
    {
      'id': 60,
      'localized_name': 'Night Stalker',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/night_stalker_full.png'
    },
    {
      'id': 61,
      'localized_name': 'Broodmother',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/broodmother_full.png'
    },
    {
      'id': 62,
      'localized_name': 'Bounty Hunter',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/bounty_hunter_full.png'
    },
    {
      'id': 63,
      'localized_name': 'Weaver',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/weaver_full.png'
    },
    {
      'id': 64,
      'localized_name': 'Jakiro',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/jakiro_full.png'
    },
    {
      'id': 65,
      'localized_name': 'Batrider',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/batrider_full.png'
    },
    {
      'id': 66,
      'localized_name': 'Chen',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/chen_full.png'
    },
    {
      'id': 67,
      'localized_name': 'Spectre',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/spectre_full.png'
    },
    {
      'id': 68,
      'localized_name': 'Ancient Apparition',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/ancient_apparition_full.png'
    },
    {
      'id': 69,
      'localized_name': 'Doom',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/doom_bringer_full.png'
    },
    {
      'id': 70,
      'localized_name': 'Ursa',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/ursa_full.png'
    },
    {
      'id': 71,
      'localized_name': 'Spirit Breaker',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/spirit_breaker_full.png'
    },
    {
      'id': 72,
      'localized_name': 'Gyrocopter',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/gyrocopter_full.png'
    },
    {
      'id': 73,
      'localized_name': 'Alchemist',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/alchemist_full.png'
    },
    {
      'id': 74,
      'localized_name': 'Invoker',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/invoker_full.png'
    },
    {
      'id': 75,
      'localized_name': 'Silencer',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/silencer_full.png'
    },
    {
      'id': 76,
      'localized_name': 'Outworld Devourer',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/obsidian_destroyer_full.png'
    },
    {
      'id': 77,
      'localized_name': 'Lycan',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/lycan_full.png'
    },
    {
      'id': 78,
      'localized_name': 'Brewmaster',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/brewmaster_full.png'
    },
    {
      'id': 79,
      'localized_name': 'Shadow Demon',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/shadow_demon_full.png'
    },
    {
      'id': 80,
      'localized_name': 'Lone Druid',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/lone_druid_full.png'
    },
    {
      'id': 81,
      'localized_name': 'Chaos Knight',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/chaos_knight_full.png'
    },
    {
      'id': 82,
      'localized_name': 'Meepo',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/meepo_full.png'
    },
    {
      'id': 83,
      'localized_name': 'Treant Protector',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/treant_full.png'
    },
    {
      'id': 84,
      'localized_name': 'Ogre Magi',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/ogre_magi_full.png'
    },
    {
      'id': 85,
      'localized_name': 'Undying',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/undying_full.png'
    },
    {
      'id': 86,
      'localized_name': 'Rubick',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/rubick_full.png'
    },
    {
      'id': 87,
      'localized_name': 'Disruptor',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/disruptor_full.png'
    },
    {
      'id': 88,
      'localized_name': 'Nyx Assassin',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/nyx_assassin_full.png'
    },
    {
      'id': 89,
      'localized_name': 'Naga Siren',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/naga_siren_full.png'
    },
    {
      'id': 90,
      'localized_name': 'Keeper of the Light',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/keeper_of_the_light_full.png'
    },
    {
      'id': 91,
      'localized_name': 'Io',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/wisp_full.png'
    },
    {
      'id': 92,
      'localized_name': 'Visage',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/visage_full.png'
    },
    {
      'id': 93,
      'localized_name': 'Slark',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/slark_full.png'
    },
    {
      'id': 94,
      'localized_name': 'Medusa',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/medusa_full.png'
    },
    {
      'id': 95,
      'localized_name': 'Troll Warlord',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/troll_warlord_full.png'
    },
    {
      'id': 96,
      'localized_name': 'Centaur Warrunner',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/centaur_full.png'
    },
    {
      'id': 97,
      'localized_name': 'Magnus',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/magnataur_full.png'
    },
    {
      'id': 98,
      'localized_name': 'Timbersaw',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/shredder_full.png'
    },
    {
      'id': 99,
      'localized_name': 'Bristleback',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/bristleback_full.png'
    },
    {
      'id': 100,
      'localized_name': 'Tusk',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/tusk_full.png'
    },
    {
      'id': 101,
      'localized_name': 'Skywrath Mage',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/skywrath_mage_full.png'
    },
    {
      'id': 102,
      'localized_name': 'Abaddon',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/abaddon_full.png'
    },
    {
      'id': 103,
      'localized_name': 'Elder Titan',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/elder_titan_full.png'
    },
    {
      'id': 104,
      'localized_name': 'Legion Commander',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/legion_commander_full.png'
    },
    {
      'id': 105,
      'localized_name': 'Techies',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/techies_full.png'
    },
    {
      'id': 106,
      'localized_name': 'Ember Spirit',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/ember_spirit_full.png'
    },
    {
      'id': 107,
      'localized_name': 'Earth Spirit',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/earth_spirit_full.png'
    },
    {
      'id': 108,
      'localized_name': 'Underlord',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/abyssal_underlord_full.png'
    },
    {
      'id': 109,
      'localized_name': 'Terrorblade',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/terrorblade_full.png'
    },
    {
      'id': 110,
      'localized_name': 'Phoenix',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/phoenix_full.png'
    },
    {
      'id': 111,
      'localized_name': 'Oracle',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/oracle_full.png'
    },
    {
      'id': 112,
      'localized_name': 'Winter Wyvern',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/winter_wyvern_full.png'
    },
    {
      'id': 113,
      'localized_name': 'Arc Warden',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/arc_warden_full.png'
    },
    {
      'id': 114,
      'localized_name': 'Monkey King',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/monkey_king_full.png'
    },
    {
      'id': 115,
      'localized_name': null
    },
    {
      'id': 116,
      'localized_name': null
    },
    {
      'id': 117,
      'localized_name': null
    },
    {
      'id': 118,
      'localized_name': null
    },
    {
      'id': 119,
      'localized_name': 'Dark Willow',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/dark_willow_full.png'
    },
    {
      'id': 120,
      'localized_name': 'Pangolier',
      'img': 'https://api.opendota.com/apps/dota2/images/heroes/pangolier_full.png'
    }
  ]
}

const getters = {
  heroes (state) {
    return state.heroes
  }
}

export default {
  state,
  getters
}
