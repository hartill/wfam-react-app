class CalculusHelper {
  getDonutArcPath(
    percent: number,
    radius: number,
    svgSize: number,
    thickness: number
  ): string {
    const degrees = this.percentToDegrees(percent)
    const longPathFlag = degrees > 180 ? 1 : 0
    const innerRadius = radius - thickness

    const commands: string[] = []
    commands.push(`M ${svgSize / 2 + radius} ${svgSize / 2}`)
    commands.push(
      `A ${radius} ${radius} 0 ${longPathFlag} 0 ${this.getCoordFromDegrees(
        degrees,
        radius,
        svgSize
      )}`
    )
    commands.push(
      `L ${this.getCoordFromDegrees(degrees, innerRadius, svgSize)}`
    )
    commands.push(
      `A ${innerRadius} ${innerRadius} 0 ${longPathFlag} 1 ${
        svgSize / 2 + innerRadius
      } ${svgSize / 2}`
    )
    return commands.join(' ')
  }

  getCoordFromDegrees(angle: number, radius: number, svgSize: number): string {
    const x = Math.cos((angle * Math.PI) / 180)
    const y = Math.sin((angle * Math.PI) / 180)
    const coordX = x * radius + svgSize / 2
    const coordY = y * -radius + svgSize / 2
    return [coordX, coordY].join(' ')
  }

  percentToDegrees(percent: number): number {
    return percent * 3.6
  }
}

interface IDonutArc {
  percent: number
  radius: number
  viewBox: number
  thickness: number
  fill: string
}

function DonutArc({ percent, radius, viewBox, thickness, fill }: IDonutArc) {
  const helper = new CalculusHelper()
  const path = helper.getDonutArcPath(percent, radius, viewBox, thickness)
  return <path fill={fill} d={path} />
}

export default DonutArc
