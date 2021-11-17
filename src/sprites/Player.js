export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {  
        super(scene, x, y, 'hero');

        

        // scene.add.existing(this);
        scene.physics.add.existing(this);
        // this.scene.physics.world.enableBody(this, 0);
        this.body.onWorldBounds = true;

        this.setScale(1);

        // this.body.useDamping = true;
        // this.body.setDrag(.9, 0);
        this.body.setSize(24, 64);
        this.body.setCollideWorldBounds(true);
        this.stand_right = true;
        this.can_jump = false;
        this.player_speed = 300;
        this.jump_velocity = 325;
    }

    update() {
        if(this.anims.currentFrame.index != 1 && this.anims.currentFrame.index <= 4 && this.body.velocity.y == 0) {
            this.sword_up = true;
        }
        if(this.anims.currentFrame.index > 4 && this.anims.currentFrame.index < 8 && this.body.velocity.y == 0) {
            this.sword_up = false;
        }
        if(this.body.velocity.y < 0 && this.stand_right == true) {
            if(this.sword_up == true) {
                this.anims.play('jumping_right_sword', true);
            }
            else {
                this.anims.play('jumping_right', true);
            }
        }
        else if (this.body.velocity.y > 0 && this.stand_right == true) {
            this.anims.play('falling_right', true)
        }
        if (this.body.velocity.y < 0 && this.stand_right == false) {
            if (this.sword_up == true) {
                this.anims.play('jumping_left_sword');
            }
            else {
            this.anims.play('jumping_left', true);
            }
        }
        else if (this.body.velocity.y > 0 && this.stand_right == false) {
            this.anims.play('falling_left', true);
            this.can_jump = false;
        }
        if (this.body.velocity.y != 0 && keyboard.SPACE.isDown == true) {
            this.can_jump = false;
        }
        else if (this.body.velocity.y == 0 && keyboard.SPACE.isUp) {
            this.can_jump = true;
        }
        if (player.stand_right == true) {
            this.anims.play('face_right', true);
        }
        else {
            this.anims.play('face_left', true);
        }
    }
}