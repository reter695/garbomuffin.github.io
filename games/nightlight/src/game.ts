import { GameRuntime } from "./engine/runtime";
import { Levels } from "./levels/levels";
import { PlayerSprite } from "./sprites/player/player";
import { Vector } from "./engine/vector";
import { blockMap } from "./blockmap";
import { SolidBlock } from "./sprites/blocks/solid";
import { AbstractSprite } from "./engine/sprite";
import { TImage } from "./engine/types";
import { Block, IBlockOptions } from "./sprites/blocks/block";
import * as config from "./config";
import { Container } from "./engine/container";
import { BackgroundStarSprite } from "./sprites/star";
import { getRandomInt } from "./utils";

export class Nightlight extends GameRuntime {
  public level: number = 0;
  public levelData: string;
  public player: PlayerSprite;
  public blocks: Container<Block>;

  protected backgroundColor = "black";

  constructor() {
    super(document.getElementById("canvas") as HTMLCanvasElement);

    this.blocks = new Container();
  }

  public start() {
    super.start();

    this.createPlayer();
    this.createStarBackground();
    this.renderLevel();
  }

  private createPlayer() {
    this.player = new PlayerSprite({
      texture: this.getAsset("player/idle"),
      position: new Vector(0, 0, 10),
      width: config.BLOCK_WIDTH,
      height: config.BLOCK_HEIGHT,
      persistent: true,
    });
  }

  private createStarBackground() {
    for (let i = 0; i < 50; i++) {
      const x = getRandomInt(0, this.canvas.width);
      const y = getRandomInt(0, this.canvas.height);
      new BackgroundStarSprite({
        position: new Vector(x, y, -10),
        width: 2,
        height: 2,
      });
    }
  }

  private destroyLevel() {
    // a normal for loop won't work because we are modifying the list mid loop
    for (let i = 0; i < this.sprites.length;) {
      const sprite = this.sprites.sprites[i];
      if (sprite.persistent) {
        i++;
      } else {
        sprite.destroy();
      }
    }
  }

  public renderLevel(level: number = this.level) {
    this.destroyLevel();

    const levelData = Levels[level];
    this.levelData = levelData;

    let x = 0;
    let y = this.canvas.height - config.BLOCK_HEIGHT;

    const createBlock = (position: Vector, char: string, index: number) => {
      const blockType = blockMap[char];
      let spriteConstructor: typeof Block;
      let texture: TImage;

      if (typeof blockType === "undefined") {
        console.warn("skipping block", char);
        return;
      } else if (typeof blockType === "string") {
        texture = this.getAsset(blockType);
        spriteConstructor = SolidBlock;
      } else {
        texture = this.getAsset(blockType.texture);
        spriteConstructor = blockType.type;
      }

      const opts: IBlockOptions = {
        width: texture.width / config.BLOCK_SIZE_SCALE,
        height: texture.height / config.BLOCK_SIZE_SCALE,
        position,
        texture,
        levelIndex: index,
      };

      new spriteConstructor(opts);
    };

    for (let i = 0; i < levelData.length; i++) {
      const char = levelData[i];

      if (char !== ".") {
        const position = new Vector(x, y);
        createBlock(position, char, i);
      }

      x += config.BLOCK_WIDTH;
      if (x >= this.canvas.width) {
        x = 0;
        y -= config.BLOCK_HEIGHT;
      }
    }

    this.player.reset();
  }
}
