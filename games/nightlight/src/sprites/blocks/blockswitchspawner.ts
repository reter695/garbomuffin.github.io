import { SolidBlock, IBlockOptions } from "./block";
import { BlockSwitch } from "../blockswitch";
import { BLOCK_HEIGHT } from "../../config";
import { Vector } from "../../engine/vector";

export class BlockSwitchSpawnerBlock extends SolidBlock {
  constructor(opts: IBlockOptions) {
    super(opts);

    const position = new Vector(this.position);
    position.y -= BLOCK_HEIGHT;
    new BlockSwitch({
      texture: this.runtime.getAsset("blocks/button/red"),
      position,
      spawner: this,
    });
  }
}
