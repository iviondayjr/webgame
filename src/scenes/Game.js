/* globals __DEV__ */
import Phaser from 'phaser'
import Player from '../sprites/Player'

export default class GameScene extends Phaser.Scene {
  constructor () {
    super({ key: 'GameScene' })
  }
  
  init () {}
  preload () {
    this.load.baseURL = 'images/';
    this.load.spritesheet('hero', 'sprites/link64_red.png', {frameWidth: 64, frameHeight: 64});
    this.load.image('background', 'sky_background_wide.png ');
    this.load.image('grass', 'grass.png');
    this.load.image('grass_foreground', 'grass_foreground.png');
    this.load.image('tileset', 'tileset-64x.png');
    this.load.tilemapTiledJSON('map', 'map.json');
  }
  create () {
    this.add.image(640, 256, 'background');
    this.add.image(640, 256, 'grass');

    const map = this.make.tilemap({ key: 'map' });
    const tileset = map.addTilesetImage('tileset');
    const worldLayer = map.createLayer('World', tileset, 0, 0);

    this.player = this.add.existing(new Player(this, 200, 200));
    this.physics.world.enable([ this.player ]);

    this.cameras.main.setBounds(0, 0, 1280, 512);
    this.physics.world.setBounds(0, 0, 1280, 512);

    this.cameras.main.startFollow(this.player);
    this.cameras.main.setFollowOffset(0, 240);

    this.physics.add.collider(this.player, worldLayer);
    this.add.image(640, 256, 'grass_foreground');

    const framerate = 12;

    this.anims.create({
        key: 'face_right',
        frames: [{ key: 'hero', frame: 8 }],
        frameRate: framerate
    });
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('hero', { start: 0, end: 7 }),
        randomFrame: true,
        frameRate: framerate,
        repeat: -1
    });
    this.anims.create({
        key: 'face_left',
        frames: [ { key: 'hero', frame: 18 } ],
        frameRate: framerate
    });
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('hero', { start: 10, end: 17 }),
        randomFrame: true,
        frameRate: framerate,
        repeat: -1
    });
    this.anims.create({
        key: 'jumping_right',
        frames: [ { key: 'hero', frame: 7 } ],
        frameRate: framerate
    });
    this.anims.create({
        key: 'floating_right',
        frames: [ { key: 'hero', frame: 4 } ],
        frameRate: framerate
    });
    this.anims.create({
        key: 'floating_left',
        frames: [ { key: 'hero', frame: 11 } ],
        frameRate: framerate
    });
    this.anims.create({
        key: 'falling_right',
        frames: [ { key: 'hero', frame: 9 } ],
        frameRate: framerate
    });
    this.anims.create({
        key: 'jumping_left',
        frames: [ { key: 'hero', frame: 17 } ],
        frameRate: framerate
    });
    this.anims.create({
        key: 'falling_left',
        frames: [ { key: 'hero', frame: 19 } ],
        frameRate: framerate
    });
    this.anims.create({
        key: 'jumping_left_sword',
        frames: [ { key: 'hero', frame: 13 } ],
        frameRate: framerate
    });
    this.anims.create({
        key: 'jumping_right_sword',
        frames: [ { key: 'hero', frame: 3 } ],
        frameRate: framerate
    });
  }

  update() {
    const keyboard = this.input.keyboard.addKeys('W, A, S, D, SPACE');
    const cursors = this.input.keyboard.createCursorKeys();
    const player = this.player;

    if (keyboard.D.isDown) {
        player.setVelocityX(player.player_speed);
        player.stand_right = true;
        player.anims.play('right', true);
        if (keyboard.SPACE.isDown && player.can_jump == true) {
            player.setVelocityY(-player.jump_velocity)
        }
        player.can_jump = false;
    }
    else if (keyboard.A.isDown) {
        player.setVelocityX(-player.player_speed);
        player.stand_right = false; // no longer facing right
        player.anims.play('left', true);
        if (keyboard.SPACE.isDown && player.can_jump == true) {
            player.setVelocityY(-player.jump_velocity)
        }
    }
    else if (keyboard.SPACE.isDown && player.can_jump == true) {
        player.setVelocityY(-player.jump_velocity)  
    }
    else {
        console.log(player.body.velocity.x);
        console.log(player.stand_right);
        console.log(player.can_jump);
        player.setVelocityX(0);
        player.sword_up = false;
    }
  }
}