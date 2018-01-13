/*
 * A block that falls when you hit the switch.
 *
 * Will vibrate for a bit before disappearing.
 */

import { SolidBlock, IBlockOptions } from "./block";
import { Task } from "../../engine/task";
import { Vector } from "../../engine/vector";

// Time between each vibration before falling
const VIBRATE_EVERY = 3;

// The distance to move when vibrating
const VIBRATE_RANGE = 2;

// How many times to vibrate
const VIBRATE_TIMES = 20;

// Delay before block will fall after vibrating
// Makes blocks from the bottom fall before the ones on the top, which looks nice
const FALL_DELAY_PER_Y = 0.25;

export class FallingBlock extends SolidBlock {
  private startingPosition: Vector;
  private yv: number = 0;
  private vibrateProgress: number = 0;
  private frame: number = 0;

  constructor(opts: IBlockOptions) {
    super(opts);

    this.startingPosition = new Vector(this.position);
  }

  public trigger() {
    this.x -= VIBRATE_RANGE / 2;
    this.addTask(new Task({
      run: (task) => this.vibrate(task),
      repeatEvery: 3,
    }));
  }

  private vibrate(task: Task) {
    this.vibrateProgress++;

    if (this.vibrateProgress === VIBRATE_TIMES) {
      const fromBottom = this.runtime.canvas.height - this.y;
      task.stop();
      this.position = this.startingPosition;

      const delay = fromBottom * FALL_DELAY_PER_Y;
      this.addTask(new Task({
        run: (task2) => this.fall(task2),
        delay,
        repeatEvery: 0,
      }));

      this.addTask(new Task({
        run: () => this.playSound(),
        delay,
      }));
    } else if (this.vibrateProgress % 2 === 0) {
      this.x -= VIBRATE_RANGE;
    } else {
      this.x += VIBRATE_RANGE;
    }
  }

  private playSound() {
    this.runtime.playSound("blocks/smash");
  }

  private fall(task: Task) {
    this.solid = false;

    const physicsResult = this.runBasicPhysics(0, this.yv, {
      collision: false,
    });
    this.yv = physicsResult.yv;

    if (this.y >= this.runtime.canvas.height) {
      task.stop();
    }
  }
}
