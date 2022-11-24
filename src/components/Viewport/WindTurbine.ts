import {
  EdgesGeometry,
  Group,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshPhongMaterial,
  Object3D,
  Scene,
} from 'three'
import { degrees_to_radians, loadMaterials } from './helpers'

const rotorGroupObjectNames = [
  'main_bearing',
  'blade_1',
  'blade_2',
  'blade_3',
  'hub',
]
const wtObjectNames = [
  'tower',
  'ladder',
  'entry_hatch',
  'control_unit',
  'transformers',
  'brake',
  'coolant',
  'gearbox',
  'generator',
  'winch',
  'beams',
  'platform',
  'nacelle_structure',
  'nacelle_structure_open',
  'met_mast',
]

/*const temperatures = {
  generatorBearingTemperature: 10,
  generatorPhase1Temperature: 5,
  generatorBearing2Temperature: 12,
  generatorSlipRingTemperature: 18,
  hydraulicOilTemperature: 15,
  gearboxOilTemperature: 21,
  gearboxBearingTemperature: 20,
  nacelleTemperature: 15,
  ambientTemperature: 12,
  TransformerTemperature: 15,
  gridInverterTemperature: 10,
  controllerTopTemperature: 13,
  controllerHubTemperature: 12,
  controllerVCPTemperature: 15,
  spinnerTemperature: 22,
  controllerVCPChokeCoilTemperature: 26,
  vcsCoolingWaterTemperature: 10,
  busbarTemperature: 10,
}*/

class WindTurbine {
  scene: Scene
  rotor: Group
  nacelleStructure: Object3D | null
  nacelleMaterial: MeshPhongMaterial | null
  rotorRPM: number
  materials: any
  constructor(scene: Scene, objects: Object3D[]) {
    this.scene = scene
    this.rotor = new Group()
    this.nacelleStructure = null
    this.nacelleMaterial = null
    this.rotorRPM = 16
    this.materials = loadMaterials()

    rotorGroupObjectNames.forEach((objectName) => {
      const object: Object3D = objects.find((obj) => obj.name === objectName)!
      this.rotor.add(object)
    })
    this.scene.add(this.rotor)
    this.rotor.position.set(-0, 65.94, -3.4)

    wtObjectNames.forEach((objectName) => {
      const object: Object3D = objects.find((obj) => obj.name === objectName)!
      this.scene.add(object)

      if (objectName === 'nacelle_structure') {
        this.nacelleStructure = object
        object.traverse((child) => {
          if (child instanceof Mesh) {
            this.nacelleMaterial = child.material
          }
        })
      } else if (objectName === 'nacelle_structure_open') {
        this.scene.remove(object)
      } else {
        object.traverse((child) => {
          if (child instanceof Mesh) {
            this.addLine(child)
          }
        })
      }
    })
  }

  private addLine(child: Mesh) {
    const edges = new EdgesGeometry(child.geometry, 8)
    const line = new LineSegments(
      edges,
      new LineBasicMaterial({ color: 0x333333 })
    )
    this.scene.add(line)
  }

  public setNacelleVisible(show: boolean) {
    this.nacelleStructure?.traverse((child) => {
      if (child instanceof Mesh) {
        child.material = show
          ? this.nacelleMaterial
          : this.materials.transparentWhite
      }
    })
  }

  public update() {
    const anglePerMinute = degrees_to_radians(360 * this.rotorRPM)
    this.rotor.rotateZ(anglePerMinute / 60 / 60)
  }
}

export default WindTurbine
