import { PerspectiveCamera } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

interface Coordinate {
  x: number
  y: number
  z: number
}

class Controls {
  controls: OrbitControls
  targetPosition: Coordinate
  speed: number
  constructor(camera: PerspectiveCamera, domElement: HTMLElement) {
    this.controls = new OrbitControls(camera, domElement)
    this.speed = 0.4
    this.targetPosition = { x: 0, y: 62, z: 0 }
    this.controls.maxDistance = 80
    this.controls.minDistance = 3
    this.controls.maxPolarAngle = Math.PI / 2
    this.controls.minPolarAngle = 0
    this.controls.rotateSpeed = 0.4
    this.controls.enableZoom = true
    this.controls.enablePan = true
    this.controls.enableDamping = true
    this.controls.dampingFactor = 0.1
    this.controls.update()
  }

  public setTargetPosition(x: number, y: number, z: number) {
    this.targetPosition = { x: x, y: y, z: z }
    this.controls.target.set(x, y, z)
  }

  public setSpeed(distanceFromCamera: number) {
    let speed = 0.05
    for (let i = 0; i < distanceFromCamera; i += 10) {
      speed += 0.05
    }
    this.speed = speed
  }

  public update() {
    this.controls.update()

    const position = this.controls.target

    if (position.x < this.targetPosition.x - this.speed) {
      this.controls.target.setX(position.x + this.speed)
    } else if (position.x > this.targetPosition.x + this.speed) {
      this.controls.target.setX(position.x - this.speed)
    }

    if (position.y < this.targetPosition.y - this.speed) {
      this.controls.target.setY(position.y + this.speed)
    } else if (position.y > this.targetPosition.y + this.speed) {
      this.controls.target.setY(position.y - this.speed)
    }

    if (position.z < this.targetPosition.z - this.speed) {
      this.controls.target.setZ(position.z + this.speed)
    } else if (position.z > this.targetPosition.z + this.speed) {
      this.controls.target.setZ(position.z - this.speed)
    }
  }
}

export default Controls
