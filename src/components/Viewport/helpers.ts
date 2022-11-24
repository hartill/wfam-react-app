import {
  AmbientLight,
  Color,
  DirectionalLight,
  DoubleSide,
  Fog,
  GridHelper,
  Mesh,
  MeshBasicMaterial,
  MeshPhongMaterial,
  PlaneGeometry,
  Scene,
} from 'three'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { Object3D } from 'three/src/core/Object3D'

export default async function loadThreeObject(
  objectPath: string,
  materialPath?: string
): Promise<Object3D> {
  const mtlLoader = new MTLLoader()
  const objectLoader = new OBJLoader()

  if (materialPath) {
    return new Promise((resolve, reject) => {
      mtlLoader.load(materialPath, (materials) => {
        materials.preload()
        materials.side = DoubleSide
        objectLoader.setMaterials(materials)

        objectLoader.load(
          objectPath,
          (obj: Object3D) => {
            resolve(obj)
          },
          (xhr: ProgressEvent) => {
            console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
          },
          (error: any) => {
            console.error(error.message)
            reject(error)
          }
        )
      })
    })
  } else {
    return new Promise((resolve, reject) => {
      objectLoader.load(
        objectPath,
        (obj: Object3D) => {
          resolve(obj)
        },
        // called when loading is in progresses
        (xhr: ProgressEvent) => {
          console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
        },
        (error: any) => {
          console.error(error.message)
          reject(error)
        }
      )
    })
  }
}

export function createEnvironment(scene: Scene) {
  scene.background = new Color(0xbbc4e6)
  scene.fog = new Fog(0xbbc4e6, 80, 180)

  const floorGeometry = new PlaneGeometry(1000, 1000, 8, 8)
  const floorMaterial = new MeshBasicMaterial({
    color: 0xdedcec,
    side: DoubleSide,
  })
  const floor = new Mesh(floorGeometry, floorMaterial)
  floor.position.set(0, -0.01, 0)
  floor.rotation.set(Math.PI / -2, 0, 0)
  scene.add(floor)

  const gridSize = 1000
  const gridDivisions = 100
  const gridHelper = new GridHelper(
    gridSize,
    gridDivisions,
    new Color(0xcccccc),
    new Color(0xcccccc)
  )
  scene.add(gridHelper)
}

export function addLighting(scene: Scene) {
  const directionalLight = new DirectionalLight(0xffffff, 0.7)
  directionalLight.position.set(1000, 1000, -1000)
  directionalLight.castShadow = true
  directionalLight.shadow.mapSize.width = 256
  directionalLight.shadow.mapSize.height = 256
  directionalLight.shadow.radius = 5
  directionalLight.shadow.blurSamples = 25
  scene.add(directionalLight)

  const ambientLight = new AmbientLight(0xffffff, 0.7)
  scene.add(ambientLight)
}

export function loadMaterials() {
  const whiteMaterial = new MeshPhongMaterial()
  whiteMaterial.color.setRGB(0.8, 0.8, 0.8)
  whiteMaterial.side = DoubleSide
  whiteMaterial.transparent = true
  whiteMaterial.opacity = 0.5

  const yellowMaterial = new MeshPhongMaterial()
  yellowMaterial.color.setRGB(0.9, 0.7, 0.4)
  yellowMaterial.side = DoubleSide

  const wireframeMaterial = new MeshBasicMaterial({
    color: 0x222222,
    wireframe: true,
  })

  return {
    white: whiteMaterial,
    yellow: yellowMaterial,
    wireframe: wireframeMaterial,
  }
}
