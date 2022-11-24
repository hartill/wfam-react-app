import {
  Object3D,
  PerspectiveCamera,
  WebGLRenderer,
  Scene,
  Mesh,
  AmbientLight,
  BoxGeometry,
  DirectionalLight,
  MeshBasicMaterial,
  MeshLambertMaterial,
  Color,
  Vector2,
  Raycaster,
  ShaderMaterial,
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { ClearPass } from 'three/examples/jsm/postprocessing/ClearPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader'
import { debounce } from '../../helpers'
import Controls from './Controls'
import { addLighting } from './helpers'
import WindTurbine from './WindTurbine'

class ViewPort {
  viewportElement: HTMLElement
  width: number
  height: number
  objects: Object3D[]
  scene: Scene
  camera: PerspectiveCamera
  raycaster: Raycaster
  controls: Controls
  bloomComposer: EffectComposer
  renderer: WebGLRenderer
  windTurbine: WindTurbine
  constructor(viewportElement: HTMLElement, objects: Object3D[]) {
    this.viewportElement = viewportElement
    this.width = viewportElement.offsetWidth
    this.height = viewportElement.offsetHeight
    this.objects = objects
    this.scene = new Scene()

    addLighting(this.scene)
    this.windTurbine = new WindTurbine(this.scene, objects)

    this.renderer = new WebGLRenderer({ antialias: false })
    this.renderer.setSize(this.width, this.height)
    this.renderer.setClearColor(0x101000)
    viewportElement.appendChild(this.renderer.domElement)

    this.raycaster = new Raycaster()
    this.camera = new PerspectiveCamera(
      50,
      this.width / this.height,
      0.01,
      1000
    )
    this.camera.layers.enable(1)
    this.controls = new Controls(this.camera, this.renderer.domElement)

    this.setSelectedView('view1')

    // Bloom Composer
    let renderScene = new RenderPass(this.scene, this.camera)

    let bloomPass = new UnrealBloomPass(
      new Vector2(this.width, this.height),
      1.5,
      0.4,
      0.85
    )
    bloomPass.threshold = 0.1
    bloomPass.strength = 3
    bloomPass.radius = 1

    this.bloomComposer = new EffectComposer(this.renderer)
    this.bloomComposer.renderToScreen = true
    this.bloomComposer.setSize(this.width, this.height)

    this.bloomComposer.addPass(renderScene)
    this.bloomComposer.addPass(bloomPass)

    // Outline
    /*let renderScene2 = new RenderPass(this.scene, this.camera)

    let outlinePass = new OutlinePass(
      new Vector2(this.width, this.height),
      this.scene,
      this.camera
    )
    outlinePass.edgeStrength = Number(1)
    outlinePass.edgeGlow = Number(0)
    outlinePass.edgeThickness = Number(2)
    outlinePass.pulsePeriod = Number(0)
    outlinePass.visibleEdgeColor.set('#ffffff')
    outlinePass.hiddenEdgeColor.set('#000000')
    outlinePass.selectedObjects = objects
    outlinePass.renderToScreen = true

    this.outlineComposer = new EffectComposer(this.renderer)
    this.outlineComposer.renderToScreen = true
    this.outlineComposer.setSize(this.width, this.height)

    this.outlineComposer.addPass(new ClearPass())
    this.outlineComposer.addPass(outlinePass)*/

    this.renderer.toneMappingExposure = Math.pow(0.9, 4.0)

    this.renderer.domElement.addEventListener(
      'mousedown',
      (event: MouseEvent) => {
        const mousePosition = new Vector2()
        mousePosition.x = (event.clientX / this.width) * 2 - 1
        mousePosition.y = -(event.clientY / this.height) * 2 + 1
        this.handleLookAt(mousePosition)
      }
    )

    window.addEventListener(
      'resize',
      debounce(this.handleResize, 100, this),
      false
    )

    this.startAnimationLoop()
  }

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

  public handleResize() {
    if (this?.viewportElement?.offsetWidth) {
      this.width = this.viewportElement.offsetWidth
      this.height = this.viewportElement.offsetHeight
      this.camera.aspect = this.width / this.height
      this.camera.updateProjectionMatrix()

      this.renderer.setSize(this.width, this.height)
    }
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
    const render = () => {
      requestAnimationFrame(render)

      this.renderer.autoClear = false
      this.renderer.clear()

      this.camera.layers.set(1)
      this.bloomComposer.render()

      this.renderer.clearDepth()
      this.camera.layers.set(0)
      //this.outlineComposer.render()
      this.renderer.render(this.scene, this.camera)
    }
    render()
  }
}

export default ViewPort
