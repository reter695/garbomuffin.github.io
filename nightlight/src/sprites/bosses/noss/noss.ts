import { IImageSpriteOptions } from "../../../engine/sprites/imagesprite";
import { Task } from "../../../engine/task";
import { Vector } from "../../../engine/vector";
import { getRandomInt, scratchCoordinate } from "../../../utils";
import {
  AbstractNossBoss,
  BASE_TEXTURE,
  HIT_ANIMATION_REPEAT,
  HIT_ANIMATION_REPEAT2,
  HIT_ANIMATION_TOTAL_LENGTH,
  HIT_ANIMATION_TOTAL_LENGTH2,
} from "../noss";
import { MOVE_TIME as BULLET_MOVE_TIME, NossBossBulletSprite } from "./bullet";

interface INossPosition {
  position: Vector;
  direction?: 1 | -1;
}

const POSITIONS: INossPosition[] = [
  {
    position: scratchCoordinate(-156, 136), // original (-152, 132)
  },
  {
    position: scratchCoordinate(-116, -8), // original (-112, -12)
  },
  {
    position: scratchCoordinate(156, 72), // original (160, 68)
    direction: -1,
  },
];

const VULNERABLE_TEXTURE = "boss/noss/rest";
const STARTING_POS = scratchCoordinate(-4, -104); // original (0, -108)
const HEALTH = 3;

export class NossBoss extends AbstractNossBoss {
  private health: number = HEALTH;
  private shouldEndRoutine: boolean;

  constructor(options: IImageSpriteOptions) {
    super(options);

    this.position = new Vector(STARTING_POS);

    this.addTask(new Task({
      run: () => this.startRoutine(),
      delay: 90,
    }));
  }

  //
  // ROUTINE
  //

  protected startRoutine() {
    super.startRoutine();
    this.shouldEndRoutine = true;

    this.addPhase(new Task({
      run: () => this.poof(),
    }));

    this.addPhase(new Task({
      run: () => this.teleport(),
    }), 60);

    this.addPhase(new Task({
      run: () => this.poof(),
    }), 60);

    this.addPhase(new Task({
      run: () => this.spawnBullets(),
      repeatEvery: 1,
      repeatMax: 10,
    }), BULLET_MOVE_TIME);

    this.addPhase(new Task({
      run: () => this.texture = this.runtime.getImage(VULNERABLE_TEXTURE),
    }));

    this.addPhase(new Task({
      run: (task) => this.rest(task),
      repeatEvery: 0,
      repeatMax: 60,
    }));

    this.addPhase(new Task({
      run: (task) => this.testShouldEndRoutine(task),
      repeatEvery: 0,
    }));
  }

  private testShouldEndRoutine(task: Task) {
    if (this.shouldEndRoutine) {
      this.endRoutine();
      task.stop();
    }
  }

  private endRoutine() {
    this.addTask(new Task({
      run: () => this.startRoutine(),
      delay: 0,
    }));
  }

  private teleport() {
    const position = POSITIONS[getRandomInt(0, POSITIONS.length - 1)];
    this.position = new Vector(position.position);
    this.scale.x = position.direction || 1;
    this.texture = this.runtime.getImage(BASE_TEXTURE);
  }

  private rest(task: Task) {
    if (this.playerJumpedOn()) {
      this.bouncePlayer();
      task.stop();
      this.health--;
      this.shouldEndRoutine = false;

      this.spawnHitEffect("-1");

      if (this.health === 0) {
        this.dead();
      } else {
        this.damage();
      }
    }
  }

  private damage() {
    this.playHitAnimation(HIT_ANIMATION_REPEAT);

    this.addTask(new Task({
      run: () => this.shouldEndRoutine = true,
      delay: HIT_ANIMATION_TOTAL_LENGTH,
    }));
  }

  private dead() {
    this.playHitAnimation(HIT_ANIMATION_REPEAT2);

    this.addTask(new Task({
      run: () => this.actuallyDead(),
      delay: HIT_ANIMATION_TOTAL_LENGTH2,
    }));
  }

  private actuallyDead() {
    this.poof();
    this.spawnLevelUpCoin(this.position);
    this.destroy();
  }

  private spawnBullets() {
    new NossBossBulletSprite({
      position: this.position,
      texture: this.runtime.getImage("boss/noss/bullet"),
    });
  }

  protected poof() {
    super.poof();
    this.visible = !this.visible;
  }
}
