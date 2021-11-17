import Phaser from 'phaser'

export default {
  type: Phaser.AUTO,
  parent: 'content',
  width: 853,
  height: 512,
  physics: {
    default: 'arcade',
    arcade: {
        gravity: { y: 700 },
        debug: true // show bounding boxes and velocity on screen
    }
  },
  localStorageName: 'phaseres6webpack'
}
