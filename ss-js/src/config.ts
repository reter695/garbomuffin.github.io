/// <reference path="game.d.ts" />

// constants
const HEIGHT = 360;
const WIDTH = 480;
const FRICTION = .6;
const GRAVITY = 0.95 / 4;
const JUMP = 5.5;
const CLOUD_JUMP = 1.5 * JUMP;
const RUN_SPEED = 3;
const PLAYER_HEIGHT = 16;
const PLAYER_WIDTH = 8;
const BLOCK_HEIGHT = 16;
const BLOCK_WIDTH = BLOCK_HEIGHT;
const DEGREE = Math.PI / 180;
const DIR_RIGHT = 1;
const DIR_LEFT = -1;
const LEVEL_LENGTH = 30;
const LEVEL_HEIGHT = 23;
const FIRE_SUIT = 1;
const WIND_SUIT = 2;
const HAMMER_SUIT = 3;
// const MAX_PROJECTILES = 2;
const MAX_PROJECTILES = Infinity;
const FIREBALL_HEIGHT = 8;
const FIREBALL_WIDTH = 8;
const ICE_DELAY = 250;
const HAMMER_HEIGHT = 12;
const HAMMER_WIDTH = HAMMER_HEIGHT;
const HAMMER_VELOCITY = 5;
const PROJECTILE_DELAY = 250; // in ms
const FIREBALL_ROTATION = 0.1;
const FIREBALL_SPEED = 3;
const HAMMER_SPEED = FIREBALL_SPEED;
const FIREBALL_VELOCITY = 3;
const FIREBALL_GRAVITY = GRAVITY / 2;
const HAMMER_ROTATION = FIREBALL_ROTATION;
const SWITCH_TIMEOUT = 1000; // in ms
const PROJECTILE_SUITS = [FIRE_SUIT, HAMMER_SUIT];
const SUIT_NAMES = ["default", "fire", "air", "hammer"];
const RUNNING_ANIMATION_LENGTH = 3; // in frames
const RUNNING_FRAMES = ["run1", "run2", "run3", "run4"];
const BLOCKED_INPUTS = [32, 37, 38, 39, 40];
const HAMMER_SUIT_X = 23 * BLOCK_WIDTH;
const HAMMER_SWITCH_TIMEOUT = 250; // in ms
