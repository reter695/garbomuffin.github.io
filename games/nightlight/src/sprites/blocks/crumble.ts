import { AbstractSprite } from "../../engine/sprite";
import { PlayerSprite } from "../player/player";
import { Task } from "../../engine/task";
import { TEXTURE_SCALE } from "../../engine/sprites/imagesprite";
import { IBlockOptions, SolidBlock } from "./block";

const CRUMBLE_FRAMES = 9;
const CRUMBLE_FRAME_LENGTH = 5;
const CRUMBLE_RESPAWN = 60 * 3;

export class CrumblingBlock extends SolidBlock {
  private crumbling: boolean = false;
  private crumbleProgress: number = 1;
  private yv: number = 0;

  private readonly startingX: number;
  private readonly startingY: number;

  constructor(opts: IBlockOptions) {
    super(opts);

    this.startingX = this.x;
    this.startingY = this.y;
  }

  public handleIntersect(sprite: AbstractSprite, horizontal: boolean) {
    super.handleIntersect(sprite, horizontal);

    if (!this.crumbling && sprite.y + sprite.height === this.y && sprite instanceof PlayerSprite) {
      this.crumbling = true;

      this.addTask(new Task({
        run: this.crumble,
        repeatEvery: CRUMBLE_FRAME_LENGTH,
      }));
    }
  }

  private updateVisual() {
    this.texture = this.runtime.getAsset(`blocks/crumble/${this.crumbleProgress}`);
    this.height = this.texture.height / TEXTURE_SCALE;
  }

  private respawn() {
    this.x = this.startingX;
    this.y = this.startingY;
    this.crumbling = false;
    this.yv = 0;
    this.crumbleProgress = 1;
    this.solid = true;
    this.updateVisual();
  }

  private crumble(task: Task) {
    this.crumbleProgress++;
    this.updateVisual();

    if (this.crumbleProgress === CRUMBLE_FRAMES) {
      task.stop();
      this.solid = false;
      this.addTask(this.fall);
    }
  }

  private fall(task: Task) {
    const physicsResult = this.runBasicPhysics(0, this.yv, {
      collision: false,
    });
    this.yv = physicsResult.yv;

    if (this.y >= this.runtime.canvas.height) {
      task.stop();
      this.addTask(new Task({
        run: this.respawn,
        delay: CRUMBLE_RESPAWN,
      }));
    }
  }
}