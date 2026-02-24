
export const LOVE_WORDS = [
  'HEART', 'ADORE', 'SWEET', 'CUPID', 'ROSE', 
  'SMILE', 'BLUSH', 'DREAM', 'FLIRT', 'HONEY',
  'LOVER', 'TRUST', 'FAITH', 'HAPPY', 'PEACE',
  'LIGHT', 'SHINE', 'GRACE', 'MAGIC', 'SOUL',
  'FLAME', 'AMOUR', 'CHEEK', 'DANCE', 'KISSY',
  'BEING', 'BELOW', 'BLISS', 'BOUND', 'CANDY',
  'CHARM', 'CHERI', 'CLOSE', 'DEVOT', 'ELATE',
  'ENJOY', 'FANCY', 'FEELS', 'FIRST', 'FOUND',
  'GIVER', 'GLOWS', 'GREAT', 'IMAGE', 'INNER',
  'JOLLY', 'KEEPS', 'KINDY', 'KNEEL', 'LAUGH',
  'LOVED', 'LOYAL', 'LUCKY', 'MATCH', 'MERRY',
  'MUSIC', 'NIGHT', 'NOBLE', 'OFFER', 'PARTY',
  'PIANO', 'POEMS', 'POWER', 'PRIZE', 'QUEEN',
  'QUIET', 'REACH', 'READY', 'RIGHT', 'RINGS',
  'SENSE', 'SHARE', 'SIGHT', 'SMALL', 'SMART',
  'SOUND', 'SPACE', 'SPEAK', 'SPARK', 'STILL',
  'STORY', 'STUDY', 'SUGAR', 'SUNNY', 'THANK',
  'THINK', 'TIMES', 'TOUCH', 'TRULY', 'UNION',
  'VALOR', 'VOICE', 'WATCH', 'WATER', 'WHOLE',
  'WINGS', 'WOMAN', 'WORLD', 'WRITE', 'YEARS',
  'YOUNG', 'YOUTH'
];

export const getRandomWord = () => LOVE_WORDS[Math.floor(Math.random() * LOVE_WORDS.length)];

export const MAX_ATTEMPTS = 6;
export const WORD_LENGTH = 5;

export const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE']
];

export const QUIT_PHRASES = ['GIVE UP', 'I QUIT'];
