import {
  Object3D,
  PerspectiveCamera,
  Raycaster,
  Vector2,
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
  selectableObjects: Object3D[]
  renderer: WebGLRenderer
  windTurbine: WindTurbine

  constructor(viewportElement: HTMLElement, objects: Object3D[]) {
    this.viewportElement = viewportElement
    this.width = this.viewportElement.offsetWidth
    this.height = this.viewportElement.offsetHeight
    this.objects = objects
    this.selectableObjects = objects.filter((object) => {
      return (
        object.name !== 'nacelle_structure' &&
        object.name !== 'nacelle_structure_open'
      )
    })
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
    this.camera.layers.enable(1)
    this.controls = new Controls(this.camera, this.renderer.domElement)

    this.renderer.domElement.addEventListener(
      'mousedown',
      (event: MouseEvent) => {
        const mousePosition = new Vector2()
        mousePosition.x = (event.clientX / this.width) * 2 - 1
        mousePosition.y = -(event.clientY / this.height) * 2 + 1
        this.handleLookAt(mousePosition)
      }
    )

    this.renderer.domElement.addEventListener(
      'touchstart',
      (event: TouchEvent) => {
        const touchPosition = new Vector2()
        touchPosition.x = (event.touches[0].clientX / this.width) * 2 - 1
        touchPosition.y = -(event.touches[0].clientY / this.height) * 2 + 1
        this.handleLookAt(touchPosition)
      }
    )

    /*this.renderer.domElement.addEventListener(
      'mousemove',
      (event: MouseEvent) => {
        const mousePosition = new Vector2()
        mousePosition.x = (event.clientX / this.width) * 2 - 1
        mousePosition.y = -(event.clientY / this.height) * 2 + 1
        this.handleHover(mousePosition)
      }
    )*/

    window.addEventListener(
      'resize',
      debounce(this.handleResize, 100, this),
      false
    )

    this.setSelectedView('view1')

    this.startAnimationLoop()
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

  /*private handleHover(eventLocation: Vector2) {
    this.raycaster.setFromCamera(eventLocation, this.camera)
    const intersects = this.raycaster.intersectObjects(
      this.selectableObjects,
      true
    )

    const currentlySelectedObject = this.scene.getObjectByName('selected')

    if (currentlySelectedObject) {
      this.scene.remove(currentlySelectedObject)
    }

    if (intersects.length > 0) {
      intersects[0].object.traverse((child) => {
        if (child instanceof Mesh) {
          const thresholdAngle = 15
          const lineGeometry = new EdgesGeometry(child.geometry, thresholdAngle)

          const line = new LineSegments(
            lineGeometry,
            new LineBasicMaterial({ color: 0xffffff, linewidth: 4 })
          )

          const object = new Object3D()
          object.name = 'selected'
          object.add(line)

          this.scene.add(object)
        }
      })
    }
  }*/

  public setSelectedView(selectedView: string) {
    if (selectedView === 'view1') {
      this.controls.setTargetPosition(0, 62, 0)
      this.camera.position.set(15, 72, -25)
      this.setNacelleOpen(false)
    } else {
      this.controls.setTargetPosition(0, 65.5, 1.6)
      this.camera.position.set(7, 65.5, 1.6)
      this.setNacelleOpen(true)
    }
  }

  private setNacelleOpen(open: boolean) {
    const nacelleStructure: Object3D = this.objects.find(
      (obj) => obj.name === 'nacelle_structure'
    )!
    nacelleStructure.visible = !open
    const nacelleStructureOpen: Object3D = this.objects.find(
      (obj) => obj.name === 'nacelle_structure_open'
    )!
    nacelleStructureOpen.visible = open
  }

  private handleLookAt(eventLocation: Vector2) {
    this.raycaster.setFromCamera(eventLocation, this.camera)
    const intersects = this.raycaster.intersectObjects(this.objects, true)

    if (intersects.length > 0) {
      this.controls.setTargetPosition(
        intersects[0].point.x,
        intersects[0].point.y,
        intersects[0].point.z
      )

      const distanceFromCamera = this.camera.position.distanceTo(
        intersects[0].point
      )
      this.controls.setSpeed(distanceFromCamera)
    }
  }

  private startAnimationLoop() {
    const animate = () => {
      requestAnimationFrame(animate)

      this.controls.update()
      this.windTurbine.update()
      this.renderer.render(this.scene, this.camera)
    }
    animate()
  }
}

export default ViewPort
