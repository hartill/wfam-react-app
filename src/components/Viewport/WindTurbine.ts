import {
  Color,
  EdgesGeometry,
  Group,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  PointLight,
  Scene,
  SphereGeometry,
  Vector3,
} from 'three'
import { loadMaterials } from './helpers'

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

const temperatures = {
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
}

class WindTurbine {
  rotor: Group
  rotorRPM: number
  constructor(scene: Scene, objects: Object3D[]) {
    this.rotor = new Group()
    this.rotorRPM = 60

    const materials = loadMaterials()

    rotorGroupObjectNames.forEach((objectName) => {
      const object: Object3D = objects.find((obj) => obj.name === objectName)!
      this.rotor.add(object)
    })
    scene.add(this.rotor)
    this.rotor.position.set(-0, 65.94, -3.4)

    wtObjectNames.forEach((objectName) => {
      const object: Object3D = objects.find((obj) => obj.name === objectName)!
      //scene.add(object)

      if (
        objectName === 'nacelle_structure' ||
        objectName === 'nacelle_structure_open'
      ) {
        object.traverse((child) => {
          if (child instanceof Mesh) {
            child.material = materials.white
            child.material.opacity = 0.1
          }
        })
      } else {
        object.traverse((child) => {
          if (child instanceof Mesh) {
            const edges = new EdgesGeometry(child.geometry, 5)
            const line = new LineSegments(
              edges,
              new LineBasicMaterial({ color: 0x333333 })
            )
            scene.add(line)
          }
        })
      }

    })

    /*Object.values(temperatures).forEach((key, value) => {
      
      light.position.set(10, 65, 5)
      const geometry = new SphereGeometry(5, 32, 16)
      const material = new MeshBasicMaterial({ color: 0xffff00 })
      const sphere = new Mesh(geometry, material)

    })*/

    this.addLight(scene, 0xffff00, new Vector3(1, 67, 0))
    this.addLight(scene, 0xff0000, new Vector3(1, 66, 3))
    this.addLight(scene, 0x0000ff, new Vector3(1, 66, -2))
  }

  public update() {
    this.rotor.rotateZ(this.rotorRPM / (65 * 30))
  }

  private addLight(scene: Scene, color: number, position: Vector3) {

    const geometry = new SphereGeometry(0.05, 16, 8)
    const material = new MeshBasicMaterial({ color: color })
    material.color.set(new Color(1000000, 0, 0))
    const sphere = new Mesh(geometry, material)

    sphere.position.set(position.x, position.y, position.z)
    sphere.layers.set(1)
    scene.add(sphere)
  }
}

export default WindTurbine
