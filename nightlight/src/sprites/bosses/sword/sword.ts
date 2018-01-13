/*
 * The first boss: A Sword
 *
 * This code is terrible. Please do not try to maintain it. Rewrite it from the ground up.
 */

import { ImageSprite, IImageSpriteOptions } from "../../../engine/sprites/imagesprite";
import { Task } from "../../../engine/task";
import { BLOCK_HEIGHT, BLOCK_WIDTH } from "../../../config";
import { SolidBlock, IBlockOptions } from "../../blocks/block";
import { AbstractSprite } from "../../../engine/sprite";
import { PlayerSprite } from "../../player/player";
import { Vector2D } from "../../../engine/vector2d";
import { HitEffectSprite } from "../hiteffect";
import { Vector } from "../../../engine/vector";
import { AbstractBoss } from "../boss";

const HEALTH = 3;

// swipe and spin cycle
const SPIN_ROTATION_SPEED = 5 / 2;
const SPIN_SIZE_CHANGE_RATE = 0.035;
const SWIPE_ROTATION_SPEED = 10 / 2;
const SWIPE_MOVE_SPEED = 12.5 / 2;
const SWIPE_BASE_DELAY = 60;
const SWIPE_SIZE_CHANGE_RATE = 0.115;
const SWIPE_ANIMATE_TIMES = 15;
const SWIPE_ANIMATE_FRAME_LENGTH = 3;
const SWIPE_TEXTURES = [
  "boss/sword/sword",
  "boss/sword/open",
];

const SWIPE_DOWN_SPEED = 15 / 2;
const SWIPE_UP_SPEED = SWIPE_DOWN_SPEED / 2;

// getting damaged
const DAMAGED_FALL_SPEED = 5;
const DAMAGED_RISE_SPEED = DAMAGED_FALL_SPEED / 2;
const DAMAGED_ANIMATE_TIMES = 20;
const DAMAGED_TEXTURES = [
  "boss/sword/open",
  "boss/sword/hurt",
];
const DAMAGE_ANIMATE_FRAME_LENGTH = 2;
const PLAYER_JUMP_YV = 3;

// death
const DEAD_ROTATION_SPEED = 0.742857142857 / 2; // 0.742... is how the game actually defines this.
const DEAD_STARTING_VELOCITY = 2;

// collision
const COLLISION_INTERVAL = 3;
const COLLISION_SPEED = 3;

export class SwordBoss extends AbstractBoss {
  private health: number = HEALTH;
  private hitPlayer: boolean = false;
  private _sizeScale: number = 1;
  private spinDirection: number;
  private yv: number = DEAD_STARTING_VELOCITY;
  private testCollision: boolean = false;

  private readonly startingHeight: number;
  private readonly startingWidth: number;

  constructor(opts: IBlockOptions) {
    super(opts);

    this.startingHeight = this.height;
    this.startingWidth = this.width;

    this.resetCoordinates();

    this.addTask(new Task({
      run: () => this.beginSpinAttack(),
      delay: 60,
    }));

    this.addTask(new Task({
      run: () => this.intersectTest(),
      repeatEvery: COLLISION_INTERVAL,
    }));

    this.rotationPoint = new Vector2D(0.5, 0.1);
  }

  //
  // Utilities
  //

  private intersectsPlayer(): boolean {
    // Render ourselves on a canvas
    const canvas = this.runtime.createCanvas();
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.render(ctx);

    const height = canvas.height;
    const width = canvas.width;

    const data = ctx.getImageData(0, 0, width, height).data;
    // some browsers are funny
    // TODO: warning message?
    if (!data) {
      return false;
    }

    const player = this.runtime.player;
    const length = data.length;
    for (let i = 0; i < length; i += 4) {
      const j = i / 4;

      if (data[i + 3]) {
        const point = new Vector(j % width, Math.floor(j / width));
        if (player.containsPoint(point)) {
          return true;
        }
      }
    }

    return false;
  }

  public intersectTest() {
    if (!this.testCollision) {
      return;
    }

    if (this.intersectsPlayer()) {
      this.runtime.player.kill();
      this.hitPlayer = true;
    }
  }

  protected startRoutine() {
    super.startRoutine();
    this.texture = this.runtime.getImage("boss/sword/sword");
    this.beginSpinAttack();
  }

  private resetCoordinates() {
    this.recenter();
    this.y = 14 * BLOCK_HEIGHT;
  }

  private recenter() {
    this.x = this.runtime.canvas.width / 2 - this.width / 2;
  }

  private animate(textures: string[], times: number, length: number, cb?: () => void) {
    for (let i = 0; i < times; i++) {
      this.addTask(new Task({
        run: () => {
          this.texture = this.runtime.getImage(textures[i % textures.length]);
          if (cb) {
            cb();
          }
        },
        delay: i * length,
      }));
    }
  }

  //
  // Spin Attack
  //

  private beginSpinAttack() {
    this.testCollision = true;

    this.spinDirection = -this.multiplier;
    this.phaseDelay = SWIPE_BASE_DELAY;
    this.hitPlayer = false;

    this.addTask(new Task({
      run: (task) => this.spinAttack(task),
      repeatEvery: 0,
      delay: 60,
    }));
  }

  private spinAttack(task: Task) {
    this.rotation += this.spinDirection * SPIN_ROTATION_SPEED;

    // could be pos or neg
    if (Math.abs(this.rotation) >= 180) {
      this.sizeScale -= SPIN_SIZE_CHANGE_RATE;
    } else {
      this.sizeScale += SPIN_SIZE_CHANGE_RATE;
    }

    // could be pos or neg
    if (Math.abs(this.rotation) >= 360) {
      this.rotation = 0;
      task.stop();
      this.beginSwipeAttack();
    }

    this.resetCoordinates();
  }

  //
  // Swipe Attack
  //

  private beginSwipeAttack() {
    // make sure some values are reset properly
    this.sizeScale = 1;
    this.rotation = 0;
    this.phaseDelay = SWIPE_BASE_DELAY;

    // This is terrible.
    const multi = this.multiplier;

    const animate = () => {
      this.addPhase(new Task({
        run: () => this.animate(SWIPE_TEXTURES, SWIPE_ANIMATE_TIMES, SWIPE_ANIMATE_FRAME_LENGTH),
        delay: 10,
      }), SWIPE_ANIMATE_TIMES * SWIPE_ANIMATE_FRAME_LENGTH);
    };

    const attack = () => {
      this.addPhase(new Task({
        run: () => this.swipeAttack(SWIPE_DOWN_SPEED),
        repeatEvery: 0,
        repeatMax: 16,
        delay: 10,
      }));

      this.addPhase(new Task({
        run: () => this.swipeAttack(-SWIPE_UP_SPEED),
        repeatEvery: 0,
        repeatMax: 32,
      }));
    };

    this.addPhase(new Task({
      run: () => this.swipeRotate(-1 * multi),
      repeatEvery: 0,
      repeatMax: 36,
    }));

    this.addPhase(new Task({
      run: () => this.swipeMove(1),
      repeatEvery: 0,
      repeatMax: 24,
    }));

    this.addPhase(new Task({
      run: () => {
        this.swipeRotate(-1 * multi);
        this.swipeSize(1);
      },
      repeatEvery: 0,
      repeatMax: 18,
    }));

    animate();
    attack();

    this.addPhase(new Task({
      run: () => this.swipeRotate(1 * multi),
      repeatEvery: 0,
      repeatMax: 36,
    }));

    animate();
    attack();

    this.addPhase(new Task({
      run: () => {
        this.swipeRotate(1 * multi);
        this.swipeSize(-1);
      },
      repeatEvery: 0,
      repeatMax: 18,
    }));

    this.addPhase(new Task({
      run: () => this.swipeMove(-1),
      repeatEvery: 0,
      repeatMax: 24,
    }));

    this.addPhase(new Task({
      run: this.beginRestPhase,
    }));
  }

  private swipeRotate(multi: number) {
    this.rotation += SWIPE_ROTATION_SPEED * multi;
  }

  private swipeMove(multi: number) {
    this.y -= SWIPE_MOVE_SPEED * multi;
  }

  private swipeAttack(speed: number) {
    this.y += speed;
  }

  private swipeSize(multi: number) {
    this.sizeScale += SWIPE_SIZE_CHANGE_RATE * multi;
  }

  //
  // Rest Phase
  //

  private beginRestPhase() {
    this.testCollision = false;

    if (this.hitPlayer) {
      this.texture = this.runtime.getImage("boss/sword/heal");

      this.spawnHitEffect(this.health === HEALTH ? "+0" : "+1");

      if (this.health < HEALTH) {
        this.health++;
      }

      this.addTask(new Task({
        run: () => this.startRoutine(),
        delay: 60,
      }));
    } else {
      this.texture = this.runtime.getImage("boss/sword/open");

      this.addTask(new Task({
        run: (task) => this.restVulnerable(task),
        repeatEvery: 0,
        repeatMax: 180, // 3 seconds
      }));

      const health = this.health;
      this.addTask(new Task({
        run: () => {
          if (this.health === health) {
            this.startRoutine();
          }
        },
        delay: 180,
      }));
    }
  }

  private restVulnerable(task: Task) {
    // use simple intersects for performance reasons
    if (this.playerJumpedOn()) {
      this.bouncePlayer();
      this.damage();
      task.stop();
    }
  }

  private damage() {
    this.health--;

    this.spawnHitEffect("-1");

    this.phaseDelay = 0;
    this.addPhase(new Task({
      run: () => this.y += DAMAGED_FALL_SPEED,
      repeatEvery: 0,
      repeatMax: 5,
    }));

    this.addPhase(new Task({
      run: () => this.animate(DAMAGED_TEXTURES, DAMAGED_ANIMATE_TIMES, DAMAGE_ANIMATE_FRAME_LENGTH),
    }), DAMAGED_ANIMATE_TIMES * DAMAGE_ANIMATE_FRAME_LENGTH);

    if (this.health === 0) {
      this.addPhase(new Task({
        run: () => this.animate(DAMAGED_TEXTURES, DAMAGED_ANIMATE_TIMES, DAMAGE_ANIMATE_FRAME_LENGTH, () => {
          this.rotation -= DEAD_ROTATION_SPEED;
        }),
      }), DAMAGED_ANIMATE_TIMES * DAMAGE_ANIMATE_FRAME_LENGTH);

      this.addPhase(new Task({
        run: this.deadPhysics,
        repeatEvery: 0,
      }));
    } else {
      this.addPhase(new Task({
        run: () => this.animate(DAMAGED_TEXTURES, DAMAGED_ANIMATE_TIMES, DAMAGE_ANIMATE_FRAME_LENGTH),
      }), DAMAGED_ANIMATE_TIMES * DAMAGE_ANIMATE_FRAME_LENGTH);

      this.addPhase(new Task({
        run: () => this.texture = this.runtime.getImage("boss/sword/sword"),
      }));

      this.addPhase(new Task({
        run: () => this.y -= DAMAGED_RISE_SPEED,
        repeatEvery: 0,
        repeatMax: 10,
      }));

      this.addPhase(new Task({
        run: this.startRoutine,
      }));
    }
  }

  //
  // Dead
  //

  private deadPhysics(task: Task) {
    const physicsResult = this.runBasicPhysics(0, this.yv, {
      collision: false,
    });
    this.yv = physicsResult.yv;

    if (this.y > this.runtime.canvas.height) {
      task.stop();

      this.addTask(new Task({
        run: () => this.spawnCoin(),
        delay: 30,
      }));
    }
  }

  private spawnCoin() {
    const texture = this.runtime.getImage("coin/1");
    const x = (this.runtime.canvas.width / 2) - (BLOCK_WIDTH / 2);
    const y = (this.runtime.canvas.height / 2) - (BLOCK_WIDTH / 2);
    this.spawnLevelUpCoin(new Vector(x, y));
  }

  //
  // Getters and Setters
  //

  set sizeScale(scale: number) {
    this.height = this.startingHeight * scale;
    this.width = this.startingWidth * scale;
    this._sizeScale = scale;
    this.recenter();
  }

  get sizeScale() {
    return this._sizeScale;
  }

  get multiplier() {
    if ((this.runtime.player.x + this.runtime.player.width / 2) < (this.x + this.width / 2)) {
      return 1;
    } else {
      return -1;
    }
  }
}