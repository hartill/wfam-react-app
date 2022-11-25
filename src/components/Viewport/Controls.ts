import { PerspectiveCamera } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

class Controls {
  controls: OrbitControls
  constructor(camera: PerspectiveCamera, domElement: HTMLElement) {
    this.controls = new OrbitControls(camera, domElement)
    this.controls.target.set(0, 62, 0)
    this.controls.maxDistance = 80
    this.controls.minDistance = 1
    this.controls.maxPolarAngle = Math.PI / 2
    this.controls.minPolarAngle = 0
    this.controls.rotateSpeed = 0.4
    this.controls.enableZoom = true
    this.controls.enablePan = false
    this.controls.enableDamping = true
    this.controls.dampingFactor = 0.1
  }

  public setTargetPosition(x: number, y: number, z: number) {
    this.controls.target.set(x, y, z)
  }
}

export default Controls
