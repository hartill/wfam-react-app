import { useEffect, useRef, useState } from 'react'
import { Object3D } from 'three'
import ErrorScreen from '../ErrorScreen'
import LoadingScreen from '../LoadingScreen'
import loadThreeObject from './helpers'
import {
  ControlBar,
  ControlButton,
  ControlButtonText,
  Loading,
  LoadingSpinner,
  ViewportContainer,
  ViewportElement,
} from './styles'
import Viewport from './Viewport'
import { Video } from 'react-feather'
import theme from '../../config/theme'

enum SelectedView {
  VIEW1 = 'view1',
  VIEW2 = 'view2',
}

interface Geometry {
  geometry: string
  material?: string
}

interface IViewportWrapper {
  objectPaths: Geometry[]
}

function ViewportWrapper({ objectPaths }: IViewportWrapper) {
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [objects, setObjects] = useState<Object3D[]>([])
  const [selectedView, setSelectedView] = useState<SelectedView>(
    SelectedView.VIEW1
  )
  const wrapper = useRef<HTMLDivElement>(null)
  const viewport = useRef<Viewport | null>(null)

  const handleSelectedViewChanged = (selectedView: SelectedView) => {
    setSelectedView(selectedView)
  }

  useEffect(() => {
    if (wrapper.current && !viewport.current) {
      wrapper.current.innerHTML = ''
      window.setTimeout(() => {
        if (wrapper.current) {
          viewport.current = new Viewport(wrapper.current, objects)
        }
      }, 20)
    }
  }, [objects])

  useEffect(() => {
    if (viewport.current) {
      viewport.current.setSelectedView(selectedView)
    }
  }, [selectedView])

  useEffect(() => {
    const loadObjects = async () => {
      let objects: Object3D[] = []
      for (let objectPath of objectPaths) {
        const object = await loadThreeObject(
          objectPath.geometry,
          objectPath.material
        )
        object.children.forEach((child) => {
          objects.push(child)
        })
      }
      setObjects(objects)
    }

    try {
      loadObjects()
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [objectPaths])

  if (loading) {
    return <LoadingScreen />
  } else if (error) {
    return <ErrorScreen error={error} />
  } else {
    return (
      <ViewportContainer>
        <ViewportElement ref={wrapper} />
        <ControlBar>
          <ControlButton
            onClick={() => handleSelectedViewChanged(SelectedView.VIEW1)}
          >
            <Video width={21} color={theme.colors.midBlueGrey}/>
            <ControlButtonText>1</ControlButtonText>
          </ControlButton>
          <ControlButton
            onClick={() => handleSelectedViewChanged(SelectedView.VIEW2)}
          >
            <Video width={21} color={theme.colors.midBlueGrey}/>
            <ControlButtonText>2</ControlButtonText>
          </ControlButton>
        </ControlBar>
        <Loading>
          <LoadingSpinner />
        </Loading>
      </ViewportContainer>
    )
  }
}

export default ViewportWrapper
