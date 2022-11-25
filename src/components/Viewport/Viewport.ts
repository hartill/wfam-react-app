import {
  Object3D,
  PerspectiveCamera,
  Raycaster,
  WebGLRenderer,
  Scene,
} from 'three'
import { debounce } from '../../helpers'
import Controls from './Controls'
import WindTurbine from './WindTurbine'
import { addLighting, createEnvironment } from './helpers'

class ViewPort {
  viewportElement: HTMLElement
  width: number
  height: number
  scene: Scene
  camera: PerspectiveCamera
  controls: Controls
  raycaster: Raycaster
  objects: Object3D[]
  renderer: WebGLRenderer
  windTurbine: WindTurbine

  constructor(viewportElement: HTMLElement, objects: Object3D[]) {
    this.viewportElement = viewportElement
    this.width = this.viewportElement.offsetWidth
    this.height = this.viewportElement.offsetHeight
    this.objects = objects
    this.scene = new Scene()

    createEnvironment(this.scene)
    addLighting(this.scene)
    this.windTurbine = new WindTurbine(this.scene, this.objects)

    this.renderer = new WebGLRenderer({ antialias: true })
    this.renderer.setPixelRatio(window.devicePixelRatio || 1)
    this.renderer.setSize(this.width, this.height)
    this.renderer.autoClear = false
    this.renderer.setClearColor(0x101000)
    this.viewportElement.appendChild(this.renderer.domElement)

    this.raycaster = new Raycaster()
    this.camera = new PerspectiveCamera(
      50,
      this.width / this.height,
      0.01,
      1000
    )
    this.controls = new Controls(this.camera, this.renderer.domElement)

    window.addEventListener(
      'resize',
      debounce(this.handleResize, 100, this),
      false
    )

    this.startAnimationLoop()
    this.setSelectedView('view1')
  }

  public handleResize() {
    if (this?.viewportElement?.offsetWidth) {
      this.width = this.viewportElement.offsetWidth
      this.height = this.viewportElement.offsetHeight
      this.camera.aspect = this.width / this.height
      this.camera.updateProjectionMatrix()

      this.renderer.setSize(this.width, this.height)
    }
  }

  public addObject(object: Object3D) {
    this.scene.add(object)
  }

  public setSelectedView(selectedView: string) {
    if (selectedView === 'view1') {
      this.controls.setTargetPosition(0, 62, 0)
      this.camera.position.set(15, 72, -25)
      this.windTurbine.setNacelleVisible(true)
    } else {
      this.controls.setTargetPosition(0, 65.5, 1.6)
      this.camera.position.set(7, 65.5, 1.6)
      this.windTurbine.setNacelleVisible(false)
    }
  }

  private startAnimationLoop() {
    const animate = () => {
      requestAnimationFrame(animate)

      this.controls.controls.update()
      this.windTurbine.update()
      this.renderer.render(this.scene, this.camera)
    }
    animate()
  }
}

export default ViewPort
