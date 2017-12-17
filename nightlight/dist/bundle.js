/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__engine_sprites_imagesprite__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__(3);


class Block extends __WEBPACK_IMPORTED_MODULE_0__engine_sprites_imagesprite__["a" /* ImageSprite */] {
    constructor(opts) {
        super(opts);
        this.solid = false;
        this.runtime.blocks.push(this);
    }
    // Ugly duplication but it works
    floorAlign() {
        this.centerAlign(true, false);
        this.y += __WEBPACK_IMPORTED_MODULE_1__config__["a" /* BLOCK_HEIGHT */] - this.height;
        this.y = Math.floor(this.y);
    }
    leftAlign() {
        this.centerAlign(false, true);
        this.x += __WEBPACK_IMPORTED_MODULE_1__config__["b" /* BLOCK_WIDTH */] - this.width;
        this.x = Math.floor(this.x);
    }
    centerAlign(centerX = true, centerY = true) {
        if (centerX) {
            this.x += (__WEBPACK_IMPORTED_MODULE_1__config__["b" /* BLOCK_WIDTH */] - this.width) / 2;
            this.x = Math.floor(this.x);
        }
        if (centerY) {
            this.y += (__WEBPACK_IMPORTED_MODULE_1__config__["a" /* BLOCK_HEIGHT */] - this.height) / 2;
            this.y = Math.floor(this.y);
        }
    }
    handleIntersect(sprite, velocity, horizontal) {
        if (horizontal) {
            if (velocity > 0) {
                sprite.x = this.x - sprite.width;
            }
            else if (velocity < 0) {
                sprite.x = this.x + this.width;
            }
        }
        else {
            if (velocity > 0) {
                sprite.y = this.y + this.height;
            }
            else if (velocity < 0) {
                sprite.y = this.y - sprite.height;
            }
        }
        return true;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Block;

// Block with solid = true by default
class SolidBlock extends Block {
    constructor() {
        super(...arguments);
        this.solid = true;
    }
}
/* harmony export (immutable) */ __webpack_exports__["c"] = SolidBlock;

// Block that is solid but doesn't handle intersecting
// Used for blocks that shouldn't be solid but needed for player.reset() to work
class PseudoSolidBlock extends SolidBlock {
    handleIntersect() {
        return false;
    }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = PseudoSolidBlock;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vector2d__ = __webpack_require__(10);

// a simple position class that removes some verbosity from code
// can make for some nicer code sometimes
class Vector extends __WEBPACK_IMPORTED_MODULE_0__vector2d__["a" /* Vector2D */] {
    constructor(x = 0, y = 0, z = 0) {
        super(x, y);
        if (typeof x === "object") {
            this.z = x.z;
        }
        else {
            this.z = z;
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Vector;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(5);
// Tasks and TaskRunners

// a task is something to be run at a certain time, maybe repeating
class Task {
    constructor(options) {
        this.repeatCount = 0;
        const runnable = options.run;
        const delay = Object(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* getOrDefault */])(options.delay, 0);
        const repeatEvery = Object(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* getOrDefault */])(options.repeatEvery, -1);
        const repeatMax = Object(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* getOrDefault */])(options.repeatMax, Infinity);
        this.originalOptions = options;
        this.runnable = runnable;
        this.delay = delay;
        this.repeatEvery = repeatEvery;
        this.repeatMax = repeatMax;
    }
    run() {
        // pass this task to the function so that it can call things like task.stop();
        this.runnable(this);
    }
    stop() {
        this.delay = -1;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Task;

// the things that runs tasks
// adds everything tasks use
// most methods prefixed with _ to avoid as many collisions as possible
// almost EVERYTHING extends this (and as such can have tasks on it)
class TaskRunner {
    constructor() {
        this._tasks = [];
    }
    runTasks() {
        for (const task of this._tasks) {
            if (task.delay <= 0) {
                task.run();
                task.repeatCount++;
                if (task.delay === -1) {
                    // called task.stop();
                }
                else if (task.repeatEvery >= 0 && task.repeatCount < task.repeatMax) {
                    task.delay = task.repeatEvery;
                }
                else {
                    task.delay = -1;
                }
            }
            else {
                task.delay--;
            }
        }
        this._tasks = this._tasks.filter((task) => task.delay !== -1);
    }
    resetTasks() {
        this._tasks = [];
    }
    // add a task
    // can either be a task or a function
    // if it is a task it is added as you would expect
    // if it is a function it will repeat every frame
    addTask(task) {
        if (typeof task === "function") {
            return this.addTask(new Task({
                run: task,
                repeatEvery: 0,
            }));
        }
        else {
            task.runnable = task.runnable.bind(this);
            this._tasks.push(task);
            return task;
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = TaskRunner;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const BLOCK_HEIGHT = 16;
/* harmony export (immutable) */ __webpack_exports__["a"] = BLOCK_HEIGHT;

const BLOCK_WIDTH = 16;
/* harmony export (immutable) */ __webpack_exports__["b"] = BLOCK_WIDTH;

const LEVEL_HEIGHT = 23;
/* unused harmony export LEVEL_HEIGHT */

const LEVEL_WIDTH = 30;
/* harmony export (immutable) */ __webpack_exports__["e"] = LEVEL_WIDTH;

const GRAVITY = 0.195;
/* harmony export (immutable) */ __webpack_exports__["d"] = GRAVITY;

const FRICTION = 0.75;
/* harmony export (immutable) */ __webpack_exports__["c"] = FRICTION;
 // xv *= FRICTION


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__engine_sprites_imagesprite__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__fragment__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__engine_vector__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__blocks_block__ = __webpack_require__(0);






const PLAYER_WALK_SPEED = 0.5 / 2;
const JUMP_HEIGHT = 5.4;
const PLAYER_MAX_SPEED = 4 / 2;
const PLAYER_FRICTION = 0.8 / 2;
// const FRAGMENT_COUNT = 5;
// const FRAGMENT_TEXTURES = 5;
const FRAGMENT_TEXTURES = [1, 2, 3, 4];
const FRAGMENT_SMALL_PIECE_MIN = 4;
const FRAGMENT_SMALL_PIECE_MAX = 6;
const FRAGMENT_SMALL_PIECE_TEXTURE = 5;
const FRAGMENT_XV_RANGE = 1;
const FRAGMENT_YV_MIN = 3;
const FRAGMENT_YV_MAX = 6;
const FRAGMENT_RV_RANGE = 10;
const WALK_ANIMATION_FRAMES = 4;
const WALK_ANIMATION_LENGTH = 4;
var MovementDirection;
(function (MovementDirection) {
    MovementDirection[MovementDirection["Right"] = 1] = "Right";
    MovementDirection[MovementDirection["Left"] = -1] = "Left";
})(MovementDirection || (MovementDirection = {}));
class PlayerSprite extends __WEBPACK_IMPORTED_MODULE_0__engine_sprites_imagesprite__["a" /* ImageSprite */] {
    constructor(opts) {
        super(opts);
        this.yv = 0;
        this.xv = 0;
        this.lastMovementDirection = MovementDirection.Right;
        this.onGround = true;
        this.walkingAnimationProgress = 1;
        this.currentFrameProgress = 0;
        this.moving = false;
        this.hasJumpLight = false;
        this.addTask(this.run);
        this.addTask(this.updateGraphic);
    }
    handleInputs(onGround) {
        const keys = this.runtime.keyboard.keys;
        const rightDown = keys[39].isPressed;
        const leftDown = keys[37].isPressed;
        const upDown = keys[38].isPressed;
        const upJustPressed = keys[38].justPressed;
        this.moving = false;
        if (rightDown && !leftDown) {
            this.xv += PLAYER_WALK_SPEED;
            this.lastMovementDirection = MovementDirection.Right;
            this.moving = true;
        }
        if (leftDown && !rightDown) {
            this.xv -= PLAYER_WALK_SPEED;
            this.lastMovementDirection = MovementDirection.Left;
            this.moving = true;
        }
        if ((upDown && onGround) || (upJustPressed && this.hasJumpLight)) {
            const quiet = this.texture === this.runtime.getImage("player/idle");
            this.runtime.playSound(`player/jump${quiet ? 2 : 1}`);
            this.hasJumpLight = false;
            this.yv = JUMP_HEIGHT;
        }
        else if (!upDown && this.yv > 3) {
            this.yv = 3;
        }
        return {
            rightDown, leftDown, upDown,
        };
    }
    run() {
        if (this.xv > PLAYER_MAX_SPEED) {
            this.xv = PLAYER_MAX_SPEED;
        }
        else if (this.xv < -PLAYER_MAX_SPEED) {
            this.xv = -PLAYER_MAX_SPEED;
        }
        const prevXv = this.xv;
        const prevYv = this.yv;
        const physicsResult = this.runBasicPhysics(this.xv, this.yv, {
            friction: false,
        });
        this.xv = physicsResult.xv;
        this.yv = physicsResult.yv;
        this.onGround = physicsResult.onGround;
        if (this.onGround && prevYv < -1.6) {
            this.runtime.playSound("player/ding");
        }
        if (this.onGround) {
            this.hasJumpLight = false;
        }
        const inputs = this.handleInputs(physicsResult.onGround);
        if ((!inputs.leftDown && !inputs.rightDown) || (inputs.leftDown && inputs.rightDown)) {
            if (this.xv > 0) {
                this.xv -= PLAYER_FRICTION;
                this.xv = Math.max(this.xv, 0);
            }
            else {
                this.xv += PLAYER_FRICTION;
                this.xv = Math.min(this.xv, 0);
            }
        }
        if (this.y >= this.runtime.canvas.height) {
            this.kill();
        }
    }
    reset() {
        this.position.x = 40;
        this.position.y = this.runtime.canvas.height - __WEBPACK_IMPORTED_MODULE_1__config__["a" /* BLOCK_HEIGHT */];
        this.xv = 0;
        this.yv = 0;
        const sprites = this.runtime.blocks.sprites.filter((s) => s.solid || s instanceof __WEBPACK_IMPORTED_MODULE_5__blocks_block__["b" /* PseudoSolidBlock */]);
        while (this.intersects(sprites)) {
            this.y -= __WEBPACK_IMPORTED_MODULE_1__config__["a" /* BLOCK_HEIGHT */];
        }
    }
    kill() {
        const fragmentTextures = Object(__WEBPACK_IMPORTED_MODULE_3__utils__["a" /* clone */])(FRAGMENT_TEXTURES);
        const smallPieces = Object(__WEBPACK_IMPORTED_MODULE_3__utils__["b" /* getRandomInt */])(FRAGMENT_SMALL_PIECE_MIN, FRAGMENT_SMALL_PIECE_MAX);
        for (let i = 0; i < smallPieces; i++) {
            fragmentTextures.push(FRAGMENT_SMALL_PIECE_TEXTURE);
        }
        for (const i of fragmentTextures) {
            new __WEBPACK_IMPORTED_MODULE_2__fragment__["a" /* PlayerFragmentSprite */]({
                position: new __WEBPACK_IMPORTED_MODULE_4__engine_vector__["a" /* Vector */](this.position),
                texture: this.runtime.getImage(`fragments/${i}`),
                xv: Object(__WEBPACK_IMPORTED_MODULE_3__utils__["b" /* getRandomInt */])(-FRAGMENT_XV_RANGE * 1000, FRAGMENT_XV_RANGE * 1000) / 1000,
                yv: Object(__WEBPACK_IMPORTED_MODULE_3__utils__["b" /* getRandomInt */])(FRAGMENT_YV_MIN * 1000, FRAGMENT_YV_MAX * 1000) / 1000,
                rv: Object(__WEBPACK_IMPORTED_MODULE_3__utils__["b" /* getRandomInt */])(-FRAGMENT_RV_RANGE * 1000, FRAGMENT_RV_RANGE * 1000) / 1000,
            });
        }
        this.reset();
        this.runtime.playSound("player/death");
    }
    updateGraphic() {
        this.scale.x = this.lastMovementDirection;
        if (this.onGround) {
            if (this.moving) {
                this.currentFrameProgress++;
                if (this.currentFrameProgress === WALK_ANIMATION_LENGTH) {
                    this.currentFrameProgress = 0;
                    this.walkingAnimationProgress++;
                }
                if (this.walkingAnimationProgress > WALK_ANIMATION_FRAMES) {
                    this.walkingAnimationProgress = 1;
                }
                this.texture = this.runtime.getImage(`player/walk${this.walkingAnimationProgress}`);
            }
            else {
                this.texture = this.runtime.getImage("player/idle");
            }
        }
        else {
            if (this.yv < 0.1) {
                this.texture = this.runtime.getImage("player/down");
            }
            else {
                this.texture = this.runtime.getImage("player/up");
            }
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PlayerSprite;



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = isMobile;
/* harmony export (immutable) */ __webpack_exports__["b"] = getOrDefault;
/* harmony export (immutable) */ __webpack_exports__["d"] = toHex;
/* unused harmony export radiansToDegree */
/* harmony export (immutable) */ __webpack_exports__["a"] = degreeToRadians;
// https://stackoverflow.com/a/3540295
// tests if the device is probably a mobile phone
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
// if obj is defined, return obj
// else return def
// used as less verbose option defaulting without neglecting falsy values (|| does that)
function getOrDefault(obj, def) {
    if (typeof obj === "undefined") {
        return def;
    }
    else {
        return obj;
    }
}
// https://stackoverflow.com/a/697841
function toHex(number) {
    return number.toString(16).toUpperCase();
}
function radiansToDegree(rad) {
    return rad * 180 / Math.PI;
}
function degreeToRadians(deg) {
    return deg * Math.PI / 180;
}


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sprite__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(5);


class ImageSprite extends __WEBPACK_IMPORTED_MODULE_0__sprite__["a" /* AbstractSprite */] {
    constructor(options) {
        super(options);
        this.texture = options.texture;
        this.width = Object(__WEBPACK_IMPORTED_MODULE_1__utils__["b" /* getOrDefault */])(options.width, this.texture.width);
        this.height = Object(__WEBPACK_IMPORTED_MODULE_1__utils__["b" /* getOrDefault */])(options.height, this.texture.height);
    }
    render(ctx) {
        if (!this.visible) {
            return;
        }
        ctx.save();
        this._setRenderValues(ctx);
        const x = Math.floor(this.x);
        const y = Math.floor(this.y);
        ctx.drawImage(this.texture, x, y, this.width, this.height);
        ctx.restore();
    }
    updateDimensions() {
        this.width = this.texture.width;
        this.height = this.texture.height;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ImageSprite;



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vector2d__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__task__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config__ = __webpack_require__(3);




class AbstractSprite extends __WEBPACK_IMPORTED_MODULE_1__task__["b" /* TaskRunner */] {
    constructor(options) {
        super();
        this.runtime = AbstractSprite.runtime;
        this.position = options.position;
        this.width = Object(__WEBPACK_IMPORTED_MODULE_2__utils__["b" /* getOrDefault */])(options.width, 0);
        this.height = Object(__WEBPACK_IMPORTED_MODULE_2__utils__["b" /* getOrDefault */])(options.height, 0);
        this.scale = Object(__WEBPACK_IMPORTED_MODULE_2__utils__["b" /* getOrDefault */])(options.scale, new __WEBPACK_IMPORTED_MODULE_0__vector2d__["a" /* Vector2D */](1, 1));
        this.persistent = Object(__WEBPACK_IMPORTED_MODULE_2__utils__["b" /* getOrDefault */])(options.persistent, false);
        this.visible = Object(__WEBPACK_IMPORTED_MODULE_2__utils__["b" /* getOrDefault */])(options.visible, true);
        this.rotation = Object(__WEBPACK_IMPORTED_MODULE_2__utils__["b" /* getOrDefault */])(options.rotation, 0);
        this.opacity = Object(__WEBPACK_IMPORTED_MODULE_2__utils__["b" /* getOrDefault */])(options.opacity, 1);
        this.rotationPoint = Object(__WEBPACK_IMPORTED_MODULE_2__utils__["b" /* getOrDefault */])(options.rotationPoint, new __WEBPACK_IMPORTED_MODULE_0__vector2d__["a" /* Vector2D */](0.5, 0.5));
        this.runtime.sprites.push(this);
    }
    update() {
        this.runTasks();
    }
    destroy() {
        this._removeFromContainer(this.runtime.sprites);
        for (const container of this.runtime.containers) {
            this._removeFromContainer(container);
        }
        this.resetTasks(); // stop all future things from running
    }
    _removeFromContainer(container) {
        const index = container.sprites.indexOf(this);
        if (index > -1) {
            container.sprites.splice(index, 1);
        }
    }
    // TODO: rotation
    intersects(thing) {
        if (thing instanceof AbstractSprite) {
            return this.x < thing.x + thing.width &&
                this.x + this.width > thing.x &&
                this.y < thing.y + thing.height &&
                this.y + this.height > thing.y;
        }
        else {
            for (const sprite of thing) {
                if (this.intersects(sprite)) {
                    return true;
                }
            }
            return false;
        }
    }
    // Test for intersections by literally rendering the sprites and looking for spots where they both exist
    // This needs some MASSIVE speed ups
    complexIntersects(thing) {
        // some inspiration from:
        // https://github.com/nathan/phosphorus/blob/master/phosphorus.js#L1663
        const createCanvas = () => {
            const canvas = document.createElement("canvas");
            canvas.width = this.runtime.canvas.width;
            canvas.height = this.runtime.canvas.height;
            return canvas;
        };
        const canvasA = createCanvas();
        const canvasB = createCanvas();
        const ctxA = canvasA.getContext("2d");
        const ctxB = canvasB.getContext("2d");
        this.render(ctxA);
        thing.render(ctxB);
        const width = canvasA.width;
        const height = canvasA.height;
        const dataA = ctxA.getImageData(0, 0, width, height).data;
        const dataB = ctxB.getImageData(0, 0, width, height).data;
        const length = dataA.length;
        for (let i = 0; i < length; i += 4) {
            if (dataA[i + 3] && dataB[i + 3]) {
                return true;
            }
        }
        return false;
    }
    _setRenderValues(ctx) {
        ctx.globalAlpha = this.opacity;
        if (this.rotation !== 0) {
            // terrible code
            // rotation is difficult
            // https://stackoverflow.com/a/4650102
            const translateX = this.x + this.width * this.rotationPoint.x;
            const translateY = this.y + this.height * this.rotationPoint.y;
            ctx.translate(translateX, translateY);
            ctx.rotate(Object(__WEBPACK_IMPORTED_MODULE_2__utils__["a" /* degreeToRadians */])(this.rotation));
            ctx.translate(-translateX, -translateY);
        }
        if (this.scale.x !== 1 || this.scale.y !== 1) {
            const translateX = this.x + this.width / 2;
            const translateY = this.y + this.height / 2;
            ctx.translate(translateX, translateY);
            ctx.scale(this.scale.x, this.scale.y);
            ctx.translate(-translateX, -translateY);
        }
    }
    get x() {
        return this.position.x;
    }
    set x(x) {
        this.position.x = x;
    }
    get y() {
        return this.position.y;
    }
    set y(y) {
        this.position.y = y;
    }
    get z() {
        return this.position.z;
    }
    set z(z) {
        this.position.z = z;
    }
    //
    // Nightlight related code
    //
    runBasicPhysics(xv, yv, options = {}) {
        options.collision = Object(__WEBPACK_IMPORTED_MODULE_2__utils__["b" /* getOrDefault */])(options.collision, true);
        options.restrictPositionValues = Object(__WEBPACK_IMPORTED_MODULE_2__utils__["b" /* getOrDefault */])(options.restrictPositionValues, true);
        options.friction = Object(__WEBPACK_IMPORTED_MODULE_2__utils__["b" /* getOrDefault */])(options.friction, true);
        options.midAirFriction = Object(__WEBPACK_IMPORTED_MODULE_2__utils__["b" /* getOrDefault */])(options.midAirFriction, true);
        options.roundValues = Object(__WEBPACK_IMPORTED_MODULE_2__utils__["b" /* getOrDefault */])(options.roundValues, true);
        this.x += xv;
        if (options.collision && this.handleCollision(xv, true)) {
            xv = 0;
        }
        if (options.restrictPositionValues) {
            if (this.x < 0) {
                this.x = 0;
                xv = 0;
            }
            else if (this.x + this.width > this.runtime.canvas.width) {
                this.x = this.runtime.canvas.width - this.width;
                xv = 0;
            }
        }
        let onGround = false;
        yv -= __WEBPACK_IMPORTED_MODULE_3__config__["d" /* GRAVITY */];
        this.y -= yv;
        if (options.collision && this.handleCollision(yv, false)) {
            if (yv < 0) {
                onGround = true;
            }
            yv = 0;
        }
        if (options.friction) {
            if (onGround || options.midAirFriction) {
                xv *= __WEBPACK_IMPORTED_MODULE_3__config__["c" /* FRICTION */];
            }
        }
        if (options.roundValues) {
            this.x = Math.round(this.x);
            this.y = Math.round(this.y);
        }
        return {
            xv, yv, onGround,
        };
    }
    handleCollision(velocity, horizontal) {
        for (const block of this.runtime.blocks) {
            if (block.solid && this.intersects(block) && block.handleIntersect(this, velocity, horizontal) !== false) {
                return true;
            }
        }
        return false;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AbstractSprite;



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__3rd_party_stableSort__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__3rd_party_stableSort___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__3rd_party_stableSort__);
// a container contains sprites
// isn't that earth shattering or what?

class Container {
    constructor() {
        this.runtime = Container.runtime;
        this.sprites = [];
        this.runtime.containers.push(this);
    }
    push(...items) {
        return this.sprites.push(...items);
    }
    *[Symbol.iterator]() {
        for (const sprite of this.sprites) {
            yield sprite;
        }
    }
    sort() {
        this.sprites.stableSort((a, b) => {
            return a.position.z - b.position.z;
        });
    }
    get length() {
        return this.sprites.length;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Container;



/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vector__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__task__ = __webpack_require__(2);


class BaseMouse extends __WEBPACK_IMPORTED_MODULE_1__task__["b" /* TaskRunner */] {
    constructor(runtime) {
        super();
        this.position = new __WEBPACK_IMPORTED_MODULE_0__vector__["a" /* Vector */](0, 0);
        this.runtime = runtime;
    }
    update() {
        this.runTasks();
    }
    get isDown() {
        return this.left.isDown;
    }
    get isUp() {
        return this.left.isUp;
    }
    get isClick() {
        return this.left.isClick;
    }
    get framesDown() {
        return this.left.framesDown;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BaseMouse;

class BaseMouseButton {
    constructor(mouse) {
        this.isDown = false;
        this.framesDown = 0;
        mouse.addTask(this.update.bind(this));
    }
    update() {
        if (this.isDown) {
            this.framesDown++;
        }
        else {
            this.framesDown = 0;
        }
    }
    get isUp() {
        return !this.isDown;
    }
    get isClick() {
        return this.framesDown === 1;
    }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = BaseMouseButton;

// A mouse button that doesn't do anything and always returns basic defaults
// Used by mobile mouse support as only left click is supported there
class EmptyMouseButton {
    constructor() {
        this.isDown = false;
        this.isUp = true;
        this.isClick = false;
        this.framesDown = 0;
    }
    update() { }
}
/* harmony export (immutable) */ __webpack_exports__["c"] = EmptyMouseButton;



/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Vector2D {
    constructor(x = 0, y = 0) {
        if (typeof x === "object") {
            this.x = x.x;
            this.y = x.y;
        }
        else {
            this.x = x;
            this.y = y;
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Vector2D;



/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = getRandomInt;
/* harmony export (immutable) */ __webpack_exports__["a"] = clone;
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function clone(array) {
    let i = array.length;
    const result = [];
    while (i--) {
        result[i] = array[i];
    }
    return result;
}


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__(3);


class GrassBlock extends __WEBPACK_IMPORTED_MODULE_0__block__["a" /* Block */] {
    constructor(opts) {
        super(opts);
        this.y += __WEBPACK_IMPORTED_MODULE_1__config__["a" /* BLOCK_HEIGHT */];
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = GrassBlock;



/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__engine_task__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__engine_vector__ = __webpack_require__(1);



const VIBRATE_EVERY = 3;
const VIBRATE_RANGE = 2;
const VIBRATE_TIMES = 20;
const FALL_DELAY_PER_Y = 0.25;
class FallingBlock extends __WEBPACK_IMPORTED_MODULE_0__block__["c" /* SolidBlock */] {
    constructor(opts) {
        super(opts);
        this.yv = 0;
        this.vibrateProgress = 0;
        this.frame = 0;
        this.startingPosition = new __WEBPACK_IMPORTED_MODULE_2__engine_vector__["a" /* Vector */](this.position);
    }
    trigger() {
        this.x -= VIBRATE_RANGE / 2;
        this.addTask(new __WEBPACK_IMPORTED_MODULE_1__engine_task__["a" /* Task */]({
            run: this.vibrate,
            repeatEvery: 3,
        }));
    }
    vibrate(task) {
        this.vibrateProgress++;
        if (this.vibrateProgress === VIBRATE_TIMES) {
            const fromBottom = this.runtime.canvas.height - this.y;
            task.stop();
            this.position = this.startingPosition;
            const delay = fromBottom * FALL_DELAY_PER_Y;
            this.addTask(new __WEBPACK_IMPORTED_MODULE_1__engine_task__["a" /* Task */]({
                run: this.fall,
                delay,
                repeatEvery: 0,
            }));
            this.addTask(new __WEBPACK_IMPORTED_MODULE_1__engine_task__["a" /* Task */]({
                run: this.playSound,
                delay,
            }));
        }
        else if (this.vibrateProgress % 2 === 0) {
            this.x -= VIBRATE_RANGE;
        }
        else {
            this.x += VIBRATE_RANGE;
        }
    }
    playSound() {
        this.runtime.playSound("blocks/smash");
    }
    fall(task) {
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
/* harmony export (immutable) */ __webpack_exports__["a"] = FallingBlock;



/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(15);

const game = new __WEBPACK_IMPORTED_MODULE_0__game__["a" /* Nightlight */]();
// add in all of our assets
//
// Pre sword and core
//
game.addImage("player/idle");
game.addImage("player/up");
game.addImage("player/down");
game.addImage("player/walk1");
game.addImage("player/walk2");
game.addImage("player/walk3");
game.addImage("player/walk4");
game.addImage("fragments/1");
game.addImage("fragments/2");
game.addImage("fragments/3");
game.addImage("fragments/4");
game.addImage("fragments/5");
game.addImage("coin/1");
game.addImage("coin/2");
game.addImage("coin/3");
game.addImage("coin/4");
game.addImage("blocks/a");
game.addImage("blocks/b");
game.addImage("blocks/c");
game.addImage("blocks/d");
game.addImage("blocks/e");
game.addImage("blocks/f");
game.addImage("blocks/g");
game.addImage("blocks/h");
game.addImage("blocks/i");
game.addImage("blocks/j");
game.addImage("blocks/k");
game.addImage("blocks/l");
game.addImage("blocks/m");
game.addImage("blocks/n");
game.addImage("blocks/p");
game.addImage("blocks/q");
game.addImage("blocks/r");
game.addImage("blocks/s");
game.addImage("blocks/u");
game.addImage("blocks/u2");
game.addImage("blocks/v");
game.addImage("blocks/w");
game.addImage("blocks/y");
game.addImage("blocks/z");
game.addImage("blocks/crumble/1");
game.addImage("blocks/crumble/2");
game.addImage("blocks/crumble/3");
game.addImage("blocks/crumble/4");
game.addImage("blocks/crumble/5");
game.addImage("blocks/crumble/6");
game.addImage("blocks/crumble/7");
game.addImage("blocks/crumble/8");
game.addImage("blocks/crumble/9");
game.addImage("blocks/button/red");
game.addImage("blocks/button/on");
game.addImage("blocks/spikes/up");
game.addImage("blocks/spikes/down");
game.addImage("blocks/spikes/left");
game.addImage("blocks/spikes/right");
game.addImage("boss/sword/sword");
game.addImage("boss/sword/open");
game.addImage("boss/sword/heal");
game.addImage("boss/sword/hurt");
game.addImage("hit/-1");
game.addImage("hit/+1");
game.addImage("hit/+0");
//
// Post sword
//
game.addImage("blocks/1");
game.addImage("blocks/2");
game.addImage("blocks/3");
game.addImage("blocks/4");
game.addImage("blocks/5");
game.addImage("blocks/6");
game.addImage("blocks/7");
game.addImage("blocks/8");
game.addImage("blocks/9");
game.addImage("blocks/!");
game.addImage("blocks/lightbutton/1");
game.addImage("blocks/lightbutton/2");
game.addImage("blocks/lightbutton/down");
game.addImage("jumplight");
//
// Post second boss / Castle
//
game.addImage("brick");
game.addImage("blocks/caret");
game.addImage("blocks/ampersand");
game.addImage("blocks/asterisk"); // IT WOULDN'T LET ME SAVE IT OTHERWISE
game.addImage("blocks/(");
game.addImage("blocks/)");
game.addImage("blocks/-");
game.addImage("blocks/underscore");
game.addImage("blocks/=");
game.addImage("blocks/+");
game.addImage("blocks/grave");
game.addImage("blocks/castlecorner/topright");
game.addImage("blocks/castlecorner/topleft");
game.addImage("blocks/castlecorner/bottomright");
game.addImage("blocks/castlecorner/bottomleft");
//
// Sounds
//
game.addSound("blocks/coin");
game.addSound("blocks/break");
game.addSound("blocks/fall");
game.addSound("blocks/smash");
game.addSound("blocks/button");
game.addSound("blocks/fds");
game.addSound("player/death");
game.addSound("player/ding");
game.addSound("player/jump1");
game.addSound("player/jump2");
// background music
game.addSound("music/exploration");
game.addSound("music/netherslament");
game.addSound("music/boss/1");
game.addSound("music/boss/2");
game.addSound("music/blackroad/1");
game.addSound("music/blackroad/2");
game.addSound("music/finalboss/1");
game.addSound("music/finalboss/2");
// wait for it to load then run our stuff
const progressElement = document.getElementById("progress");
game.waitForAssets((progress) => {
    progressElement.value = progress;
}).then(run);
function run() {
    progressElement.style.display = "none";
    game.start();
}


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__engine_runtime__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__levels_levels__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sprites_player_player__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__engine_vector__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__blockmap__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__sprites_blocks_block__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__config__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__engine_container__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__sprites_star__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__utils__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__levels_jumplights__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__sprites_jumplight__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__sprites_zindex__ = __webpack_require__(41);













class Nightlight extends __WEBPACK_IMPORTED_MODULE_0__engine_runtime__["a" /* GameRuntime */] {
    constructor() {
        super(document.getElementById("canvas"));
        this.level = 0;
        this.background = "black";
        this.backgroundMusic = [];
        // containers
        this.blocks = new __WEBPACK_IMPORTED_MODULE_7__engine_container__["a" /* Container */]();
        this.lightBlocks = new __WEBPACK_IMPORTED_MODULE_7__engine_container__["a" /* Container */]();
        this.backgroundStars = new __WEBPACK_IMPORTED_MODULE_7__engine_container__["a" /* Container */]();
    }
    start() {
        super.start();
        this.levels = Object(__WEBPACK_IMPORTED_MODULE_1__levels_levels__["a" /* getLevels */])(this);
        this.createPlayer();
        this.createStarBackground();
        this.renderLevel();
    }
    createPlayer() {
        this.player = new __WEBPACK_IMPORTED_MODULE_2__sprites_player_player__["a" /* PlayerSprite */]({
            texture: this.getImage("player/idle"),
            position: new __WEBPACK_IMPORTED_MODULE_3__engine_vector__["a" /* Vector */](0, 0, __WEBPACK_IMPORTED_MODULE_12__sprites_zindex__["a" /* ZIndexes */].Player),
            width: __WEBPACK_IMPORTED_MODULE_6__config__["b" /* BLOCK_WIDTH */],
            height: __WEBPACK_IMPORTED_MODULE_6__config__["a" /* BLOCK_HEIGHT */],
            persistent: true,
        });
    }
    createStarBackground() {
        for (let i = 0; i < 50; i++) {
            const x = Object(__WEBPACK_IMPORTED_MODULE_9__utils__["b" /* getRandomInt */])(0, this.canvas.width);
            const y = Object(__WEBPACK_IMPORTED_MODULE_9__utils__["b" /* getRandomInt */])(0, this.canvas.height);
            new __WEBPACK_IMPORTED_MODULE_8__sprites_star__["a" /* BackgroundStarSprite */]({
                position: new __WEBPACK_IMPORTED_MODULE_3__engine_vector__["a" /* Vector */](x, y, -10),
                width: 2,
                height: 2,
                persistent: true,
            });
        }
    }
    destroyLevel() {
        // a normal for loop won't work because we are modifying the list mid loop
        for (let i = 0; i < this.sprites.length;) {
            const sprite = this.sprites.sprites[i];
            if (sprite.persistent) {
                i++;
            }
            else {
                sprite.destroy();
            }
        }
    }
    createBlock(position, char, index) {
        const blockType = __WEBPACK_IMPORTED_MODULE_4__blockmap__["a" /* blockMap */][char];
        let spriteConstructor;
        let texture;
        if (typeof blockType === "undefined") {
            console.warn("skipping block", char);
            return;
        }
        else if (typeof blockType === "string") {
            texture = this.getImage(blockType);
            spriteConstructor = __WEBPACK_IMPORTED_MODULE_5__sprites_blocks_block__["c" /* SolidBlock */];
        }
        else {
            texture = this.getImage(blockType.texture);
            spriteConstructor = blockType.type;
        }
        if (!texture) {
            console.error(`Could not find texture for ${blockType}`);
            return;
        }
        const opts = {
            width: texture.width,
            height: texture.height,
            position,
            texture,
            levelIndex: index,
        };
        new spriteConstructor(opts);
    }
    renderLevel(num = this.level) {
        this.destroyLevel();
        const level = this.levels[num];
        if (!level) {
            alert("That's the end of the game for now. Thanks for playing.");
        }
        const levelData = level.levelData;
        this.levelData = levelData;
        let x = 0;
        let y = this.canvas.height - __WEBPACK_IMPORTED_MODULE_6__config__["a" /* BLOCK_HEIGHT */];
        for (let i = 0; i < levelData.length; i++) {
            const char = levelData[i];
            if (char !== ".") {
                const position = new __WEBPACK_IMPORTED_MODULE_3__engine_vector__["a" /* Vector */](x, y);
                this.createBlock(position, char, i);
            }
            x += __WEBPACK_IMPORTED_MODULE_6__config__["b" /* BLOCK_WIDTH */];
            if (x >= this.canvas.width) {
                x = 0;
                y -= __WEBPACK_IMPORTED_MODULE_6__config__["a" /* BLOCK_HEIGHT */];
            }
        }
        if (level.newBackground) {
            this.background = level.newBackground;
        }
        if (level.newBackgroundMusic) {
            this.setBackgroundMusic(level.newBackgroundMusic);
        }
        if (level.handlers) {
            for (const handler of level.handlers) {
                handler(this);
            }
        }
        this.spawnJumpLights();
        this.player.reset();
    }
    spawnJumpLights() {
        const jumpLights = __WEBPACK_IMPORTED_MODULE_10__levels_jumplights__["a" /* JumpLights */][this.level];
        if (!jumpLights) {
            return;
        }
        const texture = this.getImage("jumplight");
        for (const position of jumpLights) {
            new __WEBPACK_IMPORTED_MODULE_11__sprites_jumplight__["a" /* JumpLight */]({
                texture,
                position,
            });
        }
    }
    setBackgroundMusic(music) {
        for (const sound of this.backgroundMusic) {
            this.stopSound(sound);
            sound.loop = false;
            sound.onended = () => { };
        }
        for (const sound of music) {
            sound.onended = () => this.nextBackgroundMusic();
        }
        this.backgroundMusic = music;
        this.playSound(music[0]);
    }
    nextBackgroundMusic() {
        if (this.backgroundMusic.length > 1) {
            this.backgroundMusic.shift();
        }
        this.playSound(this.backgroundMusic[0]);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Nightlight;



/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__container__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__drivers_keyboard_keyboard__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__drivers_mouse_mouse__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__drivers_mouse_touchscreen__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__errors_exit__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__sprite__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__task__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__utils__ = __webpack_require__(5);








const CANVAS_WIDTH = 480;
const CANVAS_HEIGHT = 360;
const IMAGE_FORMAT = "png";
const SOUND_FORMAT = "mp3";
// this is the main game runtime object
// rendering is done here
// a lot of stuff is done here
class GameRuntime extends __WEBPACK_IMPORTED_MODULE_6__task__["b" /* TaskRunner */] {
    constructor(canvas) {
        super();
        // see resetVariables()
        this.images = new Map();
        this.sounds = new Map();
        this.containers = [];
        this.frames = 0;
        this.background = "white";
        this._assetPromises = [];
        canvas.width = CANVAS_WIDTH;
        canvas.height = CANVAS_HEIGHT;
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        // mouse driver, support pc and mobile to some degree
        if (!Object(__WEBPACK_IMPORTED_MODULE_7__utils__["c" /* isMobile */])()) {
            console.log("using normal mouse");
            this.mouse = new __WEBPACK_IMPORTED_MODULE_2__drivers_mouse_mouse__["a" /* Mouse */](this);
        }
        else {
            console.log("using mobile mouse");
            this.mouse = new __WEBPACK_IMPORTED_MODULE_3__drivers_mouse_touchscreen__["a" /* TouchscreenMouse */](this);
        }
        this.keyboard = new __WEBPACK_IMPORTED_MODULE_1__drivers_keyboard_keyboard__["a" /* Keyboard */](this);
        // set the current runtime on some objects
        // i dont want to do this but it works
        __WEBPACK_IMPORTED_MODULE_5__sprite__["a" /* AbstractSprite */].runtime = this;
        __WEBPACK_IMPORTED_MODULE_0__container__["a" /* Container */].runtime = this;
        // reset other variables
        this.resetVariables();
        // debugging
        window.runtime = this;
        // run the mouse driver
        this.addTask(this.updateMouse);
        // classess are weird
        this.loop = this.loop.bind(this);
    }
    ///
    /// ASSETS
    ///
    // add an asset and start loading it
    addImage(src) {
        // uses the original src for storage
        // TODO: consider using the new src and adding that into getAsset?
        const originalSrc = src;
        // add the extension and folder
        src = `assets/${src}`;
        if (src.indexOf(".") === -1) {
            src += "." + IMAGE_FORMAT;
        }
        console.log("adding image", src);
        const promise = new Promise((resolve, reject) => {
            const image = document.createElement("img");
            image.src = src;
            image.onload = () => resolve();
            image.onerror = () => reject();
            this.images.set(originalSrc, image);
        });
        this._assetPromises.push(promise);
        return promise;
    }
    // see: addImage()
    addSound(src) {
        const originalSrc = src;
        // add the extension and folder
        src = `assets/sounds/${src}`;
        if (src.indexOf(".") === -1) {
            src += "." + SOUND_FORMAT;
        }
        console.log("adding sound", src);
        const promise = new Promise((resolve, reject) => {
            const sound = document.createElement("audio");
            sound.src = src;
            sound.oncanplaythrough = () => resolve();
            sound.onerror = () => reject();
            sound.preload = "auto";
            this.sounds.set(originalSrc, sound);
        });
        this._assetPromises.push(promise);
        return promise;
    }
    // wait for all assets to load
    waitForAssets(handler = () => { }) {
        // progress reporting
        const total = this._assetPromises.length;
        let current = 0;
        for (const promise of this._assetPromises) {
            promise.then(() => {
                current++;
                handler(current / total);
            });
        }
        // the actual loading stuff
        return Promise.all(this._assetPromises)
            .then(() => {
            console.log("loaded assets");
            this._assetPromises = [];
        });
    }
    // get an asset with a name
    getImage(src) {
        return this.images.get(src);
    }
    // get a sound with a name
    getSound(src) {
        return this.sounds.get(src);
    }
    // plays a sound and resets its currentTime to 0
    playSound(src) {
        if (typeof src === "string") {
            src = this.getSound(src);
        }
        src.currentTime = 0;
        src.play();
        return src;
    }
    // stops a sound and resets its currentTime to 0
    stopSound(src) {
        if (typeof src === "string") {
            src = this.getSound(src);
        }
        src.currentTime = 0;
        src.pause();
        return src;
    }
    ///
    /// CORE
    ///
    // reset variabels to sane defaults
    // after starting it has to reset things
    resetVariables() {
        // this.containers = [];
        this.sprites = new __WEBPACK_IMPORTED_MODULE_0__container__["a" /* Container */]();
    }
    // resets things and starts the loop
    start() {
        console.log("starting loop");
        this.resetVariables();
        this.loop();
    }
    // the main loop - calls all tasks in all sprites
    loop() {
        // update sprites and this
        this.frames++;
        try {
            this.update();
        }
        catch (e) {
            // handle exiting
            if (e instanceof __WEBPACK_IMPORTED_MODULE_4__errors_exit__["a" /* ExitError */]) {
                this.onexit();
                return;
            }
            else {
                throw e;
            }
        }
        // render
        this.render();
        // request the next frame to render
        requestAnimationFrame(this.loop);
    }
    update() {
        // all non-core details should be implemented using this.addTask
        // the only core things right now are sprite ticking and rendering (partly due to ordering reasons)
        // all tasks added on here are executed BEFORE sprites
        this.runTasks();
        // all sprites
        for (const sprite of this.sprites) {
            sprite.update();
        }
    }
    render() {
        // clear the canvas
        this.resetCanvas();
        // sort sprites by z TODO: find a better for to do this
        this.sortSprites();
        // render all sprites onto our canvas
        for (const sprite of this.sprites) {
            sprite.render(this.ctx);
        }
    }
    sortSprites() {
        this.sprites.sort();
    }
    // throws an error that is handled gracefully by the update function
    // stops ALL execution
    exit() {
        console.warn("exiting using exit()");
        // instances of ExitError are treated specially by the update function
        throw new __WEBPACK_IMPORTED_MODULE_4__errors_exit__["a" /* ExitError */]();
    }
    // clears the canvas and replaces it with a blank white background
    resetCanvas() {
        this.ctx.scale(1, 1);
        this.ctx.fillStyle = this.background;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    // small function that calls the mouse driver's update funciton
    updateMouse() {
        this.mouse.update();
    }
    // called when exiting
    onexit() {
        console.warn("empty onexit()");
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = GameRuntime;



/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://gist.github.com/fsufitch/18bb4692d5f46b649890f8fd58765fbc with minor style changes
let defaultCmp = (a, b) => {
    return a - b;
};
Array.prototype.stableSort = function (cmp = defaultCmp) {
    const stabilized = this.map((el, index) => ([el, index]));
    const stableCmp = (a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    };
    stabilized.sort(stableCmp);
    for (let i = 0; i < this.length; i++) {
        this[i] = stabilized[i][0];
    }
    return this;
};


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__(19);

class Keyboard extends __WEBPACK_IMPORTED_MODULE_0__base__["a" /* AbstractKeyboard */] {
    constructor(runtime) {
        super(runtime);
        document.addEventListener("keydown", (e) => {
            const keyCode = e.keyCode;
            if (Keyboard.PREVENT.indexOf(keyCode) > -1) {
                e.preventDefault();
            }
            this.keys[keyCode].isPressed = true;
        });
        document.addEventListener("keyup", (e) => {
            const keyCode = e.keyCode;
            if (Keyboard.PREVENT.indexOf(keyCode) > -1) {
                e.preventDefault();
            }
            this.keys[keyCode].isPressed = false;
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Keyboard;

Keyboard.PREVENT = [
    32,
    37,
    38,
    39,
    40,
];


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__task__ = __webpack_require__(2);

class AbstractKeyboard extends __WEBPACK_IMPORTED_MODULE_0__task__["b" /* TaskRunner */] {
    constructor(runtime) {
        super();
        this.keys = [];
        runtime.addTask(this.update.bind(this));
        for (let i = 0; i < AbstractKeyboard.KEY_COUNT; i++) {
            this.keys[i] = new Key(this, i);
        }
    }
    update() {
        this.runTasks();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AbstractKeyboard;

AbstractKeyboard.KEY_COUNT = 256;
class Key {
    constructor(keyboard, keyCode) {
        this.isPressed = false;
        this.framesDown = 0;
        keyboard.addTask(this.update.bind(this));
    }
    update() {
        if (this.isPressed) {
            this.framesDown++;
        }
        else {
            this.framesDown = 0;
        }
    }
    get justPressed() {
        return this.framesDown === 1;
    }
}
/* unused harmony export Key */



/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__(9);

// handles mouse events
// a simple "driver" for the mouse
// TODO: touchscreen support
// probably will use another "driver" that is compatible
var Button;
(function (Button) {
    Button[Button["left"] = 0] = "left";
    Button[Button["middle"] = 1] = "middle";
    Button[Button["right"] = 2] = "right";
})(Button || (Button = {}));
class MouseButton extends __WEBPACK_IMPORTED_MODULE_0__base__["b" /* BaseMouseButton */] {
    constructor(mouse, button) {
        super(mouse); // It's a bird! It's a plane! No it's Supermouse!
        this.button = button;
        document.addEventListener("mousedown", (e) => {
            if (e.button === this.button) {
                this.isDown = true;
            }
        });
        document.addEventListener("mouseup", (e) => {
            if (e.button === this.button) {
                this.isDown = false;
            }
        });
    }
}
class Mouse extends __WEBPACK_IMPORTED_MODULE_0__base__["a" /* BaseMouse */] {
    constructor(runtime) {
        super(runtime);
        this.right = new MouseButton(this, Button.right);
        this.middle = new MouseButton(this, Button.middle);
        this.left = new MouseButton(this, Button.left);
        runtime.canvas.addEventListener("mousemove", (e) => {
            this.position.x = e.layerX;
            this.position.y = e.layerY;
        });
        runtime.canvas.addEventListener("mousedown", (e) => {
            e.preventDefault();
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Mouse;



/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vector__ = __webpack_require__(1);


// handles mouse events
// a simple "driver" for the mouse
// TODO: touchscreen support
// probably will use another "driver" that is compatible
class TouchscreenButton extends __WEBPACK_IMPORTED_MODULE_0__base__["b" /* BaseMouseButton */] {
    constructor(mouse) {
        super(mouse); // It's a bird! It's a plane! No it's Supermouse!
        document.addEventListener("touchstart", (e) => {
            this.isDown = true;
        });
        document.addEventListener("touchend", (e) => {
            this.isDown = false;
        });
        document.addEventListener("touchcancel", (e) => {
            this.isDown = false;
        });
    }
}
class TouchscreenMouse extends __WEBPACK_IMPORTED_MODULE_0__base__["a" /* BaseMouse */] {
    constructor(runtime) {
        super(runtime);
        // only the left mouse button does stuff
        this.left = new TouchscreenButton(this);
        this.middle = new __WEBPACK_IMPORTED_MODULE_0__base__["c" /* EmptyMouseButton */]();
        this.right = new __WEBPACK_IMPORTED_MODULE_0__base__["c" /* EmptyMouseButton */]();
        // stop scrolling, zooming, or other stuff that you can do with your fingers
        this.handleEvent = this.handleEvent.bind(this);
        runtime.canvas.addEventListener("touchmove", this.handleEvent);
        runtime.canvas.addEventListener("touchstart", this.handleEvent);
        runtime.canvas.addEventListener("touchend", this.handleEvent);
        runtime.canvas.addEventListener("touchcancel", this.handleEvent);
    }
    handleEvent(e) {
        e.preventDefault();
        const offset = this.findOffset(this.runtime.canvas);
        this.position.x = e.changedTouches[0].clientX - offset.x;
        this.position.y = e.changedTouches[0].clientY - offset.y;
    }
    // https://developer.mozilla.org/en-US/docs/Web/API/Touch_events with minor modifications
    findOffset(el) {
        let curleft = 0;
        let curtop = 0;
        while (el.offsetParent) {
            curleft += el.offsetLeft;
            curtop += el.offsetTop;
            el = el.offsetParent;
        }
        return new __WEBPACK_IMPORTED_MODULE_1__vector__["a" /* Vector */](curleft - document.body.scrollLeft, curtop - document.body.scrollTop);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TouchscreenMouse;



/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// error is handled more gracefully by the engine
// than a regular error
class ExitError extends Error {
    constructor() {
        super("Stopping game execution");
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ExitError;



/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getLevels;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sprites_bosses_sword__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__engine_vector__ = __webpack_require__(1);


function deleteBackgroundStars(game) {
    // the sprites are removed from the list as we iterate over it
    // so a normal for loop would skip half the items
    const length = game.backgroundStars.length;
    for (let i = 0; i < length; i++) {
        game.backgroundStars.sprites[0].destroy();
    }
}
function bossSpawner(bossType, texture) {
    // Spawn the boss with the texture at 0,0
    // The sprite should correct any values such as position
    return () => {
        new bossType({
            position: new __WEBPACK_IMPORTED_MODULE_1__engine_vector__["a" /* Vector */](0, 0, 0),
            texture,
        });
    };
}
function getLevels(game) {
    return [
        // 0
        {
            levelData: "eaaaaaaaaafeaaaafeaaaaaaaaaaaaeaaaaaaaaafbccccdeaaaaaaaaaaaaeaaaaaaaaafooooooeaaaaaaaaaaaaeaaaaaaaaaf......eaaaaaaaaaaaaeaaaaaaaaaf......eaaaaaaaaaaaabcccccccccd......bcccmaaaaaaaajkpppkkpqkl......jkqpeaaaaaaaa.....................eaaaaaaaa.....................eamccccnc.....................bcdkpkq.k.....................qpl..............................................................................................................................................................................................................................................................................................................................................................................",
            newBackground: "black",
            newBackgroundMusic: [game.getSound("music/exploration")],
        },
        // 1
        {
            levelData: "aaaaaaaaaafr.r.r.r.r.r.eaaaaaaaaaaaaaaaafo.o.o.o.o.o.eaaaaaaaaaaaaaaaaf............eaaaaaaaaaaaaaaaaf............eaaaaaaaaaaaaaaaaf............eaaaaaaaaaaaaaaaaf.gi.........eaaaaaaaaaaaaaaaaf.jl.........eaaaaaaaaaaaaaaaaf.......gi...eaaaaaaccccccccccd.......jl...eaaaaaaqkkpkpqqkkl...........gmaaaaaa.....................gmaaaaaaa.....................bcmaaaaaa.....................kqeaaaaaa............ghhhhi.....eaaaaaa............jpqqkl.....eaaaaaa......ghi..............eaaaaaa......qkp..............eaaaaaa.......................eaaaaaa.............ghhhhi....bccnccc.............jqkkpl....pkq.kqk..........................................................................................",
        },
        // 2
        {
            levelData: "aaaaaaf..............srrrrrrrraaaaaaf..............srrrrrrrraaaaaaf..............srrrrrrrraaaaaaf..............sssssrrrraaaaaaf..................srrrraaaaaaf..t....t..........srrrraaaaaaf..................srrrraaaaaaf..................ssnssaaaaaaf.......................ccccccd.......................kpkqqkl....gi............................ef.........ghhhhhhh...........ef.......ghmaaaaaaa...........ef......gmaaaaaaaaa...........emhhhhhhmaaaaaaaaaa...........eaaaaaaaaaaaaaaaaaa.........ghmaaaaaaaaaaaaaaaaaa.......ghmaaaaaaaaaaaaaaaaaaaa.....ghmaaaaaaaaaaaaaaaaaaaaaa...ghmaaaaaaaaaaaaaaaaaaaaaaaa..gmaaaaaaaaaaaaaaaaaaaaaaaaaa.gmaaaaaaaaaaaaaaaaaaaaaaaaaaa.eaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        },
        // 3
        {
            levelData: "rrrrrs...................srrrrrrrrrs...................srrrrrrrrrs...................srrrrrrrrrs...................srrrrrrssss...................ssnssrrs......t...t................rrs...........................sss..............t...................................................gi............................emhi.................hi......gmaaf.................amhi...gmaaami...............gaaamhhhmaaaaamhi...........ghmaaaaaaaaaaaaaaamhhi.....ghhmaaaaaaaaaaaaaaaaaaaamhhhhhmaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        },
        // 4
        {
            levelData: "aaaaaf.............t....eaaaaaaaaaaf...t..............bcmaaaaaaaaf........t...........bmaaaaamcd.....................bcmmccd.........................ef...........................gmf.....ghhhvvvvvvhhhi.......gmami...gmmcdoo..oobccmhhi....peafp..gmaf...........bcmmhhi..eaf...qeaf.............bmafp..eami...emmi.............emd...eaami..efpp..ghhhi......ef...gmaafq..ef....pqncmi....gmd...eaaaf...bmi.......ef....bd....eaaaf....ef.......ef....w....gmaaami...ef.ghhhhhmmi...w....eaaaaami..emhmccuccmamhi.w..ghmaaaaaaf..bccd.....bmaamhhhhmaaaaaaaaf............eaaaaaaaaaaaaaaaami..........gmaaaaaaaaaaaaaaaaami.......ghmaaaaaaaaaaaaaaaaaaamhhhhhhhmaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        },
        // 5
        {
            levelData: "aaaaaaaaaaafbccccdeaaaaaaaaaaaaaaaaaaaaaafooooooeaaaaaaaaaaaaaaaaaaaaaaf......eaaaaaaaaaaaaaaaaaaaaaaf......eaaaaaaaaaaaaaaaaaaaaaaf......eaaaaaaaaaaaaaaaaaaaaaaf......eaaaaaaaaaaaaaaaaaaaaaaf......eaaaaaaaaaaacccccccccccd......bccccccccccckkpppkkqpkkl......jkqkqkkpqqpp....................................................................................................................................................................................................................................................................................................................................................................................................................................",
            handlers: [bossSpawner(__WEBPACK_IMPORTED_MODULE_0__sprites_bosses_sword__["a" /* SwordBoss */], game.getImage("boss/sword/sword"))],
            newBackgroundMusic: [game.getSound("music/boss/1"), game.getSound("music/boss/2")],
        },
        // 6
        {
            levelData: "aaaaaa5...................4aaaaaaaaa5...........y.......4aaaaaaaaa5...................4aaaaaaaaa5.....y.zzz.........1222aaaaaa5............zzz......x.aaaaaa5.......................2222223..zzz..............................................................................................................y..........................................................................................................................y678...........................4a5..........67778............123...t......4aaa5......68..............t..12n23......13....................................................................................................................................................",
            newBackgroundMusic: [game.getSound("music/blackroad/1"), game.getSound("music/blackroad/2")],
        },
        // 7
        {
            levelData: "aaaaaaaaaaaaaaaa5..!!!!!4aa5..aaaaaaaaaaaaaaaa5.....x.4aa98.aaaaaaaaaaaaaaaa5.......4aaa5.a9222222222229aa5.......4aaa98a5...w..w....4aa5..!!!!!122223a5...w.......4aa5.......aaaa..a5...w.......4aa5.......aaaa..a5.........!!4aa5!!!!!!!6778!.a5...........4aa5ooooooo4aa5..a978.........1223.......1223..aaa978........................aaaaa98.......................aaaaaa98......................aaaaaaa9778!!!!!..............229a9222223....................z1u3z.........................z...z......68ww68.............z...z......45!!45.............zzzzz......45..45........................45..45........................45..45........................497@95........................4aaaa5............",
        },
        // 8
        {
            levelData: "aaaa5...ooo45.45..45..soo4aaaaaaaa5......13.13..13..s..4aaaaaaaa5....s............s..4aaaa22223....s..#s$.......s..12222.........s..#ssss%s...s.......8........s..#ssssss!!!s.......978.....ss..#ss.......s.......aa98.....s...s$.sssssss@s.....aaa98....s...s$.s.......s.....aaaa98...s$..s$!s.......s.....aaaa93...s$..s$.s.......s.....aaaa5....s$..s$.s.......s.....aaaa5....s$..s$.s.......s.....aaaa5....s...s$!s.......s.....aaaa5...ss...s$.s.......s.....aaaa5....s..#s$.s!!!!!!!s.....aaaa5....s..#s$.sooooooos.....aaaa5....s..#s$!s......!s.....aaaa5.......#s$...............aaaa5.......ss$...............aaaa97778...ss$...............aaaaaaaa97778.................aaaaaaaaaaaa5.................",
        },
        // 9
        {
            levelData: "aaaaaaaaa5oooooooo4aa5......4aaaaaaaaaa5........4aa5......4aaaaaaaaaa5........1223......4a22222229a5..................4a.......4a5..................4a.......4a5..................4a.......4a5.............%....4a8ss....4a5.............o....4a5oo....4a5..................4a5......4a5..................4a5......4a5..................4a5......4a5...678............4a5....ss4a5...4a5.......%....4a5....oo4a5...4a5.......o....4a5......4a5...4a5............4a5......4a5...4a5............4a5......4a5...4a5............4a5s.....4a5...4a5............4a5o.....123...4a5.......%....4a5............4a5.......o....1n5............4a5..............5............4a5..............5............4a5..............",
        },
        // 10
        {
            levelData: "4aaaaaaaaaaaaa5............4aa4aaaaaaaaaaaaa5............4aa4aaaaaaaaaaaaa5............4aa4aaaaaaaaaaaaa5............1n2122222222222223............w........y....................w........y.............zzz....w..$..#ss$.#s..........z.z....w..$...#s$.#s..........z.z....w..$....s$.#s....%.....zzz....w..s$...s$.#s...#s$...........w..ss$..s$.#s...#s$...........w..sss!!s$.#s...#s$...........w..sx...s$.#s...#s$...........w..s....s$.#s...#s$...........w.......su!ss...#s$...........w.......s...s...#s$...........w.......s...s...#s$...........w.......s...s...#s$...........w.......s!!!s...#s$..........#s$..............#s$..........#s$..............#s$..........#s$..............#s$..........#s$.",
        },
        // 11
        {
            levelData: "aaaaaa5....................4aaaaa92n3....................4aaaaa5......................69aaaaa5.....................6aaaaaaa9778..................129aaaaaaaa5....................4aaaaaaaa5....................4aaaaaaaa5....................4aaaaaaaa5....................4aaaaaaaa5....................4aaaaaaaa5....................4aaaaaaaa5....................4aaaaaaaa5....................4aa2222223wwwwwwwwwwwwwwwwwwww1u2..............................................................................................................................................................................................................................................................................",
        },
        // 12
        {
            levelData: "2222222222229aaaa9222222222222............4aaaa5........................4aaaa5........................122223......................................._=+...........................)^-...........................)^-...........................)^-......6778.................)^-......1223.................)^-...........................)^-...........................)^-...........................)^-.......................6777)^-.......................1222)^-...........................)^-...........................)^-...67778...................)^-...12223...................)^-...........................)^-.........................._`^-..........................&**(..............................",
            newBackgroundMusic: [game.getSound("music/boss/1"), game.getSound("music/boss/2")],
        },
        // 13
        {
            levelData: "^^^-..........................^^^-..........................***(...t...................................t.............................................................................................t.....................................................................................t.......t................t..............................................................................u.......................................t.....%%%..........................%_=+%........................#_`^`+$.......................#)^^^-$.......................#&*n*($........%%%..............w.w.........._=+..............www..........)^-...........................)^-...........................)^-.",
            newBackground: game.ctx.createPattern(game.getImage("brick"), "repeat"),
            handlers: [deleteBackgroundStars],
            newBackgroundMusic: [game.getSound("music/netherslament")],
        },
        // 14
        {
            levelData: "^^^^-......................)^^^^^^-......................)^^****(...t...t...t...t..t..t)^^...........................)^^...........................)^^...........................&**....._==================+..........)`*****************(....._====`-oooooooooooooooooo.....&*****(..t...t...t...t...t.....................................................................t.............................._=======================......&*******************`^^^......oooooooooooooooooooo)^^^......t....t....t....t....&*n*........................................................................................................................==============================^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^",
        },
        // 15
        {
            levelData: "^^^^-....................)^^^^^^^^-....................)^^^^****(....................&*u**.....................................................................................................................................................................................................................................................................................................................................%%%%%====+...................._====^^^^-....................)^^^^****(....................&*n**..x......................zw.wz.........................zwwwz.........................zzzzz..........................................................................................",
        },
        // 16
        {
            levelData: "^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^`****************************`-...........................#)-...........................#)-...........................#)-!!_+......y.....zww..._+z..#)-..)-..................)-...#)-..)-..................)-...#)-%.)-..................)-...#)-sz)-......y.......zww.)-z..#)-..)-..................)-...#)-..)-..................)-...#)-.%)-..................)-...#)-zs)-......y.....wwz...)-z..#)-..)-..................)-...#)-..)-..................)-...#)-%.)-......s........._=`-s..#)-uz&(......x.........&n`-x..#)-....................w.)-...#)-....................w.)-...#)`======================``====`^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^",
        },
        // 17
        {
            levelData: "^^^^^^^^^^^^-....)^^^^^^^-....^^^^^^^^^^^^-....)^^^^^^^-....************(....&*******(................................................................................................yyy......................t.................................................................y..........ss............................x..............t.................................w............................w.w..........................._@+....................t......)^-................t..........&u(...t...t...t.................................................................................................................................................................................................",
        },
        // 18
        {
            levelData: "^^^^^^^^-oooooooooooo)^^^^^^^^^^^^^^^^-............)^^^^^^^^^^^^^^^^-............)^^^^^^^^********(............&********................................................................................................................................................................................................................................................==================+$..........^^^^^^^^^^^^^^^^^^-$..........`*****************($..........-.............................-.............................-.............................-.............................-.............................-.............................`=@=======+...................^^^^^^^^^^-...................",
        },
        // 19
        {
            levelData: "..)^^^^^^^^^^^^^^^^^^^^^^^^-....)^^^^^^^^^^^^^^^^^^^^^^^^-....&************************(..........................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................",
            newBackgroundMusic: [game.getSound("music/finalboss/1"), game.getSound("music/finalboss/2")],
        },
    ];
}


/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__engine_sprites_imagesprite__ = __webpack_require__(6);

const LIFESPAN = 300;
const GHOST_RATE = 0.03;
// create a high limit to prevent constant death from crashing everything
// but that also will be hard to find during normal play
const MAX_FRAGMENTS = 50;
let existingFragments = 0;
class PlayerFragmentSprite extends __WEBPACK_IMPORTED_MODULE_0__engine_sprites_imagesprite__["a" /* ImageSprite */] {
    constructor(opts) {
        super(opts);
        this.xv = 0;
        this.yv = 0;
        this.rv = 0;
        this.lifespan = 0;
        existingFragments++;
        if (existingFragments > MAX_FRAGMENTS) {
            this.destroy();
            return;
        }
        this.xv = opts.xv;
        this.yv = opts.yv;
        this.rv = opts.rv;
        if (this.y >= this.runtime.canvas.height) {
            this.y = this.runtime.canvas.height - 1;
        }
        this.addTask(this.run);
    }
    run() {
        this.lifespan++;
        const physicsResult = this.runBasicPhysics(this.xv, this.yv, {
            midAirFriction: false,
            roundValues: false,
        });
        this.xv = physicsResult.xv;
        this.yv = physicsResult.yv;
        if (physicsResult.onGround) {
            this.rv *= 0.5;
        }
        this.rotation += this.rv;
        if (this.lifespan >= LIFESPAN) {
            this.opacity -= GHOST_RATE;
        }
        if (this.opacity < 0 || this.y > this.runtime.canvas.height) {
            this.destroy();
        }
    }
    destroy() {
        super.destroy();
        existingFragments--;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PlayerFragmentSprite;



/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sprites_blocks_block__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sprites_blocks_grass__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sprites_blocks_spike__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sprites_blocks_tallgrass__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__sprites_blocks_crumble__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__sprites_blocks_falling__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__sprites_blocks_blockswitchspawner__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__sprites_blocks_lightblock__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__sprites_blocks_lightswitch__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__sprites_blocks_coinspawner__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__sprites_blocks_oneway__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__sprites_blocks_corner__ = __webpack_require__(36);












function special(type, texture) {
    return {
        type, texture,
    };
}
function notsolid(texture) {
    return special(__WEBPACK_IMPORTED_MODULE_0__sprites_blocks_block__["a" /* Block */], texture);
}
const blockMap = {
    "a": special(__WEBPACK_IMPORTED_MODULE_0__sprites_blocks_block__["b" /* PseudoSolidBlock */], "blocks/a"),
    "b": "blocks/b",
    "c": "blocks/c",
    "d": "blocks/d",
    "e": "blocks/e",
    "f": "blocks/f",
    "g": "blocks/g",
    "h": "blocks/h",
    "i": "blocks/i",
    "j": special(__WEBPACK_IMPORTED_MODULE_1__sprites_blocks_grass__["a" /* GrassBlock */], "blocks/j"),
    "k": special(__WEBPACK_IMPORTED_MODULE_1__sprites_blocks_grass__["a" /* GrassBlock */], "blocks/k"),
    "l": special(__WEBPACK_IMPORTED_MODULE_1__sprites_blocks_grass__["a" /* GrassBlock */], "blocks/l"),
    "m": special(__WEBPACK_IMPORTED_MODULE_11__sprites_blocks_corner__["b" /* RotatedCornerBlock */], "blocks/m"),
    "n": special(__WEBPACK_IMPORTED_MODULE_9__sprites_blocks_coinspawner__["a" /* AboveLevelUpCoinSpawnerBlock */], "blocks/n"),
    "o": special(__WEBPACK_IMPORTED_MODULE_2__sprites_blocks_spike__["d" /* UpSpikeBlock */], "blocks/spikes/up"),
    "p": special(__WEBPACK_IMPORTED_MODULE_3__sprites_blocks_tallgrass__["a" /* TallGrassBlock */], "blocks/p"),
    "q": special(__WEBPACK_IMPORTED_MODULE_3__sprites_blocks_tallgrass__["a" /* TallGrassBlock */], "blocks/q"),
    "r": "blocks/r",
    "s": "blocks/s",
    "t": special(__WEBPACK_IMPORTED_MODULE_4__sprites_blocks_crumble__["a" /* CrumblingBlock */], "blocks/crumble/1"),
    "u": special(__WEBPACK_IMPORTED_MODULE_6__sprites_blocks_blockswitchspawner__["a" /* BlockSwitchSpawnerBlock */], "blocks/u"),
    "v": "blocks/v",
    "w": special(__WEBPACK_IMPORTED_MODULE_5__sprites_blocks_falling__["a" /* FallingBlock */], "blocks/w"),
    "x": special(__WEBPACK_IMPORTED_MODULE_8__sprites_blocks_lightswitch__["a" /* LightSwitchBlock */], "blocks/lightbutton/1"),
    "y": special(__WEBPACK_IMPORTED_MODULE_7__sprites_blocks_lightblock__["a" /* DisabledLightBlock */], "blocks/y"),
    "z": special(__WEBPACK_IMPORTED_MODULE_7__sprites_blocks_lightblock__["b" /* EnabledLightBlock */], "blocks/z"),
    // Post sword
    "1": "blocks/1",
    "2": "blocks/2",
    "3": "blocks/3",
    "4": "blocks/4",
    "5": "blocks/5",
    "6": "blocks/6",
    "7": "blocks/7",
    "8": "blocks/8",
    "9": special(__WEBPACK_IMPORTED_MODULE_11__sprites_blocks_corner__["b" /* RotatedCornerBlock */], "blocks/9"),
    "@": special(__WEBPACK_IMPORTED_MODULE_9__sprites_blocks_coinspawner__["b" /* BelowLevelUpCoinSpawnerBlock */], "blocks/n"),
    "!": special(__WEBPACK_IMPORTED_MODULE_10__sprites_blocks_oneway__["a" /* OneWayBlock */], "blocks/!"),
    "#": special(__WEBPACK_IMPORTED_MODULE_2__sprites_blocks_spike__["b" /* LeftSpikeBlock */], "blocks/spikes/left"),
    "$": special(__WEBPACK_IMPORTED_MODULE_2__sprites_blocks_spike__["c" /* RightSpikeBlock */], "blocks/spikes/right"),
    "%": special(__WEBPACK_IMPORTED_MODULE_2__sprites_blocks_spike__["a" /* DownSpikeBlock */], "blocks/spikes/down"),
    // Castle
    "^": special(__WEBPACK_IMPORTED_MODULE_0__sprites_blocks_block__["b" /* PseudoSolidBlock */], "blocks/caret"),
    "&": "blocks/ampersand",
    "*": "blocks/asterisk",
    "(": "blocks/(",
    ")": "blocks/)",
    "-": "blocks/-",
    "_": "blocks/underscore",
    "=": "blocks/=",
    "+": "blocks/+",
    "`": special(__WEBPACK_IMPORTED_MODULE_11__sprites_blocks_corner__["a" /* CastleCornerBlock */], "blocks/grave"),
};
/* harmony export (immutable) */ __webpack_exports__["a"] = blockMap;



/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__player_player__ = __webpack_require__(4);


class SpikeBlock extends __WEBPACK_IMPORTED_MODULE_0__block__["c" /* SolidBlock */] {
    handleIntersect(sprite, velocity, horizontal) {
        super.handleIntersect(sprite, velocity, horizontal);
        if (this.canKill(sprite) && sprite instanceof __WEBPACK_IMPORTED_MODULE_1__player_player__["a" /* PlayerSprite */]) {
            sprite.kill();
            return false;
        }
    }
}
class UpSpikeBlock extends SpikeBlock {
    constructor(opts) {
        super(opts);
        this.floorAlign();
    }
    canKill(sprite) {
        return sprite.y + sprite.height === this.y;
    }
}
/* harmony export (immutable) */ __webpack_exports__["d"] = UpSpikeBlock;

class DownSpikeBlock extends SpikeBlock {
    // Already aligned due to spawning
    canKill(sprite) {
        return sprite.y === this.y + this.height;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = DownSpikeBlock;

class LeftSpikeBlock extends SpikeBlock {
    constructor(opts) {
        super(opts);
        this.leftAlign();
    }
    canKill(sprite) {
        return sprite.x + sprite.width === this.x;
    }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = LeftSpikeBlock;

class RightSpikeBlock extends SpikeBlock {
    // Already aligned due to spawning
    canKill(sprite) {
        return sprite.x === this.x + this.width;
    }
}
/* harmony export (immutable) */ __webpack_exports__["c"] = RightSpikeBlock;



/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__grass__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__engine_vector__ = __webpack_require__(1);



class TallGrassBlock extends __WEBPACK_IMPORTED_MODULE_0__block__["a" /* Block */] {
    constructor(opts) {
        super(opts);
        new __WEBPACK_IMPORTED_MODULE_1__grass__["a" /* GrassBlock */]({
            position: new __WEBPACK_IMPORTED_MODULE_2__engine_vector__["a" /* Vector */](opts.position),
            texture: this.runtime.getImage("blocks/k"),
        });
        this.floorAlign();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TallGrassBlock;



/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__player_player__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__engine_task__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__block__ = __webpack_require__(0);



const CRUMBLE_FRAMES = 9;
const CRUMBLE_FRAME_LENGTH = 5;
const CRUMBLE_RESPAWN = 60 * 3;
class CrumblingBlock extends __WEBPACK_IMPORTED_MODULE_2__block__["c" /* SolidBlock */] {
    constructor(opts) {
        super(opts);
        this.crumbling = false;
        this.crumbleProgress = 1;
        this.yv = 0;
        this.startingX = this.x;
        this.startingY = this.y;
    }
    handleIntersect(sprite, velocity, horizontal) {
        super.handleIntersect(sprite, velocity, horizontal);
        if (!this.crumbling && !horizontal && velocity < 0 && sprite instanceof __WEBPACK_IMPORTED_MODULE_0__player_player__["a" /* PlayerSprite */]) {
            this.crumbling = true;
            this.runtime.playSound("blocks/fall");
            this.addTask(new __WEBPACK_IMPORTED_MODULE_1__engine_task__["a" /* Task */]({
                run: this.crumble,
                repeatEvery: CRUMBLE_FRAME_LENGTH,
            }));
        }
    }
    updateVisual() {
        this.texture = this.runtime.getImage(`blocks/crumble/${this.crumbleProgress}`);
        this.updateDimensions();
    }
    respawn() {
        this.x = this.startingX;
        this.y = this.startingY;
        this.crumbling = false;
        this.yv = 0;
        this.crumbleProgress = 1;
        this.solid = true;
        this.updateVisual();
    }
    crumble(task) {
        this.crumbleProgress++;
        this.updateVisual();
        this.runtime.playSound("blocks/break");
        if (this.crumbleProgress === CRUMBLE_FRAMES) {
            task.stop();
            this.solid = false;
            this.addTask(this.fall);
        }
    }
    fall(task) {
        const physicsResult = this.runBasicPhysics(0, this.yv, {
            collision: false,
        });
        this.yv = physicsResult.yv;
        if (this.y >= this.runtime.canvas.height) {
            task.stop();
            this.addTask(new __WEBPACK_IMPORTED_MODULE_1__engine_task__["a" /* Task */]({
                run: this.respawn,
                delay: CRUMBLE_RESPAWN,
            }));
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CrumblingBlock;



/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__blockswitch__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__engine_vector__ = __webpack_require__(1);




class BlockSwitchSpawnerBlock extends __WEBPACK_IMPORTED_MODULE_0__block__["c" /* SolidBlock */] {
    constructor(opts) {
        super(opts);
        const position = new __WEBPACK_IMPORTED_MODULE_3__engine_vector__["a" /* Vector */](this.position);
        position.y -= __WEBPACK_IMPORTED_MODULE_2__config__["a" /* BLOCK_HEIGHT */];
        new __WEBPACK_IMPORTED_MODULE_1__blockswitch__["a" /* BlockSwitch */]({
            texture: this.runtime.getImage("blocks/button/red"),
            position,
            spawner: this,
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BlockSwitchSpawnerBlock;



/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__blocks_block__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__blocks_falling__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__engine_vector__ = __webpack_require__(1);



class BlockSwitch extends __WEBPACK_IMPORTED_MODULE_0__blocks_block__["a" /* Block */] {
    constructor(opts) {
        super(opts);
        this.spawner = opts.spawner;
        this.startingPosition = new __WEBPACK_IMPORTED_MODULE_2__engine_vector__["a" /* Vector */](this.position);
        this.floorAlign();
        this.addTask(this.run);
    }
    trigger() {
        const allSprites = this.runtime.sprites.sprites;
        const fallingBlocks = allSprites.filter((sprite) => sprite instanceof __WEBPACK_IMPORTED_MODULE_1__blocks_falling__["a" /* FallingBlock */]);
        for (const sprite of fallingBlocks) {
            sprite.trigger();
        }
        this.spawner.texture = this.runtime.getImage("blocks/u2");
        this.texture = this.runtime.getImage("blocks/button/on");
        this.updateDimensions();
        this.position = this.startingPosition;
        this.floorAlign();
        this.runtime.playSound("blocks/button");
    }
    run(task) {
        if (this.intersects(this.runtime.player)) {
            this.trigger();
            task.stop();
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BlockSwitch;



/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block__ = __webpack_require__(0);

// Idk what to name this
class LightBlock extends __WEBPACK_IMPORTED_MODULE_0__block__["a" /* Block */] {
    constructor(opts) {
        super(opts);
        this.runtime.lightBlocks.push(this);
    }
    toggleSolid() {
        this.solid = !this.solid;
        if (this.solid) {
            this.texture = this.runtime.getImage("blocks/z");
        }
        else {
            this.texture = this.runtime.getImage("blocks/y");
        }
    }
}
/* unused harmony export LightBlock */

class EnabledLightBlock extends LightBlock {
    constructor() {
        super(...arguments);
        this.solid = true;
    }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = EnabledLightBlock;

class DisabledLightBlock extends LightBlock {
    constructor() {
        super(...arguments);
        this.solid = false;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = DisabledLightBlock;



/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__player_player__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__engine_task__ = __webpack_require__(2);



const ANIMATION_FRAMES = 2;
const ANIMATION_FRAME_LENGTH = 5;
const DESTROY_DELAY = 30;
class LightSwitchBlock extends __WEBPACK_IMPORTED_MODULE_0__block__["c" /* SolidBlock */] {
    constructor(opts) {
        super(opts);
        this.activated = false;
        this.animationProgress = 1;
        this.addTask(new __WEBPACK_IMPORTED_MODULE_2__engine_task__["a" /* Task */]({
            run: this.animate,
            repeatEvery: ANIMATION_FRAME_LENGTH,
        }));
    }
    animate(task) {
        if (this.activated) {
            task.stop();
            return;
        }
        this.animationProgress++;
        if (this.animationProgress > ANIMATION_FRAMES) {
            this.animationProgress = 1;
        }
        this.texture = this.runtime.getImage(`blocks/lightbutton/${this.animationProgress}`);
    }
    activate() {
        this.activated = true;
        const lightBlocks = this.runtime.lightBlocks;
        for (const block of lightBlocks) {
            block.toggleSolid();
        }
        this.texture = this.runtime.getImage("blocks/lightbutton/down");
        this.updateDimensions();
        this.floorAlign();
        this.addTask(new __WEBPACK_IMPORTED_MODULE_2__engine_task__["a" /* Task */]({
            run: this.destroy,
            delay: DESTROY_DELAY,
        }));
        this.runtime.playSound("blocks/fds");
    }
    handleIntersect(sprite, velocity, horizontal) {
        super.handleIntersect(sprite, velocity, horizontal);
        if (!this.activated && sprite.y + sprite.height === this.y && sprite instanceof __WEBPACK_IMPORTED_MODULE_1__player_player__["a" /* PlayerSprite */]) {
            this.activate();
            return false;
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = LightSwitchBlock;



/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__coin__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__engine_vector__ = __webpack_require__(1);




class LevelUpCoinSpawnerBlock extends __WEBPACK_IMPORTED_MODULE_0__block__["c" /* SolidBlock */] {
    constructor(opts) {
        super(opts);
        const position = this.getCoinPosition();
        new __WEBPACK_IMPORTED_MODULE_1__coin__["a" /* LevelUpCoinSprite */]({
            position,
            texture: this.runtime.getImage("coin/1"),
        });
    }
}
class AboveLevelUpCoinSpawnerBlock extends LevelUpCoinSpawnerBlock {
    getCoinPosition() {
        return new __WEBPACK_IMPORTED_MODULE_3__engine_vector__["a" /* Vector */](this.x, this.y - __WEBPACK_IMPORTED_MODULE_2__config__["a" /* BLOCK_HEIGHT */]);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AboveLevelUpCoinSpawnerBlock;

class BelowLevelUpCoinSpawnerBlock extends LevelUpCoinSpawnerBlock {
    getCoinPosition() {
        return new __WEBPACK_IMPORTED_MODULE_3__engine_vector__["a" /* Vector */](this.x, this.y + __WEBPACK_IMPORTED_MODULE_2__config__["a" /* BLOCK_HEIGHT */]);
    }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = BelowLevelUpCoinSpawnerBlock;



/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__blocks_block__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__engine_task__ = __webpack_require__(2);


const FRAME_LENGTH = 3;
const TOTAL_FRAMES = 4;
class LevelUpCoinSprite extends __WEBPACK_IMPORTED_MODULE_0__blocks_block__["a" /* Block */] {
    constructor(opts) {
        super(opts);
        this.animationFrame = 1;
        this.centerAlign();
        this.addTask(this.run);
        this.addTask(new __WEBPACK_IMPORTED_MODULE_1__engine_task__["a" /* Task */]({
            run: this.animate,
            repeatEvery: FRAME_LENGTH,
            delay: FRAME_LENGTH,
        }));
    }
    run() {
        const touchingPlayer = this.intersects(this.runtime.player);
        if (touchingPlayer) {
            this.runtime.playSound("blocks/coin");
            this.runtime.level++;
            this.runtime.renderLevel();
        }
    }
    animate() {
        this.animationFrame++;
        if (this.animationFrame > TOTAL_FRAMES) {
            this.animationFrame = 1;
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = LevelUpCoinSprite;



/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__player_player__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__zindex__ = __webpack_require__(41);



// Just like in the original scratch game
// One way blocks are terrible hacks that shouldn't work
// I don't know how this works anymore
class OneWayBlock extends __WEBPACK_IMPORTED_MODULE_0__block__["c" /* SolidBlock */] {
    constructor(opts) {
        super(opts);
        this.intersectsPlayer = false;
        // make our tasks run before others (they run in reverse z order)
        this.z = __WEBPACK_IMPORTED_MODULE_2__zindex__["a" /* ZIndexes */].TaskPriority;
        this.addTask(this.run);
    }
    run() {
        // ???
        if (!this.intersects(this.runtime.player)) {
            this.intersectsPlayer = false;
        }
    }
    handleIntersect(sprite, velocity, horizontal) {
        if (sprite instanceof __WEBPACK_IMPORTED_MODULE_1__player_player__["a" /* PlayerSprite */]) {
            if (sprite.yv > 0 || this.intersectsPlayer) {
                this.intersectsPlayer = true;
                return false;
            }
        }
        return super.handleIntersect(sprite, velocity, horizontal);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = OneWayBlock;



/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__engine_sprites_imagesprite__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__engine_vector__ = __webpack_require__(1);




const AIR = [
    ".",
    "l", "k", "j",
    "p", "q",
    "%", "#", "$", "o",
];
class CornerBlock extends __WEBPACK_IMPORTED_MODULE_0__block__["a" /* Block */] {
    constructor(opts) {
        super(opts);
        this.levelIndex = opts.levelIndex || 0;
        // queue deletion
        this.destroy();
    }
    testCorner(offset, texture, rotation, x, y) {
        const charAtOffset = this.runtime.levelData[this.levelIndex + offset];
        const isAir = AIR.indexOf(charAtOffset) > -1;
        if (isAir) {
            const position = new __WEBPACK_IMPORTED_MODULE_3__engine_vector__["a" /* Vector */](this.x + x * (__WEBPACK_IMPORTED_MODULE_1__config__["b" /* BLOCK_WIDTH */] / 2), this.y + y * (__WEBPACK_IMPORTED_MODULE_1__config__["a" /* BLOCK_HEIGHT */] / 2));
            const sprite = new __WEBPACK_IMPORTED_MODULE_2__engine_sprites_imagesprite__["a" /* ImageSprite */]({
                position,
                texture,
                rotation,
            });
        }
    }
}
class RotatedCornerBlock extends CornerBlock {
    constructor(opts) {
        super(opts);
        // black background
        new __WEBPACK_IMPORTED_MODULE_0__block__["a" /* Block */]({
            texture: this.runtime.getImage("blocks/a"),
            position: new __WEBPACK_IMPORTED_MODULE_3__engine_vector__["a" /* Vector */](this.x, this.y, -1),
        });
        const offset = this.width === __WEBPACK_IMPORTED_MODULE_1__config__["b" /* BLOCK_WIDTH */] ? 0 : 1;
        // if spawned on far left edge then don't check for things that will wrap around to other side of screen
        if (this.levelIndex % __WEBPACK_IMPORTED_MODULE_1__config__["e" /* LEVEL_WIDTH */] !== 0) {
            this.testCorner(__WEBPACK_IMPORTED_MODULE_1__config__["e" /* LEVEL_WIDTH */] - 1, this.texture, -90, 0, 0);
            this.testCorner(-__WEBPACK_IMPORTED_MODULE_1__config__["e" /* LEVEL_WIDTH */] - 1, this.texture, 180, 0, offset);
        }
        // if spawned on far right edge then don't check for things that will wrap around to other side of screen
        // untested but should work
        if (this.levelIndex % __WEBPACK_IMPORTED_MODULE_1__config__["e" /* LEVEL_WIDTH */] !== __WEBPACK_IMPORTED_MODULE_1__config__["e" /* LEVEL_WIDTH */] - 1) {
            this.testCorner(__WEBPACK_IMPORTED_MODULE_1__config__["e" /* LEVEL_WIDTH */] + 1, this.texture, 0, offset, 0);
            this.testCorner(-__WEBPACK_IMPORTED_MODULE_1__config__["e" /* LEVEL_WIDTH */] + 1, this.texture, 90, offset, offset);
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = RotatedCornerBlock;

class CastleCornerBlock extends CornerBlock {
    constructor(opts) {
        super(opts);
        if (this.levelIndex % __WEBPACK_IMPORTED_MODULE_1__config__["e" /* LEVEL_WIDTH */] !== 0) {
            this.testCorner(__WEBPACK_IMPORTED_MODULE_1__config__["e" /* LEVEL_WIDTH */] - 1, this.runtime.getImage("blocks/castlecorner/topleft"), 0, 0, 0);
            this.testCorner(-__WEBPACK_IMPORTED_MODULE_1__config__["e" /* LEVEL_WIDTH */] - 1, this.runtime.getImage("blocks/castlecorner/bottomleft"), 0, 0, 0);
        }
        if (this.levelIndex % __WEBPACK_IMPORTED_MODULE_1__config__["e" /* LEVEL_WIDTH */] !== __WEBPACK_IMPORTED_MODULE_1__config__["e" /* LEVEL_WIDTH */] - 1) {
            this.testCorner(__WEBPACK_IMPORTED_MODULE_1__config__["e" /* LEVEL_WIDTH */] + 1, this.runtime.getImage("blocks/castlecorner/topright"), 0, 0, 0);
            this.testCorner(-__WEBPACK_IMPORTED_MODULE_1__config__["e" /* LEVEL_WIDTH */] + 1, this.runtime.getImage("blocks/castlecorner/bottomright"), 0, 0, 0);
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CastleCornerBlock;



/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__engine_sprite__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__engine_task__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__engine_utils__ = __webpack_require__(5);



const UPDATE_EVERY = 6;
const ANIMATION_LENGTH = 10;
class BackgroundStarSprite extends __WEBPACK_IMPORTED_MODULE_0__engine_sprite__["a" /* AbstractSprite */] {
    constructor(opts) {
        super(opts);
        this.progress = 0;
        this.direction = 1;
        this.animate = this.animate.bind(this);
        this.addTask(new __WEBPACK_IMPORTED_MODULE_1__engine_task__["a" /* Task */]({
            repeatEvery: UPDATE_EVERY,
            run: this.animate,
        }));
        this.runtime.backgroundStars.push(this);
    }
    animate() {
        this.progress += this.direction;
        if (this.progress === 0 && this.direction === -1) {
            this.direction = 1;
            this.progress--;
        }
        if (this.progress === ANIMATION_LENGTH && this.direction === 1) {
            this.direction = -1;
            this.progress++;
        }
    }
    clamp(x, min, max) {
        if (x < min) {
            return min;
        }
        else if (x > max) {
            return max;
        }
        else {
            return x;
        }
    }
    render(ctx) {
        const animationProgress = this.clamp(this.progress / ANIMATION_LENGTH, 0, 1);
        const color = Math.floor(255 * animationProgress);
        const hexCode = Object(__WEBPACK_IMPORTED_MODULE_2__engine_utils__["d" /* toHex */])(color);
        ctx.fillStyle = `#${hexCode}${hexCode}${hexCode}`;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BackgroundStarSprite;



/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__engine_vector__ = __webpack_require__(1);

// This is how the original defines jump lights
// It does not use the level code
// (although I believe it at one point did due to the image name being "^.png", as if it were the ^ character in level codes)
// Converts Scratch coordinates to coordinates this game will understand
// Hardcoded values are bad but just ignore that
function scratchCoordinate(x, y) {
    return new __WEBPACK_IMPORTED_MODULE_0__engine_vector__["a" /* Vector */](x + 236, (360 - y) - 184);
}
const JumpLights = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    // in scratch: 10
    [
        scratchCoordinate(-168, -60),
        scratchCoordinate(-184, 20),
        scratchCoordinate(-168, 100),
        scratchCoordinate(-56, 36),
        scratchCoordinate(136, -132),
        scratchCoordinate(184, -76),
        scratchCoordinate(136, -20),
        scratchCoordinate(88, 20),
        scratchCoordinate(136, 76),
        scratchCoordinate(184, 116),
    ],
    // in scratch: 11
    [
        scratchCoordinate(-200, 116),
        scratchCoordinate(104, -52),
        scratchCoordinate(-120, -44),
        scratchCoordinate(-120, 36),
        scratchCoordinate(-200, -28),
    ],
    // in scratch: 12
    [
        scratchCoordinate(104, -28),
        scratchCoordinate(-80, -116),
    ],
    // in scratch: 13
    [
        scratchCoordinate(0, -44),
        scratchCoordinate(0, 20),
        scratchCoordinate(0, 84),
    ],
    [],
    [],
    // in scratch: 16
    [
        scratchCoordinate(-144, -60),
        scratchCoordinate(-144, 0),
        scratchCoordinate(-144, 60),
        scratchCoordinate(0, -44),
        scratchCoordinate(144, -60),
        scratchCoordinate(144, 0),
        scratchCoordinate(144, 60),
    ],
    [],
    [],
    // in scratch: 19
    [
        scratchCoordinate(0, -52),
        scratchCoordinate(104, 20),
        scratchCoordinate(176, -35),
    ]
    // none past this level
];
/* harmony export (immutable) */ __webpack_exports__["a"] = JumpLights;



/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__blocks_block__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__player_player__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__engine_task__ = __webpack_require__(2);



const HIDE_DURATION = 60 * 3;
class JumpLight extends __WEBPACK_IMPORTED_MODULE_0__blocks_block__["c" /* SolidBlock */] {
    constructor(opts) {
        super(opts);
    }
    show() {
        this.visible = true;
    }
    activate(player) {
        player.hasJumpLight = true;
        this.visible = false;
        this.addTask(new __WEBPACK_IMPORTED_MODULE_2__engine_task__["a" /* Task */]({
            run: this.show,
            delay: HIDE_DURATION,
        }));
    }
    handleIntersect(sprite, velocity, horizontal) {
        if (sprite instanceof __WEBPACK_IMPORTED_MODULE_1__player_player__["a" /* PlayerSprite */]) {
            if (this.visible) {
                this.activate(sprite);
            }
        }
        return false;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = JumpLight;



/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__engine_sprites_imagesprite__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__engine_task__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__engine_vector2d__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__hiteffect__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__engine_vector__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__coin__ = __webpack_require__(34);







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
// rip
const DEAD_ROTATION_SPEED = 0.742857142857 / 2; // 0.742... is how the game actually defines this.
const DEAD_STARTING_VELOCITY = 2;
class SwordBoss extends __WEBPACK_IMPORTED_MODULE_0__engine_sprites_imagesprite__["a" /* ImageSprite */] {
    constructor(opts) {
        super(opts);
        this.health = HEALTH;
        this.hitPlayer = false;
        this._sizeScale = 1;
        this.yv = DEAD_STARTING_VELOCITY;
        this.startingHeight = this.height;
        this.startingWidth = this.width;
        this.resetCoordinates();
        this.addTask(new __WEBPACK_IMPORTED_MODULE_1__engine_task__["a" /* Task */]({
            run: this.beginSpinAttack,
            delay: 60,
        }));
        this.rotationPoint = new __WEBPACK_IMPORTED_MODULE_3__engine_vector2d__["a" /* Vector2D */](0.5, 0.1);
    }
    //
    // Utilities
    //
    intersectTest() {
        const intersectsPlayer = this.complexIntersects(this.runtime.player);
        if (intersectsPlayer) {
            this.runtime.player.kill();
            this.hitPlayer = true;
        }
    }
    startRoutine() {
        this.texture = this.runtime.getImage("boss/sword/sword");
        this.beginSpinAttack();
    }
    addPhase(task, afterDelay = 0) {
        task.delay += this.phaseDelay;
        if (task.repeatEvery > -1) {
            this.phaseDelay += task.repeatMax * (task.repeatEvery + 1);
        }
        this.phaseDelay += (task.originalOptions.delay) || 0;
        this.phaseDelay += afterDelay;
        this.addTask(task);
    }
    resetCoordinates() {
        this.recenter();
        this.y = 14 * __WEBPACK_IMPORTED_MODULE_2__config__["a" /* BLOCK_HEIGHT */];
    }
    recenter() {
        this.x = this.runtime.canvas.width / 2 - this.width / 2;
    }
    animate(textures, times, length, cb) {
        for (let i = 0; i < times; i++) {
            this.addTask(new __WEBPACK_IMPORTED_MODULE_1__engine_task__["a" /* Task */]({
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
    beginSpinAttack() {
        this.spinDirection = this.multiplier;
        this.phaseDelay = SWIPE_BASE_DELAY;
        this.hitPlayer = false;
        this.addTask(new __WEBPACK_IMPORTED_MODULE_1__engine_task__["a" /* Task */]({
            run: this.spinAttack,
            repeatEvery: 0,
            delay: 60,
        }));
    }
    spinAttack(task) {
        this.rotation += this.spinDirection * SPIN_ROTATION_SPEED;
        // could be pos or neg
        if (Math.abs(this.rotation) >= 180) {
            this.sizeScale -= SPIN_SIZE_CHANGE_RATE;
        }
        else {
            this.sizeScale += SPIN_SIZE_CHANGE_RATE;
        }
        // could be pos or neg
        if (Math.abs(this.rotation) >= 360) {
            this.rotation = 0;
            task.stop();
            this.beginSwipeAttack();
        }
        this.resetCoordinates();
        this.intersectTest();
    }
    //
    // Swipe Attack
    //
    beginSwipeAttack() {
        // make sure some values are reset properly
        this.sizeScale = 1;
        this.rotation = 0;
        this.phaseDelay = SWIPE_BASE_DELAY;
        // This is terrible.
        const multi = this.multiplier;
        const animate = () => {
            this.addPhase(new __WEBPACK_IMPORTED_MODULE_1__engine_task__["a" /* Task */]({
                run: () => this.animate(SWIPE_TEXTURES, SWIPE_ANIMATE_TIMES, SWIPE_ANIMATE_FRAME_LENGTH),
                delay: 10,
            }), SWIPE_ANIMATE_TIMES * SWIPE_ANIMATE_FRAME_LENGTH);
        };
        const attack = () => {
            this.addPhase(new __WEBPACK_IMPORTED_MODULE_1__engine_task__["a" /* Task */]({
                run: () => this.swipeAttack(SWIPE_DOWN_SPEED),
                repeatEvery: 0,
                repeatMax: 16,
                delay: 10,
            }));
            this.addPhase(new __WEBPACK_IMPORTED_MODULE_1__engine_task__["a" /* Task */]({
                run: () => this.swipeAttack(-SWIPE_UP_SPEED),
                repeatEvery: 0,
                repeatMax: 32,
            }));
        };
        this.addPhase(new __WEBPACK_IMPORTED_MODULE_1__engine_task__["a" /* Task */]({
            run: () => this.swipeRotate(-1 * multi),
            repeatEvery: 0,
            repeatMax: 36,
        }));
        this.addPhase(new __WEBPACK_IMPORTED_MODULE_1__engine_task__["a" /* Task */]({
            run: () => this.swipeMove(1),
            repeatEvery: 0,
            repeatMax: 24,
        }));
        this.addPhase(new __WEBPACK_IMPORTED_MODULE_1__engine_task__["a" /* Task */]({
            run: () => {
                this.swipeRotate(-1 * multi);
                this.swipeSize(1);
            },
            repeatEvery: 0,
            repeatMax: 18,
        }));
        animate();
        attack();
        this.addPhase(new __WEBPACK_IMPORTED_MODULE_1__engine_task__["a" /* Task */]({
            run: () => this.swipeRotate(1 * multi),
            repeatEvery: 0,
            repeatMax: 36,
        }));
        animate();
        attack();
        this.addPhase(new __WEBPACK_IMPORTED_MODULE_1__engine_task__["a" /* Task */]({
            run: () => {
                this.swipeRotate(1 * multi);
                this.swipeSize(-1);
            },
            repeatEvery: 0,
            repeatMax: 18,
        }));
        this.addPhase(new __WEBPACK_IMPORTED_MODULE_1__engine_task__["a" /* Task */]({
            run: () => this.swipeMove(-1),
            repeatEvery: 0,
            repeatMax: 24,
        }));
        this.addPhase(new __WEBPACK_IMPORTED_MODULE_1__engine_task__["a" /* Task */]({
            run: this.beginRestPhase,
            delay: 30,
        }));
    }
    swipeRotate(multi) {
        this.rotation += SWIPE_ROTATION_SPEED * multi;
    }
    swipeMove(multi) {
        this.y -= SWIPE_MOVE_SPEED * multi;
    }
    swipeAttack(speed) {
        this.y += speed;
        this.intersectTest();
    }
    swipeSize(multi) {
        this.sizeScale += SWIPE_SIZE_CHANGE_RATE * multi;
    }
    //
    // Rest Phase
    //
    beginRestPhase() {
        if (this.hitPlayer) {
            this.texture = this.runtime.getImage("boss/sword/heal");
            const position = new __WEBPACK_IMPORTED_MODULE_5__engine_vector__["a" /* Vector */](this.position);
            if (this.health === HEALTH) {
                new __WEBPACK_IMPORTED_MODULE_4__hiteffect__["a" /* HitEffectSprite */]({
                    position,
                    texture: this.runtime.getImage("hit/+0"),
                });
            }
            else {
                new __WEBPACK_IMPORTED_MODULE_4__hiteffect__["a" /* HitEffectSprite */]({
                    position,
                    texture: this.runtime.getImage("hit/+1"),
                });
                this.health++;
            }
            this.addTask(new __WEBPACK_IMPORTED_MODULE_1__engine_task__["a" /* Task */]({
                run: this.startRoutine,
                delay: 60,
            }));
        }
        else {
            this.texture = this.runtime.getImage("boss/sword/open");
            this.addTask(new __WEBPACK_IMPORTED_MODULE_1__engine_task__["a" /* Task */]({
                run: this.restVulnerable,
                repeatEvery: 0,
                repeatMax: 180,
            }));
            const health = this.health;
            this.addTask(new __WEBPACK_IMPORTED_MODULE_1__engine_task__["a" /* Task */]({
                run: () => {
                    if (this.health === health) {
                        this.startRoutine();
                    }
                },
                delay: 180,
            }));
        }
    }
    restVulnerable(task) {
        // use simple intersects for performance reasons
        if (this.intersects(this.runtime.player)) {
            this.damage();
            task.stop();
        }
    }
    damage() {
        this.health--;
        this.runtime.player.yv = PLAYER_JUMP_YV;
        new __WEBPACK_IMPORTED_MODULE_4__hiteffect__["a" /* HitEffectSprite */]({
            position: new __WEBPACK_IMPORTED_MODULE_5__engine_vector__["a" /* Vector */](this.position),
            texture: this.runtime.getImage("hit/-1"),
        });
        this.phaseDelay = 0;
        this.addPhase(new __WEBPACK_IMPORTED_MODULE_1__engine_task__["a" /* Task */]({
            run: () => this.y += DAMAGED_FALL_SPEED,
            repeatEvery: 0,
            repeatMax: 5,
        }));
        this.addPhase(new __WEBPACK_IMPORTED_MODULE_1__engine_task__["a" /* Task */]({
            run: () => this.animate(DAMAGED_TEXTURES, DAMAGED_ANIMATE_TIMES, DAMAGE_ANIMATE_FRAME_LENGTH),
        }), DAMAGED_ANIMATE_TIMES * DAMAGE_ANIMATE_FRAME_LENGTH);
        if (this.health === 0) {
            this.addPhase(new __WEBPACK_IMPORTED_MODULE_1__engine_task__["a" /* Task */]({
                run: () => this.animate(DAMAGED_TEXTURES, DAMAGED_ANIMATE_TIMES, DAMAGE_ANIMATE_FRAME_LENGTH, () => {
                    this.rotation -= DEAD_ROTATION_SPEED;
                }),
            }), DAMAGED_ANIMATE_TIMES * DAMAGE_ANIMATE_FRAME_LENGTH);
            this.addPhase(new __WEBPACK_IMPORTED_MODULE_1__engine_task__["a" /* Task */]({
                run: this.deadPhysics,
                repeatEvery: 0,
            }));
        }
        else {
            this.addPhase(new __WEBPACK_IMPORTED_MODULE_1__engine_task__["a" /* Task */]({
                run: () => this.animate(DAMAGED_TEXTURES, DAMAGED_ANIMATE_TIMES, DAMAGE_ANIMATE_FRAME_LENGTH),
            }), DAMAGED_ANIMATE_TIMES * DAMAGE_ANIMATE_FRAME_LENGTH);
            this.addPhase(new __WEBPACK_IMPORTED_MODULE_1__engine_task__["a" /* Task */]({
                run: () => this.texture = this.runtime.getImage("boss/sword/sword"),
            }));
            this.addPhase(new __WEBPACK_IMPORTED_MODULE_1__engine_task__["a" /* Task */]({
                run: () => this.y -= DAMAGED_RISE_SPEED,
                repeatEvery: 0,
                repeatMax: 10,
            }));
            this.addPhase(new __WEBPACK_IMPORTED_MODULE_1__engine_task__["a" /* Task */]({
                run: this.startRoutine,
            }));
        }
    }
    //
    // Dead
    //
    deadPhysics(task) {
        const physicsResult = this.runBasicPhysics(0, this.yv, {
            collision: false,
        });
        this.yv = physicsResult.yv;
        if (this.y > this.runtime.canvas.height) {
            task.stop();
            this.addTask(new __WEBPACK_IMPORTED_MODULE_1__engine_task__["a" /* Task */]({
                run: this.spawnCoin,
                delay: 30,
            }));
        }
    }
    spawnCoin() {
        const texture = this.runtime.getImage("coin/1");
        const position = new __WEBPACK_IMPORTED_MODULE_5__engine_vector__["a" /* Vector */]((this.runtime.canvas.width / 2) - (texture.width / 2), this.runtime.canvas.height / 2);
        new __WEBPACK_IMPORTED_MODULE_6__coin__["a" /* LevelUpCoinSprite */]({
            texture,
            position,
        });
    }
    //
    // Getters and Setters
    //
    set sizeScale(scale) {
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
        }
        else {
            return -1;
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SwordBoss;



/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ZIndexes; });
var ZIndexes;
(function (ZIndexes) {
    ZIndexes[ZIndexes["Player"] = 10] = "Player";
    ZIndexes[ZIndexes["Block"] = 0] = "Block";
    ZIndexes[ZIndexes["TaskPriority"] = -100] = "TaskPriority";
})(ZIndexes || (ZIndexes = {}));


/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__engine_sprites_imagesprite__ = __webpack_require__(6);

const LIFESPAN = 60;
const OPACITY_PER_FRAME = 1 / LIFESPAN;
const SIZE_CHANGE = 0.01;
const Y_CHANGE = 0.1;
const X_CHANGE = 0.1;
class HitEffectSprite extends __WEBPACK_IMPORTED_MODULE_0__engine_sprites_imagesprite__["a" /* ImageSprite */] {
    constructor(opts) {
        super(opts);
        this.lifespan = 0;
        this.addTask(this.run);
        this.startingHeight = this.height;
        this.startingWidth = this.width;
    }
    run() {
        this.lifespan++;
        if (this.lifespan >= LIFESPAN) {
            this.destroy();
        }
        this.opacity -= OPACITY_PER_FRAME;
        this.height = this.startingHeight * (1 + (this.lifespan * SIZE_CHANGE));
        this.width = this.startingWidth * (1 + (this.lifespan * SIZE_CHANGE));
        this.x += X_CHANGE;
        this.y -= Y_CHANGE;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = HitEffectSprite;



/***/ })
/******/ ]);